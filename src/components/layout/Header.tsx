import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { WHATSAPP_LINK } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/gtag';

export function Header() {
  const { t, dir } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: Array<{ key: string; path: string }> = [
    { key: 'nav.services', path: '/services' },
    { key: 'nav.trustStandards', path: '/trust-standards' },
    { key: 'nav.howItWorks', path: '/how-it-works' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled || isMenuOpen ? 'py-3 md:py-3' : 'py-5 md:py-6'
      }`}
      dir={dir}
    >
      <div className="container-sahli relative z-[110]">
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between px-3 md:px-8 py-3 md:py-3 rounded-[1.25rem] md:rounded-[1.75rem] transition-all duration-700 ${
            isScrolled || isMenuOpen
              ? 'glass-morphism shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
              : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group min-w-[80px] md:min-w-[120px] relative">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="relative w-7 h-7 md:w-9 md:h-9 flex items-center justify-center transition-all duration-500"
            >
              <img 
                src={isScrolled || isMenuOpen ? "/logos/Sahl Logo 3.png" : "/logos/Sahl Logo 9.png"} 
                alt="SAHLI Logo" 
                className={`absolute w-20 h-20 md:w-24 md:h-24 max-w-none object-contain transition-all duration-500 top-1/2 -translate-y-1/2 ${
                  dir === 'rtl' ? 'right-0' : 'left-0'
                }`} 
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            {navItems.map((item: { key: string; path: string }) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-500 relative group ${
                    isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {t(item.key as any)}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 px-2 py-0.5 bg-foreground/5 rounded-xl border border-border/50">
              <LanguageToggle />
            </div>
            
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('Header')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-primary text-primary-foreground rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 btn-shine glow-red"
            >
              <MessageCircle size={14} className="fill-primary-foreground" />
              {t('cta.whatsapp')}
            </motion.a>

            {/* Mobile Menu Toggle */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className={`xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-300 ${
                isMenuOpen ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-foreground hover:bg-secondary/50'
              } z-[120] relative overflow-hidden group`}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              <motion.span 
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 rounded-full transition-colors ${isMenuOpen ? 'bg-primary-foreground' : 'bg-current'}`}
              />
              <motion.span 
                animate={isMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                className={`w-6 h-0.5 rounded-full transition-colors ${isMenuOpen ? 'bg-primary-foreground' : 'bg-current'}`}
              />
              <motion.span 
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 rounded-full transition-colors ${isMenuOpen ? 'bg-primary-foreground' : 'bg-current'}`}
              />
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) setIsMenuOpen(false);
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[105] xl:hidden bg-background overflow-y-auto overflow-x-hidden"
          >
            {/* Close Button Inside Overlay */}
            <div className={`absolute top-8 ${dir === 'rtl' ? 'left-6 md:left-12' : 'right-6 md:right-12'} z-[110]`}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-foreground/5 text-foreground hover:bg-foreground/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Animated Background Decorative Elements */}
            <div className="absolute inset-0 z-0 opacity-20">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  x: [0, 50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-primary/20 rounded-full blur-3xl"
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                  x: [0, -50, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10 h-full flex flex-col pt-24 px-6 md:px-12">
              <div className="flex flex-col gap-4 md:gap-6">
                {navItems.map((item: { key: string; path: string }, i: number) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    whileTap={{ x: 10, scale: 0.98 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      delay: 0.1 + i * 0.1 
                    }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-1 md:py-2"
                    >
                      <span className="text-[12px] font-black text-primary/50 tracking-widest">0{i + 1}</span>
                      <span className="text-3xl md:text-5xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
                        {t(item.key as any)}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-auto pb-12 pt-8 border-t border-border/50"
              >
                <div className="flex flex-col gap-8">
                  <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/60">{t('nav.contact')}</span>
                    <a href={`mailto:${t('contact.email.value')}`} className="block text-xl font-medium text-foreground hover:text-primary transition-colors">{t('contact.email.value')}</a>
                  </div>
                  
                  <motion.a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-4 w-full py-6 bg-primary text-primary-foreground rounded-3xl text-sm font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500"
                  >
                    <MessageCircle size={20} className="fill-primary-foreground" />
                    {t('cta.whatsapp')}
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
