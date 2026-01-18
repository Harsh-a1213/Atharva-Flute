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
  openPerformanceModal: () => void;
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
    <section
      id="performances"
      className="py-24 md:py-32 bg-white/5 text-white"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-brand-gold mb-4 tracking-wide">
            Performances for Every Occasion
          </h2>
          <p className="text-lg md:text-xl text-brand-light max-w-3xl mx-auto">
            Elevate your event with soulful live music from Atharva Nerikar.
          </p>
        </div>

        {/* Performance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {occasions.map((occasion) => (
            <div
              key={occasion.name}
              className="
                relative
                rounded-2xl
                overflow-hidden
                shadow-xl
                group
                transition
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              <img
                src={occasion.imageUrl}
                alt={occasion.name}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-6">
                <h3 className="text-2xl font-serif font-semibold text-white text-center tracking-wide">
                  {occasion.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={openPerformanceModal}
            className="
              bg-brand-gold
              text-brand-dark
              font-semibold
              py-4 px-12
              rounded-full
              text-lg
              shadow-lg
              hover:shadow-xl
              hover:-translate-y-0.5
              transition
            "
          >
            Book a Performance
          </button>
        </div>
      </div>
    </section>
  );
};

export default Performances;
