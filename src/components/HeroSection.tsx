'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  loadingProgress: number;
}

export default function HeroSection({ loadingProgress }: HeroSectionProps) {
  const isLoaded = loadingProgress === 100;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Trigger the CSS transition shortly after mounting the container
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center pointer-events-none z-10">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-white/60 tracking-wider text-sm uppercase">Preparing Journey</h2>
            <div className="w-48 h-1 bg-white/10 rounded overflow-hidden">
              <div 
                className="h-full bg-white/80 transition-all duration-300 ease-out" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-white/40 text-xs font-mono">{loadingProgress}%</p>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center transition-all duration-1000 ease-out ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <h1 className="text-5xl md:text-8xl font-serif text-white/95 tracking-wide mb-4 drop-shadow-xl">
              Thennakon Gems
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-light tracking-wide max-w-2xl drop-shadow-md">
              Sri Lanka&apos;s Gem Trade, Digitally Transformed
            </p>
          </div>
        )}
      </div>

      {isLoaded && (
        <div
          className={`absolute bottom-12 flex flex-col items-center gap-3 transition-all duration-1000 delay-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll to Descend</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-5 border-b border-r border-white/60 rotate-45 transform"
          />
        </div>
      )}
    </section>
  );
}


