import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import FoodSearch from './components/FoodSearch';
import AsianFoodLens from './components/AsianFoodLens';
import RestaurantFinder from './components/RestaurantFinder';
import FoodScanner from './components/FoodScanner';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero onGetStarted={() => setCurrentView('database')} />
            <Education />
          </>
        );
      case 'database':
        return (
          <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <FoodSearch />
            </div>
          </div>
        );
      case 'scanner':
        return (
          <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <FoodScanner />
            </div>
          </div>
        );
      case 'lens':
        return (
          <div className="bg-white min-h-screen">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <AsianFoodLens />
            </div>
          </div>
        );
      case 'restaurants':
        return (
          <div className="bg-sage-50 min-h-screen">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <RestaurantFinder />
            </div>
          </div>
        );
      default:
        return <Hero onGetStarted={() => setCurrentView('database')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      <main>
        {renderContent()}
      </main>
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2026 FODMAP Zen by Oceanjoy. Not medical advice. Consult a healthcare professional.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;