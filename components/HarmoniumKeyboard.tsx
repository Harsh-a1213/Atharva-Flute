import harmonium1 from "./assets/harmonium1.jpg";
import keyboard1 from "./assets/keyboard1.jpg";

const HarmoniumKeyboard = () => {
  return (
    <section className="bg-brand-dark text-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <div className="relative py-28 bg-gradient-to-b from-black via-brand-dark to-brand-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)]" />

        <div className="relative container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm tracking-wide rounded-full bg-brand-gold/10 text-brand-gold">
              Foundation Course
            </span>

            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-gold mb-6 leading-tight">
              Harmonium <span className="text-white">/ Keyboard</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              A foundational course designed to develop melody, pitch accuracy,
              and accompaniment skills essential to Indian music traditions.
            </p>

            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-brand-gold text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Enquire on WhatsApp
              <span className="text-lg">→</span>
            </a>
          </div>

          {/* IMAGE */}
          <div className="relative w-full h-[440px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={harmonium1}
              alt="Harmonium and Keyboard Class"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <div className="py-24">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={keyboard1}
              alt="Keyboard Learning"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-gold mb-6">
              About the Course
            </h2>

            <p className="text-gray-300 leading-relaxed text-[15.5px]">
              The Harmonium / Keyboard course at Atharva Flute Academy introduces
              students to the essentials of melodic playing, pitch accuracy,
              and accompaniment techniques vital to Indian classical and light music.
              <br /><br />
              This course is especially beneficial for beginners and vocalists,
              helping them develop sensitivity to sur, shruti, and expressive support
              for singing or solo practice.
            </p>

            <ul className="mt-8 space-y-3 text-gray-300 text-sm">
              <li>• Ideal for beginners and vocal music students</li>
              <li>• Strong focus on sur, shruti, and pitch stability</li>
              <li>• Structured, step-by-step learning approach</li>
              <li>• Emphasis on accompaniment and musical awareness</li>
            </ul>
          </div>

        </div>
      </div>

      {/* ================= TECHNIQUES ================= */}
      <div className="py-24 bg-black/40">
        <div className="container mx-auto px-6 max-w-6xl">

          <h2 className="text-3xl font-serif font-bold text-brand-gold mb-14 text-center">
            Techniques Covered
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              "Correct fingering techniques and hand posture",
              "Systematic scale practice for coordination and speed",
              "Understanding sur and shruti for pitch accuracy",
              "Introduction to chords and basic harmony",
              "Accompaniment techniques for vocal music",
              "Introductory raag-based playing and simple compositions",
            ].map((technique, index) => (
              <div
                key={index}
                className="relative bg-brand-dark p-7 rounded-2xl border border-white/10 shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-brand-gold text-black flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mt-4">
                  {technique}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ================= LEARNING PATH ================= */}
      <div className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">

          <h2 className="text-3xl font-serif font-bold text-brand-gold mb-14 text-center">
            Learning Path
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {[
              {
                title: "Beginner",
                text: "Note recognition, hand coordination, posture, and basic exercises to build confidence.",
              },
              {
                title: "Intermediate",
                text: "Scale fluency, accompaniment patterns, chords, and improved pitch awareness.",
              },
              {
                title: "Advanced",
                text: "Raag-based playing, expressive accompaniment, and musical support for performance.",
              },
            ].map((stage, index) => (
              <div
                key={index}
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

export default HarmoniumKeyboard;
