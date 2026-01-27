import img55 from "./assets/img55.jpg";
import flute1 from "./assets/flute1.jpg";

const Flute = () => {
  return (
    <section className="bg-brand-dark text-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <div className="relative py-28 bg-gradient-to-b from-black via-brand-dark to-brand-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)]" />

        <div className="relative container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm tracking-wide rounded-full bg-brand-gold/10 text-brand-gold">
              Signature Course
            </span>

            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-gold mb-6 leading-tight">
              Flute <span className="text-white">(Specialty)</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              The signature course of Atharva Flute Academy, rooted in Hindustani
              classical tradition with a refined balance of discipline,
              tonal clarity, and expressive musicality.
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
              src={img55}
              alt="Atharva Flute Class"
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
              src={flute1}
              alt="Flute Learning"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-gold mb-6">
              About the Course
            </h2>

            <p className="text-gray-300 leading-relaxed text-[15.5px]">
              The flute is the core specialty of Atharva Flute Academy.
              This course is carefully structured around strong fundamentals,
              balanced tone production, and refined expressive phrasing.
              <br /><br />
              Students follow a progressive learning path that blends
              discipline, devotion, and creativity — preparing them not
              only to play, but to perform with confidence and depth.
            </p>
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
              "Breath control for steady airflow and tonal clarity",
              "Correct finger positioning with systematic scale practice",
              "Alankars and paltas to build technical strength",
              "Raag-based classical and light music compositions",
              "Ornamentation techniques such as meend and murki",
              "Performance training for confidence and stage presence",
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
                text: "Sound production, posture, breath control, and foundational exercises to build a strong musical base.",
              },
              {
                title: "Intermediate",
                text: "Raag development, ornamentation, compositions, and expressive phrasing to deepen musical understanding.",
              },
              {
                title: "Advanced",
                text: "Improvisation, concert preparation, advanced raags, and professional performance techniques.",
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

export default Flute;
