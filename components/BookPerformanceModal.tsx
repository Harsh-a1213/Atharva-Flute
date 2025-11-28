import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BookPerformanceModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
    enquiryType: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null; // <-- THIS requires isOpen to be passed from parent

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      formType: "performance",
      source: "Book Performance",
      ...formData,
      name: formData.name.trim(),
      contact: (formData.contact || formData.email).trim(),
      email: (formData.email || "").trim(),
      message: (formData.message || "").trim(),
      enquiryType: formData.enquiryType || "Performance/Concert Enquiry"
    };

    if (!payload.name || !payload.contact) {
      setError("Name and contact (phone/email) are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/proxy-saveform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const envelope = await res.json();

      if (!envelope?.ok) {
        setError("Submission failed.");
        return;
      }

      setSubmitted(true);
      setTimeout(() => onClose(), 2000);

    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl">&times;</button>

        {submitted ? (
          <div className="text-center py-8">
            <h3 className="text-green-600 text-2xl font-bold">🎉 Booking submitted!</h3>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4 text-center">Book Performance</h3>
            <form onSubmit={handleSubmit} className="space-y-3">

              <input name="name" value={formData.name} onChange={handleChange}
                     placeholder="Your Name" required
                     className="w-full border px-3 py-2 rounded" />

              <input name="contact" value={formData.contact} onChange={handleChange}
                     placeholder="Contact Number"
                     className="w-full border px-3 py-2 rounded" />

              <input name="email" type="email" value={formData.email} onChange={handleChange}
                     placeholder="Email (optional)"
                     className="w-full border px-3 py-2 rounded" />

              <textarea name="message" value={formData.message} onChange={handleChange}
                        rows={4} placeholder="Event details"
                        className="w-full border px-3 py-2 rounded"></textarea>

              {error && <p className="text-red-600">{error}</p>}

              <button type="submit"
                      className="w-full bg-yellow-500 py-2 rounded font-bold">
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookPerformanceModal;
