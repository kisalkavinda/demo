'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = ['Our Story', 'Gem Catalog', 'Mining Plots', 'Auctions'];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;

      if (scrollingDown && currentY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="navbar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto px-8 pt-6 flex items-center justify-between">

            {/* Logo — left */}
            <div className="pointer-events-auto flex items-center gap-2 select-none">
              <span className="font-serif text-base tracking-widest text-white/90 drop-shadow-md uppercase">
                Thennakon
              </span>
              <span
                className="text-xs tracking-widest uppercase font-light drop-shadow-md"
                style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.22em' }}
              >
                Gems
              </span>
            </div>

            {/* Nav links — center */}
            <nav className="pointer-events-auto hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  className="text-xs tracking-widest uppercase text-white/50 hover:text-white/90 transition-colors duration-200 drop-shadow-md"
                  style={{ fontFamily: 'inherit', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {link}
                </button>
              ))}
            </nav>

            {/* CTA buttons — right */}
            <div className="pointer-events-auto flex items-center gap-4">
              <button
                className="hidden sm:block text-xs tracking-widest uppercase text-white/50 hover:text-white/90 transition-colors duration-200 drop-shadow-md"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Sign In
              </button>
              <button
                className="text-xs tracking-widest uppercase px-5 py-2 rounded-full text-white/80 hover:text-white transition-all duration-200 drop-shadow-md"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  letterSpacing: '0.15em',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
                }}
              >
                Get Started
              </button>
            </div>

          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
