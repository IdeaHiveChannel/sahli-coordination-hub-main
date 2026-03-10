import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';
import { MessageSquare, ShieldCheck, Search, Heart, Zap, Shield, Repeat, ArrowRight, CheckCircle2, Headphones, ClipboardList, Star, Clock, UserCheck, ShieldAlert, EyeOff, ListX, Target, CalendarCheck, Cog, MapPin } from 'lucide-react';
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
      <div className="bg-[#0a0a0b] min-h-screen selection:bg-primary/30" onMouseMove={handleMouseMove}>
        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Hero Section - Architectural Design */}
        <section ref={containerRef} className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center md:justify-end overflow-hidden pt-20 bg-[#0a0a0b]">
          {/* Dynamic Background Image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 transition-transform duration-1000 ease-out opacity-40"
              style={{ 
                transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px) scale(1.1)`
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1920&auto=format&fit=crop" 
                alt={t('how.hero.title')}
                  className="w-full h-full object-cover grayscale-[0.5] contrast-[1.2]"
                />
            </div>
            
            {/* Layered Overlays for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-[#0a0a0b]/80 to-[#0a0a0b] z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.08),transparent_50%)] z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(15,23,42,0.1),transparent_50%)] z-10" />
          </div>

          <div className="container-sahli relative z-20 pt-24 pb-12 md:pb-20 flex flex-col items-center md:items-start text-center md:text-start">
            <div className="w-full max-w-[1400px] flex flex-col items-center md:items-start">
              <div className="max-w-4xl">
                <ScrollReveal 
                  direction="up"
                  duration={0.8}
                  delay={0.2}
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  {t('how.hero.serviceTags')}
                </ScrollReveal>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter max-w-4xl animate-reveal drop-shadow-2xl">
                {t('how.hero.title')}
              </h1>

              <p 
                className="text-base sm:text-lg md:text-xl text-slate-400 mb-12 font-medium leading-relaxed max-w-2xl animate-reveal text-balance"
              >
                {t('how.hero.subtitle')}
              </p>

                <ScrollReveal
                  direction="up"
                  duration={0.8}
                  delay={1}
                  className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start"
                >
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                    {t('how.hero.support')}
                  </div>
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
                    className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(241,41,89,0.4)] flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <MessageSquare className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-500" />
                    <span className="text-sm font-black text-white uppercase tracking-widest">{t('how.hero.cta')}</span>
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
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-bounce" 
              />
            </div>
          </ScrollReveal>
        </section>

        {/* Common Home Problems We Coordinate Section */}
        <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/10 bg-[#0a0a0b]">
          <div className="container-sahli relative z-10">
            <div className="max-w-4xl mb-20 mx-auto lg:mx-0 text-center lg:text-left">
              <ScrollReveal 
                direction="up"
                duration={0.8}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                  <ClipboardList size={14} />
                  {t('how.services.label')}
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                  {t('how.services.title')}
                </h2>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="group h-full p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-700 flex flex-col"
                >
                  <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-base text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* New Section: Why Not Just Search Online? */}
        <section className="relative py-24 md:py-32 bg-[#0a0a0b] overflow-hidden border-t border-white/10">
          <div className="container-sahli relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <ScrollReveal
                direction={dir === 'rtl' ? 'left' : 'right'}
                duration={0.8}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-8">
                  <Search size={14} />
                  {t('how.positioning.label')}
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tighter">
                  {t('how.positioning.title')}
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium mb-12">
                  {t('how.positioning.subtitle')}
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    t('how.positioning.problem1'),
                    t('how.positioning.problem2'),
                    t('how.positioning.problem3'),
                    t('how.positioning.problem4')
                  ].map((text, i) => (
                    <div key={i} className="flex gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/40 transition-all duration-500 group">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-500">
                        <ListX size={24} />
                      </div>
                      <span className="text-base font-bold text-slate-400 group-hover:text-white transition-colors leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal
                direction="up"
                duration={0.8}
                className="p-10 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-3xl"
              >
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] rounded-full -mr-32 -mt-32 animate-pulse" />
                
                <h3 className="text-3xl font-black text-white mb-10 tracking-tighter">
                  {t('how.positioning.statement')}
                </h3>
                
                <p className="text-lg text-slate-400 leading-relaxed font-bold mb-10">
                  {t('how.positioning.list.title')}
                </p>

                <div className="space-y-8 mb-12">
                  {[
                    t('how.positioning.list.item1'),
                    t('how.positioning.list.item2'),
                    t('how.positioning.list.item3'),
                    t('how.positioning.list.item4')
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-6 group">
                      <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20">
                  <p className="font-black text-center uppercase tracking-widest text-sm">
                    {t('how.positioning.footer')}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Why People Choose SAHLI */}
        <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/10 bg-[#0a0a0b]">
          <div className="container-sahli relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <ScrollReveal 
                direction="up"
                duration={0.8}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                  <ShieldCheck size={14} />
                  {t('how.why.label')}
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                  {t('how.why.title')}
                </h2>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: t('how.why.point1.title'),
                  desc: t('how.why.point1.desc'),
                  icon: <EyeOff size={24} />
                },
                {
                  title: t('how.why.point2.title'),
                  desc: t('how.why.point2.desc'),
                  icon: <ListX size={24} />
                },
                {
                  title: t('how.why.point3.title'),
                  desc: t('how.why.point3.desc'),
                  icon: <Target size={24} />
                },
                {
                  title: t('how.why.point4.title'),
                  desc: t('how.why.point4.desc'),
                  icon: <CalendarCheck size={24} />
                }
              ].map((item, idx) => (
                <ScrollReveal
                  key={idx}
                  direction="up"
                  duration={0.5}
                  delay={idx * 0.1}
                  className="group h-full p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-700 flex flex-col"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-base text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">{item.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Procedural */}
        <section className="relative py-24 md:py-32 bg-[#0a0a0b] border-t border-white/10">
          <div className="container-sahli relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <ScrollReveal 
                direction="up"
                duration={0.8}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                  <Cog size={14} />
                  {t('how.steps.label')}
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                  {t('how.steps.title')}
                </h2>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-700 h-full flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-3xl bg-primary text-white flex items-center justify-center text-3xl font-black mb-8 shadow-2xl shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative">
                    0{item.step}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#0a0a0b] border-2 border-primary flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tighter uppercase">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Standards */}
        <section className="relative py-24 md:py-32 border-t border-white/10 bg-[#0a0a0b]">
          <div className="container-sahli relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <ScrollReveal 
                  direction="up"
                  duration={0.8}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-8">
                    <Shield size={14} />
                    {t('how.standards.label')}
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-10 leading-[1.1] tracking-tighter">
                    {t('how.standards.title')}
                  </h2>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium mb-12">
                    {t('how.standards.subtitle')}
                  </p>
                </ScrollReveal>
                
                <div className="space-y-4">
                  {[
                    t('how.standards.point1'),
                    t('how.standards.point2'),
                    t('how.standards.point3'),
                    t('how.standards.point4'),
                    t('how.standards.point5')
                  ].map((text, i) => (
                    <div key={i} className="flex gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.08] transition-all duration-500 group">
                      <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <CheckCircle2 size={24} />
                      </div>
                      <span className="text-base font-bold text-slate-400 group-hover:text-white transition-colors leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-slate-500 text-sm italic font-medium">
                  {t('how.standards.footer')}
                </p>
              </div>

              <div className="relative aspect-square lg:aspect-video rounded-[4rem] overflow-hidden border border-white/10 group shadow-2xl">
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
        <section className="relative py-24 md:py-32 bg-[#0a0a0b] border-t border-white/10">
          <div className="container-sahli relative z-10 text-center">
            <ScrollReveal 
              direction="up"
              duration={0.8}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                <MapPin size={14} />
                {t('how.coverage.label')}
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                {t('how.coverage.title')}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-16 max-w-2xl mx-auto font-medium">
                {t('how.coverage.subtitle')}
              </p>
            </ScrollReveal>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
              {t('how.coverage.areas').split(' • ').map((area) => (
                <span key={area} className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 shadow-sm hover:border-primary/40 hover:text-white transition-all duration-500 cursor-default">
                  {area}
                </span>
              ))}
            </div>
            
            <p className="text-primary font-black uppercase tracking-widest text-xs">
              {t('how.coverage.footer')}
            </p>
          </div>
        </section>

        {/* Important to Know - Simplified */}
        <section className="py-24 md:py-32 relative overflow-hidden border-t border-white/10 bg-[#0a0a0b]">
          <div className="container-sahli relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <ScrollReveal 
                direction="up"
                duration={0.8}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                  <ShieldCheck size={14} />
                  {t('how.clarity.label')}
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                  {t('how.clarity.title')}
                </h2>
              </ScrollReveal>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                t('how.clarity.point1'),
                t('how.clarity.point2'),
                t('how.clarity.point3'),
                t('how.clarity.point4'),
                t('how.clarity.point5')
              ].map((text, idx) => (
                <div key={idx} className="flex gap-5 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-500 group">
                  <Shield size={20} className="text-primary shrink-0 mt-1" />
                  <p className="text-base font-bold text-slate-400 group-hover:text-white transition-colors leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Simplified */}
        <section className="py-32 md:py-48 bg-[#0a0a0b] relative overflow-hidden text-center isolate border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,41,89,0.1),transparent_70%)] animate-pulse duration-[5000ms]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary to-transparent" />
          
          <div className="container-sahli text-center relative z-10">
            <ScrollReveal
              direction="up"
              duration={0.8}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-[1.1]">
                {t('how.final.title')}
              </h2>
              
              <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                {t('how.final.subtitle')}
              </p>

              <div className="flex justify-center">
                <a
                  href={getWhatsAppLink(t('cta.whatsapp.general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('how_it_works_final')}
                  className="inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-2xl font-black text-sm md:text-base uppercase tracking-[0.2em] hover:bg-primary-dark transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(241,41,89,0.4)] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <MessageSquare className="w-6 h-6 text-white" />
                  <span className="text-lg font-black text-white uppercase tracking-widest">
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
