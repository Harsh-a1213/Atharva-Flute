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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      formType: "performance",
      source: "Book Performance",
      ...formData,
      name: (formData.name || "").trim(),
      contact: (formData.contact || formData.email || "").trim(),
      email: (formData.email || "").trim(),
      enquiryType:
        formData.enquiryType || "Performance/Concert Enquiry",
    };

    if (!payload.name || !payload.contact) {
      setError("Please provide your name and a phone number or email.");
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
      if (!envelope || !envelope.ok) {
        setError("Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1800);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">

        {/* HEADER */}
        <div className="relative px-6 py-4 border-b">
          <h3 className="text-2xl font-serif font-bold text-center">
            Book a Performance
          </h3>
          <p className="text-sm text-gray-500 text-center mt-1">
            Let soulful live music elevate your special event
          </p>

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="px-6 py-5 overflow-y-auto">
          {submitted ? (
            <div className="py-16 text-center">
              <h3 className="text-2xl font-bold text-green-600">
                🎉 Booking submitted
              </h3>
              <p className="mt-2 text-gray-700">
                We’ll contact you soon with performance details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={inputClass}
                required
              />

              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number (WhatsApp)"
                className={inputClass}
                required
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                className={inputClass}
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClass}
                />
                <input
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <input
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="Event location (city / venue)"
                className={inputClass}
              />

              <input
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                placeholder="Type of event (Wedding, Corporate...)"
                className={inputClass}
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Event details / special requests"
                rows={4}
                className={inputClass + " resize-none"}
              />

              <select
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                className={inputClass}
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
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 rounded-lg shadow hover:brightness-95"
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
