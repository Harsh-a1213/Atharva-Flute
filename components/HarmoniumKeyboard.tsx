const HarmoniumKeyboard = () => {
  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="container mx-auto px-6 max-w-4xl">

        <h1 className="text-4xl font-serif font-bold text-brand-gold mb-6">
          Harmonium / Keyboard
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
        The harmonium course at Atharva Flute Academy introduces students to the fundamentals of harmonium playing with a strong emphasis on melody, pitch accuracy, and accompaniment techniques essential to Indian music. 
        The course is designed to build a solid musical base while developing sensitivity to sur, shruti, and expressive playing.
        It is especially beneficial for beginners and vocalists seeking instrumental support for their practice.
        </p>

        <h2 className="text-2xl font-semibold text-brand-gold mb-4">
          Techniques Covered
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
          <li>Basic fingering techniques and correct hand posture.</li>
          <li>Systematic scale practice to improve finger coordination and speed.</li>
          <li>Understanding sur and shruti for accurate pitch control.</li>
          <li>Introduction to chords and basic harmony.</li>
          <li>Accompaniment techniques for vocal music.</li>
          <li>Introductory raag-based playing and simple compositions.</li>
        </ul>

        <p className="text-gray-300 mb-10">
        The learning path is structured and beginner-friendly. 
        Students start with basic note recognition and hand coordination, gradually progressing to scales, accompaniment patterns, and raag-based playing. 
        Emphasis is placed on developing confidence, musical awareness, and the ability to support vocal or solo practice effectively.
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
