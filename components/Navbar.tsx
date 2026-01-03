import React from 'react';

interface NavbarProps {
  currentView: string;
  onChangeView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onChangeView('home')}>
            <span className="text-2xl font-serif font-bold text-sage-800">FODMAP<span className="text-sage-500">Zen</span></span>
          </div>
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            <button 
              onClick={() => onChangeView('home')}
              className={`text-sm font-medium ${currentView === 'home' ? 'text-sage-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Learn
            </button>
            <button 
              onClick={() => onChangeView('database')}
              className={`text-sm font-medium ${currentView === 'database' ? 'text-sage-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Food DB
            </button>
            <button 
              onClick={() => onChangeView('scanner')}
              className={`text-sm font-medium ${currentView === 'scanner' ? 'text-sage-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Scanner
            </button>
            <button 
              onClick={() => onChangeView('lens')}
              className={`text-sm font-medium ${currentView === 'lens' ? 'text-sage-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Asian Lens
            </button>
            <button 
              onClick={() => onChangeView('restaurants')}
              className={`text-sm font-medium ${currentView === 'restaurants' ? 'text-sage-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              NYC Eating
            </button>
          </div>
          {/* Mobile menu button simplified */}
          <div className="md:hidden flex items-center">
            <select 
              value={currentView} 
              onChange={(e) => onChangeView(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sage-600 sm:text-sm sm:leading-6"
            >
              <option value="home">Home</option>
              <option value="database">Food DB</option>
              <option value="scanner">Scanner</option>
              <option value="lens">Asian Lens</option>
              <option value="restaurants">NYC Eating</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;