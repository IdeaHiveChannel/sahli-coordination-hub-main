import { MessageSquare } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export function RequestTrigger() {
  const { t, dir } = useLanguage();
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(true), 3000);
    const hideTimer = setTimeout(() => setShowLabel(false), 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className={`fixed bottom-8 ${dir === 'rtl' ? 'left-8' : 'right-8'} z-50 flex items-center gap-4`}>
        {showLabel && (
          <div
            className={`bg-card px-4 py-2 rounded-2xl shadow-xl border border-border hidden md:flex items-center gap-2 animate-in fade-in zoom-in-95 duration-500 ${dir === 'rtl' ? 'slide-in-from-left-5' : 'slide-in-from-right-5'}`}
          >
            <img 
              src="/logos/SahlLogo5.png" 
              alt="" 
              className="w-4 h-4 object-contain opacity-60" 
            />
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              {t('cta.whatsapp.help')}
            </p>
          </div>
        )}

      <a
        href={getWhatsAppLink(t('cta.whatsapp.general'))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackRequestClick('Floating Trigger')}
        className="relative group transition-transform duration-300 hover:scale-110 active:scale-90"
      >
        <div>
          <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
          <div className="relative w-16 h-16 bg-emerald-500 text-white rounded-full shadow-xl flex items-center justify-center transition-transform duration-500 ease-out-expo group-hover:rotate-[15deg] glow-emerald">
            <MessageSquare size={28} className="fill-white" />
          </div>
          
          {/* Pulse Ring */}
          <div className="absolute inset-0 border-2 border-emerald-500 rounded-full animate-[ping_3s_infinite] opacity-20" />
        </div>
      </a>
    </div>
  );
}
