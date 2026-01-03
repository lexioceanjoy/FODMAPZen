
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RestaurantRecommendation, Recipe, ScanResult, FodmapStatus } from "../types";
import { PDF_FOOD_DATABASE } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using 3-flash-preview for text analysis as it's better at reasoning
const ANALYSIS_MODEL = 'gemini-3-flash-preview';
// Using 2.5-flash for maps as per documentation requirements and Vision
const MAPS_MODEL = 'gemini-2.5-flash';
const VISION_MODEL = 'gemini-3-flash-preview'; 

const DATABASE_CONTEXT = PDF_FOOD_DATABASE.map(f => `${f.name} (${f.category}): ${f.status}`).join('\n');

// Helper to reliably extract JSON from markdown or conversational text
const extractJSON = (text: string, type: 'array' | 'object' = 'object'): string => {
  if (!text) return type === 'array' ? "[]" : "{}";
  
  const startChar = type === 'array' ? '[' : '{';
  const endChar = type === 'array' ? ']' : '}';
  
  const startIndex = text.indexOf(startChar);
  const endIndex = text.lastIndexOf(endChar);
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    return text.substring(startIndex, endIndex + 1);
  }
  
  return text; // Return original if pattern not found, might fail parsing but worth a shot
};

export const analyzeAsianDish = async (dishName: string): Promise<AnalysisResult> => {
  const prompt = `
    You are an expert dietitian and chef specializing in East Asian cuisine and the Low FODMAP diet.
    Analyze the following dish: "${dishName}".
    
    1. Determine if it is generally safe, risky, or unsafe for a strict Low FODMAP diet.
    2. List main ingredients and flag typical high FODMAP culprits (e.g., garlic, onion, wheat noodles).
    3. Suggest specific, **flavor-preserving** modifications. 
    
    Return the response as a valid JSON object matching this schema:
    {
      "dishName": "string",
      "isSafe": boolean,
      "riskLevel": "Low" | "Moderate" | "High",
      "explanation": "string (max 2 sentences)",
      "ingredientsBreakdown": [
        { "name": "string", "risk": "Low" | "High", "reason": "optional string" }
      ],
      "modifications": ["string"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: ANALYSIS_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            dishName: { type: Type.STRING },
            isSafe: { type: Type.BOOLEAN },
            riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High"] },
            explanation: { type: Type.STRING },
            ingredientsBreakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  risk: { type: Type.STRING, enum: ["Low", "High"] },
                  reason: { type: Type.STRING },
                }
              }
            },
            modifications: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      const result = JSON.parse(response.text) as AnalysisResult;
      // Sanitize to ensure arrays exist
      return {
        ...result,
        ingredientsBreakdown: Array.isArray(result.ingredientsBreakdown) ? result.ingredientsBreakdown : [],
        modifications: Array.isArray(result.modifications) ? result.modifications : []
      };
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Analysis failed", error);
    throw new Error("Failed to analyze dish.");
  }
};

export const getAsianRecipe = async (dishName: string): Promise<Recipe> => {
  const prompt = `
    1. Search for an authentic recipe for "${dishName}" using sources like "Xiachufang" or authentic culinary blogs.
    2. Adapt this authentic recipe to be **Strictly Low FODMAP**.
    
    Flavor Hacking Rules:
    - **Garlic/Onion**: Replace with **Garlic-infused Oil** or **Green Scallion Tops**.
    - **Sauces**: Use Gluten-Free Soy Sauce, Oyster Sauce (check labels), Sesame Oil.
    
    Output the result as a raw JSON object (no markdown) with this structure:
    {
      "title": "Dish Name (Low FODMAP)",
      "description": "Description...",
      "ingredients": ["1 cup rice", "2 tbsp garlic-infused oil"],
      "instructions": ["Step 1...", "Step 2..."],
      "fodmapNotes": "Why this works"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: ANALYSIS_MODEL,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = extractJSON(response.text || "{}", 'object');
    
    let recipe: Recipe;
    try {
       recipe = JSON.parse(text);
    } catch (e) {
       console.error("JSON Parse error", text);
       throw new Error("Failed to parse recipe");
    }

    recipe = {
        ...recipe,
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
    };

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
      const webSource = chunks.find(c => c.web?.uri && c.web?.title);
      if (webSource?.web) {
        recipe.inspirationSource = {
          title: webSource.web.title || "Authentic Source",
          url: webSource.web.uri || "#"
        };
      }
    }

    return recipe;

  } catch (error) {
    console.error("Recipe generation failed", error);
    throw new Error("Failed to generate recipe");
  }
};

