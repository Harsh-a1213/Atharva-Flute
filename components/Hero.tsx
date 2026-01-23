import React from "react";
import { motion } from "framer-motion";
import heroImage from "./assets/Atharva.jpg";

interface HeroProps {
  openBookingModal: () => void;
  openEnrollModal: () => void;
}

const Hero: React.FC<HeroProps> = ({
  openBookingModal,
  openEnrollModal,
}) => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-screen overflow-hidden">
      <img
        src={heroImage}
        alt="Atharva Flute"
        className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
      />

      <div className="absolute inset-0 bg-black/65" />

      <motion.div
        className="relative z-10 px-5 sm:px-10 max-w-xl sm:max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-xs tracking-widest uppercase mb-3">Learn Flute</p>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight mb-4">
          Experience the Soulful Essence of the Bansuri
        </h1>

        <p className="text-sm sm:text-lg text-gray-300 mb-6">
          Learn flute with devotion, depth and classical tradition.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={openBookingModal}
            className="bg-brand-gold text-brand-dark py-3 px-8 rounded-full"
          >
            Book a Free Trial
          </button>

          <button
            onClick={openEnrollModal}
            className="border-2 border-brand-gold text-brand-gold py-3 px-8 rounded-full"
          >
            Enroll Now
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
