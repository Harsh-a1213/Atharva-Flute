import React, { useEffect, useState } from "react";
import Logo from "./assets/Logo.png";

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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${isScrolled ? "bg-black/60 backdrop-blur-lg shadow-md" : "bg-black/30"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <a href="#hero" className="flex items-center h-full">
          <img
            src={Logo}
            alt="Atharva Flute Logo"
            className="h-14 md:h-16 object-contain"
          />
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex space-x-8 text-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-brand-gold transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeWidth={2} strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth={2} strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE NAV */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="flex flex-col items-center py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white text-lg hover:text-brand-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
