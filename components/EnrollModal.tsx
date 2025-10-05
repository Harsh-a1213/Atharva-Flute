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
    email: '',
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

    const payload = {
    formType: "enroll",
    ...formData,
    source: "Enroll Now",
  };

  try {
    fetch("https://script.google.com/macros/s/AKfycbzrII67vOQnMXe6dnhBpGMdY25_ZNu175kc8vCZ2lw0924vChywmTWRC45oLGnhzk75/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Enrollment form submitted successfully!");
    onClose();

    // Reset the form
    setFormData({
      name: '',
      contact: '',
      age: '',
      gender: '',
      course: '',
      level: '',
      email: '',
      enquiry: '',
       });
  } catch (error) {
    console.error("Error submitting enrollment:", error);
    alert("Something went wrong. Please try again.");
  }
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
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
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
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
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
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />

          <textarea
            name="enquiry"
            placeholder="Any additional enquiry?"
            value={formData.enquiry}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold"
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
