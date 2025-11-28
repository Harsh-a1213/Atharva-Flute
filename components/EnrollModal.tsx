import React, { useState } from 'react';

interface Props { isOpen: boolean; onClose: () => void; }

const EnrollModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    age: '',
    gender: '',
    course: '',
    level: '',
    email: '',
    enquiry: '',
    enquiryType: '' // optional but present
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Normalize payload keys expected by Apps Script
    const payload = {
      formType: 'enroll',
      source: 'Enroll Now',
      ...formData,
      name: formData.name || '',
      contact: formData.contact || formData.contact || '',
      email: formData.email || '',
      enquiryType: formData.enquiryType || 'Class Enquiry', // default for enroll
      message: formData.enquiry || ''
    };

    try {
      const res = await fetch('/api/proxy-saveform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const envelope = await res.json();
      if (!envelope || !envelope.ok) {
        console.error('Enroll submission failed:', envelope);
        setError('Submission failed. Please try again.');
        return;
      }

      setSubmitted(true);
      setFormData({
        name: '',
        contact: '',
        age: '',
        gender: '',
        course: '',
        level: '',
        email: '',
        enquiry: '',
        enquiryType: ''
      });
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error('Enroll error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl">&times;</button>

        {submitted ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-green-600">🎉 Enrollment submitted</h3>
            <p className="mt-2">We will contact you soon.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4 text-black text-center">Enroll Now</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full border rounded px-3 py-2" disabled={loading} />
              <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number (WhatsApp)" required className="w-full border rounded px-3 py-2" disabled={loading} />
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email (optional)" className="w-full border rounded px-3 py-2" disabled={loading} />
              <select name="course" value={formData.course} onChange={handleChange} required className="w-full border rounded px-3 py-2" disabled={loading}>
                <option value="">Select Course</option>
                <option value="Flute">Flute</option>
                <option value="Tabla">Tabla</option>
                <option value="Guitar">Guitar</option>
                <option value="Harmonium">Harmonium</option>
              </select>
              <select name="level" value={formData.level} onChange={handleChange} required className="w-full border rounded px-3 py-2" disabled={loading}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <textarea name="enquiry" value={formData.enquiry} onChange={handleChange} placeholder="Additional enquiry (optional)" rows={3} className="w-full border rounded px-3 py-2" disabled={loading} />
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black py-2 rounded font-semibold">
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollModal;
