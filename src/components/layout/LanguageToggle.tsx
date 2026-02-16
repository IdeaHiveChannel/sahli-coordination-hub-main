import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
      className="text-[10px] font-black uppercase tracking-[0.2em] text-current hover:text-primary transition-all duration-500 px-2 py-1.5"
      aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {lang === 'en' ? 'العربية' : 'English'}
    </motion.button>
  );
}
