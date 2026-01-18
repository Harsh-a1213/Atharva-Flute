import React from 'react';
import { motion } from 'framer-motion';
import { heroImage } from './assets';

interface HeroProps {
  openBookingModal: () => void;
  openEnrollModal: () => void;
  openPerformanceModal: () => void;
}

const Hero: React.FC<HeroProps> = ({
  openBookingModal,
  openEnrollModal,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen lg:min-h-[750px] flex items-center justify-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      <img
        src={heroImage}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />

      <motion.div
        className="relative z-20 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
          Join the Best Online & Offline Instrumental Classes
        </h1>

        <p className="text-base md:text-xl text-brand-light max-w-2xl mx-auto mb-8">
          Learn from a passionate flautist from Nashik and start your musical journey.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={openBookingModal}
            className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full text-lg"
          >
            Book a Free Trial
          </button>

          <button
            onClick={openEnrollModal}
            className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full text-lg"
          >
            Enroll Now
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
