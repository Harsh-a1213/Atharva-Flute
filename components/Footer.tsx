import React from "react";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UCrKrzJ35W99201yGdaBqHPg",
      icon:
        "M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.9 1.52 1.76 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23 1.52-.9 1.76-1.75C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.5 15V9l5.5 3-5.5 3z",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/atharvaflute/",
      icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01",
    },
  ];

  return (
    <footer className="bg-white/5 border-t border-white/10 text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-semibold text-brand-gold mb-4">
              Atharva Sanjay Nerikar
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Your journey in music starts here. Learn, explore, and grow through
              classical and contemporary instrumental music.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Information
            </h3>
            <p className="text-gray-400">
              Email:&nbsp;
              <a
                href="mailto:atharvafluteofficial@gmail.com"
                className="hover:text-brand-gold transition"
              >
                atharvafluteofficial@gmail.com
              </a>
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Follow & Connect
            </h3>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="
                    w-11 h-11
                    flex items-center justify-center
                    rounded-full
                    bg-white/5
                    border border-white/10
                    text-gray-300
                    hover:text-brand-gold
                    hover:border-brand-gold/50
                    transition
                  "
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {link.name === "Instagram" ? (
                      <g>
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path d={link.icon}></path>
                      </g>
                    ) : (
                      <path d={link.icon}></path>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Atharva Flute Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
