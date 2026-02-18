import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Truck, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp, Box, Hammer } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function MovingServices() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  const includes = [
    t('services.moving.local.items').split('\n')[0] || 'Packing & Unpacking',
    t('services.moving.local.items').split('\n')[1] || 'Loading & Unloading',
    t('services.moving.local.items').split('\n')[2] || 'Furniture Assembly',
    t('services.moving.local.items').split('\n')[3] || 'Safe Transportation'
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
          <div className="absolute inset-0 animate-in zoom-in-105 duration-[1.5s]">
            <img 
              src="/Services/Moving & Relocation.jpg" 
              alt="Professional Moving Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          
          <div className="absolute inset-0 bg-white/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-0" />
        </div>
        
        {/* Content Container */}
        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-24 flex flex-col items-center md:items-start">
          <div className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start">
            <ScrollReveal
              direction="none"
              delay={0.1}
              duration={0.8}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 rounded-full border border-primary/30 text-xs font-black tracking-[0.25em] uppercase text-primary mb-4 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <img 
                src="/logos/SahlLogo5.png" 
                alt="" 
                className="w-3.5 h-3.5 object-contain animate-pulse scale-[3]" 
              />
              {t('services.moving.title')}
            </ScrollReveal>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-[1.1] tracking-tight text-slate-900 drop-shadow-2xl font-black w-full text-center md:text-start animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300 fill-mode-both">
              {t('services.moving.title')}
            </h1>

            <ScrollReveal
              direction="up"
              delay={0.6}
              duration={1}
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
            >
              <p className="text-base md:text-lg text-slate-700 mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('services.moving.subtitle')}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink(t('services.moving.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('House Shifting Hero')}
                  className="cta-primary px-6 py-3 text-xs sm:text-sm btn-shine shadow-xl shadow-primary/30 group"
                >
                  <div className="flex items-center gap-3 group-hover:scale-105 group-active:scale-95 transition-transform">
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('cta.request')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-white border-y border-slate-200">
        <div className="container-sahli">
          <ScrollReveal
            direction="up"
            duration={0.5}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5 shadow-xl shadow-primary/5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight mb-6 md:mb-8 text-center">
              {t('services.moving.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={16}>
              {[
                t('services.rules.moving'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-2.5 items-center group shrink-0 w-[240px] md:w-auto px-5">
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
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-3 md:mb-4">
              {t('services.moving.categories.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">{t('services.moving.categories.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {categories.map((cat, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.05}
                duration={0.5}
                className="p-4 md:p-5 rounded-xl bg-white border border-slate-200 hover:border-primary/20 transition-all duration-500 group shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 16 })}
                </div>
                <h3 className="text-xs sm:text-sm mb-2 group-hover:text-primary transition-colors duration-500 font-black uppercase tracking-wider">{cat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {cat.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ How It Works - Visual Timeline */}
      <section className="section-spacing bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-3 md:mb-4">
              {t('how.flow.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">{t('how.flow.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.1}
                duration={0.5}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary mb-5 shadow-sm group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 16 })}
                  </div>
                </div>
                <p className="text-xs sm:text-sm px-2 font-medium group-hover:text-primary transition-colors duration-500 leading-tight">{step.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-white">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              duration={0.5}
              className="p-6 md:p-8 rounded-xl bg-primary/5 border border-primary/10 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs !text-primary mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-xs text-slate-600 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-slate-900 transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              duration={0.5}
              className="p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-200 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs text-slate-400 mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-xs text-slate-400 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-slate-600 transition-colors duration-300">{item}</span>
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-6 md:mb-8 text-center md:text-start">
                {t('home.areas.title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {areas.map((area, i) => (
                  <ScrollReveal
                    key={i}
                    direction={dir === 'rtl' ? 'right' : 'left'}
                    delay={i * 0.1}
                    duration={0.5}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white md:bg-slate-50 border border-slate-200 hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                      <MapPin size={16} />
                    </div>
                    <span className="text-xs font-bold group-hover:text-primary transition-colors duration-500">{area}</span>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>
              <div className="relative text-center p-10">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-4 animate-bounce">
                  <MapPin size={16} />
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight mb-3">{t('services.areas.qatarNationwide')}</h2>
                <p className="text-xs text-slate-500">{t('services.areas.rapidResponse')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Final CTA */}
      <section className="section-spacing bg-slate-50 relative overflow-hidden border-t border-slate-200">
        
        <div className="container-sahli relative z-10 text-center">
          <ScrollReveal
            direction="up"
            duration={0.5}
            className="max-w-5xl mx-auto"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
              <Clock size={16} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-8">
              {t('cta.final.title')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.moving.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('House Shifting Bottom CTA')}
                className="cta-primary px-6 py-3 text-xs btn-shine group"
              >
                <div className="flex items-center gap-3 group-hover:scale-105 group-active:scale-95 transition-transform">
                  <MessageSquare size={16} className="fill-primary-foreground" />
                  {t('cta.request')}
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9️⃣ Related Services Marquee */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200 overflow-hidden">
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
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-primary/30 hover:text-primary transition-all duration-300 text-xs font-bold whitespace-nowrap shrink-0 shadow-sm"
            >
              {service.title}
            </Link>
          ))}
        </Marquee>
      </section>

      {/* 🔟 Back to Home */}
      <section className="py-8 md:py-12 bg-white border-t border-slate-200">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-widest">{t('nav.home')}</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}


