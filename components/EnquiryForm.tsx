import React, { useState } from "react";

const inputClass =
  "w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400";

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    enquiryType: "",
  });

  const [loading, setLoading] = useState(false);
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

    if (!formData.name || !contactFallback) {
      setError("Please provide your name and phone or email.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/proxy-saveform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "enquiry",
          source: "Website - Enquiry Section",
          name: formData.name.trim(),
          contact: contactFallback,
          email: formData.email.trim(),
          message: formData.message.trim(),
          enquiryType: formData.enquiryType || "Booking",
        }),
      });

      const data = await res.json();
      if (!data?.ok) throw new Error();

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        enquiryType: "",
      });
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT SIDE – CONTACT INFO */}
          <div className="text-white space-y-8">

            {/* PHONE */}
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-brand-gray">
                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-.586 1.414l-1.414 1.414a16 16 0 007.586 7.586l1.414-1.414A2 2 0 0116 14h1a2 2 0 012 2v2a2 2 0 01-2 2h-1C8.163 20 4 15.837 4 10V9a4 4 0 01-1-4z"/>
                </svg>
              </div>
              <a href="tel:+91XXXXXXXXXX" className="text-gray-300">
                +91 93072 19102
              </a>
            </div>

            {/* EMAIL */}
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-brand-gray">
                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"/>
                </svg>
              </div>
              <a
                href="mailto:atharvafluteofficial@gmail.com"
                className="text-gray-300"
              >
                atharvafluteofficial@gmail.com
              </a>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex items-center space-x-6 pt-2">
              <a
                href="https://www.instagram.com/atharvaflute/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-brand-gray hover:bg-brand-gold hover:text-gray-900 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <path d="M17.5 6.5h.01"/>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/channel/UCrKrzJ35W99201yGdaBqHPg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-brand-gray hover:bg-brand-gold hover:text-gray-900 transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.9 1.52 1.76 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23 1.52-.9 1.76-1.75C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.5 15V9l5.5 3-5.5 3z"/>
                </svg>
              </a>
            </div>

            {/* MAP – ATHARVA FLUTE ACADEMY */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Atharva Flute Academy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.0790682796414!2d73.75766837500132!3d19.96317678143273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb29bb5babf9%3A0xcd3655784f4c3dfb!2sAtharva%20flute%20Academy!5e0!3m2!1sen!2sin!4v1768903660622"
                className="w-full h-72 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT SIDE – FORM */}
          <div className="bg-brand-gray rounded-3xl p-8 shadow-2xl">
            <h2 className="text-4xl font-serif font-bold text-center text-brand-gold mb-2">
              Enroll, Book & Inquire
            </h2>

            <p className="text-gray-300 text-center mb-8">
              Ready to start your musical journey? Fill the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className={inputClass} disabled={loading} />
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email address" className={inputClass} disabled={loading} />
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" className={inputClass} disabled={loading} />
              <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Your message" className={inputClass + " resize-none"} disabled={loading} />

              <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className={inputClass} disabled={loading}>
                <option value="">Select enquiry type</option>
                <option value="Demo Class Scheduling">Book Free Trial</option>
                <option value="Class Enquiry">Enroll in Class</option>
                <option value="Performance/Concert Enquiry">Book Show / Performance</option>
              </select>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <div className="text-center pt-2">
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
