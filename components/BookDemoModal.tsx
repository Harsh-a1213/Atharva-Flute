import React, { useState } from "react";

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

  // ✅ Change 1: use your deployed domain or relative API path
  const API_URL =
    import.meta.env.PROD
      ? "/api/saveform" // works automatically on Vercel
      : "http://localhost:3000/api/saveform"; // for local testing with `vercel dev`

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
      // ✅ Change 2: use dynamic API_URL
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // ✅ Change 3: adjust response parsing
      const result = await response.json();

      if (result.status === "success") {
        setSubmitted(true);
        resetForm();
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2500);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Submission failed. Please check your connection or try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white text-gray-900 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl">
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
