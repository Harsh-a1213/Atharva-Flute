import React, { useState } from 'react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    course: '',
    age: '',
    gender: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      formType: "free_trial",
      ...formData,
      source: "Book Demo"
   };

    await fetch("https://script.google.com/macros/s/AKfycbzrII67vOQnMXe6dnhBpGMdY25_ZNu175kc8vCZ2lw0924vChywmTWRC45oLGnhzk75/exec", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg relative">
        <button className="absolute top-2 right-3 text-black text-2xl font-bold" onClick={onClose}>
          &times;
        </button>

        {submitted ? (
          <div className="text-center text-green-600 font-bold text-xl py-16">
            🎉 Thank you! We’ll contact you shortly.
          </div>
        ) : (
          <>
            <h2 className="text-2xl text-black font-bold text-center mb-6">Book a Free 1st Demo</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" onChange={handleChange} placeholder="Name" required className="w-full border text-black px-4 py-2" />
              <input type="tel" name="contact" onChange={handleChange} placeholder="Contact" required className="w-full border text-black px-4 py-2" />
              <select name="course" onChange={handleChange} required className="w-full text-black border px-4 py-2">
                <option value="">Select Course</option>
                <option value="Flute">Flute</option>
                <option value="Tabla">Tabla</option>
                <option value="Guitar">Guitar</option>
                <option value="Harmonium">Harmonium</option>
              </select>
              <select name="age" onChange={handleChange} required className="w-full border text-black px-4 py-2">
                <option value="">Select Age Group</option>
                <option value="Under 10">Under 10</option>
                <option value="10-15">10-15</option>
                <option value="16-21">16-21</option>
                <option value="22+">22+</option>
              </select>
              <select name="gender" onChange={handleChange} required className="w-full text-black border px-4 py-2">
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
              <button type="submit" className="w-full bg-brand-gold py-2 rounded font-bold text-brand-dark">Submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDemoModal;
