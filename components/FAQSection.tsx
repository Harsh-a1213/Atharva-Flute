import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'Do you provide any written notes or sheet music?',
    answer: 'Yes, we provide PDFs, notations, and audio references to help reinforce learning outside the class.',
  },
  {
    question: 'Can I join from outside India?',
    answer: 'Absolutely! Our online platform supports international students and we can ship flutes globally.',
  },
    {
    question: 'Are the classes suitable for complete beginners with no musical sense?',
    answer: 'Yes, our curriculum is designed from the ground up, and we start with the basics, even for first-time learners.',
  },
  {
    question: 'Can I switch between group and one-on-one classes later?',
    answer: 'Yes, you can upgrade or switch your plan based on your comfort and learning pace anytime.',
  },
];


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
<section className="max-w-3xl mx-auto px-4 py-12 text-white">
  <h2 className="text-4xl font-serif font-bold text-brand-gold mb-6">Frequently Asked Questions</h2>
  <p className="text-center text-gray-300 mb-10">
    Get answers to common questions about learning the  Flute.
  </p>

  <div className="space-y-4">
    {faqs.map((faq, index) => (
      <div key={index} className="border border-gray-600 rounded-lg">
        <button
          onClick={() => toggleFAQ(index)}
          className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-white hover:bg-gray-800 transition-all"
        >
          {faq.question}
          {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {openIndex === index && (
          <div className="px-6 pb-4 text-gray-300">
            {faq.answer}
          </div>
        )}
      </div>
    ))}
  </div>
</section>

  );
}
