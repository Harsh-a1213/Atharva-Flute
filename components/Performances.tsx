import React, { useState } from 'react';
import {
  performanceImage1,
  performanceImage2,
  performanceImage3,
  performanceImage4,
  performanceImage5,
  performanceImage6,
} from './assets';

const occasions = [
  { name: 'Weddings', imageUrl: performanceImage1 },
  { name: 'Bhajans & Spiritual Gatherings', imageUrl: performanceImage2 },
  { name: 'Birthday Parties', imageUrl: performanceImage3 },
  { name: 'Corporate Events', imageUrl: performanceImage4 },
  { name: 'Personal Gigs', imageUrl: performanceImage5 },
  { name: 'Private Shows', imageUrl: performanceImage6 },
];

const Performances: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    place: '',
    eventType: '',
    enquiry: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // You can add form submission logic here (API or Google Sheets)
    setIsModalOpen(false);
    setFormData({
      name: '',
      contact: '',
      date: '',
      place: '',
      eventType: '',
      enquiry: '',
    });
  };

  return (
    <section id="performances" className="py-20 bg-brand-dark text-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-serif font-bold text-brand-gold mb-6">
            Performances for Every Occasion
          </h2>
          <p className="text-lg text-brand-light max-w-3xl mx-auto leading-relaxed mb-12">
            Elevate your special event with the soulful sound of live music. Atharva Nerikar provides memorable musical experiences tailored for weddings, bhajans, parties, and all types of special occasions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((occasion) => (
            <div
              key={occasion.name}
              className="relative rounded-lg overflow-hidden shadow-2xl group"
            >
              <img
                src={occasion.imageUrl}
                alt={occasion.name}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-2xl font-serif font-bold text-white text-center p-4">
                  {occasion.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-gold text-brand-dark font-bold py-4 px-10 rounded-full text-lg hover:bg-yellow-300 transition-transform transform hover:scale-105"
          >
            Book a Performance
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
            <div className="bg-white text-black rounded-2xl max-w-lg w-full p-8 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-4 text-xl font-bold"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4 text-center">Book a Performance</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  required
                />
                <input
                  type="text"
                  name="place"
                  placeholder="Event Location"
                  value={formData.place}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <input
                  type="text"
                  name="eventType"
                  placeholder="Type of Event (e.g. Wedding, Corporate)"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                />
                <textarea
                  name="enquiry"
                  placeholder="Any additional enquiry..."
                  value={formData.enquiry}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded"
                  rows={3}
                />
                <button
                  type="submit"
                  className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded hover:bg-yellow-400 transition"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Performances;
