import React from "react";
import { motion } from "framer-motion";

import heroDesktop from "./assets/Atharva.jpg";
import heroMobile from "./assets/Mobile.jpg";

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
        relative w-full
        min-h-[70vh] md:min-h-screen
        overflow-hidden bg-black
      "
    >
      {/* RESPONSIVE BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <picture>
          {/* Mobile image */}
          <source srcSet={heroMobile} media="(max-width: 768px)" />

          {/* Desktop image */}
          <img
            src={heroDesktop}
            alt="Atharva Flute Performance"
            className="
              w-full h-full
              object-cover
              object-top
            "
          />
        </picture>
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          className="pt-28 md:pt-36"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* BADGE */}
          <span className="inline-block text-xs tracking-widest uppercase text-white/80 mb-6">
            LEARN FLUTE
          </span>

          {/* HEADING */}
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-5xl mb-6">
            Experience the Soulful Essence of the Bansuri
          </h1>

          {/* DESCRIPTION */}
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mb-10 leading-relaxed">
            Learn flute with depth, devotion, and classical tradition through
            online and offline sessions.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <button
              onClick={openBookingModal}
              className="
                bg-brand-gold text-brand-dark font-bold
                py-4 px-10 rounded-full text-lg
                shadow-[0_0_30px_rgba(234,179,8,0.35)]
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

          {/* TRUST SECTION */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-300">
            <span>🎵 10+ Years Teaching</span>
            <span>•</span>
            <span>Online & Offline Classes</span>
            <span>•</span>
            <span>Certified Exams</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
