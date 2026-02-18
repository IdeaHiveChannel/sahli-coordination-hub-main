import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Tv, ShieldCheck, Smartphone, Cog, Wrench, Shield, Clock, MapPin, AlertCircle, ArrowUp } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function ElectronicsRepair() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const relatedServices = [
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
  ];

  const categories = [
    { title: t('services.electronics.repair.title'), desc: t('services.electronics.repair.desc'), icon: <Tv size={16} /> },
    { title: t('services.electronics.smart.title'), desc: t('services.electronics.smart.desc'), icon: <ShieldCheck size={16} /> },
    { title: t('services.electronics.satellite.title'), desc: t('services.electronics.satellite.desc'), icon: <Smartphone size={16} /> }
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
      {/* 1️⃣ Modern Immersive Hero Section - Aligned with Homepage */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-white">
        {/* Background Image with Homepage Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 animate-in zoom-in-105 duration-[1.5s] ease-out"
          >
            <img 
              src="/Services/Electronics repair.jpg" 
              alt="Electronics Repair Services Qatar"
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
              {t('services.electronics.title')}
            </ScrollReveal>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-[1.1] tracking-tight text-slate-900 drop-shadow-2xl font-black w-full text-center md:text-start animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200 fill-mode-backwards">
              {t('services.electronics.title')}
            </h1>

            <div
              className="w-full max-w-2xl flex flex-col items-center md:items-start text-center md:text-start animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-backwards"
            >
              <p className="text-xs text-slate-700 mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-xl mx-auto md:mx-0">
                {t('services.electronics.subtitle')}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink(t('services.electronics.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Electronics Hero CTA')}
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
      <section className="section-spacing bg-white border-y border-slate-200">
        <div className="container-sahli">
          <ScrollReveal 
            className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 shadow-xl shadow-primary/5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-center">
              {t('services.electronics.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('services.electronics.rule')
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
              {t('services.electronics.categories.title')}
            </h2>
            <p className="text-xs text-slate-500">{t('services.electronics.categories.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={16}>
            {categories.map((cat, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.05}
                className="p-5 md:p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/20 transition-all duration-500 group shrink-0 w-[240px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 16 })}
                </div>
                <h3 className="text-xs mb-2 group-hover:text-primary transition-colors duration-500 font-bold">{cat.title}</h3>
                <p className="text-xs text-slate-600 leading-snug">
                  {cat.desc}
                </p>
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ How Coordination Works */}
      <section className="section-spacing bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-lg sm:text-xl md:text-2xl mb-4">
              {t('how.flow.title')}
            </h2>
            <p className="text-xs text-slate-500">{t('how.flow.subtitle')}</p>
          </div>
          
          <Marquee speed={0.4} className="-mx-4 px-4" gap={32}>
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="relative z-10 flex flex-col items-center text-center group shrink-0 w-[200px] md:w-auto"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary mb-5 md:mb-6 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500 shadow-primary/5">
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 16 })}
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-tight px-4 font-bold">{step.body}</p>
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-white">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="p-5 md:p-6 rounded-xl bg-primary/5 border border-primary/10 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs !text-primary mb-5 font-bold">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-3">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-xs text-slate-600 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              className="p-5 md:p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs text-slate-400 mb-5 font-bold">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-3">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-xs text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served - Map Style */}
      <section className="section-spacing bg-white overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
                {areas.map((area, i) => (
                  <ScrollReveal
                    key={i}
                    direction={dir === 'rtl' ? 'left' : 'right'}
                    delay={i * 0.1}
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/30 transition-all group shrink-0 w-[180px] md:w-auto shadow-xl shadow-primary/5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <MapPin size={16} />
                    </div>
                    <span className="text-xs group-hover:text-primary transition-colors font-bold">{area}</span>
                  </ScrollReveal>
                ))}
              </Marquee>
            </div>
            <div className="relative aspect-video md:aspect-[2/1] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>
              <div className="relative text-center p-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-4 animate-bounce">
                  <MapPin size={16} />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl mb-2 font-bold">{t('services.areas.qatarNationwide')}</h2>
                <p className="text-xs text-slate-500">{t('services.areas.rapidResponse')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-slate-50 border-t border-slate-200 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[100px] rounded-full" />
        <div className="container-sahli relative z-10 text-center max-w-4xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 shadow-lg shadow-primary/5">
            <Clock size={16} />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl mb-8">
            {t('service.v1.cta.title')}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href={getWhatsAppLink(t('services.electronics.whatsapp'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Electronics Final CTA')}
              className="cta-primary px-8 py-4 text-xs btn-shine shadow-xl shadow-primary/30 group"
            >
              <div
                className="flex items-center gap-2 group-hover:scale-105 group-active:scale-95 transition-transform"
              >
                <MessageSquare size={16} className="fill-primary-foreground" />
                {t('cta.request')}
              </div>
            </a>
            
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-2 text-xs !text-primary font-bold">
                <ShieldCheck size={16} />
                {t('services.security.safeSecure')}
              </div>
              <div className="text-xs text-slate-400 font-medium">{t('services.rules.payment')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9️⃣ Related Services - Quick Links */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container-sahli">
          <div className="mb-12 text-center md:text-start">
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-4">
              {t('services.related.title')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('services.related.subtitle')}
            </p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={16}>
            {relatedServices.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="p-4 md:p-5 rounded-xl bg-white border border-slate-200 hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
              >
                <span className="text-xs font-bold group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-wider">{service.title}</span>
                <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUp size={16} className="text-primary rotate-45" />
                </div>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      <section className="py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-xs !text-foreground/60 group-hover:text-foreground transition-colors font-bold uppercase tracking-widest">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}


