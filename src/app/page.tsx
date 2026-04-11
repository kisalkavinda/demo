'use client';

import { useState, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import MineCanvas from '@/components/MineCanvas';
import ScrollText from '@/components/ScrollText';
import KnowledgeHubPreview from '@/components/KnowledgeHubPreview';
import CTAFooter from '@/components/CTAFooter';

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll specifically for the interactive animation section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background color interpolation: #1a1a0e (Surface) to #0e0804 (Underground)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#1a1a0e", "#0e0804"]
  );

  return (
    <motion.main 
      style={{ backgroundColor }}
      className="min-h-screen transition-colors duration-200"
    >
      {/* 
        This wrapper creates the scrollable height. 
        It needs to be tall enough to allow smooth scrubbing of all 382 frames.
        400vh is a good starting point. 
      */}
      <div ref={containerRef} className="relative h-[400vh]">
        {/* The pinned canvas and text overlays */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <MineCanvas 
            setLoadingProgress={setLoadingProgress} 
            scrollYProgress={scrollYProgress} 
          />
          
          <div className="absolute inset-0 bg-black/10 pointer-events-none" /> {/* Subtle darkening overlay */}
          
          <ScrollText scrollYProgress={scrollYProgress} />
          <HeroSection loadingProgress={loadingProgress} />
        </div>
      </div>

      {/* These sections naturally flow below the pinned scrolling animation */}
      <KnowledgeHubPreview />
      <CTAFooter />
    </motion.main>
  );
}
