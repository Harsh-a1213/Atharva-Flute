import React from 'react';
import {
  performanceImage1,
  performanceImage2,
  performanceImage3,
  performanceImage4,
  performanceImage5,
  performanceImage6,
} from './assets';

interface PerformancesProps {
  openPerformanceModal: () => void;  // <-- NEW
}

const occasions = [
  { name: 'Weddings', imageUrl: performanceImage1 },
  { name: 'Bhajans & Spiritual Gatherings', imageUrl: performanceImage2 },
  { name: 'Birthday Parties', imageUrl: performanceImage3 },
  { name: 'Corporate Events', imageUrl: performanceImage4 },
  { name: 'Personal Gigs', imageUrl: performanceImage5 },
  { name: 'Private Shows', imageUrl: performanceImage6 },
];

const Performances: React.FC<PerformancesProps> = ({ openPerformanceModal }) => {
  return (
    <section id="performances" className="py-20 bg-brand-dark text-white">
      <div className="container mx-auto px-6">
        
        <div className="text-center">
          <h2 className="text-4xl font-serif font-bold text-brand-gold mb-6">
            Performances for Every Occasion
          </h2>
          <p className="text-lg text-brand-light max-w-3xl mx-auto mb-12">
            Elevate your event with soulful live music from Atharva Nerikar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((occasion) => (
            <div key={occasion.name} className="relative rounded-lg overflow-hidden shadow-2xl group">
              <img
                src={occasion.imageUrl}
                alt={occasion.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-serif font-bold text-white text-center">
                  {occasion.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={openPerformanceModal}   // <-- FIXED
            className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-300 hover:scale-105 transition"
          >
            Book a Performance
          </button>
        </div>
      </div>
    </section>
  );
};

export default Performances;
