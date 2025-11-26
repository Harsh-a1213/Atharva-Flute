import React, { useState } from 'react';

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        formType: 'enquiry',
        source: 'Website - Enquiry Section',
        name: formData.name,
        contact: formData.phone,
        email: formData.email,
        message: formData.message
      };

      const res = await fetch('/api/proxy-saveform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const envelope = await res.json();
      if (!envelope || !envelope.ok) {
        console.error('Submission failed:', envelope);
        setError('Submission failed. Please try again.');
        return;
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Submission failed:', err);
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[var(--brand-gray)]">
      <div className="container mx-auto px-6">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-4xl font-serif font-bold text-[var(--brand-gold)] mb-4">Thank You!</h2>
            <p className="text-lg text-[var(--brand-light)]">Your enquiry has been sent. We’ll get back to you shortly!</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-4xl font-serif font-bold text-[var(--brand-gold)] mb-6">Enroll, Book & Inquire</h2>
              <p className="text-lg text-[var(--brand-light)] max-w-3xl mx-auto leading-relaxed mb-12">
                Ready to start your musical journey, book a performance, or have a question? Fill out the form below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
              {['name', 'email', 'phone'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-[var(--brand-light)] mb-2">
                    {field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Phone Number (Optional)'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    name={field}
                    id={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required={field !== 'phone'}
                    className="w-full bg-[var(--brand-dark)] border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    placeholder={field === 'name' ? 'Enter your full name' : field === 'email' ? 'your@email.com' : 'Optional'}
                    disabled={loading}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--brand-light)] mb-2">Your Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="e.g., I’d like to know more about flute lessons..."
                  className="w-full bg-[var(--brand-dark)] border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                  disabled={loading}
                />
              </div>

              {error && <div className="text-sm text-red-600 bg-red-50 border p-2 rounded">{error}</div>}

              <div className="text-center">
                <button type="submit" disabled={loading} className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full text-lg">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default EnquiryForm;
