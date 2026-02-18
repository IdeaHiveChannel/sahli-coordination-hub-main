import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Marquee } from '@/components/motion/Marquee';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, Heart, Baby, Stethoscope, Users, Sparkles, ShieldCheck, Clock, AlertCircle, MapPin, ArrowUp, GraduationCap, Shield, Home, Zap } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';
import { TranslationKey } from '@/lib/i18n';

export default function CareLifestyle() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const relatedServices = [
    { title: t('services.care.childcare.title.roof5'), path: t('services.babysitting.path') },
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.title'), path: '/services#cleaning' },
    { title: t('services.moving.title'), path: '/services#moving' },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const categories = [
    { 
      title: t('services.care.elderly.title.roof5'), 
      desc: t('services.care.elderly.desc.roof5'), 
      icon: <Heart size={16} /> 
    },
    { 
      title: t('services.care.childcare.title.roof5'), 
      desc: t('services.care.childcare.desc.roof5'), 
      icon: <Baby size={16} /> 
    },
    { 
      title: t('services.care.specialNeeds.title.roof5_detailed'), 
      desc: t('services.care.specialNeeds.desc.roof5_detailed'), 
      icon: <Stethoscope size={16} /> 
    },
    { 
      title: t('services.care.companion.title.roof5_detailed'), 
      desc: t('services.care.companion.desc.roof5_detailed'), 
      icon: <Users size={16} /> 
    }
  ];

  const areas = [
    t('home.areas.item1' as TranslationKey),
    t('home.areas.item2' as TranslationKey),
    t('home.areas.item3' as TranslationKey),
    t('home.areas.item4' as TranslationKey),
    t('home.areas.item5' as TranslationKey),
  ];

  // Placeholder removed
  
  // Parallax effects matching homepage
  // Simplified for performance
  
  return (
    <Layout>
      {/* 1️⃣ Modern Immersive Hero Section - Aligned with Homepage */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-white">
        {/* Background Image with Homepage Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 animate-in fade-in zoom-in-105 duration-1000"
          >
            <img 
              src="/Services/Nanny Care Service.jpg" 
              alt="Care & Lifestyle Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          
          <div className="absolute inset-0 bg-white/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-0" />
        </div>
        
        {/* Decorative elements */}
        <div 
          className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 h-full bg-slate-100 pointer-events-none z-10 opacity-50`} 
        />

        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-20 flex flex-col items-center md:items-start">
          <div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start"
          >
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 rounded-full border border-primary/30 text-xs font-black tracking-[0.2em] uppercase text-primary mb-4 md:mb-5 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 fill-mode-backwards"
            >
              <img 
                src="/logos/SahlLogo5.png" 
                alt="" 
                className="w-3 h-3 object-contain animate-pulse scale-[3]" 
              />
              {t('services.care.title')}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-[1.1] tracking-tight text-slate-900 drop-shadow-2xl font-black w-full text-center md:text-start animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-backwards">
              {t('services.care.title')}
            </h1>

            <div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-backwards"
            >
              <p className="text-base md:text-lg text-slate-700 mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('services.care.subtitle')}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={getWhatsAppLink(t('services.care.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Care Hero')}
                  className="cta-primary px-6 py-3 text-xs btn-shine shadow-xl shadow-primary/30 group"
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
      <section className="section-spacing bg-background border-y border-border">
        <div className="container-sahli">
          <ScrollReveal 
            className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 shadow-xl shadow-primary/5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-center">
              {t('services.care.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={16}>
              {[
                t('services.rules.care'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-3 items-start group shrink-0 w-[260px] md:w-auto p-4 md:p-0 rounded-xl bg-white md:bg-transparent border border-slate-200 md:border-0 shadow-sm md:shadow-none">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs text-slate-600 leading-snug group-hover:text-slate-900 transition-colors duration-500 font-bold">{rule}</span>
                </div>
              ))}
            </Marquee>
          </ScrollReveal>
        </div>
      </section>

      {/* 3️⃣ Service Categories */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6">
              {t('services.care.categories.title')}
            </h2>
            <p className="text-xs text-slate-500">{t('services.care.categories.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={16}>
            {categories.map((cat, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.05}
                className="group p-5 md:p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 hover:bg-slate-100 transition-all duration-500 shrink-0 w-[220px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 16 })}
                </div>
                <h3 className="text-xs font-bold mb-2 group-hover:text-primary transition-colors duration-500 uppercase tracking-wider">{cat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ How Coordination Works */}
      <section className="section-spacing bg-slate-50 border-y border-slate-200">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal
              direction="right"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl mb-6">
                {t('services.howItWorks.title')}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: t('services.howItWorks.step1.title'),
                    desc: t('services.howItWorks.step1.desc')
                  },
                  {
                    step: "02",
                    title: t('services.howItWorks.step2.title'),
                    desc: t('services.howItWorks.step2.desc')
                  },
                  {
                    step: "03",
                    title: t('services.howItWorks.step3.title'),
                    desc: t('services.howItWorks.step3.desc')
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl font-black text-primary/20">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal
              direction="left"
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xl shadow-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                      <Clock size={40} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{t('services.cta.ready')}</h3>
                    <p className="text-slate-700 mb-8 max-w-xs mx-auto">
                      {t('services.cta.desc')}
                    </p>
                    <Link to="/contact">
                      <Button size="lg" className="rounded-full px-8">
                        {t('hero.cta.book')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-white border-y border-slate-200">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="p-6 rounded-xl bg-primary/[0.03] border border-primary/10 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs font-black !text-primary mb-4 uppercase tracking-wider">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-3">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-xs text-slate-700 font-bold">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs font-black text-slate-400 mb-4 uppercase tracking-wider">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-3">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-xs text-slate-400 font-bold">
                    <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served - Map Style */}
      <section className="section-spacing bg-white border-y border-slate-200">
        <div className="container-sahli">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6">
              {t('service.v1.locations.title')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('service.v1.locations.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              t('locations.doha'),
              t('locations.lusail'),
              t('locations.alrayyan'),
              t('locations.alwakrah')
            ].map((city, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="bg-slate-50 border border-slate-200 p-4 md:p-6 rounded-xl text-center hover:border-primary/40 hover:bg-slate-100 transition-all duration-300 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                  <MapPin size={18} />
                </div>
                <h3 className="font-bold text-slate-600">{city}</h3>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-slate-50 border-t border-slate-200 overflow-hidden relative">
        <div className="container-sahli relative z-10 text-center max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
              <Clock size={16} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl mb-8">
              {t('service.v1.cta.title')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.care.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Care Final CTA')}
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
                <div className="text-xs text-slate-400 font-bold">{t('services.rules.payment')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9️⃣ Related Services - Quick Links */}
      <section className="section-spacing bg-slate-50 border-t border-slate-200">
        <div className="container-sahli">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl mb-4">
              {t('service.v1.related.title')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: t('services.care.title'), href: '/services/care-lifestyle' },
              { icon: Home, label: t('services.homeMaintenance.title'), href: '/services/home-maintenance' },
              { icon: Sparkles, label: t('services.cleaning.title'), href: '/services/cleaning' },
              { icon: Zap, label: t('services.electrical.title'), href: '/services/electrical' }
            ].map((service, i) => (
              <Link key={i} to={service.href}>
                <ScrollReveal
                  delay={i * 0.1}
                  className="bg-white border border-slate-200 p-4 md:p-6 rounded-xl text-center hover:border-primary/40 hover:bg-slate-50 transition-all duration-300 h-full shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                    <service.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-700 text-sm">{service.label}</h3>
                </ScrollReveal>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-xs font-bold !text-foreground/60 group-hover:text-foreground transition-colors uppercase tracking-wider">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}


