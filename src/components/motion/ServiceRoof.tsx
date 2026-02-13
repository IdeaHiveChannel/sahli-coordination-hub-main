import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppLink } from '@/lib/constants';

interface ServiceRoofProps {
  title: string;
  description?: string;
  path: string;
  index: number;
  imageUrl?: string;
  icon?: React.ReactNode;
  showDescription?: boolean;
  showNumber?: boolean;
  subcategories?: string[];
  status?: string;
  whatsappKey?: string;
}

export function ServiceRoof({ 
  title, 
  description, 
  path, 
  index, 
  imageUrl, 
  icon, 
  showDescription = true,
  showNumber = true,
  subcategories = [],
  status,
  whatsappKey
}: ServiceRoofProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t, dir, lang } = useLanguage();

  const formatNumber = (num: number | string) => {
    if (lang === 'ar') {
      return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
    }
    return num.toString();
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = (
    <motion.div
      className={`relative min-h-[280px] md:min-h-[340px] w-full rounded-[var(--radius)] border border-border bg-card overflow-hidden cursor-pointer group transition-all duration-700 ease-out-expo btn-shine ${status === 'comingSoon' ? 'opacity-70' : ''}`}
      whileHover={!isMobile && status !== 'comingSoon' ? { 
        y: -10,
        borderColor: 'hsla(var(--primary), 0.3)',
        boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.4)'
      } : {}}
      whileTap={status !== 'comingSoon' ? { scale: 0.98, y: -5 } : {}}
      initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-20px" : "-50px" }}
      transition={{ 
        duration: isMobile ? 0.8 : 1, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={() => !isMobile && status !== 'comingSoon' && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Coming Soon Badge */}
      {status === 'comingSoon' && (
        <div className="absolute top-8 inset-inline-end-8 z-20">
          <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
            {t('services.status.comingSoon')}
          </span>
        </div>
      )}

      {/* Background Image with Reveal Animation */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <motion.img 
            src={imageUrl} 
            alt={title}
            loading="lazy"
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
            animate={{ 
              scale: isHovered ? 1.05 : 1
            }}
          />
          {/* Overlays removed as per user request */}
        </div>
      )}

      {/* Glow Effect on Hover */}
      <motion.div 
        className="absolute inset-0 z-0 bg-primary/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
      />

      {/* Top bar accent - Refined */}
      <motion.div 
        className="absolute top-0 inset-inline-start-0 h-1 bg-primary z-10"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Index number - Modern Styling */}
      {showNumber && (
        <div className="absolute top-8 inset-inline-start-8 z-10">
          <span className={`text-[11px] font-black tracking-[0.4em] uppercase transition-colors duration-700 ${imageUrl ? 'text-white/60 group-hover:text-white/80' : 'text-primary/40 group-hover:text-primary/60'}`}>
            {formatNumber(index + 1 < 10 ? `0${index + 1}` : index + 1)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative min-h-[280px] md:min-h-[340px] p-6 md:p-8 flex flex-col justify-end z-10 text-center md:text-start items-center md:items-start">
        <motion.div
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center md:items-start"
        >
          {icon && (
            <div className={`mb-4 transition-all duration-700 ${imageUrl ? 'text-white group-hover:text-primary group-hover:scale-110' : 'text-primary'}`}>
              {icon}
            </div>
          )}

          <h3 className={`text-xl md:text-xl lg:text-2xl font-black tracking-tighter mb-2 leading-tight transition-colors duration-700 ${imageUrl ? 'text-white group-hover:text-primary [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]' : 'text-foreground group-hover:text-primary'}`}>
            {title}
          </h3>

          {showDescription && description && (!subcategories || subcategories.length === 0) && (
            <motion.p
              className={`text-[13px] lg:text-sm leading-relaxed font-normal mb-0 transition-colors duration-700 ${imageUrl ? 'text-white/90 group-hover:text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]' : 'text-foreground/80 group-hover:text-foreground'}`}
              initial={{ height: 'auto', opacity: 1, marginBottom: 16 }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                marginBottom: 16
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {description}
            </motion.p>
          )}

          {subcategories && subcategories.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 overflow-hidden justify-center md:justify-start"
              initial={{ height: 'auto', opacity: 1, marginBottom: 20 }}
              animate={{ 
                height: 'auto', 
                opacity: 1,
                marginBottom: 20
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {subcategories.map((sub: string, i: number) => (
                <span 
                  key={i} 
                  className={`px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-black tracking-widest uppercase border transition-colors duration-500 ${imageUrl ? 'bg-white/10 border-white/30 text-white backdrop-blur-md shadow-lg group-hover:bg-white group-hover:text-primary group-hover:border-white' : 'bg-primary/10 border-primary/20 text-primary'}`}
                >
                  {sub}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Subtle Decorative Circle */}
      {!imageUrl && (
        <div className={`absolute -bottom-10 ${dir === 'rtl' ? '-left-10' : '-right-10'} w-40 h-40 bg-primary/[0.01] rounded-full blur-3xl group-hover:bg-primary/[0.03] transition-all duration-700`} />
      )}
    </motion.div>
  );

  return (
    <a 
      href={getWhatsAppLink(whatsappKey ? t(whatsappKey as any) : t('cta.whatsapp.general'))} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-full"
    >
      {content}
    </a>
  );
}
