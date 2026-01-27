import guitar1 from "./assets/guitar1.jpg";

const Guitar = () => {
  return (
    <section className="bg-brand-dark text-white overflow-hidden">

      {/* HERO */}
      <div className="relative py-28 bg-gradient-to-b from-black via-brand-dark to-brand-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)]" />

        <div className="relative container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-brand-gold/10 text-brand-gold">
              Contemporary Instrument
            </span>

            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-gold mb-6">
              Guitar
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              A structured guitar course focusing on rhythm, coordination,
              chordal understanding, and expressive melodic playing.
            </p>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-brand-gold text-black font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Enquire on WhatsApp →
            </a>
          </div>

          <div className="relative w-full h-[440px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={guitar1}
              alt="Guitar Class"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <div className="py-24">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-16 items-center">

          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={guitar1}
              alt="Learning Guitar"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-gold mb-6">
              About the Course
            </h2>

            <p className="text-gray-300 leading-relaxed text-[15.5px]">
              The Guitar course at Atharva Flute Academy introduces students
              to foundational playing techniques, rhythm control, and
              expressive musical phrasing.
              <br /><br />
              Students develop coordination, timing, and confidence through
              a structured progression designed for beginners and growing learners.
            </p>

            <ul className="mt-8 space-y-3 text-gray-300 text-sm">
              <li>• Beginner-friendly structured learning</li>
              <li>• Focus on rhythm, chords, and melody</li>
              <li>• Builds coordination and musical timing</li>
              <li>• Suitable for solo and accompaniment playing</li>
            </ul>
          </div>

        </div>
      </div>

      {/* TECHNIQUES */}
      <div className="py-24 bg-black/40">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-serif font-bold text-brand-gold mb-14 text-center">
            Techniques Covered
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Correct hand positioning and finger exercises",
              "Chord formations and smooth transitions",
              "Strumming patterns and rhythm control",
              "Introduction to scales and melodies",
              "Basic fingerstyle techniques",
              "Performance confidence and expression",
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-brand-dark p-7 rounded-2xl border border-white/10 shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-brand-gold text-black flex items-center justify-center font-semibold text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mt-4">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEARNING PATH */}
      <div className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-serif font-bold text-brand-gold mb-14 text-center">
            Learning Path
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Beginner",
                text: "Basic chords, rhythm exercises, posture, and coordination.",
              },
              {
                title: "Intermediate",
                text: "Scale fluency, strumming patterns, melodic phrasing.",
              },
              {
                title: "Advanced",
                text: "Expressive playing, performance readiness, musical confidence.",
              },
            ].map((stage, i) => (
              <div
                key={i}
                className="bg-black/40 p-8 rounded-2xl border border-white/10 hover:border-brand-gold/40 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-brand-gold mb-4">
                  {stage.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {stage.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Guitar;