export const getDishSuggestions = async (query: string, exclude: string[] = []): Promise<string[]> => {
  const prompt = `
    Suggest 6 authentic East Asian dishes matching: "${query || 'Popular Authentic Classics'}".
    Ensure they can be adapted to Low FODMAP.
    Excluding: ${exclude.join(', ')}.
    
    Return ONLY a JSON array of strings. Example: ["Dish A", "Dish B"]
  `;

  try {
    const response = await ai.models.generateContent({
      model: ANALYSIS_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
      }
    });
    
    if (response.text) {
        const parsed = JSON.parse(response.text);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === 'object' && parsed !== null) {
            const possibleArray = Object.values(parsed).find(v => Array.isArray(v));
            if (possibleArray) return possibleArray as string[];
        }
    }
    return [];
  } catch (e) {
    console.error("Failed to suggest dishes", e);
    return [];
  }
};


export const analyzeImage = async (base64Image: string, mimeType: string): Promise<ScanResult> => {
  const prompt = `
    Identify the food item or dish in this image. 
    Then, cross-reference it with the following Low FODMAP database to determine if it is safe.
    
    Database Context:
    ${DATABASE_CONTEXT}
    
    If the food is NOT in the database, use your general nutritional knowledge.
    Return JSON.
  `;

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType
    }
  };

  const response = await ai.models.generateContent({
    model: VISION_MODEL,
    contents: {
      parts: [imagePart, { text: prompt }]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          identifiedFood: { type: Type.STRING },
          status: { type: Type.STRING, enum: ["LOW", "HIGH", "MODERATE", "UNKNOWN"] },
          reasoning: { type: Type.STRING }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as ScanResult;
  }
  throw new Error("Failed to analyze image");
};

export const findFriendlyRestaurants = async (
    lat?: number, 
    lng?: number, 
    cuisine: string = "Asian", 
    sortBy: string = "rating",
    excludeNames: string[] = []
): Promise<RestaurantRecommendation[]> => {
  
  const locationPrompt = lat && lng 
    ? `near user location (${lat}, ${lng})` 
    : "in New York City, NY";

  const prompt = `
    Find 5 distinct, highly-rated ${cuisine} restaurants ${locationPrompt}.
    
    Constraints:
    - Sort results by: ${sortBy === 'distance' ? 'proximity to location' : 'highest rating'}.
    - Do NOT include these restaurants: ${excludeNames.join(', ')}.
    - Focus on places where dishes can be typically modified or are naturally simpler (steamed, grilled, rice-based).
    
    For EACH restaurant found via Google Maps, provide:
    1. Name and Address.
    2. Short description.
    3. Two dish recommendations that are "Most Likely Low FODMAP Safe" (but may require modification).
    4. For EACH dish, provide a "caution" note specifying exactly what the user must verify with the server (e.g. "Ask for gluten-free soy sauce", "Ensure no garlic garnish", "Ask for sauce on side").
    
    Output the result as a STRICT valid JSON array with this exact schema:
    [
      {
        "name": "Restaurant Name",
        "address": "Full Address",
        "description": "Short description",
        "recommendedDishes": [
            { "name": "Dish Name", "caution": "Ask server to..." }
        ]
      }
    ]
    Do not add conversational text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MAPS_MODEL, 
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      }
    });

    // Robust extraction: Find the first [ and last ] to ignore "Here are the results..." text
    const text = extractJSON(response.text || "[]", 'array');

    let rawData: any = [];
    try {
        rawData = JSON.parse(text);
    } catch (e) {
        console.error("Failed to parse JSON response from restaurant search", text);
        return [];
    }

    // Ensure rawData is an array
    if (!Array.isArray(rawData)) {
        // Fallback: Check if it's wrapped in an object key
        if (rawData && typeof rawData === 'object') {
            const values = Object.values(rawData);
            const arrayVal = values.find(v => Array.isArray(v));
            if (arrayVal) {
                rawData = arrayVal;
            } else {
                return [];
            }
        } else {
            return [];
        }
    }

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const enhancedData = rawData.map((place: any) => {
      const match = chunks.find((c: any) => 
        c.web?.title?.includes(place.name) || c.web?.uri?.includes(place.name.replace(/\s+/g, '+'))
      );

      // Handle potential key variations from the model or string fallbacks
      let dishList = place.recommendedDishes || 
                       place.suggested_fodmap_dishes || 
                       place.suggested_dishes || 
                       [];
      
      // If model returned strings by mistake, map them to objects
      if (Array.isArray(dishList) && typeof dishList[0] === 'string') {
          dishList = dishList.map((d: string) => ({ name: d, caution: "Verify ingredients with server." }));
      }
      
      return {
        ...place,
        recommendedDishes: Array.isArray(dishList) ? dishList : [],
        googleMapsUri: match?.web?.uri || match?.maps?.uri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.address)}`
      };
    });

    return enhancedData;

  } catch (error) {
    console.error("Restaurant search failed", error);
    throw new Error("Failed to find restaurants.");
  }
};
