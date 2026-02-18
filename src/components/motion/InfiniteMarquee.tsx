import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  gap?: number;
  speed?: number; // Duration in seconds
}

/**
 * An infinite scrolling marquee component that works on all screen sizes.
 * Unlike the standard Marquee component, this does not disable on desktop.
 * Uses Tailwind CSS animations defined in tailwind.config.ts.
 */
export const InfiniteMarquee = ({ 
  children, 
  className = "", 
  pauseOnHover = true,
  gap = 24,
  speed = 20, // Default duration matches tailwind config default
}: InfiniteMarqueeProps) => {
  const { dir } = useLanguage();
  
  const isRtl = dir === 'rtl';
  // animate-marquee: moves 0 to -50% (Leftward)
  // animate-marquee-rtl: moves -50% to 0 (Rightward)
  const animationClass = isRtl ? 'animate-marquee-rtl' : 'animate-marquee';
  
  return (
    <div 
      className={`overflow-hidden ${className} group`}
    >
      <div 
        className={`flex w-max ${animationClass} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ 
          gap: `${gap}px`,
          animationDuration: `${speed}s`,
          paddingInlineEnd: `${gap}px`, // Ensure total width is exactly 2x the repeat distance
        }}
      >
        {/* Render children twice for seamless loop */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
};
