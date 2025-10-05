import React, { useState } from 'react';

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      formType: "enquiry",
      ...formData,
      source: "Website Enquiry",
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzrII67vOQnMXe6dnhBpGMdY25_ZNu175kc8vCZ2lw0924vChywmTWRC45oLGnhzk75/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', contact: '', message: '' });

        // Hide thank-you message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {submitted ? (
          <div className="text-center text-green-400 text-xl font-bold">
            Thank you! We received your enquiry.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border bg-gray-800 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded border bg-gray-800 text-white"
            />
            <input
              type="tel"
              name="contact"
              placeholder="Phone Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-3 rounded border bg-gray-800 text-white"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 rounded border bg-gray-800 text-white"
            />
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300"
            >
              Send Enquiry
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EnquiryForm;
