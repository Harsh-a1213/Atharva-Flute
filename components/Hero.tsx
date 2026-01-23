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
    <section
      id="hero"
      className="
        relative
        min-h-[80vh]        /* ⬅ reduced from 90vh */
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
          object-[50%_22%]
          sm:object-center
          z-0
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* Content */}
      <motion.div
        className="
          relative z-20
          px-6 sm:px-10
          max-w-xl sm:max-w-5xl
          text-left sm:text-left
          mx-auto                /* ⬅ centers block on mobile */
        "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Label */}
        <div className="
          text-xs sm:text-base
          tracking-widest uppercase
          text-brand-light
          mb-3
        ">
          Learn Flute
        </div>

        {/* Heading */}
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-serif font-bold
            leading-snug           /* ⬅ tighter line height */
            mb-4
          "
        >
          Experience the Soulful Essence of the Bansuri
        </h1>

        {/* Subtext */}
        <p
          className="
            text-sm
            sm:text-base
            md:text-lg
            text-brand-light
            max-w-md
            mb-6                 /* ⬅ reduced spacing */
          "
        >
          Learn flute with depth, devotion, and classical tradition through
          online and offline sessions.
        </p>

        {/* Buttons */}
        <div className="
          flex flex-col
          sm:flex-row
          gap-3 sm:gap-5
        ">
          <button
            onClick={openBookingModal}
            className="
              w-full sm:w-auto
              bg-brand-gold text-brand-dark
              font-semibold
              py-3
              px-8
              rounded-full
              text-sm sm:text-base
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
              font-semibold
              py-3
              px-8
              rounded-full
              text-sm sm:text-base
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
