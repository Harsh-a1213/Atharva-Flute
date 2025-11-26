import React, { useState } from "react";

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    enquiryType: "" // optional; will default to 'Booking' if empty
  });
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

    // Ensure required keys the Apps Script expects
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

    // Basic front-end validation (name + contact/email)
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
        console.error("Enquiry submission failed:", envelope);
        setError("Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "", enquiryType: "" });
      // keep success visible briefly
      setTimeout(() => setSubmitted(false), 2500);
    } catch (err: any) {
      console.error("Enquiry error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-[var(--brand-gray)]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold text-[var(--brand-gold)] mb-4">Thank You!</h2>
          <p className="text-lg text-[var(--brand-light)]">Your enquiry has been sent. We’ll get back to you shortly!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-[var(--brand-gray)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif font-bold text-[var(--brand-gold)] mb-2">Enroll, Book & Inquire</h2>
          <p className="text-lg text-[var(--brand-light)] max-w-3xl mx-auto">Ready to start your musical journey, book a performance, or have a question? Fill out the form below.</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--brand-light)] mb-2">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[var(--brand-dark)] border border-gray-600 rounded-md py-3 px-4 text-white"
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--brand-light)] mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[var(--brand-dark)] border border-gray-600 rounded-md py-3 px-4 text-white"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--brand-light)] mb-2">Phone Number (Optional)</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[var(--brand-dark)] border border-gray-600 rounded-md py-3 px-4 text-white"
              placeholder="Optional - we'll prefer phone when available"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--brand-light)] mb-2">Your Message</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="e.g., I’d like to know more about flute lessons..."
              className="w-full bg-[var(--brand-dark)] border border-gray-600 rounded-md py-3 px-4 text-white"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--brand-light)] mb-2">Enquiry Type</label>
            <select
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              className="w-full bg-[var(--brand-dark)] border border-gray-600 rounded-md py-3 px-4 text-white"
              disabled={loading}
            >
              <option value="">Select (optional)</option>
              <option value="Demo Class Scheduling">Book Free Trial</option>
              <option value="Class Enquiry">Enroll in Class</option>
              <option value="Performance/Concert Enquiry">Book Show / Performance</option>
              <option value="Booking">Other Enquiry</option>
            </select>
          </div>

          {error && <div className="text-sm text-red-600 bg-red-50 border p-2 rounded">{error}</div>}

          <div className="text-center">
            <button type="submit" disabled={loading} className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full text-lg">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EnquiryForm;
