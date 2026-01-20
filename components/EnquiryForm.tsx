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
    <section id="contact" className="py-20 bg-brand-dark">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* CENTERED HEADING */}
        <h2 className="text-4xl font-serif font-bold text-brand-gold text-center mb-14">
          Contact Us
          <span className="block w-20 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></span>
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* LEFT SIDE */}
          <div className="text-white space-y-10 animate-fade-in-up">

            {/* PHONE */}
            <div className="flex items-start space-x-5">
              <IconCircle><PhoneIcon /></IconCircle>
              <div>
                <p className="text-lg font-semibold">Phone</p>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="text-gray-300 hover:text-brand-gold transition"
                >
                  +91 XXXXX XXXXX
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start space-x-5">
              <IconCircle><MailIcon /></IconCircle>
              <div>
                <p className="text-lg font-semibold">Email</p>
                <a
                  href="mailto:atharvafluteofficial@gmail.com"
                  className="text-gray-300 hover:text-brand-gold transition break-all"
                >
                  atharvafluteofficial@gmail.com
                </a>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start space-x-5">
              <IconCircle><LocationIcon /></IconCircle>
              <div>
                <p className="text-lg font-semibold">Address</p>
                <p className="text-gray-300">
                  Atharva Flute Academy<br />
                  Nashik, Maharashtra, India
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold pt-2">
              Location Map
            </h3>

            {/* MAP – COMPACT HEIGHT */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Atharva Flute Academy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.0790682796414!2d73.75766837500132!3d19.96317678143273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb29bb5babf9%3A0xcd3655784f4c3dfb!2sAtharva%20flute%20Academy!5e0!3m2!1sen!2sin!4v1768903660622"
                className="w-full h-56 md:h-64 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-brand-gray rounded-3xl p-8 shadow-2xl animate-fade-in-up animation-delay-150 flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-serif font-bold text-center text-brand-gold mb-2">
                Enroll, Book & Inquire
              </h3>

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

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-10 rounded-full shadow-lg"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;

/* ICON COMPONENTS */

const IconCircle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 flex-shrink-0">
    {children}
  </div>
);

const PhoneIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-.586 1.414l-1.414 1.414a16 16 0 007.586 7.586l1.414-1.414A2 2 0 0116 14h1a2 2 0 012 2v2a2 2 0 01-2 2h-1C8.163 20 4 15.837 4 10V9a4 4 0 01-1-4z"/>
  </svg>
);

const MailIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"/>
  </svg>
);
