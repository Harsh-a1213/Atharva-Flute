import React, { useState } from "react";

interface Props { isOpen: boolean; onClose: () => void; }
interface FormData {
  name: string; contact: string; email?: string;
  course: string; age: string; gender: string; enquiryType: string;
}

const BookDemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "", contact: "", email: "", course: "", age: "", gender: "", enquiryType: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData({ name: "", contact: "", email: "", course: "", age: "", gender: "", enquiryType: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/proxy-saveform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "book-demo", source: "Website - Book Demo Modal", ...formData })
      });

      const envelope = await res.json();

      if (!envelope || !envelope.ok) {
        console.error("Forward failed:", envelope);
        setError("Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);
      resetForm();
      setTimeout(() => { setSubmitted(false); onClose(); }, 2500);
    } catch (err: any) {
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
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800">&times;</button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="text-2xl font-bold text-green-600">🎉 Thank you!</div>
            <div className="mt-2 text-gray-700">Your request has been submitted.</div>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-5 text-center text-gray-800">Book Demo / Enquiry Form</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" required disabled={loading}
                className="w-full border rounded-lg px-3 py-2" />

              <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact number" required disabled={loading}
                className="w-full border rounded-lg px-3 py-2" />

              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email (optional)" type="email" disabled={loading}
                className="w-full border rounded-lg px-3 py-2" />

              <select name="course" value={formData.course} onChange={handleChange} required disabled={loading} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select Course</option>
                <option>Flute</option><option>Tabla</option><option>Guitar</option><option>Harmonium</option>
              </select>

              <select name="age" value={formData.age} onChange={handleChange} required disabled={loading} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select Age Group</option><option>Under 10</option><option>10-18</option><option>19-30</option><option>31-50+</option>
              </select>

              <select name="gender" value={formData.gender} onChange={handleChange} required disabled={loading} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select Gender</option><option>Female</option><option>Male</option><option>Other</option>
              </select>

              <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} required disabled={loading} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select Enquiry Type</option><option>Book Free Trial</option><option>Enroll in Class</option><option>Book Show / Performance</option><option>Other Enquiry</option>
              </select>

              {error && <div className="text-sm text-red-600 bg-red-50 border p-2 rounded">{error}</div>}

              <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-white py-2 rounded-lg">
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
