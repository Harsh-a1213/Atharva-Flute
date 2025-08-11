const testimonials = [
  {
    name: "Shouria Bhalelar",
    location: "Texas, USA",
    level: "Beginner",
    text: "I was born outside India, but my roots were always strong at home through music. Learning the flute with Atharva sir has been a beautiful way to connect to my heritage. I’ve grown up listening to Indian melodies, and now being able to play them myself makes me feel both proud and emotionally connected. It’s more than music — it’s identity.",
  },
  {
    name: "Arpit More",
    location: "Maharashtra, India",
    level: "Beginner",
    text: "As someone who loves the stage and performing, learning flute added a new rhythm to my life. Atharva sir teaches with such energy and clarity that I actually look forward to every class. He makes complex notes feel easy and fun. Now, when I play a tune on my own, it’s pure joy! Music has become my new love",
  },
  {
    name: "Adesh Lodha ",
    location: "Bangalore, India",
    level: "Beginner",
    text: "These classes go beyond just technique — they’re a journey into the soul of Hindustani classical music. Atharva sir and the team bring such depth and authenticity to each lesson. I also received a flute that feels like a piece of art. Every session enriches not only my skills but also my appreciation of our culture.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16" style={{ backgroundColor: "#000000" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-white font-serif text-center mb-12">
          Student Experiences
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-[#1a1a1a] hover:bg-[#2a2a2a] hover:scale-105 transition-all duration-300 shadow-md rounded-xl p-6 flex flex-col justify-between h-full"
            >
              <div>
                <div className="text-4xl text-gray-400 mb-4">“</div>
                <p className="text-white text-base leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
              <div className="mt-6">
                <p className="font-semibold text-gray-300">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-300">{testimonial.location}</p>
                <p className="text-sm text-gray-300">{testimonial.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
