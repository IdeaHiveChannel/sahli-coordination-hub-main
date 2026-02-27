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
      className={`relative min-h-[300px] sm:min-h-[340px] md:min-h-[400px] w-full rounded-[2.5rem] border border-white/10 bg-[#0a0a0b] overflow-hidden cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${status === 'comingSoon' ? 'opacity-70' : ''} animate-in fade-in slide-in-from-bottom-8 fill-mode-both hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] hover:border-primary/40 active:scale-[0.98]`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => !isMobile && status !== 'comingSoon' && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Reveal Animation */}
      {imageUrl && (
        <>
          <div className="absolute inset-0 z-0">
            <img 
              src={imageUrl} 
              alt={title}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent z-10" />
          </div>
        </>
      )}

      {/* Decorative Glow */}
      <div 
        className={`absolute -inset-20 z-0 bg-primary/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none`}
      />

      {/* Content */}
      <div className="relative h-full p-8 md:p-10 flex flex-col justify-end z-20">
        <div className="mb-6 flex items-center justify-between">
          {icon && (
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-2xl">
              {icon}
            </div>
          )}
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">
               {formatNumber(index + 1 < 10 ? `0${index + 1}` : index + 1)}
             </span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tighter leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>

        {showDescription && description && (
          <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {subcategories.map((sub, i) => (
            <span 
              key={i} 
              className="px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase bg-white/5 border border-white/10 text-white/60 backdrop-blur-md group-hover:border-primary/40 group-hover:text-white transition-all"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>
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
