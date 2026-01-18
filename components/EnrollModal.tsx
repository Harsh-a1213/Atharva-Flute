import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full border border-gray-300 bg-white text-gray-800 placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400";

const EnrollModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    age: "",
    gender: "",
    course: "",
    level: "",
    email: "",
    enquiry: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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
      formType: "enroll",
      source: "Enroll Now",
      ...formData,
      name: (formData.name || "").trim(),
      contact: (formData.contact || formData.email || "").trim(),
      email: (formData.email || "").trim(),
      enquiryType: "Class Enquiry",
      message: formData.enquiry || "",
    };

    if (!payload.name || !payload.contact) {
      setError("Please provide your name and contact (phone or email).");
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
        age: "",
        gender: "",
        course: "",
        level: "",
        email: "",
        enquiry: "",
      });

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1600);
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
              🎉 Enrollment Submitted
            </h3>
            <p className="mt-3 text-gray-700">
              We’ll contact you soon with next steps.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-3xl font-serif font-bold text-center mb-1">
              Enroll Now
            </h3>
            <p className="text-center text-gray-500 mb-6">
              Start your musical journey with expert guidance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email (optional)"
                className={inputClass}
                disabled={loading}
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  disabled={loading}
                >
                  <option value="">Select Course</option>
                  <option value="Flute">Flute</option>
                  <option value="Tabla">Tabla</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Harmonium">Harmonium</option>
                </select>

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  disabled={loading}
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <textarea
                name="enquiry"
                value={formData.enquiry}
                onChange={handleChange}
                placeholder="Additional enquiry (optional)"
                rows={3}
                className={inputClass + " resize-none"}
                disabled={loading}
              />

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
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollModal;
