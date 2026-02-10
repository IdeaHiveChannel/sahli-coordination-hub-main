import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
  gap?: number;
  pauseDuration?: number; // Duration to pause after interaction (ms)
}

/**
 * A flexible Marquee component that auto-scrolls its children.
 * Designed to work with the Sahli design system.
 */
export const Marquee = ({ 
  children, 
  speed = 0.4, 
  className = "", 
  pauseOnHover = true,
  gap = 24,
  pauseDuration = 3500
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(0);
  const { dir } = useLanguage();

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate content width for seamless looping
  useEffect(() => {
    if (containerRef.current && isMobile) {
      const calculateWidth = () => {
        if (containerRef.current) {
          const firstChild = containerRef.current.children[0] as HTMLElement;
          if (firstChild) {
            // contentWidth is the width of one set of children plus the gap between the two sets
            setContentWidth(firstChild.offsetWidth + gap);
          }
        }
      };

      // We need to wait a bit for layout to settle
      const timer = setTimeout(calculateWidth, 100);
      
      // Also observe resize of the container content
      const observer = new ResizeObserver(calculateWidth);
      if (containerRef.current.children[0]) {
        observer.observe(containerRef.current.children[0]);
      }

      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }
  }, [children, isMobile, gap]);

  // Animation loop
  useAnimationFrame((time) => {
    if (!isMobile || contentWidth === 0) return;
    
    // Check if we should be paused due to recent interaction
    const currentTime = performance.now();
    const shouldPause = isInteracting || (currentTime - lastInteractionTime < pauseDuration);
    if (pauseOnHover && shouldPause) return;
    
    const direction = dir === 'rtl' ? 1 : -1;
    let nextX = x.get() + (speed * direction);
    
    // Reset position for seamless loop
    if (dir === 'rtl') {
      if (nextX >= contentWidth) {
        nextX -= contentWidth;
      } else if (nextX < 0) {
        nextX += contentWidth;
      }
    } else {
      if (nextX <= -contentWidth) {
        nextX += contentWidth;
      } else if (nextX > 0) {
        nextX -= contentWidth;
      }
    }
    
    x.set(nextX);
  });

  const handleInteractionStart = () => {
    setIsInteracting(true);
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
    setLastInteractionTime(performance.now());
    
    // Smooth reset to within contentWidth bounds if needed after drag
    const currentX = x.get();
    if (dir === 'rtl') {
      if (currentX >= contentWidth) x.set(currentX - contentWidth);
      else if (currentX < 0) x.set(currentX + contentWidth);
    } else {
      if (currentX <= -contentWidth) x.set(currentX + contentWidth);
      else if (currentX > 0) x.set(currentX - contentWidth);
    }
  };

  // On desktop, just render the children normally without marquee
  if (!isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      <motion.div 
        ref={containerRef} 
        style={{ x, gap: `${gap}px` }} 
        className="flex w-max"
        drag="x"
        dragElastic={0.1}
        onDragStart={handleInteractionStart}
        onDragEnd={handleInteractionEnd}
      >
        {/* Render children twice for seamless loop */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
