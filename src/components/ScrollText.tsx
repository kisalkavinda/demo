'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface ScrollTextProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollText({ scrollYProgress }: ScrollTextProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
      {/* 1. Frame 1 region */}
      <RegionText
        progress={scrollYProgress}
        range={[0.02, 0.08, 0.15, 0.2]}
        caption="Ratnapura, Sri Lanka"
        title="Where Every Gem Begins"
        position="bottom-left"
      />

      {/* 2. Mid descent region */}
      <RegionText
        progress={scrollYProgress}
        range={[0.35, 0.45, 0.55, 0.65]}
        caption="Depths of 30 Feet"
        title="The Journey Underground"
        position="center"
      />

      {/* 3. Pit floor region */}
      <RegionText
        progress={scrollYProgress}
        range={[0.75, 0.85, 0.95, 1]}
        caption="The Illama Layer"
        title="Here Sapphires Are Born"
        position="center"
      />
    </div>
  );
}

function RegionText({
  progress,
  range,
  caption,
  title,
  position
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  caption: string;
  title: string;
  position: 'bottom-left' | 'center';
}) {
  // opacity mapping: start fade in, full opacity, full opacity, start fade out
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [50, 0, 0, -50]);

  const alignmentClasses = position === 'bottom-left'
    ? 'absolute bottom-20 left-10 md:left-20 text-left'
    : 'absolute flex flex-col items-center justify-center text-center inset-0';

  return (
    <motion.div style={{ opacity, y }} className={alignmentClasses}>
      <span className="text-white/60 text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-4 block">
        {caption}
      </span>
      <h2 className="text-3xl md:text-6xl font-serif text-white/95 tracking-wide drop-shadow-xl">
        {title}
      </h2>
    </motion.div>
  );
}
