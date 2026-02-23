import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, Clock, MapPin, AlertCircle, Search, CheckCircle2, ArrowUp, ShieldCheck } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';
import { MetaTags } from '@/components/seo/MetaTags';

export default function ElectricianRayyan() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Electrician in Al Rayyan",
    "description": t('services.electrician.rayyan.desc'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI Coordination Hub"
    },
    "areaServed": {
      "@type": "City",
      "name": "Al Rayyan"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('services.electrician.rayyan.problem.title'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrician.rayyan.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.electrician.rayyan.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrician.rayyan.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.electrician.rayyan.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrician.rayyan.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.electrician.rayyan.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrician.rayyan.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.electrician.rayyan.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrician.rayyan.availability.desc')
          }
        }
      ]
    }
  };

  const relatedServices = [
    { title: t('services.homeMaintenance.ac.title'), path: t('services.homeMaintenance.ac.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.electrical.title'), path: t('services.homeMaintenance.electrical.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.homeMaintenance.appliances.title'), path: t('services.electronics.path') },
    { title: t('services.homeMaintenance.pest.title'), path: t('services.outdoor.pest.path') },
    { title: t('services.cleaning.regular.title'), path: t('services.cleaning.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.moving.title'), path: t('services.moving.path') },
  ];

  const areas = [
    'Al Rayyan', 'Muaither', 'Al Aziziyah', 'Al Waab', 'Bani Hajer', 'Al Wajbah',
    t('home.areas.item1'),
    t('home.areas.item2')
  ];

  return (
    <Layout>
      <MetaTags 
        title={`${t('services.electrician.rayyan.title')} | SAHLI`}
        description={t('services.electrician.rayyan.desc')}
        schema={schema}
      />

      {/* 1️⃣ Hero Section - Standardized */}
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <img 
              src="/Services/Electrical - Hero.jpg" 
              alt="Electrician in Al Rayyan"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-background/40 md:bg-background/20 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-0" />
        </div>

        <div className="container-sahli relative z-20 pt-20">
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold tracking-wider uppercase text-primary mb-6">
                <MapPin size={14} className="animate-pulse" />
                <span>Al Rayyan, Qatar</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight">
                {t('services.electrician.rayyan.title')}
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl text-balance">
                {t('services.electrician.rayyan.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.electrical.whatsapp') || 'I need an electrician')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Electrician Rayyan Hero')}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-3 group"
                >
                  <MessageSquare size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  {t('cta.request')}
                </a>
                
                <div className="w-full sm:w-auto px-8 py-4 bg-background/10 backdrop-blur-md text-foreground rounded-xl font-bold border border-foreground/10 flex items-center justify-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <span>{t('services.electrician.rayyan.response.desc')}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-background border-y border-border">
        <div className="container-sahli">
          <ScrollReveal 
            className="bg-card border border-border rounded-xl p-6 md:p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-8 md:mb-10 text-center text-foreground">
              {t('services.homeMaintenance.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-4 items-center group shrink-0 w-[280px] md:w-auto p-5 md:p-0 rounded-xl bg-background md:bg-transparent border border-border md:border-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-sm text-muted-foreground leading-snug group-hover:text-foreground transition-colors duration-500 font-bold">{rule}</span>
                </div>
              ))}
            </Marquee>
          </ScrollReveal>
        </div>
      </section>

      {/* 3️⃣ Local Context & SEO Block (Problems & Diagnostics Style) */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-12 opacity-50 z-0" />
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Problem Card */}
            <ScrollReveal delay={0.1} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-red-500/30 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.electrician.rayyan.problem.title')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('services.electrician.rayyan.desc')}</p>
            </ScrollReveal>

            {/* Inspection/Diagnosis Card */}
            <ScrollReveal delay={0.2} className="p-6 md:p-8 rounded-2xl bg-secondary text-secondary-foreground shadow-xl transform md:-translate-y-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center text-primary mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('services.electrician.rayyan.inspection')}</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">{t('services.electrician.rayyan.inspection.desc')}</p>
            </ScrollReveal>

            {/* Availability/Solution Card */}
            <ScrollReveal delay={0.3} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.electrician.rayyan.availability')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('services.electrician.rayyan.availability.desc')}</p>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 4️⃣ Boundary Block */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="p-5 rounded-xl bg-primary/5 border border-primary/10 shadow-sm"
            >
              <h3 className="text-sm !text-primary mb-4 font-bold uppercase tracking-wider">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-2.5">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm text-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-primary transition-colors duration-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              className="p-5 rounded-xl bg-card border border-border shadow-sm"
            >
              <h3 className="text-sm text-muted-foreground mb-4 font-bold uppercase tracking-wider">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-2.5">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm text-muted-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-foreground transition-colors duration-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5️⃣ Areas Served - Map Style */}
      <section className="section-spacing bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 md:mb-8 text-center md:text-start text-foreground">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
                {areas.map((area, i) => (
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
            <div className="relative aspect-video md:aspect-[2/1] rounded-xl overflow-hidden border border-border bg-card flex items-center justify-center shadow-2xl shadow-primary/5">
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

      {/* 6️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-muted/30 border-t border-border overflow-hidden relative">
        <div className="container-sahli relative z-10 text-center max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Clock size={16} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl mb-8">
              {t('service.v1.cta.title')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.homeMaintenance.electrical.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Electrician Rayyan Final CTA')}
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

      {/* 7️⃣ Related Services Marquee */}
      <section className="py-12 md:py-16 bg-background border-t border-border overflow-hidden">
        <div className="container-sahli mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center text-foreground">
            {t('services.related.title')}
          </h2>
        </div>
        <Marquee speed={0.3} pauseOnHover={true} gap={20}>
          {relatedServices.map((service, i) => (
            <Link
              key={i}
              to={service.path}
              className="px-6 py-3 rounded-xl bg-muted/30 border border-border hover:border-primary/30 hover:text-primary transition-all duration-300 text-xs font-bold whitespace-nowrap shrink-0 shadow-sm text-foreground"
            >
              {service.title}
            </Link>
          ))}
        </Marquee>
      </section>

      {/* 8️⃣ Back to Home */}
      <section className="section-spacing bg-muted/30 border-t border-border">
        <div className="container-sahli flex justify-center">
          <ScrollReveal>
            <Link 
              to="/"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-background border border-border hover:border-primary/20 transition-all shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
              </div>
              <span className="text-xs font-bold !text-muted-foreground group-hover:!text-foreground transition-colors uppercase tracking-widest">{t('nav.home')}</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
