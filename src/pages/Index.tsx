import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
// Refined Index page with video media replacing 3D hero
import { useLanguage } from '@/contexts/LanguageContext';

// Dynamic imports for performance
const ServiceRoof = lazy(() => import('@/components/motion/ServiceRoof').then(module => ({ default: module.ServiceRoof })));
const Marquee = lazy(() => import('@/components/motion/Marquee').then(module => ({ default: module.Marquee })));

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { MessageSquare, ArrowRight, Wrench, Sparkles, Truck, Heart, GraduationCap, BookOpen, Shield, Zap, Repeat, UserCheck, Snowflake, Lightbulb, Droplets, Cog, Sofa, Baby, Search, Clock, DollarSign, ShieldCheck, PhoneOff, CheckCircle2, Fingerprint, Target, HeartHandshake, ClipboardList, Leaf, Cpu, Bug, Send, Building2, Handshake, Wallet, ClipboardCheck } from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface ServiceItem {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  path: string;
  number: string;
  subcategories: string[];
  whatsappKey?: TranslationKey;
}

interface TrustPanel {
  title: string;
  items: { title: string }[];
}

import { TranslationKey } from '@/lib/i18n';

export default function Index() {
  const { t, dir, lang } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ctaRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40,
    });
  };

  const [emblaRefCoverage] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [emblaRefGlance] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 2500, stopOnInteraction: false })]);
  const [emblaRefHow] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 3500, stopOnInteraction: false })]);

  const formatNumber = (num: number | string) => {
    if (lang === 'ar') {
      return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
    }
    return num.toString();
  };

  const formatPrice = (price: number | string) => {
    if (lang === 'ar') {
      return price.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
    }
    return price.toString();
  };

  const coverageLocations = [
    { name: t('home.coverage.location1'), image: "https://images.unsplash.com/photo-1669815007479-494b3b51c2c3?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location2'), image: "https://images.unsplash.com/photo-1537345532964-7c8f0749f8b8?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location3'), image: "https://images.unsplash.com/photo-1662702888780-2c51e49c9a94?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location4'), image: "https://images.unsplash.com/photo-1669300884869-e6e11c67c031?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location5'), image: "https://images.unsplash.com/photo-1647755392881-6baf80b2b979?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location6'), image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop" },
    { name: t('home.coverage.location7'), image: "https://images.unsplash.com/photo-1594924718090-284232024404?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location8'), image: "https://images.unsplash.com/photo-1647755353498-d67d415b7db5?q=80&w=2070&auto=format&fit=crop" },
  ];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const heroMeta = [
    { label: t('home.hero.meta.model'), icon: <CheckCircle2 size={16} /> },
    { label: t('home.hero.meta.bestFor'), icon: <Target size={16} /> },
    { label: t('home.hero.meta.coverage'), icon: <Shield size={16} /> },
  ];

  const glanceItems = [
    { title: t('home.glance.item1.title'), desc: t('home.glance.item1.desc'), icon: <Wallet size={24} /> },
    { title: t('home.glance.item2.title'), desc: t('home.glance.item2.desc'), icon: <PhoneOff size={24} /> },
    { title: t('home.glance.item3.title'), desc: t('home.glance.item3.desc'), icon: <ClipboardList size={24} /> },
    { title: t('home.glance.item4.title'), desc: t('home.glance.item4.desc'), icon: <ShieldCheck size={24} /> },
  ];

  const solutions = [
    { title: t('home.solutions.ac.title'), desc: t('home.solutions.ac.desc'), icon: <Snowflake size={32} />, whatsappKey: 'services.homeMaintenance.ac.whatsapp' },
    { title: t('home.solutions.electrical.title'), desc: t('home.solutions.electrical.desc'), icon: <Lightbulb size={32} />, whatsappKey: 'services.homeMaintenance.electrical.whatsapp' },
    { title: t('home.solutions.plumbing.title'), desc: t('home.solutions.plumbing.desc'), icon: <Droplets size={32} />, whatsappKey: 'services.homeMaintenance.plumbing.whatsapp' },
    { title: t('home.solutions.appliances.title'), desc: t('home.solutions.appliances.desc'), icon: <Cog size={32} />, whatsappKey: 'services.homeMaintenance.appliances.whatsapp' },
    { title: t('home.solutions.moving.title'), desc: t('home.solutions.moving.desc'), icon: <Truck size={32} />, whatsappKey: 'services.moving.local.whatsapp' },
    { title: t('home.solutions.cleaning.title'), desc: t('home.solutions.cleaning.desc'), icon: <Sparkles size={32} />, whatsappKey: 'services.cleaning.deep.whatsapp' },
    { title: t('home.solutions.pest.title'), desc: t('home.solutions.pest.desc'), icon: <Bug size={32} />, whatsappKey: 'services.cleaning.pest.whatsapp' },
    { title: t('home.solutions.childcare.title'), desc: t('home.solutions.childcare.desc'), icon: <Baby size={32} />, whatsappKey: 'services.care.childcare.whatsapp' },
  ];

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you provide the home services directly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. SAHLI is a coordination hub. We vet independent provider companies and manage the access point. The provider company delivers the service and handles your payment directly."
          }
        },
        {
          "@type": "Question",
          "name": "How does SAHLI select the provider for my request?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SAHLI matches your specific requirement with a verified provider company based on their documented competency, availability in your area, and past performance within our network."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if I am not satisfied with the service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SAHLI follows up after every service. If coordination standards or service quality are not met, we intervene to facilitate a resolution or coordinate a replacement provider as per our procedural rules."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // scroll logic if needed
    };
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const services: ServiceItem[] = [
    { 
      title: t('services.homeMaintenance.tax.title'), 
      description: t('services.homeMaintenance.tax.items'),
      imageUrl: "/Services/AC Maintenance.jpg",
      icon: <Wrench size={32} />,
      path: t('services.homeMaintenance.path'),
      whatsappKey: 'services.homeMaintenance.whatsapp' as TranslationKey,
      subcategories: [],
      number: '01'
    },
    { 
      title: t('services.cleaning.tax.title'), 
      description: t('services.cleaning.tax.items'),
      imageUrl: "/Services/Cleaning service.jpg",
      icon: <Sparkles size={32} />,
      path: t('services.cleaning.path'),
      whatsappKey: 'services.cleaning.whatsapp' as TranslationKey,
      subcategories: [],
      number: '02'
    },
    { 
      title: t('services.moving.tax.title'), 
      description: t('services.moving.tax.items'),
      imageUrl: "/Services/Moving & Relocation.jpg",
      icon: <Truck size={32} />,
      path: t('services.moving.path'),
      whatsappKey: 'services.moving.whatsapp' as TranslationKey,
      subcategories: [],
      number: '03'
    },
    { 
      title: t('services.outdoor.tax.title'), 
      description: t('services.outdoor.tax.items'),
      imageUrl: "/Services/Pest Control.jpg",
      icon: <Leaf size={32} />,
      path: t('services.outdoor.path'),
      whatsappKey: 'services.outdoor.whatsapp' as TranslationKey,
      subcategories: [],
      number: '04'
    },
    { 
      title: t('services.care.tax.title'), 
      description: t('services.care.tax.items'),
      imageUrl: "/Services/Nanny Care Service.jpg",
      icon: <Heart size={32} />,
      path: t('services.care.path'),
      whatsappKey: 'services.care.whatsapp' as TranslationKey,
      subcategories: [],
      number: '05'
    },
    { 
      title: t('services.electronics.tax.title'), 
      description: t('services.electronics.tax.items'),
      imageUrl: "/Services/Electronics repair.jpg",
      icon: <Cpu size={32} />,
      path: t('services.electronics.path'),
      whatsappKey: 'services.electronics.whatsapp' as TranslationKey,
      subcategories: [],
      number: '06'
    }
  ];

  const marqueeItems = [
    t('nav.services'),
    t('home.microTrust.vetted'),
    t('home.microTrust.recorded'),
    t('home.microTrust.coordination'),
    t('home.coordinate.disclaimer'),
  ];

  const featuredServices = [
    { title: t('services.homeMaintenance.ac.title'), icon: <Snowflake size={24} />, intent: t('home.featured.intent.ac'), path: '/services#home-maintenance', whatsappKey: 'services.homeMaintenance.ac.whatsapp' },
    { title: t('services.homeMaintenance.electrical.title'), icon: <Lightbulb size={24} />, intent: t('home.featured.intent.electrical'), path: '/services#home-maintenance', whatsappKey: 'services.homeMaintenance.electrical.whatsapp' },
    { title: t('services.homeMaintenance.plumbing.title'), icon: <Droplets size={24} />, intent: t('home.featured.intent.plumbing'), path: '/services#home-maintenance', whatsappKey: 'services.homeMaintenance.plumbing.whatsapp' },
    { title: t('services.electronics.repair.title'), icon: <Cog size={24} />, intent: t('home.featured.intent.appliance'), path: '/services#tech', whatsappKey: 'services.homeMaintenance.appliances.whatsapp' },
    { title: t('services.cleaning.deep.title'), icon: <Sparkles size={24} />, intent: t('home.featured.intent.cleaning'), path: '/services#cleaning', whatsappKey: 'services.cleaning.whatsapp' },
    { title: t('services.outdoor.pest.title'), icon: <Bug size={24} />, intent: t('home.featured.intent.pest'), path: '/services#outdoor', whatsappKey: 'services.homeMaintenance.pest.whatsapp' },
    { title: t('services.moving.house.title'), icon: <Truck size={24} />, intent: t('home.featured.intent.moving'), path: '/services#moving', whatsappKey: 'services.moving.whatsapp' },
    { title: t('services.care.childcare.title'), icon: <Baby size={24} />, intent: t('home.featured.intent.childcare'), path: '/services#care', whatsappKey: 'services.care.childcare.whatsapp' },
  ];

  return (
    <Layout>
      {/* Noise Texture Overlay removed for better visibility */}
      {/* <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" /> */}

      {/* Hero Section - Refined, Dynamic - Height adjusted for laptops/mobile */}
      <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
      >
        {/* Background Video/Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
            style={{ 
              transform: `scale(1) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
            }}
          >
            <img 
                src="/Services/Home Maintenance - Hero.jpg" 
                alt={t('home.hero.imgAlt')}
                crossOrigin="anonymous"
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                sizes="(max-width: 768px) 100vw, 100vw"
                className="w-full h-full object-cover object-center animate-scale-in"
              />
          </div>
          
          {/* Overlays removed for better visibility as requested */}
        </div>
        
        <div className="container-sahli relative z-20 py-20 md:pt-24 md:pb-0 flex flex-col items-center md:items-start">
          <div 
            className="w-full md:max-w-[60%] lg:max-w-[50%] flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-[0.65rem] md:text-[0.6rem] font-black tracking-[0.25em] uppercase text-primary mb-6 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine animate-in fade-in slide-in-from-bottom-4 duration-1000"
            >
              <img 
                src="/logos/SahlLogo5.png" 
                alt={t('home.hero.logoAlt')} 
                className="w-4 h-4 md:w-3.5 md:h-3.5 object-contain animate-pulse scale-[3]" 
              />
              {t('home.hero.label')}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 leading-[1.1] tracking-tight text-primary drop-shadow-md font-black w-full text-center md:text-left break-words">
              {t('home.hero.title').split(' ').map((word, i) => (
                <div key={i} className="inline-block mr-[0.3em]">
                  <span 
                    className="inline-block animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                    style={{ animationDelay: `${0.3 + (i * 0.08)}s`, animationDuration: '0.8s' }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </h1>

            <div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-left animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              style={{ animationDelay: '0.6s', animationDuration: '1s' }}
            >
              <p className="text-lg md:text-lg lg:text-xl text-white mb-10 md:mb-12 font-medium leading-relaxed drop-shadow-sm w-full text-center md:text-left max-w-2xl mx-auto md:mx-0 break-words">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a 
                  href={getWhatsAppLink(t('cta.whatsapp.general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Hero Section')} 
                  className="cta-primary btn-shine w-full sm:w-auto group h-12 md:h-12 px-8 flex items-center justify-center rounded-xl shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.3)] transition-transform hover:-translate-y-1 active:scale-95"
                >
                  <div 
                    className="flex items-center gap-3"
                  >
                    <Send size="18" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="tracking-widest uppercase font-black text-[0.75rem] md:text-[0.7rem]">{t('home.hero.cta')}</span>
                  </div>
                </a>
                
                <Link to="/services" className="w-full sm:w-auto">
                  <button
                    className="w-full sm:w-auto h-12 md:h-12 px-8 bg-slate-900 text-white rounded-xl font-black text-[0.75rem] md:text-[0.7rem] flex items-center justify-center gap-3 hover:bg-slate-800 hover:scale-[1.02] transition-all duration-500 group shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] active:scale-95"
                  >
                    {t('nav.services')}
                    <ArrowRight size="20" className={`${dir === 'rtl' ? 'rotate-180' : ''} group-hover:translate-x-2 transition-transform duration-500`} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 animate-in fade-in delay-1000 duration-1000 fill-mode-both"
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary via-primary/20 to-transparent relative">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.8)] animate-bounce" 
            />
          </div>
        </div>
      </section>

      {/* 2. Service Solutions Grid - Light Theme */}
      <section id="services" className="min-h-[100svh] md:min-h-screen py-12 md:py-16 flex items-center bg-slate-50 relative overflow-hidden">
        {/* Advanced Background Visuals */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/[0.05] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/[0.05] to-transparent" />
          
          {/* Moving particles or subtle grid could go here, but keeping it clean */}
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full opacity-50" />
        </div>

        <div className="container-sahli relative z-10 w-full">
          <div className="max-w-3xl mb-8 md:mb-10 mx-auto md:mx-0 text-center md:text-start">
            <ScrollReveal>
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-6 md:mb-8 break-words"
              >
                {t('home.solutions.title')}
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8 gap-3 md:gap-4 xl:gap-5">
            {solutions.map((solution, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.05}
                className="h-full"
              >
                <a
                  href={getWhatsAppLink(t(solution.whatsappKey as TranslationKey))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick(`Solution: ${solution.title}`)}
                  onMouseMove={handleCardMouseMove}
                  style={{ 
                    '--mouse-x': `${mousePos.x}px`, 
                    '--mouse-y': `${mousePos.y}px` 
                  } as React.CSSProperties}
                  className="group h-full p-3 md:p-4 rounded-[1.25rem] md:rounded-[1.5rem] bg-white border border-slate-200 hover:border-primary/50 transition-all duration-500 flex flex-col items-center text-center cursor-pointer overflow-hidden relative shadow-sm hover:shadow-md"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-100 text-primary flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                    {React.cloneElement(solution.icon as React.ReactElement, { size: 18 })}
                  </div>
                  <h3 className="relative z-10 text-sm sm:text-base md:text-xl font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors leading-tight break-words">
                    {solution.title}
                  </h3>
                  <p className="relative z-10 text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] lg:text-[0.75rem] text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors line-clamp-3 break-words">
                    {solution.desc}
                  </p>
                </a>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="mt-8 md:mt-10 text-center">
            <p className="text-slate-500 mb-4 text-[0.65rem] md:text-xs font-medium max-w-lg mx-auto leading-relaxed">
              {t('home.solutions.cta')}
            </p>
            <a 
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full font-black text-[0.65rem] md:text-xs transition-all shadow-lg shadow-primary/25 group hover:scale-105 active:scale-95"
            >
              <Send size="14" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {t('home.final.cta')}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Marquee - Refined Single Line Grey Fade Loop */}
      <div className="relative border-y border-slate-200 bg-slate-50 py-4 overflow-hidden">
        <Suspense fallback={<div className="h-10 bg-slate-50" />}>
          <Marquee 
            gap={60}
            className="flex items-center"
          >
            {marqueeItems.map((item, i) => (
              <div key={i} className="flex items-center gap-6 whitespace-nowrap">
                <span className="text-[0.65rem] md:text-[0.75rem] font-black tracking-[0.2em] text-slate-400 uppercase hover:text-primary/60 transition-colors duration-500 cursor-default">
                  {item}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]" />
              </div>
            ))}
          </Marquee>
        </Suspense>
        
        {/* Edge Fades removed as per user request */}
      </div>

      {/* 2.1 Differentiation Block - Light Theme */}
      <section className="py-12 md:py-20 bg-slate-50 relative overflow-hidden border-y border-slate-200">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/3 h-full bg-primary/5 blur-[120px] rounded-full opacity-30`} />
        </div>

        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: The Problem */}
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-6 md:mb-8 leading-tight text-center lg:text-left break-words">
                  {t('home.differentiation.title')}
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary/20 transition-colors group shadow-sm">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                      <Search size={20} />
                    </div>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors break-words">
                      {t('home.differentiation.problem1')}
                    </p>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary/20 transition-colors group shadow-sm">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                      <ClipboardList size={20} />
                    </div>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors break-words">
                      {t('home.differentiation.problem2')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: The Solution (SAHLI) */}
            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              className="relative"
            >
              <div className="p-8 md:p-10 rounded-[2.5rem] bg-primary/5 border border-primary/20 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-[80px] rounded-full" />
                
                <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary text-white text-[0.6rem] font-black tracking-widest uppercase mb-6">
                    <ShieldCheck size={12} />
                    {t('home.differentiation.statement')}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 break-words">
                    {t('home.differentiation.list.title')}
                  </h3>
                  
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-700 justify-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                        <span className="text-sm md:text-base font-bold">
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

      {/* 2.5 Major Categories */}
      <section id="categories" className="section-spacing bg-white relative overflow-hidden border-t border-slate-200">
        <div className="container-sahli relative z-10">
          <div className="max-w-3xl mb-8 md:mb-10 mx-auto md:mx-0 text-center md:text-start">
            <ScrollReveal>
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-6 md:mb-8 break-words"
              >
                {t('services.title')}
              </h2>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 xl:gap-10">
            <Suspense fallback={<div className="min-h-[260px] sm:min-h-[280px] md:min-h-[340px] bg-slate-50 rounded-[var(--radius)]" />}>
              {services.map((service, i) => (
                <ServiceRoof
                  key={i}
                  index={i}
                  showNumber={false}
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  icon={React.cloneElement(service.icon as React.ReactElement, { size: 24 })}
                  path={service.path}
                  subcategories={service.subcategories}
                  whatsappKey={service.whatsappKey}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* 3. WHY PEOPLE USE SAHLI (Modernized) */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12 mx-auto md:mx-0 text-center md:text-start">
            <div className="max-w-3xl">
              <ScrollReveal>
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-6 md:mb-8 break-words"
                >
                  {t('home.glance.title')}
                </h2>
              </ScrollReveal>
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden -mx-4 px-4 cursor-grab active:cursor-grabbing" ref={emblaRefGlance}>
            <div className="flex">
              {glanceItems.map((item, i) => (
                <div key={i} className="flex-[0_0_85%] min-w-0 px-2">
                  <ScrollReveal
                    className="group relative p-6 rounded-[2rem] bg-slate-50 border border-slate-200 flex flex-col h-full shadow-xl shadow-slate-200/50 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[3rem] -mr-6 -mt-6" />
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mb-5 shadow-sm border border-slate-200">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <h3 className="relative z-10 text-xl md:text-2xl font-bold mb-2 text-slate-900 leading-tight break-words">
                      {item.title}
                    </h3>
                    <p className="relative z-10 text-[0.85rem] text-slate-600 leading-relaxed break-words">
                      {item.desc}
                    </p>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8">
            {glanceItems.map((item, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="group relative p-6 rounded-[2rem] bg-slate-50 border border-slate-200 hover:border-primary/30 transition-all duration-500 flex flex-col h-full shadow-xl shadow-slate-200/50 hover:shadow-primary/5 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[3rem] -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                
                <div className="relative z-10 w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-slate-200">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                </div>
                
                <h3 className="relative z-10 text-xl md:text-2xl font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors leading-tight break-words">
                  {item.title}
                </h3>
                <p className="relative z-10 text-[0.85rem] text-slate-600 leading-relaxed break-words">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Tightened mantra - promotional line removed */}
        </div>
      </section>

      {/* 4. HOW IT WORKS (Modernized Step Flow) */}
      <section className="section-spacing bg-slate-50 relative overflow-hidden border-y border-slate-200">
        <div className="container-sahli relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12 mx-auto md:mx-0 text-center md:text-start">
            <div className="max-w-4xl">
              <ScrollReveal>
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-6 md:mb-8 break-words"
                >
                  {t('home.how.title')}
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />
            
            {/* Mobile Carousel */}
            <div className="lg:hidden overflow-hidden -mx-4 px-4 cursor-grab active:cursor-grabbing" ref={emblaRefHow}>
              <div className="flex">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_70%] md:flex-[0_0_50%] px-2">
                    <ScrollReveal
                      className="group h-full"
                    >
                      <div className="relative p-6 rounded-[2rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 h-full flex flex-col">
                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg mb-6 shadow-lg shadow-primary/20 relative">
                          {formatNumber(step)}
                          {step === 1 && (
                            <div className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20" />
                          )}
                        </div>
                        <h3 className="text-base font-black mb-3 text-slate-900 leading-tight break-words">
                          {t(`home.how.step${step}.title` as TranslationKey)}
                        </h3>
                        <p className="text-[0.85rem] text-slate-600 leading-relaxed break-words">
                          {t(`home.how.step${step}.desc` as TranslationKey)}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8 relative z-10">
              {[1, 2, 3, 4].map((step) => (
                <ScrollReveal
                  key={step}
                  delay={step * 0.1}
                  className="group"
                >
                  <div className="relative p-6 rounded-[2rem] bg-white border border-slate-200 group-hover:border-primary/40 transition-all duration-500 shadow-xl shadow-slate-200/50 h-full flex flex-col">
                    {/* Step Number Badge */}
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20 relative">
                      {formatNumber(step)}
                      {/* Pulse effect for current/first step */}
                      {step === 1 && (
                        <div className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20" />
                      )}
                    </div>
                    
                    <h3 className="text-base font-black mb-3 text-slate-900 leading-tight break-words">
                      {t(`home.how.step${step}.title` as TranslationKey)}
                    </h3>
                    <p className="text-[0.85rem] text-slate-600 leading-relaxed break-words">
                      {t(`home.how.step${step}.desc` as TranslationKey)}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      
      {/* Final CTA - Minimalist */}
      <section className="py-20 md:py-28 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-primary/5 blur-[100px] rounded-full opacity-20" />
        </div>
        
        <div className="container-sahli relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight break-words">
              {t('home.final.title')}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[3.5rem] h-auto py-4 px-8 bg-primary hover:bg-primary-light text-white rounded-xl font-black flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
              >
                <MessageSquare size={20} />
                <span className="tracking-widest uppercase text-sm">{t('home.final.cta')}</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

