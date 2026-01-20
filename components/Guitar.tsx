const Guitar = () => {
  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="container mx-auto px-6 max-w-4xl">

        <h1 className="text-4xl font-serif font-bold text-brand-gold mb-6">
          Guitar
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          Our guitar classes focus on building strong fundamentals, rhythm,
          coordination, and confidence through structured lessons.
        </p>

        <h2 className="text-2xl font-semibold text-brand-gold mb-4">
          Techniques Covered
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
          <li>Basic chords and strumming patterns</li>
          <li>Finger exercises and scales</li>
          <li>Rhythm and timing</li>
          <li>Song accompaniment</li>
          <li>Introduction to lead guitar</li>
        </ul>

        <p className="text-gray-300 mb-10">
          Suitable for beginners and hobbyists looking to explore guitar music.
        </p>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg"
          >
            Enroll for Guitar Class
          </a>
        </div>

      </div>
    </section>
  );
};

export default Guitar;
