import React from "react";
import { motion } from "framer-motion";

import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import mobileImg from "./assets/mobileHero.jpg";

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
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* ================= DESKTOP COLLAGE ================= */}
      <div className="absolute inset-0 hidden md:grid grid-cols-4 grid-rows-2 gap-0 h-full">
        <img src={img1} className="object-cover w-full h-full grayscale" />
        <img src={img2} className="col-span-2 row-span-2 object-cover w-full h-full" />
        <img src={img3} className="object-cover w-full h-full" />
        <img src={img4} className="object-cover w-full h-full" />
        <img src={img5} className="object-cover w-full h-full" />
      </div>

      {/* ================= MOBILE IMAGE ================= */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={mobileImg}
          alt="Atharva Flute Performance"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* ================= CONTENT ================= */}
      <div className="absolute inset-0 z-20 pt-[80px]">
        <div className="h-full max-w-[1100px] mx-auto px-6 md:px-12">
          <motion.div
            className="
              max-w-[620px]
              mt-[22vh]
              sm:mt-[24vh]
              md:mt-[18vh]
            "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* BADGE */}
            <span className="block text-xs tracking-widest uppercase text-white/80 mb-5">
              LEARN FLUTE
            </span>

            {/* HEADING */}
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6 text-white">
              Experience the Soulful Essence of the{" "}
              <span className="text-brand-gold">Bansuri</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed">
              Learn flute with depth, devotion, and classical tradition through
              online and offline sessions.
            </p>

            {/* BUTTONS + TRUST (CONTROLLED GAP) */}
            <div className="flex flex-col items-center sm:items-start gap-3">
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={openBookingModal}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    boxShadow: "0 0 45px rgba(234,179,8,0.65)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="
                    bg-brand-gold text-brand-dark font-bold
                    py-4 px-10 rounded-full
                    shadow-[0_0_25px_rgba(234,179,8,0.35)]
                  "
                >
                  Book a Free Trial
                </motion.button>

                <motion.button
                  onClick={openEnrollModal}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    backgroundColor: "#EAB308",
                    color: "#111827",
                    boxShadow: "0 0 35px rgba(234,179,8,0.55)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="
                    border-2 border-brand-gold text-brand-gold font-bold
                    py-4 px-10 rounded-full bg-transparent
                  "
                >
                  Enroll Now
                </motion.button>
              </div>

              {/* TRUST LINE */}
              <p className="text-sm text-gray-300 text-center sm:text-left opacity-90">
                🎵 5+ Years Teaching <b>|</b> Online & Offline Classes <b>|</b> Performing Artist
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
