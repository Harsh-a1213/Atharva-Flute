import React from 'react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCrKrzJ35W99201yGdaBqHPg',
      icon:
        'M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.9 1.52 1.76 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23 1.52-.9 1.76-1.75C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.5 15V9l5.5 3-5.5 3z',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/atharvaflute/',
      icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01',
    },
  ];

  return (
    <footer className="bg-brand-gray border-t border-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-serif font-bold text-brand-gold mb-4">
              Atharva Sanjay Nerikar
            </h3>
            <p className="text-gray-400">
              Your journey in music starts here. Join our Class and Learn from Scratch
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <p className="text-gray-400">
              Email:{' '}
              <a
                href="mailto:atharvanerikar@gmail.com"
                className="hover:text-brand-gold"
              >
                atharvafluteofficial@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-gold transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {link.name === 'Instagram' ? (
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
                        ></rect>
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

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Atharva Flute Academy. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
