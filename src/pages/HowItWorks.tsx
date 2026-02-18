import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';
import { MessageSquare, ShieldCheck, Search, Heart, Zap, Shield, Repeat, ArrowRight, CheckCircle2, Headphones, ClipboardList, Star, Clock, UserCheck, ShieldAlert } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const HowItWorks = () => {
  const { t, dir, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40,
    });
  };

  const steps = [
    {
      step: '1',
      title: t('how.steps.step1.title'),
      desc: t('how.steps.step1.desc')
    },
    {
      step: '2',
      title: t('how.steps.step2.title'),
      desc: t('how.steps.step2.desc')
    },
    {
      step: '3',
      title: t('how.steps.step3.title'),
      desc: t('how.steps.step3.desc')
    },
    {
      step: '4',
      title: t('how.steps.step4.title'),
      desc: t('how.steps.step4.desc')
    }
  ];

  return (
    <Layout>
      <div className="bg-background min-h-screen selection:bg-primary/30" onMouseMove={handleMouseMove}>
        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Hero Section - Architectural Design */}
        <section ref={containerRef} className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center md:justify-end overflow-hidden pt-20 bg-background">
          {/* Dynamic Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 transition-transform duration-100 ease-out"
              style={{ 
                transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.02}deg) scale(1.1)`
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1920&auto=format&fit=crop" 
                alt={t('how.hero.title')}
                  className="w-full h-full object-cover"
                />
            </div>
            
            {/* Advanced Overlays removed as per user request */}
            <div className="absolute inset-0 bg-white/40 z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-0" />
          </div>

          <div className="container-sahli relative z-20 pt-24 pb-12 md:pb-20 flex flex-col items-center md:items-start text-center md:text-start">
            <div className="w-full max-w-[1400px] flex flex-col items-center md:items-start">
              <div className="max-w-4xl">
                <ScrollReveal 
                  direction="up"
                  duration={0.8}
                  delay={0.2}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 backdrop-blur-md rounded-full border border-primary/20 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-900/70 mb-8 md:mb-10 mx-auto md:mx-0 shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] animate-pulse" />
                  {t('how.hero.serviceTags')}
                </ScrollReveal>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl mb-4 md:mb-6 leading-[1] tracking-tight text-slate-900 drop-shadow-2xl font-black w-full text-center md:text-start animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300 fill-mode-backwards">
                {t('how.hero.title')}
              </h1>

              <p 
                className="text-base md:text-lg lg:text-xl xl:text-2xl text-slate-700 mb-6 md:mb-10 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500 fill-mode-backwards"
              >
                {t('how.hero.subtitle')}
              </p>

                <ScrollReveal
                  direction="up"
                  duration={0.8}
                  delay={1}
                  className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start"
                >
                  <div className="px-3 py-1 rounded-full bg-white border border-primary/20 text-slate-700 text-[10px] md:text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-sm">
                    {t('how.hero.support')}
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  direction="up"
                  duration={0.8}
                  delay={1.1}
                  className="flex flex-wrap gap-3 mb-12 justify-center md:justify-start items-center"
                >
                  <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    {t('how.hero.coverage')}
                  </span>
                </ScrollReveal>

                <ScrollReveal
                  direction="up"
                  duration={0.8}
                  delay={1.2}
                  className="flex justify-center md:justify-start"
                >
                  <a
                    href={getWhatsAppLink(t('cta.whatsapp.general'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-8 py-4 px-4 bg-white rounded-full border border-slate-200 hover:border-primary/50 transition-all duration-500 shadow-md backdrop-blur-md"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                        <MessageSquare className="w-8 h-8 text-white fill-white/20" />
                      </div>
                    </div>
                    <div className="flex flex-col text-start pr-8 pl-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">{t('nav.contact')}</span>
                      <span className="text-lg font-black text-slate-900 uppercase tracking-wider">{t('how.hero.cta')}</span>
                    </div>
                    <ArrowRight className={`absolute ${dir === 'rtl' ? 'left-6 rotate-180' : 'right-6'} w-5 h-5 text-slate-300 group-hover:text-primary transition-all duration-500 group-hover:translate-x-1 ${dir === 'rtl' ? 'group-hover:-translate-x-1' : ''}`} />
                  </a>
                </ScrollReveal>
              </div>
            </div>
          </div>
          
          {/* Advanced Scroll Indicator */}
          <ScrollReveal 
            direction="up"
            duration={0.8}
            delay={2}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <div className="w-px h-16 bg-gradient-to-b from-primary via-primary/20 to-transparent relative">
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.8)] animate-bounce" 
              />
            </div>
          </ScrollReveal>
        </section>

        {/* Common Home Problems We Coordinate Section */}
        <section className="relative py-24 md:py-32 overflow-hidden border-t border-slate-200">
          <div className="container-sahli relative z-10">
            <div className="max-w-4xl mb-20">
              <ScrollReveal 
                direction="up"
                duration={0.8}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block"
              >
                {t('how.services.label')}
              </ScrollReveal>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                {t('how.services.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  id: 'ac', 
                  icon: '❄️', 
                  title: t('how.services.ac.title'),
                  desc: t('how.services.ac.desc')
                },
                { 
                  id: 'electrical', 
                  icon: '⚡', 
                  title: t('how.services.electrical.title'),
                  desc: t('how.services.electrical.desc')
                },
                { 
                  id: 'plumbing', 
                  icon: '🚰', 
                  title: t('how.services.plumbing.title'),
                  desc: t('how.services.plumbing.desc')
                },
                { 
                  id: 'appliances', 
                  icon: '🛠', 
                  title: t('how.services.appliances.title'),
                  desc: t('how.services.appliances.desc')
                },
                { 
                  id: 'moving', 
                  icon: '📦', 
                  title: t('how.services.moving.title'),
                  desc: t('how.services.moving.desc')
                },
                { 
                  id: 'cleaning', 
                  icon: '🧹', 
                  title: t('how.services.cleaning.title'),
                  desc: t('how.services.cleaning.desc')
                },
                { 
                  id: 'pest', 
                  icon: '🐜', 
                  title: t('how.services.pest.title'),
                  desc: t('how.services.pest.desc')
                },
                { 
                  id: 'childcare', 
                  icon: '🧸', 
                  title: t('how.services.childcare.title'),
                  desc: t('how.services.childcare.desc')
                }
              ].map((item, idx) => (
                <ScrollReveal
                  key={idx}
                  direction="up"
                  duration={0.5}
                  delay={idx * 0.05}
                  className="p-8 rounded-[2rem] bg-white border border-slate-200 hover:border-primary/50 transition-all duration-500 group hover:bg-primary/[0.02] hover:shadow-sm"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">{item.icon}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* New Section: Why Not Just Search Online? */}
        <section className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
          <div className="container-sahli relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal
                direction={dir === 'rtl' ? 'left' : 'right'}
                duration={0.8}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                  {t('how.positioning.label')}
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-8">
                  {t('how.positioning.title')}
                </h2>
                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed mb-12">
                  {t('how.positioning.subtitle')}
                </p>
                
                <div className="space-y-6">
                  {[
                    t('how.positioning.problem1'),
                    t('how.positioning.problem2'),
                    t('how.positioning.problem3'),
                    t('how.positioning.problem4')
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-600 group/item">
                    <div className="w-5 h-5 rounded-full border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover/item:border-primary/50 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                    </div>
                    <span className="font-medium group-hover/item:text-slate-900 transition-colors">{text}</span>
                  </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction="up"
                duration={0.8}
                className="relative p-8 md:p-12 rounded-[3rem] bg-white border border-slate-200 shadow-md backdrop-blur-xl scale-95 hover:scale-100 transition-transform duration-500"
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-wider">
                  {t('how.positioning.approach.title')}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-8">
                  {t('how.positioning.approach.body')}
                </p>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-primary font-bold">
                    {t('how.positioning.approach.highlight')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Why People Choose SAHLI */}
        <section className="relative py-24 md:py-32 overflow-hidden border-t border-slate-200">
          <div className="container-sahli relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <ScrollReveal 
                direction="up"
                duration={0.8}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block"
              >
                {t('how.why.label')}
              </ScrollReveal>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-8">
                {t('how.why.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: t('how.why.point1.title'),
                  desc: t('how.why.point1.desc'),
                  icon: <UserCheck size={24} />
                },
                {
                  title: t('how.why.point2.title'),
                  desc: t('how.why.point2.desc'),
                  icon: <ShieldCheck size={24} />
                },
                {
                  title: t('how.why.point3.title'),
                  desc: t('how.why.point3.desc'),
                  icon: <Search size={24} />
                },
                {
                  title: t('how.why.point4.title'),
                  desc: t('how.why.point4.desc'),
                  icon: <Repeat size={24} />
                },
                {
                  title: t('how.why.point5.title'),
                  desc: t('how.why.point5.desc'),
                  icon: <ShieldAlert size={24} />
                }
              ].map((item, idx) => (
                <ScrollReveal
                  key={idx}
                  direction="up"
                  duration={0.5}
                  delay={idx * 0.1}
                  className="p-10 rounded-[3rem] bg-white border border-slate-200 hover:border-primary/50 transition-all duration-700 group hover:bg-primary/[0.02] hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-wider group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium group-hover:text-slate-900 transition-colors">{item.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Procedural */}
        <section className="relative py-24 md:py-32 bg-slate-50">
          <div className="container-sahli relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <ScrollReveal 
                direction="up"
                duration={0.8}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block"
              >
                {t('how.steps.label')}
              </ScrollReveal>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-8">
                {t('how.steps.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((item, idx) => (
                <div key={idx} className="relative p-8 rounded-[2.5rem] bg-white border border-slate-200 hover:border-primary/30 transition-all duration-500 group shadow-sm">
                  <div className="text-4xl font-black text-primary/20 mb-6 group-hover:text-primary/40 transition-colors">0{item.step}</div>
                  <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-wider group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Standards */}
        <section className="relative py-24 md:py-32 border-t border-slate-200">
          <div className="container-sahli relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <ScrollReveal 
                  direction="up"
                  duration={0.8}
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block"
                >
                  {t('how.standards.label')}
                </ScrollReveal>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-8">
                  {t('how.standards.title')}
                </h2>
                <p className="text-slate-600 text-lg font-medium leading-relaxed mb-12">
                  {t('how.standards.subtitle')}
                </p>
                
                <div className="space-y-4">
                  {[
                    t('how.standards.point1'),
                    t('how.standards.point2'),
                    t('how.standards.point3'),
                    t('how.standards.point4'),
                    t('how.standards.point5')
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group/std shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] group-hover/std:scale-125 transition-transform" />
                      <span className="text-slate-900 font-medium">{text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-slate-500 text-sm italic">
                  {t('how.standards.footer')}
                </p>
              </div>

              <div className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden border border-slate-200 group">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695ce6958?q=80&w=1920&auto=format&fit=crop" 
                  alt="Sahli Standards"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-30" />
              </div>
            </div>
          </div>
        </section>

        {/* Serving All Areas of Qatar */}
        <section className="relative py-24 md:py-32 bg-slate-50">
          <div className="container-sahli relative z-10 text-center">
            <ScrollReveal 
              direction="up"
              duration={0.8}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block"
            >
              {t('how.coverage.label')}
            </ScrollReveal>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-8">
              {t('how.coverage.title')}
            </h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed mb-16 max-w-2xl mx-auto">
              {t('how.coverage.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {t('how.coverage.areas').split(' • ').map((area) => (
                <span key={area} className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold tracking-tight hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default shadow-sm">
                  {area}
                </span>
              ))}
            </div>
            
            <p className="text-primary/60 font-medium italic">
              {t('how.coverage.footer')}
            </p>
          </div>
        </section>

        {/* Important to Know - Simplified */}
        <section className="py-24 md:py-32 relative overflow-hidden border-t border-slate-200">
          <div className="container-sahli relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <ScrollReveal 
                direction="up"
                duration={0.8}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block"
              >
                {t('how.clarity.label')}
              </ScrollReveal>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter mb-8">
                {t('how.clarity.title')}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                t('how.clarity.point1'),
                t('how.clarity.point2'),
                t('how.clarity.point3'),
                t('how.clarity.point4'),
                t('how.clarity.point5')
              ].map((text, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 hover:border-primary/30 transition-all duration-300 shadow-sm">
                  <Shield size={20} className="text-primary/40 flex-shrink-0" />
                  <p className="text-slate-600 font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Simplified */}
        <section className="py-24 md:py-40 relative overflow-hidden border-t border-slate-200 bg-slate-50">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0%,transparent_70%)]" />
          
          <div className="container-sahli text-center relative z-10">
            <ScrollReveal
              direction="up"
              duration={0.8}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-8">
                {t('how.final.title')}
              </h2>
              
              <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                {t('how.final.subtitle')}
              </p>

              <div className="flex justify-center">
                <a
                  href={getWhatsAppLink(t('cta.whatsapp.general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('how_it_works_final')}
                  className="group relative inline-flex items-center gap-8 py-6 px-12 bg-primary rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.6)]"
                >
                  <MessageSquare className="w-8 h-8 text-white fill-white/20" />
                  <span className="text-2xl font-black text-white uppercase tracking-widest">
                    {t('how.final.cta')}
                  </span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default HowItWorks;
