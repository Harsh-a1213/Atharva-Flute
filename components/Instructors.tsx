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
    <section id="instructors" className="py-20 bg-brand-gray text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-5xl font-serif font-bold text-center text-brand-gold mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Meet Your Instructor
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-start lg:items-start gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* Instructor Image */}
          <motion.div
            className="flex-shrink-0 w-full lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img
              src={instructor.imageUrl}
              alt={instructor.name}
              className="w-64 h-64 rounded-full object-cover border-4 border-brand-dark shadow-xl mx-auto lg:mx-0"
            />
          </motion.div>

          {/* Instructor Content */}
          <motion.div
            className="text-left w-full lg:w-2/3 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-gold">
              {instructor.name}
            </h3>

            <p className="text-brand-light font-semibold text-lg">
              {instructor.instrument}
            </p>

            <p className="text-gray-300 leading-relaxed">
              Atharva Nerikar is not just a performer—he is a storyteller who speaks
              through the soul-stirring sound of the bansuri (Indian bamboo flute).
              His deep-rooted love for Indian classical music was sparked in childhood
              and nurtured with rigorous training under the guidance of his guru,
              Mr. Pravin Gulve. Over time, Atharva evolved into a contemporary performer
              who respects tradition while exploring innovation.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Having graced stages both in India and abroad, Atharva brings an authentic
              yet accessible style to his performances. His music resonates with
              listeners of all ages, blending classical depth with a modern sensibility.
            </p>

            <div>
              <h4 className="text-lg font-semibold text-brand-gold mb-1">
                Teaching Philosophy
              </h4>
              <p className="text-gray-300 leading-relaxed">
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
              <ul className="list-disc list-inside text-gray-300 space-y-1 pl-2">
                <li>Performed at prestigious music festivals across India</li>
                <li>International stage appearances and collaborations</li>
                <li>Disciple of renowned flautist Mr. Pravin Gulve</li>
                <li>Years of teaching experience across age groups</li>
                <li>Special focus on improvisation, technique, and musicality</li>
              </ul>
            </div>

            <blockquote className="italic text-brand-light border-l-4 border-brand-gold pl-4">
              “Music is not just sound—it's a language of emotion. Through teaching,
              I aim to help students find their unique voice and develop a lifelong
              connection with their instrument.”
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;
