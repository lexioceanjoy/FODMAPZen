import React, { useState, useMemo } from 'react';
import { PDF_FOOD_DATABASE, CATEGORIES } from '../constants';
import { FodmapStatus } from '../types';

const FoodSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFoods = useMemo(() => {
    return PDF_FOOD_DATABASE.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto shadow-sm rounded-2xl my-8 border border-sage-100">
      <div className="border-b border-gray-200 pb-5 mb-5">
        <h3 className="text-2xl font-semibold leading-6 text-sage-900 font-serif">Food Database</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Search our curated list of foods based on clinical Low FODMAP charts.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="sm:w-1/4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sage-600 sm:text-sm sm:leading-6"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-grow">
          <input
            type="text"
            className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sage-600 sm:text-sm sm:leading-6"
            placeholder="Search for an ingredient (e.g. Garlic, Apple)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-sage-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Food</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes / Portion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredFoods.length > 0 ? filteredFoods.map((food, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? undefined : 'bg-gray-50'}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {food.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{food.category}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          food.status === FodmapStatus.LOW 
                            ? 'bg-green-50 text-green-700 ring-green-600/20' 
                            : 'bg-red-50 text-red-700 ring-red-600/20'
                        }`}>
                          {food.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {food.portion || food.notes || '-'}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        No foods found matching "{searchTerm}". Try the Asian Lens or General Search below.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSearch;