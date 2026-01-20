import React from 'react';
import { motion } from 'framer-motion';
import heroImage from './assets/Atharva.jpg';

interface HeroProps {
  openBookingModal: () => void;
  openEnrollModal: () => void;
  openPerformanceModal?: () => void; // kept ONLY to satisfy App.tsx
}

const Hero: React.FC<HeroProps> = ({
  openBookingModal,
  openEnrollModal,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] lg:min-h-[750px] flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Bansuri flute performance by Atharva"
        className="
          absolute inset-0 w-full h-full object-cover
          object-[50%_30%] md:object-[50%_20%]
          z-0
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 px-6 md:px-16 max-w-5xl text-left"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Top Label */}
        <div className="text-lg md:text-xl tracking-widest uppercase text-brand-light mb-4">
          Learn Flute
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight mb-6 whitespace-nowrap">
          Experience the Soulful Essence of the Bansuri{' '}
          
        </h1>

        {/* Sub-headline */}
        <p className="text-base md:text-xl text-brand-light max-w-2xl mb-10">
          Learn flute with depth, devotion, and classical tradition through
          online and offline sessions.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <button
            onClick={openBookingModal}
            className="
              bg-brand-gold text-brand-dark font-bold
              py-4 px-10 rounded-full text-lg
              hover:scale-105 transition-transform
            "
          >
            Book a Free Trial
          </button>

          <button
            onClick={openEnrollModal}
            className="
              border-2 border-brand-gold text-brand-gold font-bold
              py-4 px-10 rounded-full text-lg
              hover:bg-brand-gold hover:text-brand-dark
              transition-colors
            "
          >
            Enroll Now
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
