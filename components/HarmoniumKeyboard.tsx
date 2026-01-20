const HarmoniumKeyboard = () => {
  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="container mx-auto px-6 max-w-4xl">

        <h1 className="text-4xl font-serif font-bold text-brand-gold mb-6">
          Harmonium / Keyboard
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          This class introduces students to harmonium or keyboard with a strong
          focus on melody, pitch accuracy, and accompaniment techniques used in
          Indian music.
        </p>

        <h2 className="text-2xl font-semibold text-brand-gold mb-4">
          Techniques Covered
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
          <li>Basic fingering and hand posture</li>
          <li>Scale and chord practice</li>
          <li>Understanding sur and shruti</li>
          <li>Accompaniment for vocal music</li>
          <li>Intro to raag-based playing</li>
        </ul>

        <p className="text-gray-300 mb-10">
          Ideal for beginners and singers who want to support their practice
          with an instrument.
        </p>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg"
          >
            Enroll for Harmonium / Keyboard
          </a>
        </div>

      </div>
    </section>
  );
};

export default HarmoniumKeyboard;
