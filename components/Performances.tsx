import React from "react";
import {
  performanceImage1,
  performanceImage2,
  performanceImage3,
  performanceImage4,
  performanceImage5,
  performanceImage6,
} from "./assets";
import { motion } from "framer-motion";

interface PerformancesProps {
  openPerformanceModal: () => void;
}

const occasions = [
  { name: "Weddings", imageUrl: performanceImage1 },
  { name: "Bhajans & Spiritual Gatherings", imageUrl: performanceImage2 },
  { name: "Birthday Parties", imageUrl: performanceImage3 },
  { name: "Corporate Events", imageUrl: performanceImage4 },
  { name: "Personal Gigs", imageUrl: performanceImage5 },
  { name: "Private Shows", imageUrl: performanceImage6 },
];

const Performances: React.FC<PerformancesProps> = ({
  openPerformanceModal,
}) => {
  return (
    <section
      id="performances"
      className="relative py-28 bg-brand-dark text-white overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_65%)]" />

      <div className="relative container mx-auto px-6">
        {/* SECTION INTRO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold mb-6">
            Performances for Every Occasion
          </h2>

          <p className="text-lg text-brand-light max-w-3xl mx-auto leading-relaxed">
            Elevate your special moments with soulful live performances by{" "}
            <span className="text-brand-gold font-semibold">
              Atharva Nerikar
            </span>
            — blending classical depth with contemporary elegance.
          </p>
        </motion.div>

        {/* OCCASION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={occasion.imageUrl}
                alt={occasion.name}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]" />

              {/* Text */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <h3 className="text-2xl font-serif font-bold text-white">
                  {occasion.name}
                </h3>

                <div className="mt-3 h-[2px] w-16 bg-brand-gold mx-auto rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button
            onClick={openPerformanceModal}
            className="
              bg-brand-gold text-brand-dark
              font-bold py-4 px-12 rounded-full
              text-lg shadow-xl
              hover:bg-yellow-300 hover:scale-105
              transition-transform
            "
          >
            Book a Performance
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Performances;
