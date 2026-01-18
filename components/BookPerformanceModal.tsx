import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400";

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
      }, 1800);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative text-gray-900">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        {submitted ? (
          <div className="py-14 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              🎉 Booking Submitted
            </h3>
            <p className="mt-3 text-gray-700">
              We’ll contact you soon to discuss performance details.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-3xl font-serif font-bold text-center mb-1">
              Book a Performance
            </h3>
            <p className="text-center text-gray-500 mb-6">
              Share your event details and we’ll get in touch.
            </p>

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
                placeholder="Contact Number (WhatsApp)"
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
                placeholder="Event Location (city / venue)"
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
                className="w-full mt-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 rounded-full shadow-lg hover:brightness-95"
              >
                {loading ? "Sending..." : "Submit Request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookPerformanceModal;
