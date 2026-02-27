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
    <footer className="bg-[#0a0a0b] border-t border-white/10 pt-24 md:pt-32 pb-12 md:pb-16 relative overflow-hidden" dir={dir}>
      {/* Decorative Background Elements */}
      <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-96 md:w-[40rem] h-96 md:h-[40rem] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-80 md:w-[30rem] h-80 md:h-[30rem] bg-primary/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none`} />
      
      <div className="container-sahli relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-24 md:mb-32">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 pr-0 lg:pr-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="flex items-center gap-5 group mb-10 w-fit">
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                <img 
                  src="/logos/SahlLogo3.png" 
                  alt="SAHLI Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white uppercase">SAHLI</span>
            </Link>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed font-medium mb-10 text-balance max-w-lg">
              {t('footer.description')}
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-primary text-white transition-all duration-500 flex items-center justify-center border border-white/10 hover:border-primary shadow-2xl"
              >
                <Facebook size={24} />
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-primary text-white transition-all duration-500 flex items-center justify-center border border-white/10 hover:border-primary shadow-2xl"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 lg:pt-4 text-center lg:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-primary">
              {t('footer.company')}
            </h4>
            <ul className="space-y-6">
              {links.company.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-all duration-500 flex items-center justify-center lg:justify-start gap-4 group"
                  >
                    <span className="hidden lg:block w-0 h-px bg-primary group-hover:w-8 transition-all duration-500" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:pt-4 text-center lg:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-primary">
              {t('footer.services')}
            </h4>
            <ul className="space-y-6">
              {links.services.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-xs md:text-sm font-bold text-slate-400 hover:text-white transition-all duration-500 flex items-center justify-center lg:justify-start gap-4 group"
                  >
                    <span className="hidden lg:block w-0 h-px bg-primary group-hover:w-8 transition-all duration-500" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & CTA */}
          <div className="lg:col-span-4 lg:pt-4 text-center lg:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-primary">
              {t('footer.contact')}
            </h4>
            <div className="space-y-6">
              <a
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Footer')}
                className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-500 group shadow-2xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 shrink-0">
                  <MessageSquare size={28} />
                </div>
                <div className="min-w-0 flex flex-col text-left">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{t('footer.whatsapp')}</span>
                  <span className="text-sm md:text-base font-black text-white truncate">{t('contact.whatsapp.value')}</span>
                </div>
              </a>

              <a 
                href={`mailto:${t('contact.email.value')}`}
                className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-500 group shadow-2xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
                  <Mail size={28} />
                </div>
                <div className="min-w-0 flex flex-col text-left">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{t('contact.email.label')}</span>
                  <span className="text-sm md:text-base font-black text-white truncate">{t('contact.email.value')}</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Ultra Clean */}
        <div className="pt-12 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/logos/SahlLogo3.png" alt="" className="w-8 h-8 object-contain opacity-50" />
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-500">
                {t('footer.positioning')}
              </p>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-600">
                © {currentYear} SAHLI. {t('footer.rights.all')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <Link to="/legal/privacy" className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/legal/terms" className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 hover:text-white transition-colors">
              {t('footer.terms')}
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
