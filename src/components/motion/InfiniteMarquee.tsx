import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface InfiniteMarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
}

export function InfiniteMarquee({ items, speed = 40, direction = 'left' }: InfiniteMarqueeProps) {
  const { dir } = useLanguage();
  
  // Adjust direction based on RTL
  const effectiveDirection = dir === 'rtl' 
    ? (direction === 'left' ? 'right' : 'left') 
    : direction;

  return (
    <div className="relative w-full overflow-hidden bg-background py-12 border-y border-border/50">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{
          x: effectiveDirection === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item: string, index: number) => (
          <div
            key={index}
            className="flex items-center gap-6"
          >
            <span className="text-4xl md:text-5xl font-black tracking-tighter text-foreground/10 uppercase hover:text-primary/20 transition-colors cursor-default">
              {item}
            </span>
            <img src="/logos/SahlLogo9.png" alt="" className="w-5 h-5 object-contain opacity-20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
