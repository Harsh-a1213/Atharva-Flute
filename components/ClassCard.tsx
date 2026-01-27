import React from "react";
import { InstrumentClass } from "../types";
import { Link } from "react-router-dom";

interface ClassCardProps {
  cls: InstrumentClass;
}

const ClassCard: React.FC<ClassCardProps> = ({ cls }) => (
  <Link to={cls.link} className="group block snap-center animate-fadeUp">
    <div className="h-full bg-brand-gray rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-brand-gold/30 hover:-translate-y-2">

      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={cls.imageUrl}
          alt={cls.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* CATEGORY BADGE */}
        <div className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-black/60 text-brand-gold backdrop-blur">
          {cls.category}
        </div>

        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center items-center text-center p-6 h-[170px]">
        <h3 className="text-2xl font-serif font-bold text-brand-gold">
          {cls.name}
        </h3>

        <div className="mx-auto mt-3 h-[2px] w-12 bg-brand-gold/50 rounded-full" />

        <p className="mt-4 text-sm text-gray-400">
          Explore syllabus & techniques
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
    <section id="classes" className="py-24 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">

        <h2 className="text-4xl font-serif font-bold text-center text-brand-gold mb-14">
          Our Classes
          <span className="block w-20 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </h2>

        <div
          className="
            flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory
            sm:grid sm:grid-cols-2
            lg:grid-cols-4 sm:gap-10 sm:overflow-visible
          "
        >
          {classes.map((cls) => (
            <div key={cls.id} className="min-w-[85%] sm:min-w-0">
              <ClassCard cls={cls} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Classes;
