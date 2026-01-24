import React, { useState } from "react";

/* ---------- INPUT STYLE ---------- */
const inputClass =
  "w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400";

/* ---------- MAIN COMPONENT ---------- */
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
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* HEADING */}
        <h2 className="text-4xl font-serif font-bold text-brand-gold text-center mb-14">
          Contact Us
          <span className="block w-20 h-1 bg-yellow-500 mx-auto mt-4 rounded-full" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div className="text-white space-y-10">

            <InfoRow label="Phone" href="tel:+91XXXXXXXXXX">
              <PhoneIcon />
              +91 XXXXX XXXXX
            </InfoRow>

            <InfoRow label="Email" href="mailto:atharvafluteofficial@gmail.com">
              <MailIcon />
              atharvafluteofficial@gmail.com
            </InfoRow>

            <div className="flex items-start space-x-5">
              <IconCircle>
                <LocationIcon />
              </IconCircle>
              <div>
                <p className="text-lg font-semibold">Address</p>
                <p className="text-gray-300">
                  Atharva Flute Academy<br />
                  Nashik, Maharashtra, India
                </p>
              </div>
            </div>

            {/* SOCIALS */}
            <div>
              <p className="text-lg font-semibold mb-4">Follow Us</p>
              <div className="flex space-x-5">
                <SocialIcon
                  href="https://www.instagram.com/atharvaflute/"
                  label="Instagram"
                  variant="instagram"
                >
                  <InstagramIcon />
                </SocialIcon>

                <SocialIcon
                  href="https://www.youtube.com/channel/UCrKrzJ35W99201yGdaBqHPg"
                  label="YouTube"
                  variant="youtube"
                >
                  <YouTubeIcon />
                </SocialIcon>
              </div>
            </div>

            {/* MAP */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Atharva Flute Academy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.0790682796414!2d73.75766837500132!3d19.96317678143273!"
                className="w-full h-56 md:h-64 border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-brand-gray rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-serif font-bold text-center text-brand-gold mb-2">
              Enroll, Book & Inquire
            </h3>
            <p className="text-gray-300 text-center mb-8">
              Ready to start your musical journey? Fill the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className={inputClass} />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email address" className={inputClass} />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" className={inputClass} />
              <textarea name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Your message" className={inputClass + " resize-none"} />
              <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className={inputClass}>
                <option value="">Select enquiry type</option>
                <option>Book Free Trial</option>
                <option>Enroll in Class</option>
                <option>Book Show / Performance</option>
              </select>

              {error && <p className="text-red-500 text-sm">{error}</p>}

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
    </section>
  );
};

export default EnquiryForm;

/* ---------- REUSABLE ---------- */

const IconCircle = ({ children }: { children: React.ReactNode }) => (
  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900">
    {children}
  </div>
);

const InfoRow = ({ label, href, children }: any) => (
  <div className="flex items-start space-x-5">
    <IconCircle>{children[0]}</IconCircle>
    <div>
      <p className="text-lg font-semibold">{label}</p>
      <a href={href} className="text-gray-300 hover:text-brand-gold">
        {children[1]}
      </a>
    </div>
  </div>
);

/* ---------- SOCIAL ICON ---------- */

const SocialIcon = ({
  href,
  label,
  variant,
  children,
}: {
  href: string;
  label: string;
  variant: "instagram" | "youtube";
  children: React.ReactNode;
}) => {
  const style =
    variant === "instagram"
      ? "bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 shadow-[0_0_25px_rgba(236,72,153,0.45)]"
      : "bg-red-600 shadow-[0_0_25px_rgba(239,68,68,0.45)]";

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${style} transition-all hover:scale-110 hover:-translate-y-1`}
    >
      {children}
    </a>
  );
};

/* ---------- ICONS ---------- */

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 5a2 2 0 012-2h2a2 2 0 012 2v1l-2 2a16 16 0 007 7l2-2h1a2 2 0 012 2v2a2 2 0 01-2 2h-1C8 20 4 16 4 10z"/>
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 8l9 6 9-6v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
  </svg>
);

const LocationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 11a3 3 0 100-6 3 3 0 000 6z"/>
    <path d="M12 21s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"/>
    <circle cx="12" cy="12" r="3.2"/>
    <circle cx="17.5" cy="6.5" r="1.2"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12zM9.5 15.5v-7l6 3.5z"/>
  </svg>
);
