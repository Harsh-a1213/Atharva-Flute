import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl px-4 py-3 bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400 transition";

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

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [isOpen, onClose]);

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
      contact:
        (formData.contact || formData.email || "").trim(),
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
      }, 1800);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl animate-[fadeIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
        >
          ×
        </button>

        {submitted ? (
          <div className="py-16 text-center">
            <h3 className="text-3xl font-semibold text-green-600">
              🎉 Enrollment Submitted
            </h3>
            <p className="mt-3 text-gray-600">
              We’ll contact you soon with the next steps.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-serif font-semibold mb-6 text-center text-gray-900">
              Enroll Now
            </h3>

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
                placeholder="Contact Number (WhatsApp preferred)"
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
                placeholder="Any additional information (optional)"
                rows={3}
                className={inputClass + " resize-none"}
                disabled={loading}
              />

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-gradient-to-r from-yellow-400 to-yellow-500
                  text-gray-900
                  font-semibold
                  py-3
                  rounded-xl
                  shadow-md
                  hover:shadow-lg
                  hover:-translate-y-0.5
                  transition
                  disabled:opacity-60
                "
              >
                {loading ? "Sending..." : "Submit Enrollment"}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default EnrollModal;
