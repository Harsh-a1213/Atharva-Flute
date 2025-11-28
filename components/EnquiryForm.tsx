import React, { useState } from "react";

const inputClass = "w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400";

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", enquiryType: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      enquiryType: formData.enquiryType?.trim() || "Booking"
    };

    if (!payload.name || !payload.contact) {
      setError("Please provide your name and at least a phone number or email.");
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
      setFormData({ name: "", email: "", phone: "", message: "", enquiryType: "" });
      setTimeout(() => setSubmitted(false), 2500);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-[var(--brand-dark)]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-yellow-400 mb-2">Thank you!</h2>
          <p className="text-gray-300">Your message has been sent. We will get back to you shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-[var(--brand-dark)]">
      <div className="container mx-auto px-6 max-w-xl">
        <h2 className="text-3xl font-serif font-bold text-yellow-400 mb-4 text-center">Enroll, Book & Inquire</h2>
        <p className="text-gray-300 text-center mb-8">Ready to start your musical journey? Fill the form below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="sr-only">Full name</span>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className={inputClass} required disabled={loading} />
          </label>

          <label className="block">
            <span className="sr-only">Email</span>
            <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email address" className={inputClass} disabled={loading} />
          </label>

          <label className="block">
            <span className="sr-only">Phone</span>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" className={inputClass} disabled={loading} />
          </label>

          <label className="block">
            <span className="sr-only">Message</span>
            <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Your message" className={inputClass + " resize-none"} required disabled={loading} />
          </label>

          <label className="block">
            <span className="sr-only">Enquiry Type (optional)</span>
            <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className={inputClass} disabled={loading}>
              <option value="">Select enquiry type (optional)</option>
              <option value="Demo Class Scheduling">Book Free Trial</option>
              <option value="Class Enquiry">Enroll in Class</option>
              <option value="Performance/Concert Enquiry">Book Show / Performance</option>
              <option value="Booking">Other Enquiry</option>
            </select>
          </label>

          {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

          <div className="text-center">
            <button type="submit" disabled={loading} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EnquiryForm;
