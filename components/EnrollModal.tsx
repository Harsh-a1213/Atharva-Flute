import React, { useState } from 'react';

interface Props { isOpen: boolean; onClose: () => void; }

const EnrollModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '', contact: '', age: '', gender: '', course: '', level: '', email: '', enquiry: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { formType: "enroll", ...formData, source: "Enroll Now" };

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbzrII67vOQnMXe6dnhBpGMdY25_ZNu175kc8vCZ2lw0924vChywmTWRC45oLGnhzk75/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', contact: '', age: '', gender: '', course: '', level: '', email: '', enquiry: '' });
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
      <div className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-xl relative">
        <button className="absolute top-3 right-3 text-black text-xl font-bold" onClick={onClose}>&times;</button>
        {submitted ? (
          <div className="text-center py-10 text-green-600 font-bold text-xl">🎉 Thank you! Enrollment submitted.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
            <input type="tel" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full border px-4 py-2 rounded">
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            <select name="course" value={formData.course} onChange={handleChange} required className="w-full border px-4 py-2 rounded">
              <option value="">Select Course</option>
              <option value="Flute">Flute</option>
              <option value="Tabla">Tabla</option>
              <option value="Guitar">Guitar</option>
              <option value="Harmonium">Harmonium</option>
            </select>
            <select name="level" value={formData.level} onChange={handleChange} required className="w-full border px-4 py-2 rounded">
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
            <textarea name="enquiry" placeholder="Additional Enquiry" value={formData.enquiry} onChange={handleChange} rows={3} className="w-full border px-4 py-2 rounded" />
            <button type="submit" className="w-full bg-brand-gold py-2 rounded font-bold text-brand-dark">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnrollModal;
