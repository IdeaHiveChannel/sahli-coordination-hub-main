import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
      className="text-[10px] font-black uppercase tracking-[0.2em] text-current hover:text-primary transition-all duration-500 px-2 py-1.5 hover:scale-105 active:scale-95"
      aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {lang === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
