import React, { useState, useEffect } from 'react';
import { analyzeAsianDish, getAsianRecipe, getDishSuggestions } from '../services/geminiService';
import { AnalysisResult, Recipe } from '../types';

const INITIAL_DISHES = [
  "Cantonese Steamed Fish", 
  "Mapo Tofu (Low FODMAP)", 
  "Vietnamese Lemongrass Chicken", 
  "Pad Kra Pao",
  "Oyakodon",
  "Bibimbap"
];

const AsianFoodLens: React.FC = () => {
  // Analyzer State
  const [dish, setDish] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');

  // Recipe/Explorer State
  const [suggestedDishes, setSuggestedDishes] = useState<string[]>(INITIAL_DISHES);
  const [dishQuery, setDishQuery] = useState('');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipeError, setRecipeError] = useState('');

  // Handler for analyzing a specific dish input
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dish.trim()) return;

    setAnalyzing(true);
    setAnalysisError('');
    setAnalysisResult(null);
    setSelectedRecipe(null);

    try {
      const analysis = await analyzeAsianDish(dish);
      setAnalysisResult(analysis);
    } catch (err) {
      setAnalysisError('Could not analyze dish. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Handler for getting a recipe
  const handleGetRecipe = async (dishName: string) => {
    setRecipeLoading(true);
    setSelectedRecipe(null);
    setRecipeError('');
    try {
      const recipe = await getAsianRecipe(dishName);
      setSelectedRecipe(recipe);
      // Smooth scroll to recipe
      const element = document.getElementById('recipe-card');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      setRecipeError('Failed to generate recipe. Please try again.');
    } finally {
      setRecipeLoading(false);
    }
  };

  // Handler for searching/generating new dish ideas
  const handleSearchIdeas = async (append: boolean = false) => {
    setLoadingSuggestions(true);
    try {
      const exclude = append ? suggestedDishes : [];
      const newDishes = await getDishSuggestions(dishQuery, exclude);
      
      if (append) {
        setSuggestedDishes(prev => [...prev, ...newDishes]);
      } else {
        setSuggestedDishes(newDishes);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Analyzer Section */}
      <div className="bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-stone-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-sage-900 sm:text-4xl font-serif">East Asian Lens</h2>
          <p className="mt-4 text-lg text-gray-600">
            Check if your favorite dish is safe, or explore authentic recipes adapted for sensitive stomachs.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="mt-8 max-w-xl mx-auto flex gap-x-4">
          <input
            type="text"
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sage-600 sm:text-sm sm:leading-6"
            placeholder="Check a dish (e.g. Dan Dan Noodles)..."
            value={dish}
            onChange={(e) => setDish(e.target.value)}
          />
          <button
            type="submit"
            disabled={analyzing}
            className="flex-none rounded-md bg-sage-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600 disabled:bg-gray-400"
          >
            {analyzing ? 'Checking...' : 'Check Safety'}
          </button>
        </form>

        {analysisError && (
          <div className="mt-6 text-center text-red-600">{analysisError}</div>
        )}

        {analysisResult && (
          <div className="mt-10 max-w-2xl mx-auto bg-white rounded-xl shadow-lg ring-1 ring-gray-900/5 overflow-hidden animate-fade-in">
             <div className={`p-6 ${analysisResult.isSafe ? 'bg-green-50' : analysisResult.riskLevel === 'High' ? 'bg-red-50' : 'bg-yellow-50'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{analysisResult.dishName}</h3>
                  <p className="mt-1 text-sm text-gray-500">{analysisResult.explanation}</p>
                </div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                   analysisResult.isSafe ? 'bg-green-200 text-green-800' : analysisResult.riskLevel === 'High' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  Risk: {analysisResult.riskLevel}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Ingredient Breakdown</h4>
              <ul className="space-y-2 mb-6">
                {analysisResult.ingredientsBreakdown.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${item.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                      {item.risk}
                    </span>
                  </li>
                ))}
              </ul>

              {!analysisResult.isSafe && (
                <>
                  <h4 className="font-semibold text-gray-900 mb-3">How to make it safe</h4>
                  <div className="bg-sage-50 rounded-lg p-4">
                    <ul className="list-disc pl-4 space-y-1 text-sm text-sage-900">
                      {analysisResult.modifications.map((mod, idx) => (
                        <li key={idx}>{mod}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => handleGetRecipe(analysisResult.dishName)}
                      className="text-sage-700 font-medium hover:text-sage-900 underline text-sm"
                    >
                      Get a safe recipe for this →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Recipe Explorer Section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-sage-900 font-serif mb-2">Recipe Explorer</h3>
          <p className="text-gray-600">Discover authentic dishes adapted for you.</p>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-8">
            <input
                type="text"
                className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sage-600 sm:text-sm sm:leading-6"
                placeholder="Search ideas (e.g. 'Spicy Noodle', 'Comfort Food')..."
                value={dishQuery}
                onChange={(e) => setDishQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchIdeas(false)}
            />
            <div className="flex gap-2">
                <button
                    onClick={() => handleSearchIdeas(false)}
                    className="flex-none rounded-md bg-stone-850 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-stone-700"
                >
                    Find Ideas
                </button>
            </div>
        </div>

        {/* Dish Grid */}
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {suggestedDishes.map((d, idx) => (
                <button
                key={`${d}-${idx}`}
                onClick={() => handleGetRecipe(d)}
                className="px-4 py-4 bg-sage-50 hover:bg-sage-100 text-sage-900 font-medium rounded-xl transition-all text-center border border-sage-200 hover:shadow-md flex items-center justify-center min-h-[80px]"
                >
                {d}
                </button>
            ))}
            </div>
            
            <div className="text-center">
                <button
                    onClick={() => handleSearchIdeas(true)}
                    disabled={loadingSuggestions}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sage-600 hover:text-sage-800 disabled:opacity-50"
                >
                    {loadingSuggestions ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Thinking of more...
                        </>
                    ) : (
                        <>Load More Suggestions ↓</>
                    )}
                </button>
            </div>
        </div>

        {/* Recipe Display Area */}
        <div id="recipe-card" className="mt-12">
            {recipeLoading && (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-sage-500 border-t-transparent"></div>
                <p className="mt-4 text-sage-800 font-medium">Consulting authentic sources & adapting...</p>
            </div>
            )}
            
            {recipeError && (
                <div className="text-center text-red-600 py-8">{recipeError}</div>
            )}

            {selectedRecipe && (
            <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-slide-up">
                <div className="bg-sage-700 px-6 py-6 sm:px-10">
                    <h3 className="text-3xl font-serif font-bold text-white">{selectedRecipe.title}</h3>
                </div>
                <div className="p-6 sm:p-10">
                <p className="text-gray-600 italic mb-6 text-lg">{selectedRecipe.description}</p>
                
                {selectedRecipe.inspirationSource && (
                    <div className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 bg-stone-50 px-4 py-2 rounded-full border border-stone-200">
                    <span>Source:</span>
                    <a href={selectedRecipe.inspirationSource.url} target="_blank" rel="noopener noreferrer" className="text-sage-700 hover:underline font-bold">
                        {selectedRecipe.inspirationSource.title}
                    </a>
                    </div>
                )}

                <div className="mb-8 p-5 bg-yellow-50 rounded-xl border border-yellow-100">
                    <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                        </svg>
                        Chef's Notes
                    </h4>
                    <p className="text-stone-800 leading-relaxed">{selectedRecipe.fodmapNotes}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                    <h4 className="font-bold text-xl text-sage-900 mb-4 border-b border-gray-200 pb-2">Ingredients</h4>
                    <ul className="space-y-3">
                        {selectedRecipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start">
                            <span className="mr-3 text-sage-500 mt-1">•</span>
                            <span className="text-gray-700 leading-snug">{ing}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                    <div>
                    <h4 className="font-bold text-xl text-sage-900 mb-4 border-b border-gray-200 pb-2">Instructions</h4>
                    <ol className="space-y-5">
                        {selectedRecipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-4">
                            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-sage-100 text-sage-700 font-bold">
                            {i + 1}
                            </span>
                            <span className="text-gray-700 leading-relaxed pt-1">{step}</span>
                        </li>
                        ))}
                    </ol>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AsianFoodLens;