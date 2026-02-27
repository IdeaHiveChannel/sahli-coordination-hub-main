import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { MetaTags } from '@/components/seo/MetaTags';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { getWhatsAppLink } from '@/lib/constants';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, CheckCircle2, ShieldCheck, Clock, MapPin, 
  ArrowRight, AlertCircle, ChevronDown, Send
} from 'lucide-react';
import { TranslationKey } from '@/lib/i18n';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceLandingPageProps {
  serviceKey: string; // e.g., 'pest', 'ac', 'plumbing'
  icon: React.ReactNode;
  heroImage: string;
  whatsappKey: TranslationKey;
  relatedServices: { titleKey: TranslationKey; path: string }[];
  faqs: FAQItem[];
  scopeItems: string[];
  showInspectionClarification?: boolean;
}

export const ServiceLandingPage: React.FC<ServiceLandingPageProps> = ({
  serviceKey,
  icon,
  heroImage,
  whatsappKey,
  relatedServices,
  faqs,
  scopeItems,
  showInspectionClarification = true,
}) => {
  const { t, dir } = useLanguage();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t(`${serviceKey}.hero.title` as TranslationKey),
    "description": t(`${serviceKey}.meta.description` as TranslationKey),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  };

  const areas = [
    'Doha', 'Lusail', 'The Pearl', 'Al Wakrah', 'Al Rayyan', 'Al Daayen', 'Umm Salal', 'Al Khor'
  ];

  return (
    <Layout>
      <MetaTags
        title={t(`${serviceKey}.meta.title` as TranslationKey)}
        description={t(`${serviceKey}.meta.description` as TranslationKey)}
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden bg-[#0a0a0b]">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={t(`${serviceKey}.hero.title` as TranslationKey)}
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.1),transparent_50%)] z-10" />
        </div>

        <div className="container-sahli relative z-20 pt-32 pb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl">
              {icon}
              <span>{t(`${serviceKey}.meta.title` as TranslationKey)}</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter max-w-4xl drop-shadow-2xl">
              {t(`${serviceKey}.hero.title` as TranslationKey)}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-12 font-medium leading-relaxed max-w-2xl text-balance">
              {t(`${serviceKey}.hero.subtitle` as TranslationKey)}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href={getWhatsAppLink(t(whatsappKey))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick(`${serviceKey} Hero CTA`)}
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(241,41,89,0.4)] flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <MessageSquare size={20} className="group-hover:rotate-12 transition-transform duration-500" />
                {t('home.hero.cta')}
              </a>
              <div className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md text-white rounded-2xl font-black text-sm uppercase tracking-widest border border-white/10 flex items-center justify-center gap-3">
                <Clock size={20} className="text-primary" />
                <span>{t('contact.hours.title')}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Scope Section */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(241,41,89,0.05),transparent_50%)]" />
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-8">
                <CheckCircle2 size={14} />
                Service Portfolio
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-12 tracking-tighter">
                {t(`${serviceKey}.scope.title` as TranslationKey)}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {scopeItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-3xl group hover:border-primary/40 hover:bg-white/[0.08] transition-all duration-500">
                    <CheckCircle2 size={24} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-black text-slate-300 group-hover:text-white transition-colors tracking-tight text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {showInspectionClarification && (
              <ScrollReveal delay={0.2}>
                <div className="p-10 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-3xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] rounded-full -mr-32 -mt-32 animate-pulse" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-3xl bg-primary text-white flex items-center justify-center mb-10 shadow-2xl shadow-primary/20">
                      <AlertCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-6 tracking-tighter">{t('home.glance.item2.title')}</h3>
                    <p className="text-lg text-slate-400 leading-relaxed font-bold">
                      {t('home.hero.subtext')}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] relative overflow-hidden">
        <div className="container-sahli max-w-4xl relative z-10">
          <ScrollReveal className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
              <MessageSquare size={14} />
              FAQ
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">
              {t('home.faq.title')}
            </h2>
          </ScrollReveal>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`bg-white/5 rounded-[2rem] border transition-all duration-500 overflow-hidden group ${openFaq === i ? 'border-primary/40 shadow-2xl bg-white/[0.08]' : 'border-white/10 hover:border-white/20'}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 md:p-10 text-left focus:outline-none"
                  >
                    <h3 className={`font-black text-lg md:text-xl transition-colors duration-300 tracking-tight ${openFaq === i ? 'text-primary' : 'text-white group-hover:text-primary/80'}`}>
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 ml-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${openFaq === i ? 'bg-primary text-white rotate-180' : 'bg-white/5 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="p-8 md:p-10 pt-0 text-slate-400 leading-relaxed text-base md:text-lg font-medium">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] border-t border-white/10">
        <div className="container-sahli">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter">
              {t('home.areas.title')}
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {areas.map((area) => (
              <div key={area} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 shadow-sm flex items-center gap-3 hover:border-primary/40 hover:text-white transition-all duration-500">
                <MapPin size={16} className="text-primary" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] border-t border-white/10">
        <div className="container-sahli">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter">
              {t('services.related.title')}
            </h2>
            <Link to="/services" className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              Explore All <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {relatedServices.map((service, i) => (
              <Link 
                key={i} 
                to={service.path}
                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-700 group flex flex-col justify-between aspect-square"
              >
                <span className="font-black text-white group-hover:text-primary transition-colors block uppercase tracking-widest text-sm leading-tight">
                  {t(service.titleKey)}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 bg-[#0a0a0b] relative overflow-hidden text-center isolate border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,41,89,0.1),transparent_70%)] animate-pulse duration-[5000ms]" />
        <div className="container-sahli relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-[1.1]">
              {t('home.final.cta')}
            </h2>
            <a 
              href={getWhatsAppLink(t(whatsappKey))}
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
