import React, { useState } from 'react';

interface Props { onClose: () => void; }

const BookPerformanceModal: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { formType: "performance", ...formData, source: "Book Performance" };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbzhrhieMVZ9RYhnGrCA9e6OUr2wI5tl90SegwzFiS1XxSXo-b1hDKTPACL8DYoqJkNC/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => { setSubmitted(false); onClose(); }, 3000);
      } else alert("Failed to submit. Please try again.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-black text-xl font-bold">&times;</button>
        {submitted ? (
          <div className="text-center py-10 text-green-600 font-bold text-xl">
            🎉 Thank you! Your booking has been submitted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">Book My Performance</h2>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
            <textarea name="message" placeholder="Event Details / Message" value={formData.message} onChange={handleChange} rows={4} required className="w-full border px-4 py-2 rounded" />
            <button type="submit" className="w-full bg-brand-gold py-2 rounded font-bold text-brand-dark">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookPerformanceModal;
