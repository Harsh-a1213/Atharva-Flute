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
    <section className="w-full overflow-x-hidden">

      {/* ================= IMAGE BLOCK ================= */}
      <div className="relative w-full h-[50vh] sm:h-screen overflow-hidden">

        {/* Background Image */}
        <img
          src={heroImage}
          alt="Atharva Nerikar performing Bansuri"
          className="
            w-full h-full
            object-contain sm:object-cover
            bg-black
          "
        />

        {/* Desktop Gradient Overlay */}
        <div
          className="
            hidden sm:block
            absolute inset-0
            bg-gradient-to-r
            from-black/80
            via-black/50
            to-transparent
            z-10
          "
        />

        {/* Desktop Text (LEFT-ANCHORED) */}
        <motion.div
          className="
            hidden sm:flex
            absolute inset-0
            items-center
            justify-start
            px-16
            z-20
            text-white
          "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-xl">
            <p className="tracking-widest uppercase text-brand-light mb-4">
              Learn Flute
            </p>

            <h1 className="text-6xl font-serif font-bold leading-tight mb-6">
              Experience the Soulful Essence of the Bansuri
            </h1>

            <p className="text-xl mb-8">
              Learn flute with depth, devotion, and classical tradition through
              online and offline sessions.
            </p>

            <div className="flex gap-5">
              <button
                onClick={openBookingModal}
                className="
                  bg-brand-gold text-brand-dark
                  font-bold py-4 px-10 rounded-full
                  hover:scale-105 transition-transform
                "
              >
                Book a Free Trial
              </button>

              <button
                onClick={openEnrollModal}
                className="
                  border-2 border-brand-gold
                  text-brand-gold font-bold
                  py-4 px-10 rounded-full
                  hover:bg-brand-gold hover:text-brand-dark
                  transition-colors
                "
              >
                Enroll Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile bottom fade */}
        <div className="sm:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-brand-dark" />
      </div>

      {/* ================= MOBILE TEXT ================= */}
      <motion.div
        className="
          sm:hidden
          px-6 pt-4 pb-10
          -mt-6
          bg-brand-dark
          text-white
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="tracking-widest uppercase text-brand-light mb-2">
          Learn Flute
        </p>

        <h1 className="text-3xl font-serif font-bold leading-snug mb-4">
          Experience the Soulful Essence of the Bansuri
        </h1>

        <p className="text-sm mb-6">
          Learn flute with depth, devotion, and classical tradition through
          online and offline sessions.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={openBookingModal}
            className="
              bg-brand-gold text-brand-dark
              font-semibold py-3 rounded-full
            "
          >
            Book a Free Trial
          </button>

          <button
            onClick={openEnrollModal}
            className="
              border-2 border-brand-gold
              text-brand-gold font-semibold
              py-3 rounded-full
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
