import React, { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  contact: string;
  email?: string;
  course: string;
  age: string;
  gender: string;
  enquiryType: string;
}

const inputClass =
  "w-full rounded-xl px-4 py-3 bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400 transition";

const BookDemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/proxy-saveform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "book-demo",
          source: "Website - Book Demo Modal",
          ...formData,
        }),
      });

      const envelope = await res.json();
      if (!envelope || !envelope.ok) {
        setError("Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);
      resetForm();
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2200);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Submission failed. Please check your connection.");
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
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ×
        </button>

        {submitted ? (
          <div className="py-16 text-center">
            <h3 className="text-3xl font-semibold text-green-600">
              🎉 Thank you!
            </h3>
            <p className="mt-3 text-gray-600">
              Your request has been submitted successfully.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-serif font-semibold mb-6 text-center text-gray-900">
              Book Demo / Enquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                disabled={loading}
                className={inputClass}
              />

              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number (WhatsApp preferred)"
                required
                disabled={loading}
                className={inputClass}
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                disabled={loading}
                className={inputClass}
              />

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                disabled={loading}
                className={inputClass}
              >
                <option value="">Select Course</option>
                <option value="Flute">Flute</option>
                <option value="Tabla">Tabla</option>
                <option value="Guitar">Guitar</option>
                <option value="Harmonium">Harmonium</option>
              </select>

              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                disabled={loading}
                className={inputClass}
              >
                <option value="">Select Age Group</option>
                <option value="Under 10">Under 10</option>
                <option value="10-18">10–18</option>
                <option value="19-30">19–30</option>
                <option value="31-50+">31–50+</option>
              </select>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                disabled={loading}
                className={inputClass}
              >
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>

              {/* IMPORTANT: values preserved for Apps Script */}
              <select
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                required
                disabled={loading}
                className={inputClass}
              >
                <option value="">Select Enquiry Type</option>
                <option value="Demo Class Scheduling">Book Free Trial</option>
                <option value="Class Enquiry">Enroll in Class</option>
                <option value="Performance/Concert Enquiry">
                  Book Show / Performance
                </option>
                <option value="Booking">Other Enquiry</option>
              </select>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border">
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
                {loading ? "Sending..." : "Submit"}
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

export default BookDemoModal;
