import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby0KoEjby4qm1wcOqJHBTK3oa7GDfRMJHBSq8GudTzkct7w_luxVWVU9iQAAI2783Ha/exec"; // ← REPLACE

const BookDemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    course: "",
    age: "",
    gender: "",
    enquiryType: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () =>
    setFormData({
      name: "",
      contact: "",
      email: "",
      course: "",
      age: "",
      gender: "",
      enquiryType: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData();
    form.append("formType", "demo");
    form.append("source", "Website");
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      const res = await fetch(WEB_APP_URL, { method: "POST", body: form });
      const text = await res.text();

      if (res.ok && /success/i.test(text)) {
        setSubmitted(true);
        resetForm();
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2500);
      } else {
        // fallback no-cors
        await fetch(WEB_APP_URL, { method: "POST", body: form, mode: "no-cors" });
        setSubmitted(true);
        resetForm();
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2500);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Submission failed. Check console or Apps Script deployment.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      {/* Modal box */}
      <div className="bg-white text-gray-900 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="text-2xl font-bold text-green-600">🎉 Thank you!</div>
            <div className="mt-2 text-gray-700">
              Your request has been successfully submitted.
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-5 text-center text-gray-800">
              Book Demo / Enquiry Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                disabled={loading}
              />

              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact number (WhatsApp)"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                disabled={loading}
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                disabled={loading}
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                disabled={loading}
              >
                <option value="">Select Course</option>
                <option>Flute</option>
                <option>Tabla</option>
                <option>Guitar</option>
                <option>Harmonium</option>
              </select>

              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                disabled={loading}
              >
                <option value="">Select Age Group</option>
                <option>Under 10</option>
                <option>10-18</option>
                <option>19-30</option>
                <option>31-50+</option>
              </select>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>

              <select
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                disabled={loading}
              >
                <option value="">Select Enquiry Type</option>
                <option>Book Free Trial</option>
                <option>Enroll in Class</option>
                <option>Book Show / Performance</option>
                <option>Other Enquiry</option>
              </select>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
              >
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
