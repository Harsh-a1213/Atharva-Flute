import React, { useState } from "react";

const inputClass =
  "w-full rounded-xl px-4 py-3 bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400 transition";

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    enquiryType: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const contactFallback = (formData.phone || formData.email || "").trim();

    const payload = {
      formType: "enquiry",
      source: "Website - Enquiry Section",
      name: (formData.name || "").trim(),
      contact: contactFallback,
      email: (formData.email || "").trim(),
      message: (formData.message || "").trim(),
      enquiryType: formData.enquiryType?.trim() || "Booking",
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
        email: "",
        phone: "",
        message: "",
        enquiryType: "",
      });

      setTimeout(() => setSubmitted(false), 2500);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-white/5 text-white"
    >
      <div className="container mx-auto px-6 max-w-xl">
        {submitted ? (
          <div className="text-center py-12">
            <h2 className="text-3xl font-serif font-semibold text-brand-gold mb-3">
              Thank you!
            </h2>
            <p className="text-gray-300">
              Your message has been sent. We’ll get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center text-brand-gold mb-4">
              Enroll, Book & Inquire
            </h2>
            <p className="text-gray-300 text-center mb-10 text-lg">
              Ready to begin your musical journey? Share a few details with us.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={inputClass}
                required
                disabled={loading}
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address (optional)"
                className={inputClass}
                disabled={loading}
              />

              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone / WhatsApp (optional)"
                className={inputClass}
                disabled={loading}
              />

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you're looking for..."
                className={inputClass + " resize-none"}
                required
                disabled={loading}
              />

              <select
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                className={inputClass}
                disabled={loading}
              >
                <option value="">Select enquiry type (optional)</option>
                <option value="Demo Class Scheduling">Book Free Trial</option>
                <option value="Class Enquiry">Enroll in Class</option>
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

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    bg-gradient-to-r from-yellow-400 to-yellow-500
                    text-gray-900
                    font-semibold
                    py-3 px-10
                    rounded-full
                    shadow-md
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    transition
                    disabled:opacity-60
                  "
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default EnquiryForm;
