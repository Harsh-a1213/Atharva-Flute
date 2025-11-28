import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import Instructors from './components/Instructors';
import Performances from './components/Performances';
import VideoSlideshow from './components/VideoSlideshow';
import FAQSection from './components/FAQSection';
import TestimonialSection from './components/TestimonialSection';
import EnquiryForm from './components/EnquiryForm';
import BookDemoModal from './components/BookDemoModal';
import EnrollModal from './components/EnrollModal';
import BookPerformanceModal from './components/BookPerformanceModal';  // <-- ADDED
import Footer from './components/Footer';

import instructorImage from "./components/assets/hero.jpg";
import fluteImage from "./components/assets/flute.jpeg";
import harmoniumImage from "./components/assets/harmonium.jpeg";
import guitarImage from "./components/assets/guitar.jpeg";
import tabalaImage from "./components/assets/tabala.jpeg";

import { Instructor, InstrumentClass } from './types';

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false); // <-- ADDED

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const openEnrollModal = () => setIsEnrollModalOpen(true);
  const closeEnrollModal = () => setIsEnrollModalOpen(false);

  const openPerformanceModal = () => setIsPerformanceModalOpen(true); // <-- ADDED
  const closePerformanceModal = () => setIsPerformanceModalOpen(false); // <-- ADDED

  const instructorData: Instructor[] = [
    {
      id: 1,
      name: 'Atharva Nerikar',
      instrument: 'The Musical Journey of a Modern Bansuri Virtuoso',
      imageUrl: instructorImage,
      bio: 'A passionate flautist...',
    },
  ];

  const classesData: InstrumentClass[] = [
    { id: 1, name: 'Flute (Specialty)', imageUrl: fluteImage, description: '...' },
    { id: 2, name: 'Harmonium / Keyboard', imageUrl: harmoniumImage, description: '...' },
    { id: 3, name: 'Guitar', imageUrl: guitarImage, description: '...' },
    { id: 4, name: 'Tabla / Drum', imageUrl: tabalaImage, description: '...' },
  ];

  return (
    <div className="bg-brand-dark font-sans text-white">
      <Header />
      <main>
        <Hero
          openBookingModal={openBookingModal}
          openEnrollModal={openEnrollModal}
          openPerformanceModal={openPerformanceModal}   // <-- ADDED
        />
        <About />
        <Classes classes={classesData} />
        <Instructors instructors={instructorData} />
        <Performances openPerformanceModal={openPerformanceModal} />
        <VideoSlideshow />
        <FAQSection />
        <TestimonialSection />
        <EnquiryForm />
        
        <BookDemoModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
        <EnrollModal isOpen={isEnrollModalOpen} onClose={closeEnrollModal} />
        <BookPerformanceModal 
          isOpen={isPerformanceModalOpen}
          onClose={closePerformanceModal}
        /> 
      </main>
      <Footer />
    </div>
  );
};

export default App;
