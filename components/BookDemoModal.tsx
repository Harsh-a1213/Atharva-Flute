import React, { useState } from 'react';

interface Props { isOpen: boolean; onClose: () => void; }

const BookDemoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', contact: '', course: '', age: '', gender: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { formType: "demo", ...formData, source: "Free Trial" };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbzrII67vOQnMXe6dnhBpGMdY25_ZNu175kc8vCZ2lw0924vChywmTWRC45oLGnhzk75/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', contact: '', course: '', age: '', gender: '' });
        setTimeout(() => { setSubmitted(false); onClose(); }, 3000);
      } else alert("Failed to submit. Please try again.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg relative">
        <button className="absolute top-2 right-3 text-black text-2xl font-bold" onClick={onClose}>&times;</button>
        {submitted ? (
          <div className="text-center text-green-600 font-bold text-xl py-16">🎉 Thank you! Your demo request has been submitted.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full border text-black px-4 py-2 rounded" />
            <input type="tel" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required className="w-full border text-black px-4 py-2 rounded" />
            <select name="course" value={formData.course} onChange={handleChange} required className="w-full border text-black px-4 py-2 rounded">
              <option value="">Select Course</option>
              <option value="Flute">Flute</option>
              <option value="Tabla">Tabla</option>
              <option value="Guitar">Guitar</option>
              <option value="Harmonium">Harmonium</option>
            </select>
            <select name="age" value={formData.age} onChange={handleChange} required className="w-full border text-black px-4 py-2 rounded">
              <option value="">Select Age Group</option>
              <option value="Under 10">Under 10</option>
              <option value="10-15">10-15</option>
              <option value="16-21">16-21</option>
              <option value="22+">22+</option>
            </select>
            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full border text-black px-4 py-2 rounded">
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
            <button type="submit" className="w-full bg-brand-gold py-2 rounded font-bold text-brand-dark">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDemoModal;
