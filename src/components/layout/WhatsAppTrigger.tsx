import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { WHATSAPP_LINK } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/gtag';

export function WhatsAppTrigger() {
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
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? -20 : 20, scale: 0.8 }}
            className="bg-card px-4 py-2 rounded-2xl shadow-2xl border border-border hidden md:flex items-center gap-2"
          >
            <img 
              src="/logos/Sahl Logo 9.png" 
              alt="" 
              className="w-4 h-4 object-contain opacity-60" 
            />
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">
              {t('cta.whatsapp')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('Floating Trigger')}
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
        <div className="relative w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center transition-transform duration-500 ease-out-expo group-hover:rotate-[15deg]">
          <MessageCircle size={28} className="fill-primary-foreground" />
        </div>
        
        {/* Pulse Ring */}
        <div className="absolute inset-0 border-2 border-primary rounded-full animate-[ping_3s_infinite] opacity-20" />
      </motion.a>
    </div>
  );
}
