import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Sparkles, Waves, ArrowUp, AlertCircle, HelpCircle, Search, Wallet, Clock, MapPin, Shield, ShieldCheck } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';
import { MetaTags } from '@/components/seo/MetaTags';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function DeepCleaning() {
  const { t, dir } = useLanguage();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Deep Cleaning Services Qatar",
    "description": t('services.cleaning.deep.hero.title'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI Coordination Hub"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Qatar"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Deep Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Deep Cleaning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Move-in/Move-out Cleaning"
          }
        }
      ]
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('services.cleaning.deep.problem'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.cleaning.deep.problem.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.cleaning.deep.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.cleaning.deep.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.cleaning.deep.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.cleaning.deep.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.cleaning.deep.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.cleaning.deep.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.cleaning.deep.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.cleaning.deep.availability.desc')
          }
        }
      ]
    }
  };

  const relatedServices = [
    { title: t('services.cleaning.title'), path: '/services#cleaning' },
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
  ];

  const includes = [
    t('services.cleaning.deep.includes.item1'),
    t('services.cleaning.deep.includes.item2'),
    t('services.cleaning.deep.includes.item3'),
    t('services.cleaning.deep.includes.item4'),
    t('services.cleaning.deep.includes.item5'),
    t('services.cleaning.deep.includes.item6')
  ];

  return (
    <Layout>
      <MetaTags 
        title={t('services.cleaning.deep.hero.title')} 
        description={t('services.cleaning.deep.problem.desc')} 
        schema={schema} 
      />
      <section className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-in fade-in zoom-in-105 duration-1000">
            <img 
              src="/Services/Cleaning service.jpg" 
              alt="Deep Cleaning Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          
          <div className="absolute inset-0 bg-background/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-0" />
        </div>

        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-20 flex flex-col items-center md:items-start">
          <div className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start">
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-black tracking-[0.25em] uppercase text-primary mb-4 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine animate-in slide-in-from-bottom-4 fade-in duration-700"
            >
              <Sparkles size={16} className="animate-pulse" />
              {t('services.cleaning.deep.title')}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-[1.1] tracking-tight text-foreground drop-shadow-2xl font-black w-full text-center md:text-start animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100 fill-mode-both">
              {t('services.cleaning.deep.hero.title')}
            </h1>

            <div className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 fill-mode-both">
              <p className="text-xs text-muted-foreground mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('services.cleaning.deep.hero.subtitle')}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink(t('services.cleaning.deep.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Deep Cleaning Hero')}
                  className="cta-primary px-8 py-4 text-xs btn-shine shadow-xl shadow-primary/30 group transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 group-hover:scale-105 group-active:scale-95 transition-transform">
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('cta.request')}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5️⃣ Detailed Problem & Process Block - SEO Rich */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/30 skew-x-12 opacity-50 z-0" />
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Problem Card */}
            <ScrollReveal delay={0.1} className="p-6 md:p-8 rounded-2xl bg-background border border-border hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-foreground">{t('services.cleaning.deep.problem')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t('services.cleaning.deep.problem.desc')}</p>
              
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <HelpCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-foreground mb-1">{t('services.cleaning.deep.why')}</span>
                  <p className="text-xs text-muted-foreground">{t('services.cleaning.deep.why.desc')}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Diagnosis Card */}
            <ScrollReveal delay={0.2} className="p-6 md:p-8 rounded-2xl bg-card text-card-foreground shadow-2xl shadow-primary/5 transform md:-translate-y-4 border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3">{t('services.cleaning.deep.inspection')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('services.cleaning.deep.inspection.desc')}</p>
            </ScrollReveal>

            {/* Solution Card */}
            <ScrollReveal delay={0.3} className="p-6 md:p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-foreground">{t('services.cleaning.deep.pricing')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('services.cleaning.deep.pricing.desc')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service Standards */}
      <section className="section-spacing bg-muted/30 border-y border-border">
        <div className="container-sahli">
          <ScrollReveal 
            direction="up"
            className="bg-background border border-border rounded-xl p-5 md:p-6 shadow-xl shadow-primary/5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-center">
              {t('services.cleaning.deep.standards.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.cleaning.deep.standards.item1'),
                t('services.cleaning.deep.standards.item2'),
                t('services.cleaning.deep.standards.item3'),
                t('services.rules.payment')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-3 items-start group shrink-0 w-[260px] md:w-auto p-4 md:p-0 rounded-xl bg-muted/30 md:bg-transparent border border-border md:border-0 shadow-sm md:shadow-none">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs text-muted-foreground leading-snug group-hover:text-foreground transition-colors duration-500 font-bold">{rule}</span>
                </div>
              ))}
            </Marquee>
          </ScrollReveal>
        </div>
      </section>

      {/* Includes */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-center md:text-start">
            {t('services.cleaning.deep.includes.title')}
          </h2>
          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {includes.map((item, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.1}
                className="group p-5 md:p-6 rounded-xl bg-muted/30 border border-border hover:border-primary/40 hover:bg-muted transition-all duration-500 shrink-0 w-[180px] shadow-xl shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <Waves size={16} />
                </div>
                <h3 className="text-xs mb-2 font-bold">{item}</h3>
                <div className="w-8 h-0.5 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 7️⃣ Areas Served - Map Style */}
      <section className="section-spacing bg-background border-t border-border overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 md:mb-8 text-center md:text-start text-foreground">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
                {[
                  t('locations.doha'),
                  t('locations.lusail'),
                  t('locations.alrayyan'),
                  t('locations.alwakrah')
                ].map((area, i) => (
                  <ScrollReveal
                    key={i}
                    direction={dir === 'rtl' ? 'left' : 'right'}
                    delay={i * 0.1}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-card md:bg-secondary/20 border border-border hover:border-primary/30 transition-all group shrink-0 w-[180px] md:w-auto shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                      <MapPin size={16} />
                    </div>
                    <span className="text-sm font-bold group-hover:text-primary transition-colors duration-500 text-foreground">{area}</span>
                  </ScrollReveal>
                ))}
              </Marquee>
            </div>
            <div className="relative aspect-video md:aspect-[2/1] rounded-xl overflow-hidden border border-border bg-muted/30 flex items-center justify-center shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>
              <div className="relative text-center p-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-3 animate-bounce shadow-xl shadow-primary/20">
                  <MapPin size={16} />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl mb-2 font-bold">{t('services.areas.qatarNationwide')}</h2>
                <p className="text-xs text-muted-foreground">{t('services.areas.rapidResponse')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-muted/30 border-t border-border overflow-hidden relative">
        <div className="container-sahli relative z-10 text-center max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Clock size={16} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl mb-8">
              {t('services.deepCleaning.cta.title')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.cleaning.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Cleaning Final CTA')}
                className="cta-primary px-6 py-3 text-xs btn-shine shadow-xl shadow-primary/30 group transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="flex items-center gap-2 group-hover:scale-105 group-active:scale-95 transition-transform"
                >
                  <MessageSquare size={16} className="fill-primary-foreground" />
                  {t('cta.request')}
                </div>
              </a>
              
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-2 text-xs font-bold !text-primary uppercase tracking-wider">
                  <ShieldCheck size={16} />
                  {t('services.security.safeSecure')}
                </div>
                <div className="text-xs text-muted-foreground font-bold">{t('services.rules.payment')}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9️⃣ Related Services - Quick Links */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli">
          <div className="mb-10 text-center md:text-start">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight mb-3">
              {t('services.related.title')}
            </h2>
            <p className="text-xs !text-muted-foreground uppercase tracking-widest font-black">
              {t('services.related.subtitle')}
            </p>
          </div>
          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {relatedServices.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="group p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 shrink-0 w-[260px] md:w-auto shadow-sm shadow-primary/5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-wider">
                    {service.title}
                  </span>
                  <ArrowUp size={16} className="rotate-45 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </div>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      <section className="section-spacing bg-muted/30 border-t border-border">
        <div className="container-sahli flex justify-center">
          <ScrollReveal>
            <Link 
              to="/"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-background border border-border hover:border-primary/20 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
              </div>
              <span className="text-xs font-bold !text-foreground/60 group-hover:text-foreground transition-colors uppercase tracking-widest">
                {t('nav.home')}
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
