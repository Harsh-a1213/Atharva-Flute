import React from "react";
import { motion } from "framer-motion";
import heroImage from "./assets/Atharva.jpg";

interface HeroProps {
  openBookingModal: () => void;
  openEnrollModal: () => void;
  openPerformanceModal?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  openBookingModal,
  openEnrollModal,
}) => {
  return (
    <section
      id="hero"
      className="
        relative 
        min-h-[90vh] 
        sm:min-h-screen
        flex items-center 
        overflow-hidden
      "
    >
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Bansuri flute performance by Atharva"
        className="
          absolute inset-0 
          w-full h-full 
          object-cover
          object-[50%_25%] sm:object-center
          z-0
        "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* Content */}
      <motion.div
        className="
          relative z-20 
          px-6 sm:px-10 md:px-16
          max-w-5xl
          text-left
        "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Top Label */}
        <div className="
          text-sm sm:text-base md:text-lg
          tracking-widest uppercase 
          text-brand-light 
          mb-4
        ">
          Learn Flute
        </div>

        {/* Main Heading */}
        <h1
          className="
            text-3xl 
            sm:text-4xl 
            md:text-5xl 
            lg:text-6xl
            font-serif font-bold
            leading-tight
            mb-6
          "
        >
          Experience the Soulful Essence of the Bansuri
        </h1>

        {/* Sub-headline */}
        <p
          className="
            text-sm 
            sm:text-base 
            md:text-lg 
            lg:text-xl
            text-brand-light
            max-w-2xl
            mb-8
          "
        >
          Learn flute with depth, devotion, and classical tradition through
          online and offline sessions.
        </p>

        {/* CTAs */}
        <div className="
          flex flex-col 
          sm:flex-row 
          gap-4 sm:gap-5
          items-start
        ">
          <button
            onClick={openBookingModal}
            className="
              w-full sm:w-auto
              bg-brand-gold text-brand-dark 
              font-bold
              py-3 sm:py-4 
              px-8 sm:px-10 
              rounded-full 
              text-base sm:text-lg
              hover:scale-105 
              transition-transform
            "
          >
            Book a Free Trial
          </button>

          <button
            onClick={openEnrollModal}
            className="
              w-full sm:w-auto
              border-2 border-brand-gold 
              text-brand-gold 
              font-bold
              py-3 sm:py-4 
              px-8 sm:px-10 
              rounded-full 
              text-base sm:text-lg
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
