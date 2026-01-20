import React from "react";
import { InstrumentClass } from "../types";
import { Link } from "react-router-dom";

interface ClassCardProps {
  cls: InstrumentClass;
}

const ClassCard: React.FC<ClassCardProps> = ({ cls }) => (
  <Link to={cls.link}>
    <div className="bg-brand-gray rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-brand-gold/20 group cursor-pointer">
      
      <img
        src={cls.imageUrl}
        alt={cls.name}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />

      <div className="p-6 text-center">
        <h3 className="text-2xl font-serif font-bold text-brand-gold">
          {cls.name}
        </h3>

        {/* Subtle divider */}
        <div className="mx-auto mt-3 h-[2px] w-12 bg-brand-gold/50 rounded-full"></div>

        {/* Hint text */}
        <p className="mt-4 text-sm text-gray-400">
          Click to explore syllabus & techniques
        </p>
      </div>
    </div>
  </Link>
);

interface ClassesProps {
  classes: InstrumentClass[];
}

const Classes: React.FC<ClassesProps> = ({ classes }) => {
  return (
    <section id="classes" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">

        <h2 className="text-4xl font-serif font-bold text-center text-brand-gold mb-12">
          Our Classes
          <span className="block w-20 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></span>
        </h2>

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
