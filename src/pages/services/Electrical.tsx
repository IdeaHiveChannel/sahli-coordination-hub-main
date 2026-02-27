import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, ShieldCheck, Clock, MapPin, ArrowUp, AlertCircle, HelpCircle, Search, Wallet, Lightbulb } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MetaTags } from '@/components/seo/MetaTags';

export default function Electrical() {
  const { t, dir } = useLanguage();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Electrical Services Qatar",
    "description": t('services.homeMaintenance.subtitle'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('services.electrical.problem'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrical.problem.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.electrical.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrical.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.electrical.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrical.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.electrical.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrical.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.electrical.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.electrical.availability.desc')
          }
        }
      ]
    }
  };

  const relatedServices = [
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const includes = [
    t('services.homeMaintenance.electrical.items').split('\n')[0] || 'Short Circuit Issues',
    t('services.homeMaintenance.electrical.items').split('\n')[1] || 'Socket Repair',
    t('services.homeMaintenance.electrical.items').split('\n')[2] || 'DB Box Repair',
    t('services.homeMaintenance.electrical.items').split('\n')[3] || 'Lighting Installation'
  ];

  const areas = [
    'Doha', 'Lusail', 'Al Wakrah', 'Al Rayyan', 'Al Daayen', 'Umm Salal', 'Al Khor'
  ];

  return (
    <Layout>
      <MetaTags
        title={t('services.homeMaintenance.electrical.title')}
        description={t('services.homeMaintenance.subtitle')}
        schema={schema}
      />
      {/* 1️⃣ Modern Immersive Hero Section - Aligned with Homepage */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        {/* Background Image with Homepage Parallax */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <img 
              src="/Services/Home Maintenance - Hero.jpg" 
              alt="Professional Electrical Services Qatar"
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
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold tracking-wider uppercase text-primary mb-6"
              >
                <Lightbulb size={14} className="animate-pulse" />
                {t('services.homeMaintenance.electrical.title')}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight">
                {t('services.homeMaintenance.electrical.title')}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl text-balance">
                {t('services.homeMaintenance.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.electrical.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Electrical Hero')}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-3 group"
                >
                  <MessageSquare size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  {t('cta.request')}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-background border-y border-border">
        <div className="container-sahli">
          <ScrollReveal 
            direction="up"
            className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm"
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
                <div key={i} className="flex gap-4 items-center group shrink-0 w-[280px] md:w-auto p-4 md:p-0 rounded-xl bg-background md:bg-transparent border border-border md:border-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
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
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Problem & Why */}
            <ScrollReveal>
              <div className="h-full bg-card rounded-2xl p-6 border border-border hover:border-red-500/30 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.electrical.problem')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t('services.electrical.problem.desc')}</p>
                
                <div className="flex items-start gap-3 pt-6 border-t border-border">
                  <HelpCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-sm font-bold text-foreground mb-1">{t('services.electrical.why')}</span>
                    <p className="text-xs text-muted-foreground">{t('services.electrical.why.desc')}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2: Inspection */}
            <ScrollReveal delay={0.1}>
              <div className="h-full bg-card rounded-2xl p-6 border border-border hover:border-blue-500/30 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.electrical.inspection')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t('services.electrical.inspection.desc')}</p>
              </div>
            </ScrollReveal>

            {/* Card 3: Pricing & Availability */}
            <ScrollReveal delay={0.2}>
              <div className="h-full bg-card rounded-2xl p-6 border border-border hover:border-emerald-500/30 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wallet size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.electrical.pricing')}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t('services.electrical.pricing.desc')}</p>
                
                <div className="flex items-start gap-3 pt-6 border-t border-border">
                  <Clock size={18} className="text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-sm font-bold text-foreground mb-1">{t('services.electrical.availability')}</span>
                    <p className="text-xs text-muted-foreground">{t('services.electrical.availability.desc')}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3️⃣ Visual Service Features */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 md:mb-6 text-foreground">
              {t('service.v1.includes.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('services.homeMaintenance.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {includes.map((item, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.1}
                className="group p-5 md:p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-secondary/20 transition-all duration-500 shrink-0 w-[240px] md:w-auto shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="text-sm font-bold mb-2 text-foreground">
                  {item}
                </h3>
                <div className="w-8 h-0.5 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ How it works (Visual Timeline) */}
      <section className="section-spacing bg-secondary/5 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 md:mb-6 text-foreground">
              {t('how.flow.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('how.flow.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.1}
                className="relative z-10 flex flex-col items-center text-center group shrink-0 w-[200px] md:w-auto"
              >
                <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center text-primary mb-5 shadow-sm group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500 relative">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-tight px-4 font-bold">{step.body}</p>
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="p-6 md:p-8 rounded-xl bg-primary/5 border border-primary/10 shadow-sm"
            >
              <h3 className="text-sm !text-primary mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm text-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-primary transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm"
            >
              <h3 className="text-sm text-muted-foreground mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm text-muted-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-foreground transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served (Map View Style) */}
      <section className="section-spacing bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-8 md:mb-12 text-foreground">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
                {areas.map((area, i) => (
                  <ScrollReveal
                    key={i}
                    direction={dir === 'rtl' ? 'left' : 'right'}
                    delay={i * 0.1}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group shrink-0 w-[200px] md:w-auto shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                      <MapPin size={16} />
                    </div>
                    <span className="text-sm font-bold group-hover:text-primary transition-colors duration-500 text-foreground">{area}</span>
                  </ScrollReveal>
                ))}
              </Marquee>
            </div>
            
            <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden border border-border bg-card flex items-center justify-center shadow-lg group">
              <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                <MapPin size={32} className="text-primary/20 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 py-3 bg-white/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg text-xs !text-primary font-bold">
                  {t('services.areas.qatarNationwide')}
                </div>
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
              {t('service.v1.cta.title')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.homeMaintenance.electrical.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Electrical Final CTA')}
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

      {/* Service Areas - SEO High Intent */}
      <section className="section-spacing bg-muted/30 border-y border-border">
        <div className="container-sahli">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-4">
              {t('service.v1.locations.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              {t('service.v1.locations.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* High Intent - Al Rayyan */}
            <Link 
              to="/electrician-ar-rayyan"
              className="p-4 rounded-xl bg-background border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all group flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-foreground group-hover:text-primary transition-colors">Al Rayyan</span>
              <span className="text-[10px] text-primary font-medium mt-1 uppercase tracking-wider">High Demand</span>
            </Link>

            {/* Other Areas */}
            {['Doha', 'Lusail', 'Al Wakrah'].map((area) => (
              <div key={area} className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all flex flex-col items-center text-center opacity-75 hover:opacity-100">
                <MapPin size={20} className="text-muted-foreground mb-3" />
                <span className="font-medium text-muted-foreground">{area}</span>
              </div>
            ))}
          </div>
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
