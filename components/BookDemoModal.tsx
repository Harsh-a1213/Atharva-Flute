import React, { useState } from "react";

interface Props { isOpen: boolean; onClose: () => void; }

const inputClass = "w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400";

const BookDemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    course: "",
    age: "",
    gender: "",
    enquiryType: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      formType: "book-demo",
      source: "Website - Book Demo Modal",
      ...formData,
      name: (formData.name || "").trim(),
      contact: (formData.contact || formData.email || "").trim(),
      email: (formData.email || "").trim(),
      enquiryType: formData.enquiryType || "Demo Class Scheduling"
    };

    if (!payload.name || !payload.contact) {
      setError("Please enter your name and a phone number or email.");
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
      setFormData({ name: "", contact: "", email: "", course: "", age: "", gender: "", enquiryType: "" });
      setTimeout(() => { setSubmitted(false); onClose(); }, 1800);
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-gray-900">
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800">&times;</button>

        {submitted ? (
          <div className="py-12 text-center">
            <h3 className="text-2xl font-bold text-green-600">🎉 Thank you!</h3>
            <p className="mt-2 text-gray-700">Your demo booking request has been received.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-4 text-center">Book Demo / Enquiry</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="sr-only" htmlFor="bd-name">Full name</label>
              <input id="bd-name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass} required disabled={loading} />

              <label className="sr-only" htmlFor="bd-contact">Contact</label>
              <input id="bd-contact" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number (WhatsApp)" className={inputClass} required disabled={loading} />

              <label className="sr-only" htmlFor="bd-email">Email</label>
              <input id="bd-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email (optional)" className={inputClass} disabled={loading} />

              <select name="course" value={formData.course} onChange={handleChange} className={inputClass} required disabled={loading}>
                <option value="">Select Course</option>
                <option value="Flute">Flute</option>
                <option value="Tabla">Tabla</option>
                <option value="Guitar">Guitar</option>
                <option value="Harmonium">Harmonium</option>
              </select>

              <div className="grid grid-cols-2 gap-3">
                <select name="age" value={formData.age} onChange={handleChange} className={inputClass} disabled={loading}>
                  <option value="">Select Age</option>
                  <option>Under 10</option>
                  <option>10-18</option>
                  <option>19-30</option>
                  <option>31-50+</option>
                </select>
                <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass} disabled={loading}>
                  <option value="">Select Gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>

              <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className={inputClass} required disabled={loading}>
                <option value="">Select Enquiry Type</option>
                <option value="Demo Class Scheduling">Book Free Trial</option>
                <option value="Class Enquiry">Enroll in Class</option>
                <option value="Performance/Concert Enquiry">Book Show / Performance</option>
                <option value="Booking">Other Enquiry</option>
              </select>

              {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 rounded-lg shadow-md hover:brightness-95">
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDemoModal;
