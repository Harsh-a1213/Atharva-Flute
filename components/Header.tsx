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
      {/* HEADER BAR */}
      <div className="max-w-screen-xl mx-auto px-4 py-2 md:px-6 md:py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <a href="#hero" aria-label="Athrva Flute Home" className="flex items-center">
          <img
            src={Logo}
            alt="Athrva Flute Logo"
            className="
              max-h-[52px]
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
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                relative
                text-[18px]
                font-semibold
                tracking-wide
                text-white
                transition-colors duration-300
                hover:text-yellow-400
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0
                after:bg-yellow-400
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
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

      {/* MOBILE NAV */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        } bg-black/95 backdrop-blur-lg`}
      >
        <div className="flex flex-col items-center py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="
                w-full text-center
                py-3
                text-lg
                font-semibold
                tracking-wide
                text-white
                hover:text-yellow-400
                transition
              "
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
