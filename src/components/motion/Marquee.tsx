import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // Kept for interface compatibility, but unused
  className?: string;
  pauseOnHover?: boolean;
  gap?: number;
  pauseDuration?: number; // Unused in CSS implementation
}

/**
 * A flexible Marquee component that auto-scrolls its children.
 * Designed to work with the Sahli design system.
 * Optimized to use CSS animations instead of JS framer-motion to reduce bundle size.
 */
export const Marquee = ({ 
  children, 
  className = "", 
  pauseOnHover = true,
  gap = 24,
}: MarqueeProps) => {
  const [isMobile, setIsMobile] = useState(false);
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
      className={`overflow-hidden ${className} group`}
    >
      <div 
        className={`flex w-max ${dir === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee'} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{ gap: `${gap}px` }}
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
