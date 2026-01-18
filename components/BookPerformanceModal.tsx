import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl px-4 py-3 bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400 transition";

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

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [isOpen, onClose]);

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
      name: (formData.name || "").trim(),
      contact: (formData.contact || formData.email || "").trim(),
      email: (formData.email || "").trim(),
      date: (formData.date || "").trim(),
      time: (formData.time || "").trim(),
      place: (formData.place || "").trim(),
      eventType: (formData.eventType || "").trim(),
      message: (formData.message || "").trim(),
      enquiryType:
        formData.enquiryType?.trim() || "Performance/Concert Enquiry",
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
      setFormData({
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

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl animate-[fadeIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
        >
          ×
        </button>

        {submitted ? (
          <div className="py-16 text-center">
            <h3 className="text-3xl font-semibold text-green-600">
              🎉 Request Submitted
            </h3>
            <p className="mt-3 text-gray-600">
              We’ll contact you soon to discuss the performance details.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-serif font-semibold mb-6 text-center text-gray-900">
              Book a Performance
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={inputClass}
                required
                disabled={loading}
              />

              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number (WhatsApp preferred)"
                className={inputClass}
                required
                disabled={loading}
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                className={inputClass}
                disabled={loading}
              />

              <div className="grid grid-cols-2 gap-4">
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
                placeholder="Event Location (City / Venue)"
                className={inputClass}
              />

              <input
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                placeholder="Type of Event (Wedding, Corporate, etc.)"
                className={inputClass}
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Event details or special requests"
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
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-gradient-to-r from-yellow-400 to-yellow-500
                  text-gray-900
                  font-semibold
                  py-3
                  rounded-xl
                  shadow-md
                  hover:shadow-lg
                  hover:-translate-y-0.5
                  transition
                  disabled:opacity-60
                "
              >
                {loading ? "Sending..." : "Submit Request"}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default BookPerformanceModal;
