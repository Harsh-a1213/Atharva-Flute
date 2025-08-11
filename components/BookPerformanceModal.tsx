import React from 'react';

interface ModalProps {
  onClose: () => void;
}

const BookPerformanceModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Book My Performance</h2>

        {/* Optional form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Message / Event Details"
            className="border p-2 rounded resize-none"
            rows={4}
          />
          <button
            type="submit"
            className="bg-[var(--brand-gold)] text-[var(--brand-dark)] font-bold py-2 px-6 rounded hover:bg-yellow-300 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookPerformanceModal;
