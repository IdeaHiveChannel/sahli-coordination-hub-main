import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { MessageCircle, Instagram, Facebook, Mail } from 'lucide-react';
import { TranslationKey } from '@/lib/i18n';

import { WHATSAPP_LINK, INSTAGRAM_LINK, FACEBOOK_LINK } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/gtag';

export function Footer() {
  const { t, dir } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { key: 'nav.about' as TranslationKey, path: '/about' },
      { key: 'nav.howItWorks' as TranslationKey, path: '/how-it-works' },
      { key: 'nav.trustStandards' as TranslationKey, path: '/trust-standards' },
    ],
    services: [
      { key: 'nav.homeMaintenance' as TranslationKey, path: '/home-maintenance-qatar' },
      { key: 'nav.cleaningServices' as TranslationKey, path: '/cleaning-services-qatar' },
      { key: 'nav.movingServices' as TranslationKey, path: '/house-shifting-qatar' },
      { key: 'nav.outdoorSpecialized' as TranslationKey, path: '/outdoor-specialized-qatar' },
      { key: 'nav.careLifestyle' as TranslationKey, path: '/care-lifestyle-qatar' },
      { key: 'nav.electronicsTech' as TranslationKey, path: '/electronics-tech-qatar' },
    ]
  };

  return (
    <footer className="bg-background border-t border-border pt-10 md:pt-16 pb-6 md:pb-10 relative overflow-hidden" dir={dir}>
      {/* Decorative Background Elements */}
      <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-64 md:w-[24rem] h-64 md:h-[24rem] bg-primary/[0.03] rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-48 md:w-[16rem] h-48 md:h-[16rem] bg-primary/[0.02] rounded-full blur-[60px] md:blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none`} />
      
      <div className="container-sahli relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-20 lg:gap-8 mb-12 md:mb-24">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <Link to="/" className="flex items-center gap-4 group mb-10 md:mb-12 w-fit">
            <div className="relative w-48 md:w-56 h-48 md:h-56 flex items-center justify-center transition-all duration-700 ease-out-expo btn-shine rounded-3xl">
              <img 
                src="/logos/Sahl Logo 9.png" 
                alt="SAHLI Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
          </Link>
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed font-medium mb-8 md:mb-10 text-balance max-w-lg">
              {t('footer.description')}
            </p>
            
            <div className="flex flex-wrap gap-4 md:gap-5">
              <motion.a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl bg-foreground/[0.03] hover:bg-primary/10 hover:text-primary transition-all duration-500 cursor-pointer flex items-center justify-center border border-border hover:border-primary/20 glass-card btn-shine"
              >
                <Facebook size={20} className="md:size-6" />
              </motion.a>
              <motion.a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl bg-foreground/[0.03] hover:bg-primary/10 hover:text-primary transition-all duration-500 cursor-pointer flex items-center justify-center border border-border hover:border-primary/20 glass-card btn-shine"
              >
                <Instagram size={20} className="md:size-6" />
              </motion.a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 lg:pt-8">
            <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12 text-primary/80">
              {t('footer.company')}
            </h4>
            <ul className="space-y-6 md:space-y-8">
              {links.company.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-base md:text-lg font-bold text-foreground/75 hover:text-primary transition-all duration-500 flex items-center gap-4 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-6 transition-all duration-500" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:pt-8">
            <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12 text-primary/80">
              {t('footer.services')}
            </h4>
            <ul className="space-y-6 md:space-y-8">
              {links.services.map((link) => (
                <li key={link.key}>
                  <Link 
                    to={link.path} 
                    className="text-base md:text-lg font-bold text-foreground/75 hover:text-primary transition-all duration-500 flex items-center gap-4 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-6 transition-all duration-500" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & CTA */}
          <div className="lg:col-span-4 lg:pt-8">
            <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-8 md:mb-10 text-primary/80">
              {t('footer.contact')}
            </h4>
            <div className="space-y-6 md:space-y-8">
              <motion.a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('Footer')}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-foreground/[0.02] border border-border hover:border-primary/20 transition-all duration-500 group glass-card btn-shine"
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl md:rounded-2xl bg-card flex items-center justify-center text-primary shadow-xl shadow-black/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shrink-0">
                  <MessageCircle size={20} className="md:size-6" />
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-foreground/60 leading-none mb-1.5">{t('footer.whatsapp')}</span>
                  <span className="text-sm md:text-base font-bold tracking-tight text-foreground truncate leading-none">{t('contact.whatsapp.value')}</span>
                </div>
              </motion.a>

              <motion.a 
                href={`mailto:${t('contact.email.value')}`}
                whileHover={{ scale: 1.02, y: -5 }}
                className="flex items-center gap-4 md:gap-5 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-foreground/[0.02] border border-border hover:border-primary/20 transition-all duration-500 group glass-card btn-shine"
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl md:rounded-2xl bg-card flex items-center justify-center text-primary shadow-xl shadow-black/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shrink-0">
                  <Mail size={20} className="md:size-6" />
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-foreground/60 leading-none mb-1.5">{t('contact.email.label')}</span>
                  <span className="text-sm md:text-base font-bold tracking-tight text-foreground truncate leading-none">{t('contact.email.value')}</span>
                </div>
              </motion.a>
              
              <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-primary/[0.01] border border-primary/5 italic">
                <p className="text-xs md:text-sm font-bold text-primary/70 leading-relaxed">
                  "{t('footer.motto')}"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Ultra Clean */}
        <div className="pt-8 md:pt-12 border-t border-border flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-10">
          <div className="flex items-center gap-6">
            <img src="/logos/Sahl Logo 9.png" alt="" className="w-4 h-4 object-contain opacity-50" />
            <p className="text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase text-foreground/50 text-center lg:text-left">
              © {currentYear} {t('about.footer.hub')}. {t('footer.rights.all')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16">
            <Link to="/legal/privacy" className="text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase text-foreground/50 hover:text-primary transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/legal/terms" className="text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase text-foreground/50 hover:text-primary transition-colors">
              {t('footer.terms')}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
