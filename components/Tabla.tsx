const Tabla = () => {
  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="container mx-auto px-6 max-w-4xl">

        <h1 className="text-4xl font-serif font-bold text-brand-gold mb-6">
          Tabla / Drum
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          This course introduces rhythm and percussion through tabla and basic
          drumming techniques rooted in Indian classical music.
        </p>

        <h2 className="text-2xl font-semibold text-brand-gold mb-4">
          Techniques Covered
        </h2>

        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-8">
          <li>Basic bols and hand techniques</li>
          <li>Understanding taal and laya</li>
          <li>Practice of common taals</li>
          <li>Accompaniment techniques</li>
          <li>Improvisation basics</li>
        </ul>

        <p className="text-gray-300 mb-10">
          Ideal for students interested in rhythm and percussion fundamentals.
        </p>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg"
          >
            Enroll for Tabla Class
          </a>
        </div>

      </div>
    </section>
  );
};

export default Tabla;
