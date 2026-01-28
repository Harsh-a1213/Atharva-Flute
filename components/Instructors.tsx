import React from "react";
import { Instructor } from "../types";
import { motion } from "framer-motion";

interface InstructorsProps {
  instructors: Instructor[];
}

/* Type-safe pulse animation for musical quote */
const pulseAnimation = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.8, 1, 0.8],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
  },
};

const Instructors: React.FC<InstructorsProps> = ({ instructors }) => {
  if (!instructors || instructors.length === 0) return null;

  const instructor = instructors[0];

  return (
    <section
      id="instructors"
      className="relative py-28 bg-brand-gray text-white overflow-hidden"
    >
      {/* Subtle classical background glow */}
      <div className="absolute inset-0
    bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.04),transparent_70%)]
    sm:bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.07),transparent_65%)]
  "
/>

      <div className="relative container mx-auto px-6 max-w-7xl">
        {/* SECTION TITLE */}
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold text-center text-brand-gold mb-24"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet Your Instructor
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-20">

          {/* ================= IMAGE SPOTLIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative flex-shrink-0"
          >
            {/* Halo glow */}
            <div className="    
              absolute inset-0 rounded-full
              blur-2xl sm:blur-3xl
              bg-brand-gold/15 sm:bg-brand-gold/25 lg:bg-brand-gold/30" />

            <img
              src={instructor.imageUrl}
              alt={instructor.name}
              className="
                relative
                w-80 h-80
                rounded-full object-cover
                border-4 border-brand-gold
                shadow-2xl
              "
            />
          </motion.div>

          {/* ================= CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl space-y-8 text-center lg:text-left"
          >
            {/* NAME & TITLE — SPOTLIGHT */}
            <div>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold">
                Atharva Nerikar
              </h3>

              <p className="mt-3 text-brand-light text-lg font-semibold tracking-wide">
                The Musical Journey of a Modern Bansuri Virtuoso
              </p>

              <div className="mt-4 h-[2px] w-24 bg-brand-gold/60 rounded-full mx-auto lg:mx-0" />
            </div>

            {/* PARAGRAPH 1 — CONTENT UNCHANGED */}
            <p className="text-gray-300 leading-relaxed text-lg">
              Atharva Nerikar is not just a performer—he is a storyteller who speaks
              through the soul-stirring sound of the bansuri (Indian bamboo flute).
              His deep-rooted love for Indian classical music was sparked in childhood
              and nurtured with rigorous training under the guidance of his guru,{" "}
              <span className="inline-flex items-center gap-2">

                <span className="relative font-serif font-semibold text-brand-gold">
                  Pravin Gulve
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-brand-gold/60 rounded-full" />
                </span>
              </span>
              . Over time, Atharva evolved into a contemporary performer who respects
              tradition while exploring innovation.
            </p>

            {/* PARAGRAPH 2 — CONTENT UNCHANGED */}
            <p className="text-gray-300 leading-relaxed text-lg">
              Having graced stages both in India and abroad, Atharva brings an authentic
              yet accessible style to his performances. His music resonates with
              listeners of all ages, blending classical depth with a modern sensibility.
            </p>

            {/* TEACHING PHILOSOPHY — FRAMED */}
            <div className="relative bg-brand-dark border border-white/10 rounded-xl p-8">
              <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_70%)]" />

              <h4 className="relative text-xl font-semibold text-brand-gold mb-4">
                Teaching Philosophy
              </h4>

              <p className="relative text-gray-300 leading-relaxed text-lg">
                Atharva believes that music is for everyone. Whether you're a beginner
                picking up the flute for the first time or an advanced learner striving
                for mastery, his structured yet soulful teaching approach ensures growth
                at every stage. He blends traditional guru-shishya methods with
                contemporary techniques, making learning both enriching and enjoyable.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-brand-gold mb-1">
                Highlights
              </h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1 pl-2 ">
                <li>Performed at prestigious music festivals across India</li>
                <li>International stage appearances and collaborations</li>
                <li>Disciple of renowned flautist Mr. Pravin Gulve</li>
                <li>Years of teaching experience across age groups</li>
                <li>Special focus on improvisation, technique, and musicality</li>
              </ul>
            </div>
            {/* ================= MUSIC QUOTE — ANIMATED ================= */}
            <motion.blockquote
              animate={pulseAnimation.animate}
              transition={pulseAnimation.transition}
              className="relative italic text-brand-light border-l-4 border-brand-gold pl-6 text-lg"
            >
              <span className="absolute -left-3 top-0 text-4xl text-brand-gold opacity-40">
                “
              </span>
              Music is not just sound — it is a living emotion.
              I teach so students don’t just play notes, but discover their voice.
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
