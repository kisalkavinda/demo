'use client';

import { useState, useRef } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import MineCanvas from '@/components/MineCanvas';
import ScrollText from '@/components/ScrollText';
import KnowledgeHubPreview from '@/components/KnowledgeHubPreview';
import CTAFooter from '@/components/CTAFooter';
import Navbar from '@/components/Navbar';

const HERO_HIDE_THRESHOLD = 0.04; // scroll progress at which hero is fully gone

export default function Home() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  // heroVisible: true  = at top (show hero), false = scrolled down (hide hero)
  const [heroVisible, setHeroVisible] = useState(true);
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

  // Animate opacity/position while the hero is in the process of fading out
  const heroOpacity = useTransform(scrollYProgress, [0, HERO_HIDE_THRESHOLD], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, HERO_HIDE_THRESHOLD], [0, -50]);

  // Imperatively track scroll: hide hero when scrolled past threshold,
  // restore it only when the user scrolls all the way back to the top.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > HERO_HIDE_THRESHOLD) {
      setHeroVisible(false);
    } else {
      setHeroVisible(true);
    }
  });

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
      <Navbar />

      <div ref={containerRef} className="relative h-[400vh]">
        {/* The pinned canvas and text overlays */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <MineCanvas 
            setLoadingProgress={setLoadingProgress} 
            scrollYProgress={scrollYProgress} 
          />
          
          <div className="absolute inset-0 bg-black/10 pointer-events-none" /> {/* Subtle darkening overlay */}
          
          {/* Hero: animate while fading out, then fully unmount so it never overlaps */}
          {heroVisible && (
            <motion.div 
              style={{ 
                opacity: heroOpacity,
                y: heroY,
                pointerEvents: "none",
              }}
              className="absolute inset-0 z-20"
            >
              <HeroSection loadingProgress={loadingProgress} />
            </motion.div>
          )}

          <ScrollText scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* These sections naturally flow below the pinned scrolling animation */}
      <KnowledgeHubPreview />
      <CTAFooter />
    </motion.main>
  );
}
