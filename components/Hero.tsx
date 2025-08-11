import React from 'react';
import { motion } from 'framer-motion';
import { heroImage } from './assets';

interface HeroProps {
  openBookingModal: () => void;
  openEnrollModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ openBookingModal, openEnrollModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen lg:min-h-[750px] flex items-center justify-center text-center overflow-hidden"
    >
            {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      {/* Background image */}
      <img
        src={heroImage}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />

      {/* Floating musical notes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-6 h-6 text-yellow-400 opacity-70"
            fill="currentColor"
            viewBox="0 0 24 24"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatUp ${10 + Math.random() * 10}s linear infinite`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
          >
            <path d="M9 17.5C9 18.9 7.9 20 6.5 20S4 18.9 4 17.5 5.1 15 6.5 15c.56 0 1.07.19 1.48.5V5l10-2v10.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.56 0 1.07.19 1.48.5V6.3L10 7.8v8.2c0 1.4-1.1 2.5-2.5 2.5z" />
          </motion.svg>
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-20 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-4 drop-shadow-md">
          Join the Best Online & Offline Instrumental Classes
        </h1>
        <p className="text-base md:text-xl text-brand-light font-light max-w-2xl mx-auto mb-8">
          Learn from a passionate flautist from the culturally rich city of Nashik and start your musical journey today.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
          <button
            onClick={openBookingModal}
            className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-300 transition-transform transform hover:scale-105"
          >
            Book a Free Trial
          </button>
          <button
            onClick={openEnrollModal}
            className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-300 transition-transform transform hover:scale-105"
          >
            Enroll Now
          </button>
        </div>
      </motion.div>

      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 0; }
            25% { opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
