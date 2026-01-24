import React from "react";
import { motion } from "framer-motion";

import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";

interface HeroProps {
  openBookingModal: () => void;
  openEnrollModal: () => void;
}

const Hero: React.FC<HeroProps> = ({
  openBookingModal,
  openEnrollModal,
}) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      
      {/* IMAGE COLLAGE — NO GAPS */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0">
        <img
          src={img1}
          className="col-span-1 row-span-1 w-full h-full object-cover grayscale"
          alt=""
        />
        <img
          src={img2}
          className="col-span-2 row-span-2 w-full h-full object-cover"
          alt=""
        />
        <img
          src={img3}
          className="col-span-1 row-span-1 w-full h-full object-cover"
          alt=""
        />
        <img
          src={img4}
          className="col-span-1 row-span-1 w-full h-full object-cover"
          alt=""
        />
        <img
          src={img5}
          className="col-span-1 row-span-1 w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* CONTENT — CENTER LEFT & LOWER */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
          <motion.div
            className="max-w-3xl mt-24 md:mt-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* BADGE */}
            <span className="inline-block text-xs tracking-widest uppercase text-white/80 mb-6">
              LEARN FLUTE
            </span>

            {/* HEADING */}
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 text-white">
              Experience the Soulful Essence of the{" "}
              <span className="text-brand-gold">Bansuri</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg text-gray-200 mb-10 leading-relaxed">
              Learn flute with depth, devotion, and classical tradition through
              online and offline sessions.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 mb-8">
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

            {/* TRUST LINE */}
            <p className="text-sm text-gray-300 flex items-center gap-2">
              🎵 10+ Years Teaching Online & Offline Classes and Live Performer
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
