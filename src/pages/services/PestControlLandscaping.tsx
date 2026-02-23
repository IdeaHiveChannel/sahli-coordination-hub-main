import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Marquee } from '@/components/motion/Marquee';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MetaTags } from '@/components/seo/MetaTags';
import { MessageSquare, CheckCircle2, Bug, Leaf, Waves, Droplets, Clock, MapPin, ArrowUp, ShieldCheck, AlertCircle, HelpCircle, Search, Wallet } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export default function PestControlLandscaping() {
  const { t, dir } = useLanguage();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pest Control & Landscaping Services Qatar",
    "description": t('services.outdoor.subtitle'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI Coordination Hub"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('services.outdoor.problem'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.outdoor.problem.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.outdoor.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.outdoor.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.outdoor.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.outdoor.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.outdoor.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.outdoor.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.outdoor.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.outdoor.availability.desc')
          }
        }
      ]
    }
  };
  
  const relatedServices = [
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.title'), path: '/services#cleaning' },
    { title: t('services.moving.title'), path: '/services#moving' },
  ];

  const categories = [
    { title: t('services.outdoor.pest.title'), desc: t('services.outdoor.pest.desc'), icon: <Bug size={16} /> },
    { title: t('services.outdoor.landscaping.title'), desc: t('services.outdoor.landscaping.desc'), icon: <Leaf size={16} /> },
    { title: t('services.outdoor.pool.title'), desc: t('services.outdoor.pool.desc'), icon: <Waves size={16} /> },
    { title: t('services.outdoor.waterproofing.title'), desc: t('services.outdoor.waterproofing.desc'), icon: <Droplets size={16} /> }
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
    t('home.areas.item3'),
    t('home.areas.item4')
  ];

  return (
    <Layout>
      <MetaTags 
        title={t('services.outdoor.title')} 
        description={t('services.outdoor.subtitle')} 
        schema={schema} 
      />
      {/* 1️⃣ Modern Immersive Hero Section - Aligned with Homepage */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background">
        {/* Background Image with Homepage Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 animate-in zoom-in-105 duration-[1.5s] ease-out"
          >
            <img 
              src="/Services/Pest Control.jpg" 
              alt="Pest Control & Landscaping Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          
          <div className="absolute inset-0 bg-background/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-0" />
        </div>
        
        <div 
          className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 h-full bg-muted/10 pointer-events-none z-10 opacity-50`} 
        />

        {/* Content Container */}
        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-20 flex flex-col items-center md:items-start">
          <div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start"
          >
            <ScrollReveal 
              direction="up"
              duration={0.8}
              delay={0.1}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 rounded-full border border-primary/30 text-xs font-black tracking-[0.2em] uppercase text-primary mb-4 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <img 
                src="/logos/SahlLogo5.png" 
                alt="" 
                className="w-4 h-4 object-contain animate-pulse scale-[3]" 
              />
              {t('services.outdoor.title')}
            </ScrollReveal>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-[1.1] tracking-tight text-foreground drop-shadow-2xl font-black w-full text-center md:text-start animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200 fill-mode-backwards">
              {t('services.outdoor.title')}
            </h1>

            <div
              className="w-full max-w-2xl flex flex-col items-center md:items-start text-center md:text-start animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-backwards"
            >
              <p className="text-xs text-muted-foreground mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-xl mx-auto md:mx-0">
                {t('services.outdoor.subtitle')}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink(t('services.outdoor.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Outdoor Hero CTA')}
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
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-muted/30 border-y border-border overflow-hidden">
        <div className="container-sahli">
          <ScrollReveal 
            direction="up"
            className="bg-background border border-border rounded-xl p-5 md:p-6 shadow-xl shadow-primary/5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-center text-foreground">
              {t('services.outdoor.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
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

      {/* 2.5️⃣ Detailed Problem & Process Block */}
      <section className="section-spacing bg-background border-y border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column: Problems & Why */}
            <div className="space-y-8 md:space-y-12">
              <ScrollReveal>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{t('services.outdoor.problem')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t('services.outdoor.problem.desc')}</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{t('services.outdoor.why')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t('services.outdoor.why.desc')}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Process & Solutions */}
            <div className="space-y-8 md:space-y-12">
              <ScrollReveal delay={0.2}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Search size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{t('services.outdoor.inspection')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t('services.outdoor.inspection.desc')}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{t('services.outdoor.pricing')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t('services.outdoor.pricing.desc')}</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{t('services.outdoor.availability')}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t('services.outdoor.availability.desc')}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Service Categories */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 text-foreground">
              {t('services.outdoor.title')}
            </h2>
            <p className="text-xs text-muted-foreground">{t('services.outdoor.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {categories.map((cat, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.05}
                className="shrink-0 w-[200px] md:w-auto p-5 md:p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-500 group shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 16 })}
                </div>
                <h3 className="text-xs mb-3 group-hover:text-primary transition-colors duration-500 font-bold uppercase tracking-wider text-foreground">{cat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
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
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6 text-foreground">
              {t('how.flow.title')}
            </h2>
            <p className="text-xs text-muted-foreground">{t('how.flow.subtitle')}</p>
          </div>
          
          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.1}
                className="shrink-0 w-[160px] md:w-auto relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary mb-5 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 16 })}
                  </div>
                </div>
                <p className="text-xs text-foreground px-4 font-bold">{step.body}</p>
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background overflow-hidden">
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
              <h2 className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-foreground">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
                {areas.map((area, i) => (
                  <ScrollReveal
                    key={i}
                    direction={dir === 'rtl' ? 'left' : 'right'}
                    delay={i * 0.1}
                    className="shrink-0 w-[160px] md:w-auto flex items-center gap-2.5 p-2.5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group shadow-xl shadow-primary/5 hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <MapPin size={16} />
                    </div>
                    <span className="text-xs font-bold group-hover:text-primary transition-colors text-foreground">{area}</span>
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
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-3 animate-bounce">
                  <MapPin size={16} />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl mb-2 font-black text-foreground">{t('services.areas.qatarNationwide')}</h2>
                <p className="text-xs text-muted-foreground font-medium">{t('services.areas.rapidResponse')}</p>
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
                href={getWhatsAppLink(t('services.outdoor.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Outdoor Final CTA')}
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
