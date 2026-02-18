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
        isScrolled || isMenuOpen ? 'py-1 md:py-2' : 'py-2 md:py-4'
      }`}
      dir={dir}
    >
      <div className="container-sahli relative z-[110]">
        <nav 
          className={`flex items-center justify-between px-3 md:px-6 py-1.5 md:py-2 rounded-xl md:rounded-2xl transition-all duration-700 animate-in slide-in-from-top-5 fade-in ${
            isScrolled || isMenuOpen
              ? 'glass-morphism shadow-[0_15px_40px_rgba(0,0,0,0.3)]' 
              : 'bg-slate-100/80 md:bg-transparent'
          }`}
        >
          {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 group min-w-[40px] md:min-w-[80px] relative"
              >
                <div
                  className="relative w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem] flex items-center justify-center transition-all duration-500 hover:rotate-[5deg] hover:scale-105"
                >
                  <img
                    src={isScrolled || isMenuOpen || !isDarkHeroPage ? "/logos/SahlLogo3.png" : "/logos/SahlLogo9.png"}
                    alt="SAHLI Logo"
                    className={`absolute w-[70px] h-[70px] md:w-[94px] md:h-[94px] max-w-none object-contain transition-all duration-500 top-1/2 -translate-y-1/2 ${
                      dir === 'rtl' ? 'right-0' : 'left-0'
                    }`}
                  />
                </div>
              </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-500 relative group ${
                    isActive 
                      ? 'text-primary' 
                      : (isScrolled || isMenuOpen || !isDarkHeroPage ? 'text-slate-900/80 hover:text-primary' : 'text-white hover:text-primary')
                  }`}
                >
                  {t(item.key)}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className={`flex items-center gap-1 px-1 py-0.5 rounded-lg border border-slate-200/50 transition-colors duration-500 ${
              isScrolled || isMenuOpen || !isDarkHeroPage ? 'bg-slate-900/5 text-slate-900' : 'bg-white/10 text-white'
            }`}>
              <LanguageToggle />
            </div>
            
            <a
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              onClick={() => trackRequestClick('Header')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 bg-primary text-primary-foreground rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-[0.08em] hover:shadow-xl hover:shadow-primary/40 transition-all duration-500 btn-shine"
            >
              <div
                className="flex items-center gap-1.5 hover:scale-105 hover:-translate-y-[1px] active:scale-95 transition-transform duration-300"
              >
                <MessageSquare size={12} className="fill-primary-foreground" />
                {t('cta.whatsapp')}
              </div>
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className={`xl:hidden w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-300 active:scale-90 ${
                isMenuOpen 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : (isScrolled || !isDarkHeroPage ? 'text-slate-900 hover:bg-secondary/50' : 'text-white hover:bg-white/10')
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
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900/5 text-slate-900 hover:bg-slate-900/10 transition-colors active:scale-90"
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
                  <span className="text-lg md:text-xl font-black text-slate-900 group-hover:text-primary group-hover:translate-x-2 transition-all duration-500">{t(item.key)}</span>
                </Link>
              </div>
            ))}
          </div>
          
          <div 
            className={`pb-12 pt-8 border-t border-slate-200/50 mt-8 transition-all duration-700 delay-500 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className={`flex flex-col gap-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900/60">{t('nav.contact')}</span>
                <a href={`mailto:${t('contact.email.value')}`} className="block text-base font-medium text-slate-900 hover:text-primary transition-colors break-all">{t('contact.email.value')}</a>
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
