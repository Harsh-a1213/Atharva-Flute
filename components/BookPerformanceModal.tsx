import React, { useState } from 'react';

interface Props { onClose: () => void; isOpen: boolean; }

const BookPerformanceModal: React.FC<Props> = ({ onClose, isOpen }) => {
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', message: '', enquiryType: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      formType: 'performance',
      source: 'Book Performance',
      ...formData,
      name: formData.name || '',
      contact: formData.contact || formData.contact || '',
      email: formData.email || '',
      enquiryType: formData.enquiryType || 'Performance/Concert Enquiry',
      message: formData.message || ''
    };

    try {
      const res = await fetch('/api/proxy-saveform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const envelope = await res.json();
      if (!envelope || !envelope.ok) {
        console.error('Performance submit failed:', envelope);
        setError('Submission failed. Please try again.');
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', contact: '', email: '', message: '', enquiryType: '' });
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Performance error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl">&times;</button>

        {submitted ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-green-600">🎉 Booking submitted</h3>
            <p>We will contact you about the performance details.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-4 text-center">Book a Performance</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full border rounded px-3 py-2" disabled={loading} />
              <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" required className="w-full border rounded px-3 py-2" disabled={loading} />
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email (optional)" className="w-full border rounded px-3 py-2" disabled={loading} />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Event details / message" rows={4} className="w-full border rounded px-3 py-2" disabled={loading} />
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button type="submit" disabled={loading} className="w-full bg-brand-gold py-2 rounded text-brand-dark font-semibold">
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookPerformanceModal;
