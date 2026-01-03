import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-sage-50 py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-sage-900 sm:text-6xl font-serif">
            Find Your <span className="text-sage-600">Zen</span> with Food
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            Navigate the Low FODMAP diet with confidence. Access our comprehensive database, 
            explore East Asian cuisine safely, and find friendly restaurants in NYC.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={onGetStarted}
              className="rounded-full bg-sage-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600 transition-all transform hover:scale-105"
            >
              Check Food Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-30" aria-hidden="true">
         <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-sage-200 to-sage-400 opacity-30" 
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}>
         </div>
      </div>
    </div>
  );
};

export default Hero;