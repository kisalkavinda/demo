'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  loadingProgress: number;
}

export default function HeroSection({ loadingProgress }: HeroSectionProps) {
  const isLoaded = loadingProgress === 100;

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-8xl font-serif text-white/95 tracking-wide mb-4 drop-shadow-xl">
              GemHaven
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-light tracking-wide max-w-2xl drop-shadow-md">
              Sri Lanka&apos;s Gem Trade, Digitally Transformed
            </p>
          </motion.div>
        )}
      </div>

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span className="text-white/60 text-xs tracking-widest uppercase">Scroll to Descend</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-5 border-b border-r border-white/60 rotate-45 transform"
          />
        </motion.div>
      )}
    </section>
  );
}
