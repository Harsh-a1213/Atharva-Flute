import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserFriends,
  FaCalendarAlt,
  FaGlobe,
  FaCertificate,
  FaChalkboardTeacher,
  FaBook,
  FaChartLine,
} from 'react-icons/fa';

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  delay?: number;
}> = ({ icon, text, delay = 0 }) => (
  <motion.li
    className="flex items-start gap-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <span className="text-brand-gold text-xl mt-1 flex-shrink-0">
      {icon}
    </span>
    <p className="text-brand-light text-lg leading-relaxed">
      {text}
    </p>
  </motion.li>
);

const About: React.FC = () => {
  const features = [
    {
      icon: <FaUserFriends />,
      text: 'One-on-One or Group sessions available.',
    },
    {
      icon: <FaCalendarAlt />,
      text: 'Personalized practice sessions and flexible scheduling.',
    },
    {
      icon: <FaGlobe />,
      text: 'Online as well as offline classes are available.',
    },
    {
      icon: <FaCertificate />,
      text: 'Music exams conducted under Government Institutes like ABGMV.',
    },
    {
      icon: <FaChalkboardTeacher />,
      text: 'Mentorship tailored to your unique skill level and goals.',
    },
    {
      icon: <FaBook />,
      text: 'Systematically designed course materials provided.',
    },
    {
      icon: <FaChartLine />,
      text: 'Progress monitored through regular assignments and feedback.',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-brand-gray overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-serif font-bold text-center text-brand-gold mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How Our Classes Work
        </motion.h2>

        <ul className="space-y-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              text={feature.text}
              delay={index * 0.08}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
