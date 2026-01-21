import React, { useEffect, useRef, useState } from "react";

type Testimonial = {
  text: string;
  name: string;
  location: string;
  level: string;
};

const testimonials: Testimonial[] = [
  {
    text:
      "I was born outside India, but my roots were always strong at home through music. Learning the flute with Atharva sir has been a beautiful way to connect to my heritage. It’s more than music — it’s identity.",
    name: "Shanaya R",
    location: "California, USA",
    level: "Beginner",
  },
  {
    text:
      "Learning flute under Atharva sir has been an amazing experience. His teaching is patient, clear, and very encouraging. I’ve gained confidence and improved my skills greatly in a short time.",
    name: "Urvi Patil",
    location: "Maharashtra, India",
    level: "Beginner",
  },
  {
    text:
      "As someone who loves performing, learning flute added a new rhythm to my life. Atharva sir makes complex notes feel easy and fun. Music has become my new love.",
    name: "Arpit More",
    location: "Maharashtra, India",
    level: "Advanced",
  },
  {
    text:
      "These classes go beyond technique — they’re a journey into the soul of Hindustani classical music. Every session deepens my skills and appreciation for our art.",
    name: "Adesh Lodha",
    location: "India",
    level: "Intermediate",
  },
];

const AUTO_DELAY = 5000;

const TestimonialsSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  // Auto play
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTO_DELAY);
    return () => clearInterval(t);
  }, [paused]);

  // Swipe handling (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!startX.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    startX.current = null;
  };

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-3xl text-center">

        {/* TITLE */}
        <h2 className="text-4xl font-serif font-bold text-brand-gold mb-14">
          What Our Students Say
          <span className="block w-20 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></span>
        </h2>

        {/* SLIDER */}
        <div
          className="relative min-h-[300px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-in-out
                ${
                  i === index
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : "opacity-0 translate-x-16 md:translate-x-24 translate-y-6 pointer-events-none"
                }`}
            >
              <div className="bg-brand-gray rounded-3xl p-10 shadow-2xl">
                <div className="text-5xl text-brand-gold mb-4">“</div>

                <p className="text-gray-200 text-lg leading-relaxed mb-8">
                  {t.text}
                </p>

                <div className="text-brand-gold font-semibold text-lg">
                  {t.name}
                </div>
                <div className="text-gray-400 text-sm">
                  {t.location} · {t.level}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-6 mt-10">

          {/* PREV */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-brand-gray hover:bg-yellow-500 text-white hover:text-gray-900 transition"
          >
            ‹
          </button>

          {/* DOTS */}
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all
                  ${
                    i === index
                      ? "bg-yellow-400 scale-125"
                      : "bg-gray-600 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>

          {/* NEXT */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-brand-gray hover:bg-yellow-500 text-white hover:text-gray-900 transition"
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSlider;
