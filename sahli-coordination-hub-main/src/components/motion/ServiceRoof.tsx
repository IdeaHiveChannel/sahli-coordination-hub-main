import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceRoofProps {
  title: string;
  description?: string;
  path: string;
  index: number;
  imageUrl?: string;
  icon?: React.ReactNode;
  status?: 'live' | 'coming-soon';
  showDescription?: boolean;
  subcategories?: string[];
}

export function ServiceRoof({ 
  title, 
  description, 
  path, 
  index, 
  imageUrl, 
  icon, 
  status = 'live',
  showDescription = true,
  subcategories = []
}: ServiceRoofProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t, dir } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isComingSoon = status === 'coming-soon';

  const content = (
    <motion.div
      className={`relative h-[360px] md:h-[450px] w-full rounded-[var(--radius)] border border-border bg-card overflow-hidden ${isComingSoon ? 'cursor-default opacity-80' : 'cursor-pointer'} group transition-all duration-700 ease-out-expo btn-shine`}
      whileHover={!isComingSoon && !isMobile ? { 
        y: -10,
        borderColor: 'hsla(var(--primary), 0.3)',
        boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.4)'
      } : {}}
      whileTap={!isComingSoon ? { scale: 0.98, y: -5 } : {}}
      initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-20px" : "-50px" }}
      transition={{ 
        duration: isMobile ? 0.8 : 1, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => !isComingSoon && !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Reveal Animation */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <motion.img 
            src={imageUrl} 
            alt={title}
            crossOrigin="anonymous"
            className={`w-full h-full object-cover transition-all duration-1000 ${isComingSoon ? 'opacity-30 grayscale' : 'opacity-60 grayscale-[0.2]'}`}
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? 'blur(0px) grayscale(0)' : (isComingSoon ? 'blur(4px) grayscale(1)' : 'blur(0px) grayscale(0.2)')
            }}
          />
          {/* Sophisticated Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
        </div>
      )}

      {/* Glow Effect on Hover */}
      {!isComingSoon && (
        <motion.div 
          className="absolute inset-0 z-0 bg-primary/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        />
      )}

      {/* Top bar accent - Refined */}
      {!isComingSoon && (
        <motion.div 
          className="absolute top-0 inset-inline-start-0 h-1 bg-primary z-10"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Status Badge */}
      {isComingSoon && (
        <div className="absolute top-8 inset-inline-end-8 z-20">
          <span className="px-4 py-1.5 rounded-full bg-foreground/5 backdrop-blur-md border border-foreground/10 text-foreground/80 text-[10px] font-black tracking-[0.2em] uppercase">
            {t('services.status.soon')}
          </span>
        </div>
      )}

      {/* Index number - Modern Styling */}
      <div className="absolute top-8 inset-inline-start-8 z-10">
        <span className={`text-[11px] font-black tracking-[0.4em] uppercase transition-colors duration-700 ${imageUrl ? 'text-foreground/40 group-hover:text-foreground/60' : 'text-primary/40 group-hover:text-primary/60'}`}>
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-10">
        <motion.div
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {icon && (
            <div className={`mb-6 transition-all duration-700 ${imageUrl ? 'text-foreground/60 group-hover:text-primary group-hover:scale-110' : 'text-primary'}`}>
              {icon}
            </div>
          )}

          <h3 className={`text-xl lg:text-2xl font-black tracking-tighter mb-4 leading-tight transition-colors duration-700 ${imageUrl ? 'text-foreground group-hover:text-primary' : 'text-foreground group-hover:text-primary'}`}>
            {title}
          </h3>

          {showDescription && description && (!subcategories || subcategories.length === 0) && (
            <motion.p
              className={`text-[13px] lg:text-sm leading-relaxed font-normal mb-0 transition-colors duration-700 ${imageUrl ? 'text-foreground/80 group-hover:text-foreground' : 'text-foreground/80 group-hover:text-foreground'}`}
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ 
                height: isHovered ? 'auto' : 0, 
                opacity: isHovered ? 1 : 0,
                marginBottom: isHovered ? 20 : 0
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {description}
            </motion.p>
          )}

          {subcategories && subcategories.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 overflow-hidden"
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ 
                height: isHovered ? 'auto' : 0, 
                opacity: isHovered ? 1 : 0,
                marginBottom: isHovered ? 24 : 0
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {subcategories.map((sub, i) => (
                <span 
                  key={i} 
                  className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border transition-colors duration-500 ${imageUrl ? 'bg-foreground/5 border-foreground/10 text-foreground/80' : 'bg-primary/5 border-primary/10 text-primary/80'}`}
                >
                  {sub}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {!isComingSoon && (
          <motion.div 
            className={`flex items-center gap-3 text-[11px] font-black tracking-[0.3em] uppercase ${imageUrl ? 'text-foreground/80 group-hover:text-primary' : 'text-primary'}`}
            animate={{ 
              x: isHovered ? 0 : (dir === 'rtl' ? 10 : -10), 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {dir === 'rtl' ? 'استكشف الخدمة' : 'EXPLORE SERVICE'} <span className={`text-xl leading-none ${dir === 'rtl' ? 'rotate-180' : ''}`}>→</span>
          </motion.div>
        )}
      </div>

      {/* Subtle Decorative Circle */}
      {!imageUrl && (
        <div className={`absolute -bottom-10 ${dir === 'rtl' ? '-left-10' : '-right-10'} w-40 h-40 bg-primary/[0.01] rounded-full blur-3xl group-hover:bg-primary/[0.03] transition-all duration-700`} />
      )}
    </motion.div>
  );

  if (isComingSoon) {
    return <div className="w-full">{content}</div>;
  }

  return (
    <Link to={path} className="w-full">
      {content}
    </Link>
  );
}
