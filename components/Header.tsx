// components/Header.tsx
import React, { useEffect, useState } from "react";
import Logo from "./assets/Logo.png"; // <-- exact, case-sensitive path

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#classes", label: "Classes" },
  { href: "#instructors", label: "Instructors" },
  { href: "#performances", label: "Performances" },
  { href: "#contact", label: "Contact" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Sticky header
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-lg bg-black/70 shadow-md" : "bg-black/40"
      }`}
      role="banner"
    >
      <div className="max-w-screen-xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="h-full flex items-center" aria-label="Go to top / hero">
          <picture>
            <img
              src={Logo}
              alt="Atharva Flute Logo"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain"
              width={180}
              height={56}
              loading="eager"
              decoding="async"
            />
          </picture>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center space-x-8"
          role="navigation"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen((s) => !s)}
            className="text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav — slides down */}
      <div
        id="mobile-nav"
        className={`md:hidden w-full bg-black/90 backdrop-blur-md absolute left-0 z-40 transition-transform duration-300 origin-top ${
          isOpen ? "transform scale-y-100" : "transform scale-y-0 pointer-events-none"
        }`}
        style={{ transformOrigin: "top" }}
        aria-hidden={!isOpen}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-yellow-400 transition-colors duration-200 w-full text-center py-2 rounded"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
