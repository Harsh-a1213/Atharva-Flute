import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400";

const BookPerformanceModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    date: "",
    time: "",
    place: "",
    eventType: "",
    message: "",
    enquiryType: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      formType: "performance",
      source: "Book Performance",
      ...formData,
      name: formData.name.trim(),
      contact: (formData.contact || formData.email).trim(),
      email: formData.email.trim(),
      enquiryType:
        formData.enquiryType || "Performance/Concert Enquiry",
    };

    if (!payload.name || !payload.contact) {
      setError("Please provide your name and contact details.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/proxy-saveform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const envelope = await res.json();
      if (!envelope?.ok) {
        setError("Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl relative">

        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b">
          <h3 className="text-2xl font-serif font-bold text-center">
            Book a Performance
          </h3>
          <p className="text-center text-gray-500 text-sm">
            Let soulful live music elevate your special event
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto px-6 py-5">
          {submitted ? (
            <div className="py-12 text-center">
              <h3 className="text-2xl font-bold text-green-600">
                🎉 Booking Submitted
              </h3>
              <p className="mt-2 text-gray-700">
                We’ll contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Your Name"
                className={inputClass}
                onChange={handleChange}
                required
              />

              <input
                name="contact"
                placeholder="Contact Number (WhatsApp)"
                className={inputClass}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email (optional)"
                className={inputClass}
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-3">
                <input type="date" name="date" className={inputClass} onChange={handleChange} />
                <input type="time" name="time" className={inputClass} onChange={handleChange} />
              </div>

              <input
                name="place"
                placeholder="Event Location (city / venue)"
                className={inputClass}
                onChange={handleChange}
              />

              <input
                name="eventType"
                placeholder="Type of event (Wedding, Corporate...)"
                className={inputClass}
                onChange={handleChange}
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Event details / special requests"
                className={inputClass + " resize-none"}
                onChange={handleChange}
              />

              <select
                name="enquiryType"
                className={inputClass}
                onChange={handleChange}
              >
                <option value="">Enquiry Type (optional)</option>
                <option value="Performance/Concert Enquiry">
                  Book Show / Performance
                </option>
                <option value="Booking">Other Enquiry</option>
              </select>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 rounded-lg shadow"
              >
                {loading ? "Sending..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPerformanceModal;
