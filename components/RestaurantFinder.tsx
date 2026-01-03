import React, { useState } from 'react';
import { findFriendlyRestaurants } from '../services/geminiService';
import { RestaurantRecommendation } from '../types';

const CUISINE_OPTIONS = [
  { label: "Asian (General)", value: "Asian" },
  { label: "Chinese", value: "Chinese" },
  { label: "Japanese", value: "Japanese" },
  { label: "Korean", value: "Korean" },
  { label: "Vietnamese", value: "Vietnamese" },
  { label: "Thai", value: "Thai" },
  { label: "Indian", value: "Indian" },
  { label: "Ramen", value: "Ramen" },
  { label: "Dim Sum", value: "Dim Sum" },
  { label: "Sushi", value: "Sushi" },
  { label: "Hot Pot", value: "Hot Pot" },
  { label: "Pho", value: "Pho" },
  { label: "Dumplings", value: "Dumplings" },
  { label: "Malaysian", value: "Malaysian" },
  { label: "Indonesian", value: "Indonesian" },
  { label: "Filipino", value: "Filipino" }
];

const RestaurantFinder: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Search Filters
  const [cuisine, setCuisine] = useState('Asian');
  const [sortBy, setSortBy] = useState('rating');
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (append: boolean = false) => {
    setLoading(true);
    setError('');
    
    let lat: number | undefined;
    let lng: number | undefined;

    if (navigator.geolocation) {
       try {
         const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
           navigator.geolocation.getCurrentPosition(resolve, reject);
         });
         lat = pos.coords.latitude;
         lng = pos.coords.longitude;
       } catch (e) {
         console.log("Geolocation denied or failed.");
       }
    }

    try {
      const excludeNames = append ? restaurants.map(r => r.name) : [];
      const results = await findFriendlyRestaurants(lat, lng, cuisine, sortBy, excludeNames);
      
      if (append) {
        setRestaurants(prev => [...prev, ...results]);
      } else {
        setRestaurants(results);
      }
      setHasSearched(true);
    } catch (err) {
      setError('Could not fetch restaurant recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setRestaurants([]); // Clear previous results on new search
    performSearch(false);
  };

  const handleLoadMore = () => {
    performSearch(true);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8 min-h-[600px]">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-sage-900 font-serif">NYC Asian Dining Guide</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Find highly-rated restaurants near you with safe Low FODMAP options. 
          We verify menus against dietary needs in real-time.
        </p>
      </div>

      {/* Search Bar & Controls */}
      <div className="max-w-4xl mx-auto bg-stone-50 p-4 rounded-xl border border-stone-200 mb-10 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
                <label className="block text-xs font-medium text-gray-500 mb-1">Cuisine or Category</label>
                <select 
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sage-600 sm:text-sm sm:leading-6"
                >
                    {CUISINE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
            <div className="md:w-48">
                <label className="block text-xs font-medium text-gray-500 mb-1">Sort By</label>
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sage-600 sm:text-sm sm:leading-6"
                >
                    <option value="rating">Highest Rated</option>
                    <option value="distance">Nearest</option>
                </select>
            </div>
            <div className="flex items-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto rounded-md bg-sage-800 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600 disabled:opacity-50 transition-colors"
                >
                    {loading && !hasSearched ? 'Searching...' : 'Find Places'}
                </button>
            </div>
        </form>
      </div>

      {error && <p className="text-center text-red-600 mb-6">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {restaurants.map((place, idx) => (
          <div key={`${place.name}-${idx}`} className="flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow bg-white animate-fade-in">
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-bold text-gray-900 font-serif">
                     {place.name}
                   </h3>
                   {place.googleMapsUri && (
                     <a href={place.googleMapsUri} target="_blank" rel="noreferrer" className="text-sage-600 hover:text-sage-800 p-1 hover:bg-sage-50 rounded-full">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                       </svg>
                     </a>
                   )}
                </div>
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400">
                        <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.006.003.002.001.003.001a.79.79 0 0 0 .01.003Z" clipRule="evenodd" />
                    </svg>
                    {place.address}
                </p>
                {place.description && <p className="mt-3 text-sm text-gray-600 italic border-l-2 border-sage-200 pl-3">{place.description}</p>}
                
                <div className="mt-6 bg-sage-50 rounded-lg p-4">
                  <h4 className="text-xs font-bold text-sage-800 uppercase tracking-wide mb-3">Chef's Safe Picks</h4>
                  <ul className="space-y-2">
                    {place.recommendedDishes.map((dish, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className="flex-shrink-0 text-sage-500 mr-2">•</span>
                        <span className="text-gray-700">{dish}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasSearched && restaurants.length > 0 && (
          <div className="mt-12 text-center">
             <button
                onClick={handleLoadMore}
                disabled={loading}
                className="rounded-full bg-white border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
             >
                {loading ? 'Finding more...' : 'Load More Restaurants'}
             </button>
          </div>
      )}
    </div>
  );
};

export default RestaurantFinder;