import React from 'react';
import { motion } from 'framer-motion';

const FeatureItem: React.FC<{ icon: string; text: string; delay?: number }> = ({
  icon,
  text,
  delay = 0,
}) => (
  <motion.li
    className="flex items-start space-x-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <div className="flex-shrink-0">
      <svg
        className="w-6 h-6 text-brand-gold"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={icon}
        ></path>
      </svg>
    </div>
    <p className="text-brand-light">{text}</p>
  </motion.li>
);

const About: React.FC = () => {
  const features = [
    {
      icon:
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      text: 'One-on-One or Group sessions available.',
    },
    {
      icon:
        'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      text: 'Personalized practice sessions and flexible scheduling.',
    },
    {
      icon:
        'M12 14l9-5-9-5-9 5 9 5zm0 7v-6.18l7-3.89V10l-7 4-7-4v1.93l7 3.89V21z',
      text: 'Online as well as offline Classes are available',
    },
    {
      icon:
        'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      text:
        'We conduct music exams under Government Music Institutes like ABGMV.',
    },
    {
      icon: 'M12 6.253v11.494m-9-5.747h18',
      text: 'Mentorship tailored to your unique skill level and goals.',
    },
    {
      icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
      text:
        'Systematically designed course materials will be provided.',
    },
    {
      icon: 'M15 10l-3-3m0 0l-3 3m3-3v12',
      text:
        'Progress monitored through regular assignments and constructive feedback.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-brand-gray">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-serif font-bold text-center text-brand-gold mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How Our Classes Work
        </motion.h2>

        <motion.ul
          className="space-y-6 text-lg max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              text={feature.text}
              delay={index * 0.1}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default About;
