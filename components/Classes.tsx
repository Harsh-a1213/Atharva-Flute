import React from "react";
import { InstrumentClass } from "../types";

interface ClassCardProps {
  cls: InstrumentClass;
}

const ClassCard: React.FC<ClassCardProps> = ({ cls }) => (
  <div
    className="
      group
      bg-white/5
      border border-white/10
      rounded-2xl
      overflow-hidden
      shadow-lg
      transition
      hover:-translate-y-1
      hover:shadow-2xl
    "
  >
    {/* Image */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={cls.imageUrl}
        alt={cls.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-xl font-serif font-semibold text-brand-gold mb-2">
        {cls.name}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {cls.description}
      </p>
    </div>
  </div>
);

interface ClassesProps {
  classes: InstrumentClass[];
}

const Classes: React.FC<ClassesProps> = ({ classes }) => {
  return (
    <section
      id="classes"
      className="py-24 md:py-32 bg-white/5 text-white"
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center text-brand-gold mb-4">
          Our Classes
        </h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-14 text-lg">
          Thoughtfully structured instrumental training for beginners and
          advanced learners alike.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {classes.map((cls) => (
            <ClassCard key={cls.id} cls={cls} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classes;
