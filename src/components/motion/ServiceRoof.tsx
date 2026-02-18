import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';
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
  whatsappKey?: TranslationKey;
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
    <div
      className={`relative min-h-[260px] sm:min-h-[280px] md:min-h-[340px] w-full rounded-[var(--radius)] border border-slate-200 bg-white overflow-hidden cursor-pointer group transition-all duration-700 ease-out-expo btn-shine ${status === 'comingSoon' ? 'opacity-70' : ''} animate-in fade-in slide-in-from-bottom-8 fill-mode-both hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30 active:scale-[0.98] active:translate-y-[-2px]`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => !isMobile && status !== 'comingSoon' && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Coming Soon Badge */}
      {status === 'comingSoon' && (
        <div className="absolute top-8 inset-inline-end-8 z-20">
          <span className="px-2.5 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
            {t('services.status.comingSoon')}
          </span>
        </div>
      )}

      {/* Background Image with Reveal Animation */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img 
            src={imageUrl} 
            alt={title}
            loading="lazy"
            crossOrigin="anonymous"
            className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        </div>
      )}

      {/* Glow Effect on Hover */}
      <div 
        className={`absolute inset-0 z-0 bg-primary/5 blur-[40px] md:blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}
      />

      {/* Top bar accent - Refined */}
      <div 
        className={`absolute top-0 inset-inline-start-0 h-1 bg-primary z-10 transition-all duration-800 ease-out`}
        style={{ width: isHovered ? '100%' : '0%' }}
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
      <div className="relative min-h-[260px] sm:min-h-[280px] md:min-h-[340px] p-5 sm:p-6 md:p-8 flex flex-col justify-end z-10 text-center md:text-start items-center md:items-start">
        <div
          className={`flex flex-col items-center md:items-start transition-transform duration-600 ease-out ${isHovered ? '-translate-y-1' : 'translate-y-0'}`}
        >
          {icon && (
            <div className={`mb-4 transition-all duration-700 ${imageUrl ? 'text-white group-hover:text-primary group-hover:scale-110' : 'text-primary'}`}>
              {icon}
            </div>
          )}

          <h3 className={`text-lg sm:text-xl lg:text-2xl font-black tracking-tighter mb-2 leading-tight transition-colors duration-700 break-words ${imageUrl ? 'text-white group-hover:text-primary [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]' : 'text-slate-900 group-hover:text-primary'}`}>
            {title}
          </h3>
          {showDescription && description && (!subcategories || subcategories.length === 0) && (
            <p
              className={`text-[13px] lg:text-sm leading-relaxed font-normal mb-4 transition-colors duration-700 break-words ${imageUrl ? 'text-white/90 group-hover:text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]' : 'text-slate-600 group-hover:text-slate-900'}`}
            >
              {description}
            </p>
          )}

          {subcategories && subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 overflow-hidden justify-center md:justify-start mb-5">
              {subcategories.map((sub: string, i: number) => (
                <span 
                  key={i} 
                  className={`px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-widest uppercase border transition-colors duration-500 ${imageUrl ? 'bg-white/10 border-white/30 text-white backdrop-blur-md shadow-lg group-hover:bg-white group-hover:text-primary group-hover:border-white' : 'bg-primary/10 border-primary/20 text-primary'}`}
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Subtle Decorative Circle */}
      {!imageUrl && (
        <div className={`absolute -bottom-10 ${dir === 'rtl' ? '-left-10' : '-right-10'} w-40 h-40 bg-primary/[0.01] rounded-full blur-3xl group-hover:bg-primary/[0.03] transition-all duration-700`} />
      )}
    </div>
  );

  if (status === 'comingSoon') {
    return content;
  }

  return (
    <a 
      href={getWhatsAppLink(whatsappKey ? t(whatsappKey) : t('cta.whatsapp.general'))} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-full"
    >
      {content}
    </a>
  );
}
