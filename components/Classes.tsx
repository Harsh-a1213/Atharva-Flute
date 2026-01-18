import React from 'react';
import { InstrumentClass } from '../types';

interface ClassCardProps {
  cls: InstrumentClass;
}

const ClassCard: React.FC<ClassCardProps> = ({ cls }) => (
  <div className="bg-brand-gray rounded-lg overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-brand-gold/20 group">
    <img
      src={cls.imageUrl}
      alt={cls.name}
      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="p-6">
      <h3 className="text-2xl font-serif font-bold text-brand-gold mb-2">
        {cls.name}
      </h3>
      <p className="text-brand-light text-sm leading-relaxed min-h-[4rem]">
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
    <section id="classes" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-center text-brand-gold mb-12">
          Our Classes
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
