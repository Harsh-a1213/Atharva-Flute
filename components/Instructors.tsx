import React from 'react';
import { Instructor } from '../types';
import { motion } from 'framer-motion';

interface InstructorsProps {
  instructors: Instructor[];
}

const Instructors: React.FC<InstructorsProps> = ({ instructors }) => {
  if (!instructors || instructors.length === 0) return null;

  const instructor = instructors[0];

  return (
    <section
      id="instructors"
      className="py-24 md:py-32 bg-white/5 text-white"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-semibold tracking-wide text-center text-brand-gold mb-20"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Meet Your Instructor
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-start gap-14 lg:gap-20 max-w-7xl mx-auto">
          {/* Instructor Image */}
          <motion.div
            className="flex-shrink-0 w-full lg:w-1/3 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <img
              src={instructor.imageUrl}
              alt={instructor.name}
              className="
                w-64 h-64
                rounded-full
                object-cover
                border-4 border-brand-gold/60
                shadow-2xl
              "
            />
          </motion.div>

          {/* Instructor Content */}
          <motion.div
            className="w-full lg:w-2/3 space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-semibold text-brand-gold">
                {instructor.name}
              </h3>
              <p className="mt-1 text-brand-light font-medium text-lg">
                {instructor.instrument}
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg">
              Atharva Nerikar is not just a performer — he is a storyteller who
              speaks through the soul-stirring sound of the bansuri (Indian bamboo
              flute). His deep-rooted love for Indian classical music was sparked
              in childhood and nurtured under the guidance of his guru,
              Mr. Pravin Gulve. Over time, Atharva evolved into a contemporary
              performer who respects tradition while exploring innovation.
            </p>

            <p className="text-gray-300 leading-relaxed text-lg">
              Having graced stages both in India and abroad, Atharva brings an
              authentic yet accessible style to his performances. His music
              resonates with listeners of all ages, blending classical depth with
              a modern sensibility.
            </p>

            {/* Teaching Philosophy */}
            <div>
              <h4 className="text-lg font-semibold text-brand-gold mb-2">
                Teaching Philosophy
              </h4>
              <p className="text-gray-300 leading-relaxed text-lg">
                Atharva believes that music is for everyone. Whether you're a
                beginner picking up the flute for the first time or an advanced
                learner striving for mastery, his structured yet soulful teaching
                approach ensures growth at every stage. He blends the traditional
                guru-shishya method with contemporary techniques, making learning
                both enriching and enjoyable.
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-lg font-semibold text-brand-gold mb-3">
                Highlights
              </h4>
              <ul className="space-y-2 text-gray-300 text-lg">
                {[
                  'Performed at prestigious music festivals across India',
                  'International stage appearances and collaborations',
                  'Disciple of renowned flautist Mr. Pravin Gulve',
                  'Years of teaching experience across age groups',
                  'Special focus on improvisation, technique, and musicality',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 bg-brand-gold rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote */}
            <blockquote className="mt-8 italic text-brand-light text-lg border-l-4 border-brand-gold pl-6">
              “Music is not just sound — it’s a language of emotion. Through
              teaching, I aim to help students find their unique voice and
              develop a lifelong connection with their instrument.”
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
