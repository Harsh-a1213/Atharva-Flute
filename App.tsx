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
    <section className="w-full overflow-hidden">

      {/* IMAGE BLOCK */}
      <div className="relative w-full h-[60vh] sm:h-screen overflow-hidden">
        <img
          src={heroImage}
          alt="Bansuri flute performance by Atharva"
          className="
            w-full h-full
            object-contain sm:object-cover
            bg-black
          "
        />

        {/* Overlay only on desktop */}
        <div className="hidden sm:block absolute inset-0 bg-black/60" />

        {/* TEXT OVER IMAGE (DESKTOP ONLY) */}
        <motion.div
          className="
            hidden sm:block
            absolute inset-0
            flex items-center
            px-16
            z-10
            text-white
            max-w-5xl
          "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="tracking-widest uppercase text-brand-light mb-4">
              Learn Flute
            </p>

            <h1 className="text-6xl font-serif font-bold mb-6">
              Experience the Soulful Essence of the Bansuri
            </h1>

            <p className="text-xl max-w-2xl mb-8">
              Learn flute with depth, devotion, and classical tradition through
              online and offline sessions.
            </p>

            <div className="flex gap-5">
              <button
                onClick={openBookingModal}
                className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full"
              >
                Book a Free Trial
              </button>

              <button
                onClick={openEnrollModal}
                className="border-2 border-brand-gold text-brand-gold font-bold py-4 px-10 rounded-full"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* TEXT BELOW IMAGE (MOBILE ONLY) */}
      <div className="sm:hidden px-6 py-8 bg-brand-dark text-white">
        <p className="tracking-widest uppercase text-brand-light mb-2">
          Learn Flute
        </p>

        <h1 className="text-3xl font-serif font-bold mb-4">
          Experience the Soulful Essence of the Bansuri
        </h1>

        <p className="text-sm mb-6">
          Learn flute with depth, devotion, and classical tradition through
          online and offline sessions.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={openBookingModal}
            className="bg-brand-gold text-brand-dark font-semibold py-3 rounded-full"
          >
            Book a Free Trial
          </button>

          <button
            onClick={openEnrollModal}
            className="border-2 border-brand-gold text-brand-gold font-semibold py-3 rounded-full"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
