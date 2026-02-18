import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { MessageSquare, Instagram, Facebook, Mail } from 'lucide-react';
import { TranslationKey } from '@/lib/i18n';

import { INSTAGRAM_LINK, FACEBOOK_LINK, getWhatsAppLink } from '@/lib/constants';
import { trackRequestClick } from '@/lib/gtag';

export function Footer() {
  const { t, dir } = useLanguage();
  
  const currentYear = 2026;

  const links = {
    company: [
      { key: 'nav.about' as TranslationKey, path: '/about' },
      { key: 'nav.howItWorks' as TranslationKey, path: '/how-it-works' },
      { key: 'nav.trustStandards' as TranslationKey, path: '/trust-standards' },
      { key: 'nav.providerApplication' as TranslationKey, path: '/provider-application' },
    ],
    services: [
      { key: 'nav.homeMaintenance' as TranslationKey, path: '/services#home-maintenance' },
      { key: 'nav.cleaningServices' as TranslationKey, path: '/services#cleaning' },
      { key: 'nav.movingServices' as TranslationKey, path: '/services#moving' },
      { key: 'nav.outdoorSpecialized' as TranslationKey, path: '/services#outdoor' },
      { key: 'nav.careLifestyle' as TranslationKey, path: '/services#care' },
      { key: 'nav.electronicsTech' as TranslationKey, path: '/services#tech' },
    ],
    locations: [
      { key: 'location.doha.title' as TranslationKey, path: '/home-services-doha' },
      { key: 'location.lusail.title' as TranslationKey, path: '/home-services-lusail' },
      { key: 'location.thepearl.title' as TranslationKey, path: '/home-services-the-pearl' },
    ]
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-12 md:pt-16 pb-8 md:pb-10 relative overflow-hidden" dir={dir}>
      {/* Decorative Background Elements */}
      <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-64 md:w-[24rem] h-64 md:h-[24rem] bg-primary/[0.03] rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-48 md:w-[16rem] h-48 md:h-[16rem] bg-primary/[0.02] rounded-full blur-[60px] md:blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none`} />
      
      <div className="container-sahli relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-16 md:gap-20 lg:gap-8 mb-16 md:mb-24">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 pr-0 lg:pr-8 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="flex items-center gap-4 group mb-6 sm:mb-8 w-fit">
            <div className="relative w-[86px] h-[86px] sm:w-[102px] sm:h-[102px] md:w-[118px] md:h-[118px] flex items-center justify-center transition-all duration-700 ease-out-expo">
              <img 
                src="/logos/SahlLogo3.png" 
                alt="SAHLI Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </Link>
            <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-900/85 leading-relaxed font-black mb-6 sm:mb-8 text-balance max-w-lg">
              {t('footer.description')}
            </p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 md:gap-4">
              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-slate-900/[0.03] hover:bg-primary/10 hover:text-primary transition-all duration-500 cursor-pointer flex items-center justify-center border border-slate-200 hover:border-primary/20 glass-card btn-shine active:scale-95 hover:-translate-y-1 hover:scale-105"
              >
                <Facebook size={18} className="sm:size-5" />
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-slate-900/[0.03] hover:bg-primary/10 hover:text-primary transition-all duration-500 cursor-pointer flex items-center justify-center border border-slate-200 hover:border-primary/20 glass-card btn-shine active:scale-95 hover:-translate-y-1 hover:scale-105"
              >
                <Instagram size={18} className="sm:size-5" />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 lg:pt-8 text-center sm:text-left">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 sm:mb-6 md:mb-8 text-primary/80">
              {t('footer.company')}
            </h4>
            <ul className="space-y-4 sm:space-y-6 md:space-y-8">
              {links.company.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-[10px] sm:text-[11px] md:text-xs font-bold text-slate-900/75 hover:text-primary transition-all duration-500 flex items-center justify-center sm:justify-start gap-3 group active:scale-95"
                  >
                    <span className="hidden sm:block w-0 h-px bg-primary group-hover:w-6 transition-all duration-500" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:pt-8 text-center sm:text-left">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 sm:mb-6 md:mb-8 text-primary/80">
              {t('footer.services')}
            </h4>
            <ul className="space-y-4 sm:space-y-6 md:space-y-8">
              {links.services.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-[10px] sm:text-[11px] md:text-xs font-bold text-slate-900/75 hover:text-primary transition-all duration-500 flex items-center justify-center sm:justify-start gap-3 group active:scale-95"
                  >
                    <span className="hidden sm:block w-0 h-px bg-primary group-hover:w-6 transition-all duration-500" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Location Links */}
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-8 mb-4 sm:mb-6 md:mb-8 text-primary/80">
              {t('location.categories.title')}
            </h4>
            <ul className="space-y-4 sm:space-y-6">
              {links.locations.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-[10px] md:text-[11px] font-bold text-slate-900/75 hover:text-primary transition-all duration-500 flex items-center justify-center sm:justify-start gap-3 group active:scale-95"
                  >
                    <span className="hidden sm:block w-0 h-px bg-primary group-hover:w-4 transition-all duration-500" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & CTA */}
          <div className="lg:col-span-4 lg:pt-8 text-center sm:text-left">
            <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 sm:mb-6 md:mb-8 text-primary/80">
              {t('footer.contact')}
            </h4>
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <a
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Footer')}
                className="flex items-center gap-4 md:gap-5 p-4 sm:p-5 rounded-[2rem] sm:rounded-3xl bg-slate-900/[0.02] border border-slate-200 hover:border-primary/20 transition-all duration-500 group glass-card btn-shine active:scale-95 hover:scale-[1.02] hover:-translate-y-1"
              >
                <div
                  className="flex items-center gap-4 md:gap-5 w-full"
                >
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-card flex items-center justify-center text-primary shadow-xl shadow-black/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shrink-0">
                    <MessageSquare size={20} className="sm:size-6" />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center text-left">
                    <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-slate-900/60 leading-tight mb-1.5">{t('footer.whatsapp')}</span>
                    <span className="text-xs md:text-sm font-bold tracking-tight text-slate-900 truncate leading-tight">{t('contact.whatsapp.value')}</span>
                  </div>
                </div>
              </a>

              <a 
                href={`mailto:${t('contact.email.value')}`}
                className="flex items-center gap-4 md:gap-5 p-4 sm:p-5 rounded-[2rem] sm:rounded-3xl bg-slate-900/[0.02] border border-slate-200 hover:border-primary/20 transition-all duration-500 group glass-card btn-shine active:scale-95 hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-card flex items-center justify-center text-primary shadow-xl shadow-black/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shrink-0">
                  <Mail size={20} className="sm:size-6" />
                </div>
                <div className="min-w-0 flex flex-col justify-center text-left">
                  <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-900/60 leading-tight mb-1.5">{t('contact.email.label')}</span>
                  <span className="text-xs md:text-sm font-bold tracking-tight text-slate-900 truncate leading-tight">{t('contact.email.value')}</span>
                </div>
              </a>
              
              <div className="p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-primary/[0.01] border border-primary/5 italic">
                <p className="text-[10px] sm:text-[11px] font-bold text-primary/70 leading-relaxed">
                  "{t('footer.motto')}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Ultra Clean */}
        <div className="pt-8 md:pt-12 border-t border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-10">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img src="/logos/SahlLogo5.png" alt="" className="w-4 h-4 object-contain opacity-50 scale-[3]" />
            <div className="flex flex-col gap-2">
              <p className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase text-slate-500 text-center lg:text-left">
                {t('footer.positioning')}
              </p>
              <p className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 text-center lg:text-left">
                © {currentYear} {t('about.footer.hub')}. {t('footer.rights.all')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16">
            <Link to="/legal/privacy" className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 hover:text-primary transition-colors active:scale-95">
              {t('footer.privacy')}
            </Link>
            <Link to="/legal/terms" className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 hover:text-primary transition-colors active:scale-95">
              {t('footer.terms')}
            </Link>
            <Link to="/admin" className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 hover:text-primary transition-colors active:scale-95">
              Admin
            </Link>
            <div className="active:scale-95">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
