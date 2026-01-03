import React from 'react';

const Education: React.FC = () => {
  return (
    <div id="education" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-sage-600">The Basics</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-sage-900 sm:text-4xl font-serif">
            What is FODMAP?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            FODMAP stands for Fermentable Oligosaccharides, Disaccharides, Monosaccharides, and Polyols. 
            These are short-chain carbohydrates (sugars) that the small intestine absorbs poorly.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-600 text-white font-serif">1</span>
                The Trigger
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  When these carbs are not absorbed, they travel to the large intestine where bacteria ferment them, 
                  producing gas and drawing in water. This causes bloating, pain, and digestive distress common in IBS.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-600 text-white font-serif">2</span>
                The Diet Phases
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  1. <strong>Elimination:</strong> Stop eating high FODMAP foods (2-6 weeks).<br/>
                  2. <strong>Reintroduction:</strong> Slowly test specific foods to find triggers.<br/>
                  3. <strong>Personalization:</strong> Eat as freely as possible while avoiding only your triggers.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-600 text-white font-serif">3</span>
                Common Culprits
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  <strong>Fructans:</strong> Garlic, Onion, Wheat.<br/>
                  <strong>Lactose:</strong> Cow's milk, soft cheeses.<br/>
                  <strong>Fructose:</strong> Honey, Apples, HFCS.<br/>
                  <strong>Polyols:</strong> Stone fruits, Sorbitol.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Education;
