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
import BookPerformanceModal from './components/BookPerformanceModal';

import instructorImage from "./components/assets/hero.jpg";
import fluteImage from "./components/assets/flute.jpeg";
import harmoniumImage from "./components/assets/harmonium.jpeg";
import guitarImage from "./components/assets/guitar.jpeg";
import tabalaImage from "./components/assets/tabala.jpeg";

import { Instructor, InstrumentClass } from './types';

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);

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
          openBookingModal={() => setIsBookingModalOpen(true)}
          openEnrollModal={() => setIsEnrollModalOpen(true)}
          openPerformanceModal={() => setIsPerformanceModalOpen(true)}
        />

        <About />
        <Classes classes={classesData} />
        <Instructors instructors={instructorData} />
        <Performances openPerformanceModal={() => setIsPerformanceModalOpen(true)} />
        <VideoSlideshow />
        <FAQSection />
        <TestimonialSection />
        <EnquiryForm />

        <BookDemoModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />

        <EnrollModal
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
        />

        <BookPerformanceModal
          isOpen={isPerformanceModalOpen}
          onClose={() => setIsPerformanceModalOpen(false)}
        />
      </main>

    </div>
  );
};

export default App;
