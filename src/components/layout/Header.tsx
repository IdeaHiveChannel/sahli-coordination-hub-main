import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { MessageSquare, X } from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

import { TranslationKey } from '@/lib/i18n';

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

  const navItems: Array<{ key: TranslationKey; path: string }> = [
    { key: 'nav.services', path: '/services' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.trustStandards', path: '/trust-standards' },
    { key: 'nav.howItWorks', path: '/how-it-works' },
    { key: 'nav.providerApplication', path: '/provider-application' },
  ];

  const isDarkHeroPage = false;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled || isMenuOpen ? 'py-1 md:py-2' : 'py-3 md:py-5'
      }`}
      dir={dir}
    >
      <div className="container-sahli relative z-[110]">
        <nav 
          className={`flex items-center justify-between px-4 md:px-8 py-2 md:py-3 rounded-2xl md:rounded-[2rem] transition-all duration-700 animate-in slide-in-from-top-5 fade-in ${
            isScrolled || isMenuOpen
              ? 'glass-morphism shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-white/5' 
              : 'bg-white/5 backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-3 group min-w-[40px] md:min-w-[80px] relative"
              >
                <div
                  className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                >
                  <img
                    src="/logos/SahlLogo3.png"
                    alt="SAHLI Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="hidden sm:block text-lg font-black tracking-tighter text-white uppercase">SAHLI</span>
              </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative group py-2 ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t(item.key)}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-primary rounded-full transition-all duration-500 ${
                    isActive ? 'w-4' : 'w-0 group-hover:w-2'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10 text-white transition-all duration-500 hover:bg-white/10">
              <LanguageToggle />
            </div>
            
            <a
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              onClick={() => trackRequestClick('Header')}
              className="hidden sm:flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-[0_10px_20px_-5px_rgba(241,41,89,0.5)] transition-all duration-500 active:scale-95 group"
            >
              <MessageSquare size={14} className="fill-white group-hover:rotate-12 transition-transform" />
              {t('cta.whatsapp')}
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className={`xl:hidden w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-300 active:scale-90 ${
                isMenuOpen 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : (isScrolled || !isDarkHeroPage ? 'text-foreground hover:bg-secondary/50' : 'text-white hover:bg-white/10')
              } z-[120] relative overflow-hidden group`}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Toggle menu"
            >
              <span 
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-primary-foreground rotate-45 translate-y-[5.5px]' : 'bg-current'}`}
              />
              <span 
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-primary-foreground opacity-0 translate-x-5' : 'bg-current opacity-100 translate-x-0'}`}
              />
              <span 
                className={`w-5 h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-primary-foreground -rotate-45 -translate-y-[5.5px]' : 'bg-current'}`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[105] xl:hidden bg-white overflow-y-auto overflow-x-hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen 
            ? 'translate-x-0 opacity-100' 
            : (dir === 'rtl' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0')
        } ${!isMenuOpen && 'pointer-events-none'}`}
      >
        {/* Close Button Inside Overlay */}
        <div className={`absolute top-8 ${dir === 'rtl' ? 'left-6 md:left-12' : 'right-6 md:right-12'} z-[110]`}>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-foreground/5 text-foreground hover:bg-foreground/10 transition-colors active:scale-90"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Animated Background Decorative Elements */}
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <div 
            className="absolute -bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '1s' }}
          />
        </div>

        <div className="relative z-10 min-h-full flex flex-col pt-24 px-6 md:px-12 max-w-screen-xl mx-auto w-full">
          <div className="flex flex-col gap-4 md:gap-6 flex-grow">
            {navItems.map((item, i: number) => (
              <div
                key={item.path}
                className={`transition-all duration-700 ${
                  isMenuOpen ? 'opacity-100 translate-x-0' : (dir === 'rtl' ? '-translate-x-8 opacity-0' : 'translate-x-8 opacity-0')
                }`}
                style={{ transitionDelay: `${100 + i * 50}ms` }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex flex-col items-start gap-1 py-3 md:py-4 relative"
                >
                  <span className="text-[0.65rem] md:text-[0.7rem] font-black text-primary/40 uppercase tracking-[0.2em]">0{i + 1}</span>
                  <span className="text-lg md:text-xl font-black text-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-500">{t(item.key)}</span>
                </Link>
              </div>
            ))}
          </div>
          
          <div 
            className={`pb-12 pt-8 border-t border-border/50 mt-8 transition-all duration-700 delay-500 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className={`flex flex-col gap-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/60">{t('nav.contact')}</span>
                <a href={`mailto:${t('contact.email.value')}`} className="block text-base font-medium text-foreground hover:text-primary transition-colors break-all">{t('contact.email.value')}</a>
              </div>
              
              <a
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                target="_blank"
                onClick={() => {
                  trackRequestClick('Mobile Menu');
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-3 w-full py-3 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 transition-all duration-500 active:scale-95"
              >
                <div
                  className={`flex items-center gap-4 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <MessageSquare size={20} className="fill-primary-foreground" />
                  {t('cta.whatsapp')}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
