// components/Header.tsx
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-lg shadow-md"
          : "bg-black/30"
      }`}
    >
      {/* MAIN BAR */}
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <a
          href="#hero"
          aria-label="Athrva Flute Home"
          className="flex items-center"
        >
          <img
            src={Logo}
            alt="Athrva Flute Logo"
            className="
              max-h-[64px]
              md:max-h-[70px]
              lg:max-h-[76px]
              w-auto
              object-contain
              contrast-125
              brightness-110
              select-none
            "
            draggable={false}
          />
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white font-medium tracking-wide hover:text-yellow-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[400px]" : "max-h-0"
        } bg-black/90 backdrop-blur-md`}
      >
        <div className="flex flex-col items-center py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg hover:text-yellow-400 transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
