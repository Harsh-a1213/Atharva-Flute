const Flute = () => {
  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="container mx-auto px-6 max-w-4xl">

        <h1 className="text-4xl font-serif font-bold text-brand-gold mb-6">
          Flute (Specialty)
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          The flute is the specialty of Atharva Flute Academy. This course is
          deeply rooted in Hindustani classical music and focuses on building
          strong foundations, tonal clarity, and expressive musicality.
        </p>

        <h2 className="text-2xl font-semibold text-brand-gold mb-4">
          Techniques Covered
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
          <li>Breath control and tone development</li>
          <li>Finger positioning and scale practice</li>
          <li>Alankars and taans</li>
          <li>Raag-based improvisation</li>
          <li>Meend, murki, and gamak techniques</li>
        </ul>

        <h2 className="text-2xl font-semibold text-brand-gold mb-4">
          Learning Path
        </h2>

        <p className="text-gray-300 mb-10">
          Students progress from basic note production to advanced raag
          improvisation, depending on their level and consistency.
        </p>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg"
          >
            Enroll for Flute Class
          </a>
        </div>

      </div>
    </section>
  );
};

export default Flute;
