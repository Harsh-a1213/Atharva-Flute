import React, { useState } from "react";

interface Field { name: string; type: "text"|"email"|"tel"|"number"|"textarea"|"select"; placeholder?: string; options?: string[]; required?: boolean; }
interface FormModalProps { isOpen: boolean; onClose: () => void; formType: "enroll"|"performance"|"demo"|"enquiry"; source: string; fields: Field[]; }

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, formType, source, fields }) => {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
  const [formData, setFormData] = useState<Record<string, string>>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { formType, source, ...formData };

    try {
      const res = await fetch('/api/proxy-saveform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const envelope = await res.json();

      if (!envelope || !envelope.ok) {
        console.error('Failed:', envelope);
        alert('Submission failed. Please try again.');
        return;
      }

      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); onClose(); setFormData(initialState); }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold">&times;</button>

        {submitted ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-[var(--brand-gold)] mb-2">Thank You!</h2>
            <p className="text-gray-700">Your {formType} form has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center">{source}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {fields.map(field => {
                if (field.type === 'textarea') {
                  return <textarea key={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} required={field.required} rows={4} className="border p-3 rounded" disabled={loading} />;
                } else if (field.type === 'select') {
                  return (
                    <select key={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required} className="border p-3 rounded" disabled={loading}>
                      <option value="">{`Select ${field.name}`}</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  );
                } else {
                  return <input key={field.name} type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} required={field.required} className="border p-3 rounded" disabled={loading} />;
                }
              })}

              <button type="submit" disabled={loading} className="bg-[var(--brand-gold)] py-3 rounded font-bold">
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FormModal;
