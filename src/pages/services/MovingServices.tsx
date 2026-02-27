import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MetaTags } from '@/components/seo/MetaTags';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Truck, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp, Box, Hammer, HelpCircle, Search, Wallet, ArrowLeft } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function MovingServices() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('services.moving.title'),
    "description": t('services.moving.subtitle'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('services.moving.problem'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.moving.problem.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.moving.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.moving.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.moving.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.moving.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.moving.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.moving.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.moving.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.moving.availability.desc')
          }
        }
      ]
    }
  };
  
  const relatedServices = [
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
  ];

  const categories = [
    { title: t('services.moving.local.title'), desc: t('services.moving.local.desc'), icon: <Truck size={16} /> },
    { title: t('services.moving.packing.title'), desc: t('services.moving.packing.desc'), icon: <Box size={16} /> },
    { title: t('services.moving.storage.title'), desc: t('services.moving.storage.desc'), icon: <Hammer size={16} /> }
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const areas = [
    'Doha', 'Lusail', 'Al Wakrah', 'Al Rayyan', 'Al Daayen', 'Umm Salal', 'Al Khor'
  ];

  return (
    <Layout>
      <MetaTags 
        title={t('services.moving.title')} 
        description={t('services.moving.subtitle')} 
        schema={schema}
      />
      {/* 1️⃣ Modern Immersive Hero Section - Standardized */}
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        {/* Background Image with Homepage Parallax */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <img 
              src="/Services/Moving & Relocation.jpg" 
              alt="Professional Moving Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          
          <div className="absolute inset-0 bg-background/40 md:bg-background/20 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-0" />
        </div>
        
        {/* Content Container */}
        <div className="container-sahli relative z-20 pt-20">
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold tracking-wider uppercase text-primary mb-6">
                <Truck size={14} className="animate-pulse" />
                <span>{t('services.moving.title')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight">
                {t('services.moving.title')}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl text-balance">
                {t('services.moving.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink(t('services.moving.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('House Shifting Hero')}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-3 group"
                >
                  <MessageSquare size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  {t('cta.request')}
                </a>
                
                <div className="w-full sm:w-auto px-8 py-4 bg-background/10 backdrop-blur-md text-foreground rounded-xl font-bold border border-foreground/10 flex items-center justify-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <span>24/7 Service Available</span>
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
              {t('services.moving.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.rules.moving'),
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

      {/* 2.5️⃣ Problems & Diagnostics */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-12 opacity-50 z-0" />
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Problem Card */}
            <ScrollReveal delay={0.1} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-red-500/30 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.moving.problem')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t('services.moving.problem.desc')}</p>
              
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <HelpCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-foreground mb-1">{t('services.moving.why')}</span>
                  <p className="text-xs text-muted-foreground">{t('services.moving.why.desc')}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Inspection/Diagnosis Card */}
            <ScrollReveal delay={0.2} className="p-6 md:p-8 rounded-2xl bg-secondary text-secondary-foreground shadow-xl transform md:-translate-y-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center text-primary mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('services.moving.inspection')}</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">{t('services.moving.inspection.desc')}</p>
            </ScrollReveal>

            {/* Availability/Solution Card */}
            <ScrollReveal delay={0.3} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.moving.pricing')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t('services.moving.pricing.desc')}</p>
              
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-foreground mb-1">{t('services.moving.availability')}</span>
                  <p className="text-xs text-muted-foreground">{t('services.moving.availability.desc')}</p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3️⃣ Service Categories */}
      <section className="section-spacing bg-secondary/5 relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 text-foreground">
              {t('services.moving.categories.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('services.moving.categories.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.05}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 20 })}
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-500">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cat.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ How It Works - Visual Timeline */}
      <section className="section-spacing bg-background border-y border-border relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 text-foreground">
              {t('how.flow.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('how.flow.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card border border-border flex items-center justify-center text-primary mb-6 shadow-sm group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg border-2 border-background">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
                  </div>
                </div>
                <p className="text-xs sm:text-sm px-2 font-bold text-muted-foreground group-hover:text-primary transition-colors duration-500 leading-tight">{step.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-secondary/5">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/10 shadow-xl shadow-primary/5"
            >
              <h3 className="text-sm font-black text-primary uppercase tracking-wider mb-6">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4">
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
              className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-xl shadow-primary/5"
            >
              <h3 className="text-sm font-black text-muted-foreground uppercase tracking-wider mb-6">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm text-muted-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-foreground transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served - Map Style */}
      <section className="section-spacing bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-6 md:mb-8 text-center md:text-start text-foreground">
                {t('home.areas.title')}
              </h2>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {areas.map((area, i) => (
                  <ScrollReveal
                    key={i}
                    direction={dir === 'rtl' ? 'left' : 'right'}
                    delay={i * 0.1}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group shadow-sm hover:shadow-md"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <MapPin size={14} />
                    </div>
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-500">{area}</span>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-muted flex items-center justify-center shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>
              <div className="relative text-center p-10">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-4 animate-bounce">
                  <MapPin size={16} />
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight mb-3 text-foreground">{t('services.areas.qatarNationwide')}</h2>
                <p className="text-xs text-muted-foreground">{t('services.areas.rapidResponse')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ Related Services (Marquee) */}
      <section className="py-12 bg-secondary/5 border-t border-border overflow-hidden">
        <div className="container-sahli mb-8">
          <h2 className="text-xl font-bold text-center text-muted-foreground uppercase tracking-widest">
            {t('services.related')}
          </h2>
        </div>
        <Marquee speed={0.4} className="py-4">
          {relatedServices.map((service, i) => (
            <Link 
              key={i} 
              to={service.path}
              className="mx-4 group flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
              <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                {service.title}
              </span>
            </Link>
          ))}
        </Marquee>
      </section>

      {/* 8️⃣ Back to Home Link */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300 font-medium text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{t('nav.home')}</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
