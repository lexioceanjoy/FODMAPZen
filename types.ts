
export enum FodmapStatus {
  LOW = 'LOW',
  HIGH = 'HIGH',
  MODERATE = 'MODERATE', // For items not explicitly in list but analyzed
  UNKNOWN = 'UNKNOWN'
}

export interface FoodItem {
  name: string;
  category: string;
  status: FodmapStatus;
  portion?: string;
  notes?: string;
}

export interface AnalysisResult {
  dishName: string;
  isSafe: boolean;
  riskLevel: 'Low' | 'Moderate' | 'High';
  explanation: string;
  ingredientsBreakdown: { name: string; risk: 'Low' | 'High'; reason?: string }[];
  modifications: string[];
}

export interface DishRecommendation {
  name: string;
  caution: string; // Specific advice for the user (e.g. "Ask for GF soy sauce")
}

export interface RestaurantRecommendation {
  name: string;
  address: string;
  rating?: string;
  description?: string;
  googleMapsUri?: string;
  recommendedDishes: DishRecommendation[];
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  fodmapNotes: string; // Specific adaptations like "Use garlic oil instead of garlic"
  inspirationSource?: { title: string; url: string }; // New field for grounding
}

export interface ScanResult {
  identifiedFood: string;
  status: FodmapStatus;
  reasoning: string;
}
