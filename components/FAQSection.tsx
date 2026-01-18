import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Do you provide any written notes or sheet music?",
    answer:
      "Yes, we provide PDFs, notations, and audio references to help reinforce learning outside the class.",
  },
  {
    question: "Can I join from outside India?",
    answer:
      "Absolutely! Our online platform supports international students and we can ship flutes globally.",
  },
  {
    question:
      "Are the classes suitable for complete beginners with no musical background?",
    answer:
      "Yes, our curriculum is designed from the ground up. We start with the basics, making it comfortable even for first-time learners.",
  },
  {
    question: "Can I switch between group and one-on-one classes later?",
    answer:
      "Yes, you can upgrade or switch your plan based on your comfort and learning pace at any time.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-white/5 text-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center text-brand-gold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg">
          Answers to common questions about learning the flute.
        </p>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="
                  border border-white/10
                  rounded-2xl
                  overflow-hidden
                  bg-white/5
                  backdrop-blur-sm
                "
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="
                    flex w-full items-center justify-between
                    px-6 py-5
                    text-left
                    text-lg
                    font-medium
                    text-white
                    hover:bg-white/10
                    transition
                  "
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <span className="text-brand-gold">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                <div
                  className={`
                    px-6
                    text-gray-300
                    text-base
                    leading-relaxed
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "max-h-40 pb-5 opacity-100"
                        : "max-h-0 pb-0 opacity-0 overflow-hidden"
                    }
                  `}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
