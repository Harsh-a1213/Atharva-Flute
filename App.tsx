import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ClassCard from "./components/ClassCard";
import Instructors from "./components/Instructors";
import Performances from "./components/Performances";
import VideoSlideshow from "./components/VideoSlideshow";
import FAQSection from "./components/FAQSection";
import TestimonialSection from "./components/TestimonialSection";
import EnquiryForm from "./components/EnquiryForm";

import BookDemoModal from "./components/BookDemoModal";
import EnrollModal from "./components/EnrollModal";
import BookPerformanceModal from "./components/BookPerformanceModal";

// Class pages
import Flute from "./components/Flute";
import HarmoniumKeyboard from "./components/HarmoniumKeyboard";
import Guitar from "./components/Guitar";
import Tabla from "./components/Tabla";

// Assets
import instructorImage from "./components/assets/hero.jpg";
import fluteImage from "./components/assets/flute.jpeg";
import harmoniumImage from "./components/assets/harmonium.jpeg";
import guitarImage from "./components/assets/guitar.jpeg";
import tabalaImage from "./components/assets/tabala.jpeg";

// Types
import { Instructor, InstrumentClass } from "./types";

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);

  
  /* ---------------- INSTRUCTORS DATA ---------------- */
  const instructorData: Instructor[] = [
    {
      id: 1,
      name: "Atharva Nerikar",
      instrument: "The Musical Journey of a Modern Bansuri Virtuoso",
      imageUrl: instructorImage,
      bio: "A passionate flautist...",
    },
  ];

  /* ---------------- CLASSES DATA ---------------- */
  const classesData: InstrumentClass[] = [
    {
      id: 1,
      name: "Flute (Specialty)",
      imageUrl: fluteImage,
      link: "/classcard/flute",
    },
    {
      id: 2,
      name: "Harmonium / Keyboard",
      imageUrl: harmoniumImage,
      link: "/classcard/harmonium",
    },
    {
      id: 3,
      name: "Guitar",
      imageUrl: guitarImage,
      link: "/classcard/guitar",
    },
    {
      id: 4,
      name: "Tabla / Drum",
      imageUrl: tabalaImage,
      link: "/classcard/tabla",
    },
  ];

  return (
    <div className="bg-brand-dark font-sans text-white">
      <Header />

      <Routes>
        {/* ---------------- HOME PAGE ---------------- */}
        <Route
          path="/"
          element={
            <>
              <Hero
                openBookingModal={() => setIsBookingModalOpen(true)}
                openEnrollModal={() => setIsEnrollModalOpen(true)}
                openPerformanceModal={() => setIsPerformanceModalOpen(true)}
              />

              <About />
              <ClassCard classes={classesData} />
              <Instructors instructors={instructorData} />
              <Performances
                openPerformanceModal={() => setIsPerformanceModalOpen(true)}
              />
              <VideoSlideshow />
              <FAQSection />
              <TestimonialSection />
              <EnquiryForm />

              {/* MODALS */}
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
            </>
          }
        />

        {/* ---------------- CLASS PAGES ---------------- */}
        <Route path="/classcard/flute" element={<Flute />} />
        <Route path="/classcard/harmonium" element={<HarmoniumKeyboard />} />
        <Route path="/classecard/guitar" element={<Guitar />} />
        <Route path="/classcard/tabla" element={<Tabla />} />
      </Routes>
    </div>
  );
};

export default App;
