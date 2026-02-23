import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MetaTags } from '@/components/seo/MetaTags';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Snowflake, Lightbulb, Droplets, Cog, Wrench, Shield, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp, Bug, Search, XCircle, HelpCircle } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function HomeMaintenance() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('services.homeMaintenance.title'),
    "description": t('services.homeMaintenance.subtitle'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI Coordination Hub"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('services.homeMaintenance.problem'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.homeMaintenance.problem.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.homeMaintenance.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.homeMaintenance.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.homeMaintenance.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.homeMaintenance.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.homeMaintenance.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.homeMaintenance.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.homeMaintenance.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.homeMaintenance.availability.desc')
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
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
  ];

  const categories = [
    { title: t('services.homeMaintenance.ac.title'), desc: t('services.homeMaintenance.ac.desc'), icon: <Snowflake size={16} /> },
    { title: t('services.homeMaintenance.plumbing.title'), desc: t('services.homeMaintenance.plumbing.desc'), icon: <Droplets size={16} /> },
    { title: t('services.homeMaintenance.electrical.title'), desc: t('services.homeMaintenance.electrical.desc'), icon: <Lightbulb size={16} /> },
    { title: t('services.homeMaintenance.handyman.title'), desc: t('services.homeMaintenance.handyman.desc'), icon: <Wrench size={16} /> },
    { title: t('services.homeMaintenance.appliances.title'), desc: t('services.homeMaintenance.appliances.desc'), icon: <Cog size={16} /> },
    { title: t('services.homeMaintenance.pest.title'), desc: t('services.homeMaintenance.pest.desc'), icon: <Bug size={16} /> }
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const areas = [
    t('home.areas.item1'),
    t('home.areas.item2'),
    t('home.areas.item3')
  ];

  return (
    <Layout>
      <MetaTags 
        title={t('services.homeMaintenance.title')} 
        description={t('services.homeMaintenance.subtitle')} 
        schema={schema}
      />
      {/* 1️⃣ Modern Immersive Hero Section - Aligned with Homepage */}
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        {/* Background Image with Homepage Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0"
          >
            <img 
              src="/Services/Home Maintenance - Hero.jpg" 
              alt="Home Maintenance Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          
          <div className="absolute inset-0 bg-background/40 md:bg-background/20 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-0" />
        </div>
        
        <div className="container-sahli relative z-20 pt-20">
          <div 
            className="max-w-4xl"
          >
            <ScrollReveal 
              direction="up"
              duration={0.8}
              delay={0.1}
            >
              <div 
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold tracking-wider uppercase text-primary mb-6"
              >
                <img 
                  src="/logos/SahlLogo5.png" 
                  alt="" 
                  className="w-3 h-3 object-contain animate-pulse scale-[3]" 
                />
                {t('services.homeMaintenance.title')}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight">
                {t('services.homeMaintenance.title')}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl text-balance">
                {t('services.homeMaintenance.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Home Maintenance Hero')}
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

      {/* Problems & Diagnostics */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-12 opacity-50 z-0" />
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Problem Card */}
            <ScrollReveal delay={0.1} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-red-500/30 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.homeMaintenance.problem')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t('services.homeMaintenance.problem.desc')}</p>
              
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <HelpCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-sm font-bold text-foreground mb-1">{t('services.homeMaintenance.why')}</span>
                  <p className="text-xs text-muted-foreground">{t('services.homeMaintenance.why.desc')}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Diagnosis Card */}
            <ScrollReveal delay={0.2} className="p-6 md:p-8 rounded-2xl bg-secondary text-secondary-foreground shadow-xl transform md:-translate-y-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center text-primary mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('services.homeMaintenance.inspection')}</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">{t('services.homeMaintenance.inspection.desc')}</p>
            </ScrollReveal>

            {/* Solution Card */}
            <ScrollReveal delay={0.3} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.homeMaintenance.pricing')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('services.homeMaintenance.pricing.desc')}</p>
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
            <Marquee speed={0.5} className="-mx-4 px-4">
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

      {/* 3️⃣ Service Categories */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 md:mb-6 text-foreground">
              {t('services.homeMaintenance.categories.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('services.homeMaintenance.categories.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {categories.map((cat, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.05}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-500 group shrink-0 w-[260px] md:w-auto shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 18 })}
                </div>
                <h3 className="text-sm mb-3 group-hover:text-primary transition-colors duration-500 font-bold uppercase tracking-wider text-foreground">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cat.desc}
                </p>
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ How Coordination Works */}
      <section className="section-spacing bg-secondary/5 border-y border-border relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 md:mb-6 text-foreground">
              {t('how.flow.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('how.flow.subtitle')}</p>
          </div>
          
          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="relative z-10 flex flex-col items-center text-center group shrink-0 w-[180px] md:w-auto"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-card border border-border flex items-center justify-center text-primary mb-5 shadow-sm group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500 relative">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
                  </div>
                </div>
                <p className="text-sm px-4 font-bold group-hover:text-primary transition-colors duration-500 text-foreground">{step.body}</p>
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

      {/* 6️⃣ Areas Served - Map Style */}
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
            <div className="relative aspect-video md:aspect-[2/1] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>
              <div className="relative text-center p-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-3 animate-bounce shadow-xl shadow-primary/20">
                  <MapPin size={16} />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl mb-2 font-bold">{t('services.areas.qatarNationwide')}</h2>
                <p className="text-xs text-slate-600">{t('services.areas.rapidResponse')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-white border-t border-slate-200 overflow-hidden relative">
        <div className="container-sahli relative z-10 text-center max-w-2xl mx-auto">
          <ScrollReveal
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 md:mb-8">
              <MessageSquare size={16} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl mb-6">
              {t('cta.final.title')}
            </h2>
            <p className="text-xs text-slate-600 mb-8 max-w-2xl mx-auto">
              {t('cta.final.body')}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.homeMaintenance.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Home Maintenance Bottom CTA')}
                className="cta-primary px-8 py-4 text-xs btn-shine shadow-xl shadow-primary/30 group"
              >
                <div
                  className="flex items-center gap-3 group-hover:scale-105 group-active:scale-95 transition-transform"
                >
                  <MessageSquare size={16} className="fill-primary-foreground" />
                  {t('cta.request')}
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9️⃣ Related Services Marquee */}
      <section className="py-12 md:py-16 bg-foreground/[0.02] border-t border-border overflow-hidden">
        <div className="container-sahli mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center">
            {t('services.related.title')}
          </h2>
        </div>
        <Marquee speed={0.3} pauseOnHover={true} gap={20}>
          {relatedServices.map((service, i) => (
            <Link
              key={i}
              to={service.path}
              className="px-6 py-3 rounded-xl bg-background border border-border hover:border-primary/30 hover:text-primary transition-all duration-300 text-xs font-bold whitespace-nowrap shrink-0 shadow-sm"
            >
              {service.title}
            </Link>
          ))}
        </Marquee>
      </section>

      {/* 🔟 Back to Home */}
      <section className="py-8 md:py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-xs font-bold !text-foreground/60 group-hover:text-foreground transition-colors uppercase tracking-widest">{t('nav.home')}</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}




