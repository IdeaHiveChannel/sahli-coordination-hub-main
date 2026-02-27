import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { MetaTags } from '@/components/seo/MetaTags';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { getWhatsAppLink } from '@/lib/constants';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, CheckCircle2, MapPin, 
  ArrowRight, Snowflake, Bug, Droplets, Sparkles, Truck, Send
} from 'lucide-react';
import { TranslationKey } from '@/lib/i18n';

interface LocationLandingPageProps {
  locationKey: string; // e.g., 'doha', 'lusail', 'wakrah'
  heroImage: string;
}

export const LocationLandingPage: React.FC<LocationLandingPageProps> = ({
  locationKey,
  heroImage,
}) => {
  const { t } = useLanguage();

  const services = [
    { titleKey: 'services.homeMaintenance.ac.maintenance.title' as TranslationKey, path: '/ac-repair-doha', icon: <Snowflake size={24} /> },
    { titleKey: 'services.outdoor.pest.title' as TranslationKey, path: '/pest-control-qatar', icon: <Bug size={24} /> },
    { titleKey: 'services.homeMaintenance.plumbing.title' as TranslationKey, path: '/plumber-doha', icon: <Droplets size={24} /> },
    { titleKey: 'services.cleaning.deep.title' as TranslationKey, path: '/deep-cleaning-doha', icon: <Sparkles size={24} /> },
    { titleKey: 'services.moving.title' as TranslationKey, path: '/movers-doha', icon: <Truck size={24} /> },
  ];

  return (
    <Layout>
      <MetaTags
        title={t(`areas.${locationKey}.meta.title` as TranslationKey)}
        description={t(`areas.${locationKey}.meta.description` as TranslationKey)}
      />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-[#0a0a0b]">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={t(`areas.${locationKey}.meta.title` as TranslationKey)}
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.1),transparent_50%)] z-10" />
        </div>

        <div className="container-sahli relative z-20 pt-32 pb-20 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl">
              <MapPin size={16} />
              <span>{t(`areas.${locationKey}.meta.title` as TranslationKey)}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter max-w-4xl mx-auto drop-shadow-2xl">
              {t(`areas.${locationKey}.meta.title` as TranslationKey)}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-12 font-medium leading-relaxed max-w-2xl mx-auto text-balance">
              {t(`areas.${locationKey}.meta.description` as TranslationKey)}
            </p>

            <div className="flex justify-center">
              <a
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick(`${locationKey} Hero CTA`)}
                className="inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-primary-dark transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(241,41,89,0.4)] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <MessageSquare size={24} className="group-hover:rotate-12 transition-transform duration-500" />
                {t('home.hero.cta')}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services in Location */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <ScrollReveal className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
              <Sparkles size={14} />
              Our Services
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              {t('home.solutions.title')}
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link 
                  to={service.path}
                  className="group p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.08] transition-all duration-700 flex flex-col items-center text-center h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tighter leading-tight">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-slate-400 font-medium mb-8 line-clamp-2 leading-relaxed text-sm md:text-base">
                    Professional {t(service.titleKey).toLowerCase()} services in {locationKey.charAt(0).toUpperCase() + locationKey.slice(1)}.
                  </p>
                  <div className="mt-auto inline-flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest">
                    <span>{t('home.hero.scroll')}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(241,41,89,0.05),transparent_50%)]" />
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                <CheckCircle2 size={14} />
                Quality Assurance
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                {t('home.glance.title')}
              </h2>
            </ScrollReveal>
            
            <div className="grid sm:grid-cols-2 gap-8 text-left">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-500 group">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mt-1 shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-primary transition-colors">{t(`home.glance.item${i}.title` as TranslationKey)}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">{t(`home.glance.item${i}.desc` as TranslationKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 bg-[#0a0a0b] relative overflow-hidden text-center isolate">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,41,89,0.1),transparent_70%)] animate-pulse duration-[5000ms]" />
        <div className="container-sahli relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-[1.1]">
              {t('home.final.cta')}
            </h2>
            <a 
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-2xl font-black text-sm md:text-base uppercase tracking-[0.2em] hover:bg-primary-dark transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(241,41,89,0.4)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Send size={24} className="group-hover:rotate-12 transition-transform duration-500" />
              {t('home.hero.cta')}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};
