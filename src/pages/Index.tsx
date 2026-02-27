import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Dynamic imports for performance
const ServiceRoof = lazy(() => import('@/components/motion/ServiceRoof').then(module => ({ default: module.ServiceRoof })));
const Marquee = lazy(() => import('@/components/motion/Marquee').then(module => ({ default: module.Marquee })));

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { 
  ArrowRight, Wrench, Sparkles, Truck, Heart, Snowflake, Lightbulb, Droplets, Cog, Baby, 
  Search, ShieldCheck, ClipboardList, Leaf, Cpu, Bug, Send, Wallet, MapPin, ChevronDown,
  Eye, BarChart3, ThumbsUp, CheckCircle2
} from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TranslationKey } from '@/lib/i18n';

interface ServiceItem {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  path: string;
  number: string;
  subcategories: string[];
  whatsappKey?: TranslationKey;
  status?: string;
}

export default function Index() {
  const { t, dir, lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40,
    });
  };

  const [emblaRefGlance] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 2500, stopOnInteraction: false })]);
  const [emblaRefHow] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 3500, stopOnInteraction: false })]);

  const formatNumber = (num: number | string) => {
    if (lang === 'ar') {
      return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
    }
    return num.toString();
  };

  const glanceItems = [
    {
      title: t('home.glance.item1.title'),
      desc: t('home.glance.item1.desc'),
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: t('home.glance.item2.title'),
      desc: t('home.glance.item2.desc'),
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: t('home.glance.item3.title'),
      desc: t('home.glance.item3.desc'),
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: t('home.glance.item4.title'),
      desc: t('home.glance.item4.desc'),
      icon: <ThumbsUp className="w-6 h-6" />
    }
  ];

  const solutions = [
    { 
      title: t('home.solutions.ac.title'), 
      desc: t('home.solutions.ac.desc'), 
      icon: <Snowflake size={32} />, 
      whatsappKey: 'services.homeMaintenance.ac.whatsapp' as TranslationKey,
      links: [
        { label: t('home.solutions.ac.link1'), path: '/ac-maintenance-qatar' },
        { label: t('home.solutions.ac.link2'), path: '/ac-repair-doha' }
      ]
    },
    { 
      title: t('home.solutions.pest.title'), 
      desc: t('home.solutions.pest.desc'), 
      icon: <Bug size={32} />, 
      whatsappKey: 'services.outdoor.pest.whatsapp' as TranslationKey,
      links: [
        { label: t('home.solutions.pest.link1'), path: '/pest-control-qatar' },
        { label: t('home.solutions.pest.link2'), path: '/pest-control-qatar' }
      ]
    },
    { 
      title: t('home.solutions.plumbing.title'), 
      desc: t('home.solutions.plumbing.desc'), 
      icon: <Droplets size={32} />, 
      whatsappKey: 'services.homeMaintenance.plumbing.whatsapp' as TranslationKey,
      links: [
        { label: t('home.solutions.plumbing.link1'), path: '/plumbing-services-qatar' },
        { label: t('home.solutions.plumbing.link2'), path: '/plumber-doha' }
      ]
    },
    { 
      title: t('home.solutions.electrical.title'), 
      desc: t('home.solutions.electrical.desc'), 
      icon: <Lightbulb size={32} />, 
      whatsappKey: 'services.homeMaintenance.electrical.whatsapp' as TranslationKey,
      links: [
        { label: t('home.solutions.electrical.link1'), path: '/electrical-services-qatar' },
        { label: t('home.solutions.electrical.link2'), path: '/services#electrical' }
      ]
    },
    { 
      title: t('home.solutions.cleaning.title'), 
      desc: t('home.solutions.cleaning.desc'), 
      icon: <Sparkles size={32} />, 
      whatsappKey: 'services.cleaning.deep.whatsapp' as TranslationKey,
      links: [
        { label: t('home.solutions.cleaning.link1'), path: '/cleaning-services-qatar' },
        { label: t('home.solutions.cleaning.link2'), path: '/deep-cleaning-doha' }
      ]
    },
    { 
      title: t('home.solutions.moving.title'), 
      desc: t('home.solutions.moving.desc'), 
      icon: <Truck size={32} />, 
      whatsappKey: 'services.moving.local.whatsapp' as TranslationKey,
      links: [
        { label: t('home.solutions.moving.link1'), path: '/moving-services-qatar' },
        { label: t('home.solutions.moving.link2'), path: '/movers-doha' }
      ]
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
      "@type": "Question",
      "name": t('home.faq.q1'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t('home.faq.a1')
      }
    },
    {
      "@type": "Question",
      "name": t('home.faq.q2'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t('home.faq.a2')
      }
    },
    {
      "@type": "Question",
      "name": t('home.faq.q3'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t('home.faq.a3')
      }
    },
    {
      "@type": "Question",
      "name": t('home.faq.q4'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t('home.faq.a4')
      }
    },
    {
      "@type": "Question",
      "name": t('home.faq.q5'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t('home.faq.a5')
      }
    }
    ]
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const services: ServiceItem[] = [
    { 
      title: t('services.homeMaintenance.tax.title'), 
      description: t('services.homeMaintenance.tax.items'),
      imageUrl: "/Services/AC Maintenance.jpg",
      icon: <Wrench size={32} />,
      path: t('services.homeMaintenance.path'),
      whatsappKey: 'services.homeMaintenance.whatsapp' as TranslationKey,
      subcategories: [t('services.ac.repair'), t('services.ac.gas')],
      number: '01'
    },
    { 
      title: t('services.cleaning.tax.title'), 
      description: t('services.cleaning.tax.items'),
      imageUrl: "/Services/Cleaning service.jpg",
      icon: <Sparkles size={32} />,
      path: t('services.cleaning.path'),
      whatsappKey: 'services.cleaning.whatsapp' as TranslationKey,
      subcategories: [t('services.cleaning.deep'), t('services.cleaning.sofa'), t('services.cleaning.carpet')],
      number: '02'
    },
    { 
      title: t('services.moving.tax.title'), 
      description: t('services.moving.tax.items'),
      imageUrl: "/Services/Moving & Relocation.jpg",
      icon: <Truck size={32} />,
      path: t('services.moving.path'),
      whatsappKey: 'services.moving.whatsapp' as TranslationKey,
      subcategories: [t('services.moving.house'), t('services.moving.packing')],
      number: '03'
    },
    { 
      title: t('services.outdoor.tax.title'), 
      description: t('services.outdoor.tax.items'),
      imageUrl: "/Services/Pest Control.jpg",
      icon: <Leaf size={32} />,
      path: t('services.outdoor.path'),
      whatsappKey: 'services.outdoor.whatsapp' as TranslationKey,
      subcategories: [t('services.outdoor.pest.title')],
      number: '04'
    },
    { 
      title: t('services.electronics.tax.title'), 
      description: t('services.electronics.tax.items'),
      imageUrl: "/Services/Electronics repair.jpg",
      icon: <Cpu size={32} />,
      path: t('services.electronics.path'),
      whatsappKey: 'services.electronics.whatsapp' as TranslationKey,
      subcategories: [t('services.electronics.home-appliances.title')],
      number: '05'
    }
  ];

  const faqs = [
    { question: t('home.faq.q1'), answer: t('home.faq.a1') },
    { question: t('home.faq.q2'), answer: t('home.faq.a2') },
    { question: t('home.faq.q3'), answer: t('home.faq.a3') },
    { question: t('home.faq.q4'), answer: t('home.faq.a4') },
    { question: t('home.faq.q5'), answer: t('home.faq.a5') },
  ];

  const marqueeItems = [
    t('nav.services'),
    t('home.microTrust.vetted'),
    t('home.microTrust.recorded'),
    t('home.microTrust.coordination'),
  ];

  return (
    <Layout>
      <MetaTags 
        title={t('home.meta.title')} 
        description={t('home.meta.description')} 
        canonical="https://sahliservice.com/"
        schema={schema}
      />

      {/* Hero Section */}
      <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#0a0a0b]"
      >
        {/* Advanced Background with Particles/Glow */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 transition-transform duration-[3000ms] ease-out opacity-40 scale-110"
            style={{ 
              transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
            }}
          >
            <img 
              src="/Services/Home Maintenance - Hero.jpg" 
              alt={t('home.hero.imgAlt')}
              className="w-full h-full object-cover object-center grayscale-[0.5] contrast-[1.2]"
            />
          </div>
          
          {/* Layered Overlays for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-[#0a0a0b]/80 to-[#0a0a0b] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.08),transparent_50%)] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(15,23,42,0.1),transparent_50%)] z-10" />
          
          {/* Animated Glow Spot */}
          <div 
            className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-10 animate-pulse"
            style={{
              left: `${50 + mousePos.x * 0.2}%`,
              top: `${40 + mousePos.y * 0.2}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 1s ease-out'
            }}
          />
        </div>
        
        <div className="container-sahli relative z-20 pt-32 pb-20 flex flex-col items-center lg:items-start text-center lg:text-left">
          <ScrollReveal>
            <div 
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl shadow-black/50"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
              {t('home.hero.imgAlt')}
            </div>
          </ScrollReveal>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter max-w-4xl animate-reveal drop-shadow-2xl">
            {t('home.hero.title').split('&').map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-primary mx-2">&</span>}
                {part}
              </React.Fragment>
            ))}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-12 font-medium leading-relaxed max-w-2xl animate-reveal text-balance lg:mx-0 mx-auto" style={{ animationDelay: '0.1s' }}>
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 animate-reveal w-full sm:w-auto" style={{ animationDelay: '0.2s' }}>
            <a 
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Hero Section')}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(241,41,89,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(241,41,89,0.5)] flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Send size={18} className="group-hover:rotate-12 transition-transform duration-500" />
              {t('home.hero.cta')}
            </a>
            <Link 
              to="/services"
              className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-3 backdrop-blur-md"
            >
              {t('nav.services')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-6 animate-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0b] bg-slate-800 overflow-hidden shadow-xl">
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    S{i}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-1 text-primary">
                {[1, 2, 3, 4, 5].map((s) => <Sparkles key={s} size={12} className="fill-current" />)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">
                {t('home.proof.coordinated')}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Premium Card - Improved */}
        <div
          className={`hidden lg:block absolute inset-y-0 ${dir === 'rtl' ? 'left-12' : 'right-12'} w-1/3 z-30 pointer-events-none`}
        >
          <div
            className="h-full flex items-center justify-center"
            style={{
              transform: `translate(${mousePos.x * 0.08}px, ${mousePos.y * -0.04}px)`,
              transition: 'transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[3rem] p-4 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] overflow-hidden group/card">
              <div className="absolute inset-0 m-4 rounded-[2.2rem] overflow-hidden">
                <img
                  src="/Services/AC Maintenance.jpg"
                  alt="Premium Home Service"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>
              
              <div className="absolute inset-x-8 bottom-8 z-10">
                <div className="bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      <Snowflake size={24} />
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] font-black text-primary uppercase tracking-widest mb-1">{t('home.hero.overlay.brand')}</span>
                      <span className="block text-sm font-bold text-white uppercase tracking-tighter">{t('home.solutions.ac.title')}</span>
                    </div>
                  </div>
                  <div className="h-px w-full bg-white/10 mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40" />)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('how.coverage.areas')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 md:py-32 bg-[#0a0a0b] relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mb-20 mx-auto lg:mx-0 text-center lg:text-left">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                <Sparkles size={14} />
                {t('home.solutions.microHook')}
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                {t('home.solutions.title')}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium">
                {t('home.solutions.subtitle')}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                <div
                  onClick={() => {
                    trackRequestClick(`Solution: ${solution.title}`);
                    window.open(getWhatsAppLink(t(solution.whatsappKey as TranslationKey)), '_blank');
                  }}
                  className="group h-full p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-700 cursor-pointer flex flex-col relative overflow-hidden"
                >
                  {/* Hover Background Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                    {React.cloneElement(solution.icon as React.ReactElement, { size: 32 })}
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-base text-slate-400 leading-relaxed mb-8 font-medium">
                    {solution.desc}
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap gap-3">
                    {solution.links.map((link, idx) => (
                      <Link 
                        key={idx}
                        to={link.path}
                        onClick={(e) => {
                          e.stopPropagation();
                          trackRequestClick(`SEO Link: ${link.label}`);
                        }}
                        className="text-[10px] font-black tracking-widest uppercase text-slate-500 bg-white/5 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <div className="border-y border-white/10 bg-[#0a0a0b] py-12 overflow-hidden">
        <Suspense fallback={<div className="h-10" />}>
          <Marquee gap={100} className="flex items-center">
            {marqueeItems.map((item, i) => (
              <div key={i} className="flex items-center gap-6 px-8 group">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/20 group-hover:bg-primary transition-all duration-500 shadow-[0_0_15px_rgba(241,41,89,0)] group-hover:shadow-[0_0_15px_rgba(241,41,89,0.5)]" />
                <span className="text-sm md:text-lg font-black tracking-[0.3em] text-slate-500 uppercase group-hover:text-white transition-all duration-500 cursor-default">
                  {item}
                </span>
              </div>
            ))}
          </Marquee>
        </Suspense>
      </div>

      {/* Differentiation Section */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] relative overflow-hidden border-t border-white/10">
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction={dir === 'rtl' ? 'left' : 'right'}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-8">
                <ShieldCheck size={14} />
                Quality Assurance
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-[1.1] tracking-tighter">
                {t('home.differentiation.title')}
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.08] transition-all duration-500 group">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <Search size={24} />
                    </div>
                    <p className="text-base font-bold text-slate-400 group-hover:text-white transition-colors leading-relaxed">
                      {t(`home.differentiation.problem${i}` as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction={dir === 'rtl' ? 'right' : 'left'}>
              <div className="p-10 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 relative overflow-hidden shadow-2xl backdrop-blur-3xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] rounded-full -mr-32 -mt-32 animate-pulse" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black tracking-widest uppercase mb-10 shadow-xl shadow-primary/20">
                    <ShieldCheck size={16} />
                    {t('home.differentiation.statement')}
                  </div>
                  
                  <h3 className="text-3xl font-black mb-10 text-white tracking-tighter">
                    {t('home.differentiation.list.title')}
                  </h3>
                  
                  <ul className="space-y-8">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="flex items-start gap-6 group">
                        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                          <ArrowRight size={16} className="text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">
                          {t(`home.differentiation.list.item${item}` as TranslationKey)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Major Categories */}
      <section id="categories" className="py-24 md:py-32 bg-[#0a0a0b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(241,41,89,0.05),transparent_50%)]" />
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mb-20 mx-auto lg:mx-0 text-center lg:text-left">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                <ClipboardList size={14} />
                {t('services.microHook')}
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tighter">
                {t('services.title')}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium">
                {t('services.subtitle')}
              </p>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <Suspense fallback={<div className="min-h-[300px] bg-white/5 rounded-[2.5rem] animate-pulse" />}>
              {services.map((service, i) => (
                <ServiceRoof
                  key={i}
                  index={i}
                  showNumber={true}
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  icon={React.cloneElement(service.icon as React.ReactElement, { size: 28 })}
                  path={service.path}
                  subcategories={service.subcategories}
                  whatsappKey={service.whatsappKey}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Why People Choose SAHLI */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <ScrollReveal className="mb-20 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
              <ShieldCheck size={14} />
              {t('home.glance.subtitle') || 'Why Choose Us'}
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-black tracking-tighter">
              {t('home.glance.title')}
            </h2>
          </ScrollReveal>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden -mx-5 px-5 pb-8" ref={emblaRefGlance}>
            <div className="flex gap-4">
              {glanceItems.map((item, i) => (
                <div key={i} className="flex-[0_0_85%] min-w-0">
                  <div className="h-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
            {glanceItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                <div className="group h-full p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-700 flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tighter group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors font-medium">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] relative overflow-hidden border-y border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,41,89,0.05),transparent_50%)]" />
        <div className="container-sahli relative z-10">
          <ScrollReveal className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
              <Cog size={14} />
              {t('home.how.subtitle') || 'Process'}
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-black tracking-tighter">
              {t('home.how.title')}
            </h2>
          </ScrollReveal>

          <div className="hidden lg:grid grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            
            {[1, 2, 3, 4].map((step) => (
              <ScrollReveal key={step} delay={step * 0.1} className="relative z-10 group h-full">
                <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-700 h-full flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-primary text-white flex items-center justify-center text-3xl font-black mb-8 shadow-2xl shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative">
                    {formatNumber(step)}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#0a0a0b] border-2 border-primary flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tight">
                    {t(`home.how.step${step}.title` as TranslationKey)}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {t(`home.how.step${step}.desc` as TranslationKey)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Mobile View */}
          <div className="lg:hidden -mx-5 px-5 pb-8 overflow-hidden" ref={emblaRefHow}>
             <div className="flex gap-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-[0_0_85%] min-w-0">
                  <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-black mb-6 shadow-xl shadow-primary/20">
                      {formatNumber(step)}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 tracking-tight">
                      {t(`home.how.step${step}.title` as TranslationKey)}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {t(`home.how.step${step}.desc` as TranslationKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(241,41,89,0.03),transparent_50%)]" />
        <div className="container-sahli max-w-4xl relative z-10">
          <ScrollReveal className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
              <Search size={14} />
              {t('home.faq.subtitle') || 'Common Questions'}
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter">{t('home.faq.title')}</h2>
          </ScrollReveal>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div 
                  className={`bg-white/5 rounded-[2rem] border transition-all duration-500 overflow-hidden group ${
                    openFaq === i 
                      ? 'border-primary/40 shadow-2xl shadow-primary/10 bg-white/[0.08]' 
                      : 'border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 md:p-10 text-left focus:outline-none"
                    aria-expanded={openFaq === i}
                  >
                    <h3 className={`font-black text-lg md:text-xl transition-colors duration-300 tracking-tight ${
                      openFaq === i ? 'text-primary' : 'text-white group-hover:text-primary/80'
                    }`}>
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 ml-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      openFaq === i 
                        ? 'bg-primary text-white rotate-180 shadow-2xl shadow-primary/30' 
                        : 'bg-white/5 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-8 md:p-10 pt-0 text-slate-400 leading-relaxed text-base md:text-lg font-medium">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 md:py-32 bg-[#0a0a0b] border-t border-white/10">
        <div className="container-sahli">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-black tracking-widest uppercase text-primary mb-6">
                <Eye size={14} />
                Insights & Tips
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Home Maintenance Blog</h2>
            </div>
            <Link to="/blog" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
              View all articles <ArrowRight size={20} className="text-primary" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: 'How much does AC repair cost in Doha?', desc: 'A guide to pricing and what to expect during an inspection.' },
              { title: 'Signs of bed bugs in apartments', desc: 'Early warning signs and municipality-approved treatment options.' },
              { title: 'Moving checklist for Qatar residents', desc: 'Ensure a smooth relocation with our comprehensive guide.' }
            ].map((post, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group h-full flex flex-col cursor-pointer bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:border-primary/40 transition-all duration-700">
                  <div className="aspect-video bg-white/5 rounded-2xl mb-8 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-40 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">{post.title}</h3>
                  <p className="text-slate-400 font-medium mb-8 line-clamp-2 text-sm leading-relaxed">{post.desc}</p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                    Read article <ArrowRight size={16} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 bg-[#0a0a0b] relative overflow-hidden text-center isolate border-t border-white/10">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,41,89,0.1),transparent_70%)] animate-pulse duration-[5000ms]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-primary to-transparent" />
        
        <div className="container-sahli relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-[1.1]">
              {t('home.emotional.title')}
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 mb-16 text-slate-400 font-bold text-sm md:text-base uppercase tracking-[0.2em]">
              <span className="hover:text-primary transition-colors cursor-default">{t('home.emotional.line1')}</span>
              <span className="hidden md:block w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(241,41,89,1)]" />
              <span className="hover:text-primary transition-colors cursor-default">{t('home.emotional.line2')}</span>
              <span className="hidden md:block w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(241,41,89,1)]" />
              <span className="hover:text-primary transition-colors cursor-default">{t('home.emotional.line3')}</span>
            </div>
            
            <a 
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-primary text-white px-12 py-6 rounded-2xl font-black text-sm md:text-base uppercase tracking-[0.2em] hover:bg-primary-dark transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(241,41,89,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(241,41,89,0.6)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Send size={24} className="group-hover:rotate-12 transition-transform duration-500" />
              {t('home.final.cta')}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-24 bg-[#0a0a0b] border-t border-white/10">
        <div className="container-sahli">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter">
              {t('home.areas.title')}
            </h2>
          </ScrollReveal>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { name: 'Doha', path: '/home-services-doha' },
              { name: 'Lusail', path: '/home-services-lusail' },
              { name: 'Al Wakrah', path: '/home-services-wakrah' },
              { name: 'Al Rayyan', path: '/home-services-qatar' },
              { name: 'The Pearl', path: '/home-services-doha' },
              { name: 'Al Daayen', path: '/home-services-qatar' },
              { name: 'Umm Salal', path: '/home-services-qatar' },
              { name: 'Al Khor', path: '/home-services-qatar' }
            ].map((city) => (
              <Link 
                key={city.name} 
                to={city.path}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 shadow-sm hover:border-primary/40 hover:text-white transition-all duration-500"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
