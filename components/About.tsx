import React from "react";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Flexible Learning Modes",
    description: "One-on-one or group sessions available, both online and offline.",
    icon: "👥",
  },
  {
    title: "Personalized Training",
    description: "Customized practice plans based on your skill level and goals.",
    icon: "🎯",
  },
  {
    title: "Structured Curriculum",
    description: "Systematically designed course materials for steady progress.",
    icon: "📘",
  },
  {
    title: "Certified Examinations",
    description: "Music exams conducted under Government Music Institutes like ABGMV.",
    icon: "🏅",
  },
  {
    title: "Mentorship & Guidance",
    description: "Continuous mentorship focused on technique, expression, and confidence.",
    icon: "🧑‍🏫",
  },
  {
    title: "Progress Tracking",
    description: "Regular assignments, assessments, and constructive feedback.",
    icon: "📈",
  },
];

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 bg-brand-gray overflow-hidden"
    >
      {/* ambient glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.10),transparent_65%)]" />

      <div className="relative container mx-auto px-6">

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold text-center text-brand-gold mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          How Our Classes Work
        </motion.h2>

        <motion.p
          className="text-center text-gray-400 max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          A carefully crafted learning experience designed to build discipline,
          musical understanding, and confident performers.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                boxShadow: "0 0 40px rgba(212,175,55,0.25)",
              }}
              className="
                group relative bg-brand-dark
                border border-white/10
                rounded-2xl p-10
                text-center shadow-xl
                transition-all duration-300
              "
            >
              {/* Glow halo */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_70%)]" />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 text-5xl mb-5"
              >
                {feature.icon}
              </motion.div>

              {/* Title */}
              <h3 className="relative z-10 text-xl font-semibold text-brand-gold mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-sm text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
