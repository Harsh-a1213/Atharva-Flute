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
import Footer from './components/Footer';

// ✅ Import images directly (adjust paths as needed)
import instructorImage from "./components/assets/hero.jpg";
import fluteImage from "./components/assets/flute.jpeg";
import harmoniumImage from "./components/assets/harmonium.jpeg";
import guitarImage from "./components/assets/guitar.jpeg";
import tabalaImage from "./components/assets/tabala.jpeg";

import { Instructor, InstrumentClass } from './types';

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const openEnrollModal = () => setIsEnrollModalOpen(true);
  const closeEnrollModal = () => setIsEnrollModalOpen(false);

  const instructorData: Instructor[] = [
    {
      id: 1,
      name: 'Atharva Nerikar',
      instrument: 'The Musical Journey of a Modern Bansuri Virtuoso',
      imageUrl: instructorImage,
      bio: 'A passionate flautist from the culturally rich city of Nashik, India, Atharva Nerikar journey with music began at an early age. Mentored by the esteemed guru Mr. Pravin Gulve, he has honed his craft through years of dedicated practice. His artistry has taken him across the globe, sharing evocative stories through his music with audiences worldwide.'
    },
  ];

  const classesData: InstrumentClass[] = [
    {
      id: 1,
      name: 'Flute (Specialty)',
      imageUrl: fluteImage,
      description: 'Master the soul-stirring art of the flute, from fundamental techniques to advanced melodic improvisation.',
    },
    {
      id: 2,
      name: 'Harmonium / Keyboard',
      imageUrl: harmoniumImage,
      description: 'Learn to play beautiful melodies and chords on the harmonium or keyboard, perfect for vocal accompaniment.',
    },
    {
      id: 3,
      name: 'Guitar',
      imageUrl: guitarImage,
      description: 'Strum your way to success with our comprehensive guitar lessons, covering everything from basic chords to complex solos.',
    },
    {
      id: 4,
      name: 'Tabla / Drum',
      imageUrl: tabalaImage,
      description: 'Find your rhythm and drive the beat with dynamic tabla or drum lessons for all skill levels.',
    },
  ];

  return (
    <div className="bg-brand-dark font-sans text-white">
      <Header />
      <main>
        <Hero
          openBookingModal={openBookingModal}
          openEnrollModal={openEnrollModal}
        />
        <About />
        <Classes classes={classesData} />
        <Instructors instructors={instructorData} />
        <Performances />
        <VideoSlideshow />
        <FAQSection />
        <TestimonialSection />
        <EnquiryForm />
        <BookDemoModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
        <EnrollModal isOpen={isEnrollModalOpen} onClose={closeEnrollModal} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
