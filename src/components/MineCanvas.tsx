'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'framer-motion';

interface MineCanvasProps {
  setLoadingProgress: (progress: number) => void;
  scrollYProgress: MotionValue<number>;
}

export default function MineCanvas({ setLoadingProgress, scrollYProgress }: MineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const totalFrames = 382;

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 2 : 1; // Load every 2nd frame on mobile
    const framesToLoad: number[] = [];

    for (let i = 1; i <= totalFrames; i += step) {
      framesToLoad.push(i);
    }
    // ensure last frame is included
    if (framesToLoad[framesToLoad.length - 1] !== totalFrames) {
      framesToLoad.push(totalFrames);
    }

    const imgs: HTMLImageElement[] = [];

    framesToLoad.forEach((frameIdx) => {
      const img = new Image();
      const paddedIdx = String(frameIdx).padStart(4, '0');
      img.src = `/frames/${paddedIdx}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / framesToLoad.length) * 100));
        
        if (loadedCount === framesToLoad.length) {
          imagesRef.current = imgs;
          setLoaded(true);
          setLoadingProgress(100);
        }
      };
      imgs.push(img);
    });
  }, [setLoadingProgress]);

  // Render logic
  useEffect(() => {
    if (!loaded || !canvasRef.current || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (progress: number) => {
      const frames = imagesRef.current;
      const count = frames.length;
      
      // Map progress to frame index
      let frameIndex = Math.floor(progress * count);
      if (frameIndex >= count) frameIndex = count - 1;
      if (frameIndex < 0) frameIndex = 0;

      const currentImage = frames[frameIndex];
      if (!currentImage || !currentImage.complete) return;

      // Draw image to cover canvas (object-fit: cover logic)
      const { width: cW, height: cH } = canvas;
      const { width: iW, height: iH } = currentImage;
      const ratio = Math.max(cW / iW, cH / iH);
      const newWidth = iW * ratio;
      const newHeight = iH * ratio;
      const offsetX = (cW - newWidth) / 2;
      const offsetY = (cH - newHeight) / 2;

      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(currentImage, offsetX, offsetY, newWidth, newHeight);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(scrollYProgress.get());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize & draw

    // Unsubscribe from framer motion value
    const unsubscribe = scrollYProgress.on('change', (latest: number) => {
      requestAnimationFrame(() => render(latest));
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, [loaded, scrollYProgress]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}
