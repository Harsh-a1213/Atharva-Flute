import React, { useState } from 'react';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnrollModal: React.FC<EnrollModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    age: '',
    gender: '',
    course: '',
    level: '',
    mail: '',
    enquiry: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enrollment Form Submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-brand-dark">Enroll Now</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2"
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2"
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2"
          >
            <option value="">Select Course</option>
            <option value="Flute">Flute</option>
            <option value="Tabla">Tabla</option>
            <option value="Violin">Guitar</option>
            <option value="Other">Harmonium</option>
          </select>

          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <input
            type="email"
            name="mail"
            placeholder="Email Address"
            value={formData.mail}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2"
          />

          <textarea
            name="enquiry"
            placeholder="Any additional enquiry?"
            value={formData.enquiry}
            onChange={handleChange}
            rows={3}
            className="w-full border  border-gray-300 text-gray-800 rounded-lg px-4 py-2"
          />

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-brand-gold text-brand-dark font-bold px-6 py-2 rounded-lg hover:bg-yellow-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollModal;
