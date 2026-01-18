const testimonials = [
  {
    name: "Shouria Bhalekar",
    location: "Texas, USA",
    level: "Beginner",
    text: "I was born outside India, but my roots were always strong at home through music. Learning the flute with Atharva sir has been a beautiful way to connect to my heritage. I’ve grown up listening to Indian melodies, and now being able to play them myself makes me feel both proud and emotionally connected. It’s more than music — it’s identity.",
  },
  {
    name: "Arpit More",
    location: "Maharashtra, India",
    level: "Beginner",
    text: "As someone who loves the stage and performing, learning flute added a new rhythm to my life. Atharva sir teaches with such energy and clarity that I actually look forward to every class. He makes complex notes feel easy and fun. Now, when I play a tune on my own, it’s pure joy! Music has become my new love.",
  },
  {
    name: "Adesh Lodha",
    location: "Bangalore, India",
    level: "Beginner",
    text: "These classes go beyond just technique — they’re a journey into the soul of Hindustani classical music. Atharva sir and the team bring such depth and authenticity to each lesson. I also received a flute that feels like a piece of art. Every session enriches not only my skills but also my appreciation of our culture.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-serif text-center font-semibold text-brand-gold mb-16 tracking-wide">
          Student Experiences
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="
                bg-white/5
                border border-white/10
                backdrop-blur-sm
                rounded-2xl
                p-8
                shadow-lg
                transition
                hover:-translate-y-1
                hover:shadow-2xl
                flex flex-col
                h-full
              "
            >
              {/* Quote */}
              <div className="mb-6">
                <div className="text-5xl text-brand-gold leading-none mb-4">“</div>
                <p className="text-gray-200 text-lg leading-relaxed">
                  {testimonial.text}
                </p>
              </div>

              {/* Author */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <p className="font-semibold text-brand-light">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-400">
                  {testimonial.location} • {testimonial.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
