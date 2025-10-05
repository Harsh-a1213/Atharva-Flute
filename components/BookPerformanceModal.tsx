import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
}

const BookPerformanceModal: React.FC<ModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form data to Google Apps Script
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      formType: "performance",
      name: formData.name,
      email: formData.email,
      message: formData.message,
      source: "Book Performance",
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
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        alert("Failed to send. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-[var(--brand-gold)] mb-2">
              Thank You!
            </h2>
            <p className="text-gray-700">
              Your performance booking request has been sent successfully.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center text-[var(--brand-dark)]">
              Book My Performance
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Event Details / Message"
                rows={4}
                required
                className="border border-gray-300 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
              />

              <button
                type="submit"
                className="bg-[var(--brand-gold)] text-[var(--brand-dark)] font-bold py-3 px-6 rounded hover:bg-yellow-300 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookPerformanceModal;
