import React, { useState } from "react";

interface Field {
  name: string;
  type: "text" | "email" | "tel" | "number" | "textarea" | "select";
  placeholder?: string;
  options?: string[]; // for select
  required?: boolean;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: "enroll" | "performance" | "demo" | "enquiry";
  source: string;
  fields: Field[];
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, formType, source, fields }) => {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
  const [formData, setFormData] = useState<Record<string, string>>(initialState);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      formType,
      ...formData,
      source,
    };

    try {
      const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzhrhieMVZ9RYhnGrCA9e6OUr2wI5tl90SegwzFiS1XxSXo-b1hDKTPACL8DYoqJkNC/exec",
       {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFormData(initialState);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        alert("Thsnk You! Your submission was received.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-[var(--brand-gold)] mb-2">Thank You!</h2>
            <p className="text-gray-700">Your {formType} form has been submitted successfully.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-center text-[var(--brand-dark)]">{source}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {fields.map((field) => {
                if (field.type === "textarea") {
                  return (
                    <textarea
                      key={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      rows={4}
                      required={field.required}
                      className="border border-gray-300 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  );
                } else if (field.type === "select") {
                  return (
                    <select
                      key={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    >
                      <option value="">Select {field.name}</option>
                      {field.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  );
                } else {
                  return (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
                    />
                  );
                }
              })}
              <button
                type="submit"
                className="bg-[var(--brand-gold)] text-[var(--brand-dark)] font-bold py-3 px-6 rounded hover:bg-yellow-300 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FormModal;
