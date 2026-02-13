import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
// Refined Index page with video media replacing 3D hero
import { useLanguage } from '@/contexts/LanguageContext';
import { ServiceRoof } from '@/components/motion/ServiceRoof';
import { TrustPanel, TrustStatement } from '@/components/motion/TrustPanel';
import { Marquee } from '@/components/motion/Marquee';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { MessageSquare, ArrowRight, Wrench, Sparkles, Truck, Heart, GraduationCap, BookOpen, Shield, Zap, Repeat, UserCheck, Snowflake, Lightbulb, Droplets, Cog, Sofa, Baby, Search, Clock, DollarSign, ShieldCheck, PhoneOff, CheckCircle2, Fingerprint, Target, HeartHandshake, ClipboardList, Leaf, Cpu, Bug, Send, Building2, Handshake, Wallet, ClipboardCheck } from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

interface ServiceItem {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  path: string;
  number: string;
  subcategories: string[];
}

interface TrustPanel {
  title: string;
  items: { title: string }[];
}

  const Index = () => {
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

  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const [emblaRefCoverage] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [emblaRefGlance] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 2500, stopOnInteraction: false })]);
  const [emblaRefHow] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 3500, stopOnInteraction: false })]);
  const [emblaRefClarity] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

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
    { name: t('home.coverage.location1'), image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop" },
    { name: t('home.coverage.location2'), image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location3'), image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" },
    { name: t('home.coverage.location4'), image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location5'), image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2071&auto=format&fit=crop" },
    { name: t('home.coverage.location6'), image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop" },
    { name: t('home.coverage.location7'), image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1932&auto=format&fit=crop" },
    { name: t('home.coverage.location8'), image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=1974&auto=format&fit=crop" },
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

  const clarityItems = [
    { id: 1, icon: <Handshake size={20} />, title: t('home.clarity.item1') },
    { id: 2, icon: <ShieldCheck size={20} />, title: t('home.clarity.item2') },
    { id: 3, icon: <Search size={20} />, title: t('home.clarity.item3') },
    { id: 4, icon: <Wallet size={20} />, title: t('home.clarity.item4') },
    { id: 5, icon: <ClipboardCheck size={20} />, title: t('home.clarity.item5') },
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

  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const yHero = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    const handleScroll = () => {
      // scroll logic if needed
    };
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const services = [
    { 
      title: t('services.homeMaintenance.tax.title'), 
      description: t('services.homeMaintenance.tax.items'),
      imageUrl: "/Services/AC Maintenance.jpg",
      icon: <Wrench size={32} />,
      path: t('services.homeMaintenance.path'),
      whatsappKey: 'services.homeMaintenance.whatsapp',
      subcategories: []
    },
    { 
      title: t('services.cleaning.tax.title'), 
      description: t('services.cleaning.tax.items'),
      imageUrl: "/Services/Cleaning service.jpg",
      icon: <Sparkles size={32} />,
      path: t('services.cleaning.path'),
      whatsappKey: 'services.cleaning.whatsapp',
      subcategories: []
    },
    { 
      title: t('services.moving.tax.title'), 
      description: t('services.moving.tax.items'),
      imageUrl: "/Services/Moving & Relocation.jpg",
      icon: <Truck size={32} />,
      path: t('services.moving.path'),
      whatsappKey: 'services.moving.whatsapp',
      subcategories: []
    },
    { 
      title: t('services.outdoor.tax.title'), 
      description: t('services.outdoor.tax.items'),
      imageUrl: "/Services/Pest Control.jpg",
      icon: <Leaf size={32} />,
      path: t('services.outdoor.path'),
      whatsappKey: 'services.outdoor.whatsapp',
      subcategories: []
    },
    { 
      title: t('services.care.tax.title'), 
      description: t('services.care.tax.items'),
      imageUrl: "/Services/Nanny Care Service.jpg",
      icon: <Heart size={32} />,
      path: t('services.care.path'),
      whatsappKey: 'services.care.whatsapp',
      subcategories: []
    },
    { 
      title: t('services.electronics.tax.title'), 
      description: t('services.electronics.tax.items'),
      imageUrl: "/Services/Electronics repair.jpg",
      icon: <Cpu size={32} />,
      path: t('services.electronics.path'),
      whatsappKey: 'services.electronics.whatsapp',
      subcategories: []
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

  const trustPanels = [
    {
      title: t('trust.vetting.title'),
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&fm=webp&fit=crop',
      videoUrl: '', // 'https://videos.pexels.com/video-files/4491451/4491451-uhd_2560_1440_24fps.mp4',
      items: [
        { title: t('trust.vetting.item1'), description: "" },
        { title: t('trust.vetting.item2'), description: "" },
      ]
    },
    {
      title: t('trust.competency.title'),
      imageUrl: 'https://images.unsplash.com/photo-1454165833767-027508496b4c?q=80&w=1000&fm=webp&fit=crop',
      videoUrl: '', // 'https://videos.pexels.com/video-files/3130204/3130204-uhd_2560_1440_30fps.mp4',
      items: [
        { title: t('trust.competency.item1'), description: "" },
      ]
    },
    {
      title: t('trust.behavioral.title'),
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1000&fm=webp&fit=crop',
      videoUrl: '', // 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
      items: [
        { title: t('trust.behavioral.item1'), description: "" },
      ]
    },
    {
      title: t('trust.rules.title'),
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&fm=webp&fit=crop',
      videoUrl: '', // 'https://videos.pexels.com/video-files/4492147/4492147-uhd_2560_1440_25fps.mp4',
      items: [
        { title: t('trust.rules.item1'), description: "" },
        { title: t('trust.rules.item2'), description: "" },
        { title: t('trust.rules.item3'), description: "" },
      ]
    },
  ];

  return (
    <Layout>
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero Section - Refined, Dynamic - Height adjusted for laptops/mobile */}
      <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background"
      >
        {/* Background Video/Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              x: mousePos.x * 0.2,
              rotate: mousePos.y * 0.02
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
                src="/Services/Home Maintenance - Hero.jpg" 
                alt={t('home.hero.imgAlt')}
                crossOrigin="anonymous"
                className="w-full h-full object-cover object-center scale-105"
              />
          </motion.div>
          
          {/* Darker overlays removed as per user request */}
          <div className="absolute inset-0 bg-slate-950/10 z-0" />
          
          {/* Premium Animated Blobs - Industrial Premium Style */}
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/3' : 'right-1/3'} w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen z-0`} 
          />
          <motion.div 
            animate={{ 
              x: [0, -30, 0], 
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
              rotate: [0, -30, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/4' : 'left-1/4'} w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen z-0`} 
          />
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          style={{ y: y2Spring }}
          className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 h-full bg-slate-950/5 pointer-events-none z-10`} 
        />

        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-20 flex flex-col items-center md:items-start">
          <motion.div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start"
            style={{ y: yHero }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary/20 rounded-full border border-primary/30 text-[0.75rem] md:text-[0.65rem] font-black tracking-[0.25em] uppercase text-primary mb-6 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <img 
                src="/logos/SahlLogo9.png" 
                alt={t('home.hero.logoAlt')} 
                className="w-4 h-4 md:w-3.5 md:h-3.5 object-contain animate-pulse" 
              />
              {t('home.hero.label')}
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 leading-[1.1] tracking-tight text-white drop-shadow-2xl font-black w-full text-center md:text-start">
              {t('home.hero.title').split(' ').map((word, i) => (
                <div key={i} className="overflow-hidden inline-block mr-[0.3em]">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.08), duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </h1>

            <motion.div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg md:text-lg lg:text-xl !text-white/90 mb-10 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mb-10 md:mb-10 justify-center md:justify-start w-full">
                {heroMeta.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-950/40 backdrop-blur-xl rounded-xl border border-white/10 text-[0.8rem] md:text-[0.75rem] font-black text-white shadow-2xl shrink-0 hover:border-primary/50 transition-colors"
                  >
                    <span className="text-primary">{item.icon}</span>
                    <span className="tracking-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a 
                  href={getWhatsAppLink(t('cta.whatsapp.general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Hero Section')} 
                  className="cta-primary btn-shine w-full sm:w-auto group h-12 md:h-12 px-8 flex items-center justify-center rounded-xl shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.3)]"
                >
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size="18" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="tracking-widest uppercase font-black text-[0.75rem] md:text-[0.7rem]">{t('home.hero.cta')}</span>
                  </motion.div>
                </a>
                
                <Link to="/services" className="w-full sm:w-auto">
                  <motion.button
                    className="w-full sm:w-auto h-12 md:h-12 px-8 bg-white text-slate-950 rounded-xl font-black text-[0.75rem] md:text-[0.7rem] flex items-center justify-center gap-3 hover:bg-white/90 hover:scale-[1.02] transition-all duration-500 group shadow-[0_20px_50px_-12px_rgba(255,255,255,0.3)]"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('nav.services')}
                    <ArrowRight size="20" className={`${dir === 'rtl' ? 'rotate-180' : ''} group-hover:translate-x-2 transition-transform duration-500`} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Advanced Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary via-primary/20 to-transparent relative">
            <motion.div 
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
            />
          </div>
        </motion.div>
      </section>

      {/* Trust Marquee - Refined Single Line Grey Fade Loop */}
      <div className="relative border-y border-foreground/[0.03] bg-foreground/[0.01] py-4 overflow-hidden">
        <Marquee 
          gap={60}
          speed={0.25}
          className="flex items-center"
        >
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center gap-6 whitespace-nowrap">
              <span className="text-[0.65rem] md:text-[0.75rem] font-black tracking-[0.2em] text-foreground/30 uppercase hover:text-primary/60 transition-colors duration-500 cursor-default">
                {item}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]" />
            </div>
          ))}
        </Marquee>
        
        {/* Edge Fades removed as per user request */}
      </div>

      {/* 2.1 Differentiation Block */}
      <section className="py-12 md:py-20 bg-[#050505] relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/3 h-full bg-primary/5 blur-[120px] rounded-full opacity-30`} />
        </div>

        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: The Problem */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-black text-white mb-6 leading-tight">
                  {t('home.differentiation.title')}
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                      <Search size={20} />
                    </div>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                      {t('home.differentiation.problem1')}
                    </p>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
                      <ClipboardList size={20} />
                    </div>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                      {t('home.differentiation.problem2')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: The Solution (SAHLI) */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="p-8 md:p-10 rounded-[2.5rem] bg-primary/10 border border-primary/20 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[80px] rounded-full" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-[0.6rem] font-black tracking-widest uppercase mb-6">
                    <ShieldCheck size={12} />
                    {t('home.differentiation.statement')}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-black text-white mb-8">
                    {t('home.differentiation.list.title')}
                  </h3>
                  
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                        <span className="text-sm md:text-base font-bold">
                          {t(`home.differentiation.list.item${item}` as any)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Service Solutions Grid - Dark Theme */}
      <section id="services" className="min-h-[100svh] md:min-h-screen py-12 md:py-16 flex items-center bg-[#030303] relative overflow-hidden">
        {/* Advanced Background Visuals */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
          
          {/* Moving particles or subtle grid could go here, but keeping it clean */}
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full opacity-50" />
        </div>

        <div className="container-sahli relative z-10 w-full">
          <div className="max-w-3xl mb-8 md:mb-10 mx-auto md:mx-0 text-center md:text-start">
            <motion.h2 
              className="text-display mb-2 text-white !text-xl md:!text-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.solutions.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8 gap-3 md:gap-4 xl:gap-5">
            {solutions.map((solution, i) => (
              <motion.a
                key={i}
                href={getWhatsAppLink(t(solution.whatsappKey as any))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick(`Solution: ${solution.title}`)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseMove={handleCardMouseMove}
                style={{ 
                  '--mouse-x': `${mousePos.x}px`, 
                  '--mouse-y': `${mousePos.y}px` 
                } as any}
                className="group p-3 md:p-4 rounded-[1.25rem] md:rounded-[1.5rem] bg-white/[0.03] border border-white/[0.08] hover:border-primary/50 transition-all duration-500 flex flex-col items-center text-center cursor-pointer overflow-hidden relative"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl bg-white/[0.05] text-primary flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
                  {React.cloneElement(solution.icon as React.ReactElement, { size: 18 })}
                </div>
                <h3 className="relative z-10 text-[0.7rem] md:text-sm lg:text-base font-black mb-1 text-white group-hover:text-primary transition-colors leading-tight">
                  {solution.title}
                </h3>
                <p className="relative z-10 text-[0.65rem] md:text-[0.7rem] lg:text-[0.75rem] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2">
                  {solution.desc}
                </p>
              </motion.a>
            ))}
          </div>
          
          <div className="mt-8 md:mt-10 text-center">
            <p className="text-white/40 mb-4 text-[0.65rem] md:text-xs font-medium max-w-lg mx-auto leading-relaxed">
              {t('home.solutions.cta')}
            </p>
            <motion.a 
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full font-black text-[0.65rem] md:text-xs transition-all shadow-lg shadow-primary/25 group"
            >
              <Send size="14" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {t('home.final.cta')}
            </motion.a>
          </div>
        </div>
      </section>

      {/* 2.5 Major Categories */}
      <section id="categories" className="section-spacing bg-background relative overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="max-w-3xl mb-8 md:mb-10 mx-auto md:mx-0 text-center md:text-start">
            <motion.h2 
              className="text-display mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('services.title')}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 xl:gap-10">
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
          </div>
        </div>
      </section>

      {/* 3. WHY PEOPLE USE SAHLI (Modernized) */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12 mx-auto md:mx-0 text-center md:text-start">
            <div className="max-w-3xl">
              <motion.h2 
                className="text-display mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('home.glance.title')}
              </motion.h2>
            </div>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden -mx-4 px-4 cursor-grab active:cursor-grabbing" ref={emblaRefGlance}>
            <div className="flex">
              {glanceItems.map((item, i) => (
                <div key={i} className="flex-[0_0_85%] min-w-0 px-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative p-6 rounded-[2rem] bg-foreground/[0.02] border border-border/50 flex flex-col h-full shadow-xl shadow-foreground/[0.01] overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[3rem] -mr-6 -mt-6" />
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mb-5 shadow-sm border border-border/50">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <h3 className="relative z-10 text-base font-black mb-2 text-foreground leading-tight">
                      {item.title}
                    </h3>
                    <p className="relative z-10 text-[0.85rem] text-foreground/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8">
            {glanceItems.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 rounded-[2rem] bg-foreground/[0.02] border border-border/50 hover:border-primary/30 transition-all duration-500 flex flex-col h-full shadow-xl shadow-foreground/[0.01] hover:shadow-primary/5 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[3rem] -mr-6 -mt-6 transition-transform group-hover:scale-110 duration-500" />
                
                <div className="relative z-10 w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-border/50">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                </div>
                
                <h3 className="relative z-10 text-base font-black mb-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="relative z-10 text-[0.85rem] text-foreground/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Tightened mantra - promotional line removed */}
        </div>
      </section>

      {/* 4. HOW IT WORKS (Modernized Step Flow) */}
      <section className="section-spacing bg-foreground/[0.02] relative overflow-hidden border-y border-border">
        <div className="container-sahli relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12 mx-auto md:mx-0 text-center md:text-start">
            <div className="max-w-4xl">
              <motion.h2 
                className="text-display"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('home.how.title')}
              </motion.h2>
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
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group h-full"
                    >
                      <div className="relative p-6 rounded-[2rem] bg-white border border-border/50 shadow-xl shadow-foreground/[0.02] h-full flex flex-col">
                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg mb-6 shadow-lg shadow-primary/20 relative">
                          {formatNumber(step)}
                          {step === 1 && (
                            <div className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20" />
                          )}
                        </div>
                        <h3 className="text-base font-black mb-3 text-foreground leading-tight">
                          {t(`home.how.step${step}.title` as any)}
                        </h3>
                        <p className="text-[0.85rem] text-foreground/60 leading-relaxed">
                          {t(`home.how.step${step}.desc` as any)}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8 relative z-10">
              {[1, 2, 3, 4].map((step) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step * 0.1 }}
                  className="group"
                >
                  <div className="relative p-6 rounded-[2rem] bg-white border border-border/50 group-hover:border-primary/40 transition-all duration-500 shadow-xl shadow-foreground/[0.02] h-full flex flex-col">
                    {/* Step Number Badge */}
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20 relative">
                      {formatNumber(step)}
                      {/* Pulse effect for current/first step */}
                      {step === 1 && (
                        <div className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-20" />
                      )}
                    </div>
                    
                    <h3 className="text-base font-black mb-3 text-foreground leading-tight">
                      {t(`home.how.step${step}.title` as any)}
                    </h3>
                    <p className="text-[0.85rem] text-foreground/60 leading-relaxed">
                      {t(`home.how.step${step}.desc` as any)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. STANDARDS Section - Modern Sticky Design */}
      <section className="min-h-[100svh] md:min-h-screen py-12 md:py-16 flex items-center bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left side: Sticky Header */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center lg:items-start gap-4 md:gap-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 bg-primary/10 rounded-full text-[0.6rem] md:text-[0.7rem] font-black text-primary uppercase tracking-[0.2em] w-fit">
                  <ShieldCheck size={12} className="md:w-[14px] md:h-[14px]" />
                  {t('home.standards.label')}
                </div>
                
                <h2 className="text-display !text-xl md:!text-3xl">
                  {t('home.standards.title')}
                </h2>
                
                <p className="text-subtitle !text-foreground/50 max-w-md !text-sm md:!text-base">
                  {t('home.standards.subtitle')}
                </p>

                {/* Status Indicator Card */}
                <div className="relative mt-4 md:mt-8 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-foreground/[0.02] border border-border overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 md:mb-4">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[0.55rem] md:text-[0.65rem] font-black text-foreground/40 uppercase tracking-widest">Active Verification</span>
                    </div>
                    <p className="text-[0.7rem] md:text-sm text-foreground/60 font-medium leading-relaxed">
                      Every company in our network undergoes a verification process before their first coordination.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side: Interactive List */}
            <div className="lg:col-span-7 space-y-3 md:space-y-4">
              {[
                { id: 1, icon: <Building2 size={20} />, color: "text-blue-500", bg: "bg-blue-500/5" },
                { id: 2, icon: <Wrench size={20} />, color: "text-orange-500", bg: "bg-orange-500/5" },
                { id: 3, icon: <PhoneOff size={20} />, color: "text-purple-500", bg: "bg-purple-500/5" },
                { id: 4, icon: <Clock size={20} />, color: "text-emerald-500", bg: "bg-emerald-500/5" },
                { id: 5, icon: <ShieldCheck size={20} />, color: "text-primary", bg: "bg-primary/5" }
              ].map((standard, index) => (
                <motion.div 
                  key={standard.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className="p-4 md:p-6 lg:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/30 hover:bg-background hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex gap-4 md:gap-6 items-center">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-background border border-border flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm ${standard.color}`}>
                      {standard.icon}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[0.55rem] md:text-[0.65rem] font-black text-primary/40 uppercase tracking-widest">Verified Standard 0{standard.id}</span>
                        <div className="h-px flex-grow bg-foreground/[0.05]" />
                      </div>
                      <h3 className="text-base md:text-xl font-black text-foreground mb-0.5 group-hover:text-primary transition-colors">
                        {t(`home.standards.item${standard.id}` as any)}
                      </h3>
                      <p className="text-[0.7rem] md:text-sm text-foreground/50 font-medium leading-relaxed max-w-lg line-clamp-1 md:line-clamp-none">
                        {t(`home.standards.item${standard.id}.desc` as any)}
                      </p>
                    </div>

                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-500 hidden sm:block">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. COVERAGE - Visually Enhanced */}
      <section className="section-spacing relative overflow-hidden bg-background border-b border-border min-h-[50vh] flex items-center">
        {/* Background image of Qatar/Doha with strong overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/Services/Qatar West Bay.jpg" 
            alt={t('home.coverage.imgAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60 md:bg-background/40" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-background/80 via-background/20 to-transparent`} />
        </div>

        <div className="container-sahli relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[0.65rem] font-black text-primary uppercase tracking-widest mb-6">
                  <Target size={12} />
                  {t('home.coverage.hub')}
                </div>
                <h2 className="text-display mb-6 !text-xl md:!text-3xl">
                  {t('home.coverage.title')}
                </h2>

                
                <div className="overflow-hidden -mx-4 px-4 md:mx-0 md:px-0 cursor-grab active:cursor-grabbing" ref={emblaRefCoverage}>
                  <div className="flex">
                    {coverageLocations.map((loc, i) => (
                      <div key={i} className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_70%] md:flex-[0_0_95%] lg:flex-[0_0_95%] px-2">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="relative h-48 md:h-64 rounded-2xl overflow-hidden border border-border group shadow-2xl shadow-primary/10"
                        >
                          <img 
                            src={loc.image} 
                            alt={loc.name}
                            crossOrigin="anonymous"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-slate-950/5" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="text-sm md:text-base font-black text-white drop-shadow-lg">
                              {loc.name}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Decorative map-like visual or abstract geometry */}
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="relative z-10 w-full h-full rounded-[3rem] border border-primary/20 bg-foreground/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
                   <img 
                    src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2064&auto=format&fit=crop" 
                    alt={t('home.coverage.architectureAlt')}
                    crossOrigin="anonymous"
                    loading="lazy"
                    className="w-full h-full object-cover opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-slate-950/60 to-transparent">
                    <h4 className="text-lg font-black text-white mb-2">{t('home.coverage.hub')}</h4>
                    <p className="text-xs text-white/70">{t('home.coverage.hubDesc')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. CLARITY (Important to Know) - Refined Premium Design - Optimized for Single Screen View */}
      <section className="min-h-[100svh] md:min-h-screen py-12 md:py-16 flex items-center bg-white relative overflow-hidden border-y border-border/40">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-sahli relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
            <div className="flex flex-col items-center text-center md:items-start md:text-start max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full mb-3 md:mb-4"
              >
                <ShieldCheck size={12} className="text-primary" />
                <span className="text-[0.6rem] md:text-[0.65rem] font-bold text-primary uppercase tracking-[0.2em]">
                  {t('home.hero.meta.coverage')}
                </span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl lg:text-3xl font-black text-foreground mb-3 md:mb-4 tracking-tight"
              >
                {t('home.clarity.title')}
              </motion.h2>
            </div>
          </div>
          
          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden -mx-4 px-4 cursor-grab active:cursor-grabbing" ref={emblaRefClarity}>
            <div className="flex">
              {clarityItems.map((item, i) => (
                <div key={item.id} className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_70%] px-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <div className="h-full p-6 rounded-[2rem] bg-background border border-border/50 flex flex-col items-center text-center overflow-hidden">
                      <div className="relative mb-4">
                        <div className="relative w-12 h-12 rounded-2xl bg-foreground/[0.03] text-primary flex items-center justify-center shadow-inner">
                          {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                        </div>
                      </div>
                      <h3 className="text-base font-black text-foreground mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <div className="w-10 h-1 bg-primary/10 rounded-full mb-4" />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {clarityItems.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="h-full p-6 md:p-8 rounded-[2rem] bg-background border border-border/50 hover:border-primary/20 transition-all duration-500 flex flex-col items-center text-center group-hover:shadow-xl group-hover:shadow-primary/5 group-hover:-translate-y-1 overflow-hidden">
                  {/* Floating Number */}
                  <div className="absolute top-4 right-6 text-4xl font-black text-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors duration-500 italic select-none">
                    {i + 1}
                  </div>

                  <div className="relative mb-4 md:mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-foreground/[0.03] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-inner">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg font-black text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                    {item.title}
                  </h3>
                  
                  <div className="w-10 h-1 bg-primary/10 rounded-full mb-4 group-hover:w-16 group-hover:bg-primary/30 transition-all duration-500" />
                  
                  {/* Decorative element */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA - With Background Image/Video Effect */}
      <section ref={ctaRef} className="section-spacing relative overflow-hidden bg-slate-900 py-24">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1595111304912-320a760f38f4?q=80&w=2070&auto=format&fit=crop" 
            alt="Doha Skyline"
            className="w-full h-full object-cover scale-110"
            crossOrigin="anonymous"
            loading="lazy"
          />
          {/* Multi-layered Overlays */}
          <div className="absolute inset-0 bg-slate-900/60" />
          <div className="absolute inset-0 bg-slate-950/5" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </motion.div>

        <div className="container-sahli text-center relative z-10">
          <motion.div
            className="max-w-4xl mx-auto p-10 md:p-16 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 rounded-full text-[0.7rem] font-black text-primary uppercase tracking-[0.2em] mb-8 border border-primary/20">
              <Sparkles size={14} />
              {t('home.hero.meta.model')}
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-6 text-white leading-tight">
              {t('home.final.title')}
            </h2>
            <p className="text-sm md:text-base font-medium text-white/70 mb-10 max-w-2xl mx-auto">
              {t('home.final.subtitle')}
            </p>

            <div className="mb-10 p-6 rounded-3xl bg-white/[0.05] border border-white/10 max-w-xl mx-auto">
              <p className="text-primary font-black text-lg mb-2">{t('home.final.authority.title')}</p>
              <p className="text-white/80 font-medium mb-3">{t('home.final.authority.body')}</p>
              <p className="text-white/60 text-sm italic border-t border-white/5 pt-3">
                {t('home.final.authority.selection')}
              </p>
            </div>
            
            <div className="flex justify-center">
              <a 
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Final CTA')}
                className="group relative px-8 py-4 bg-primary text-white font-black text-base rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center gap-3">
                  <Send size="22" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  {t('home.final.cta')}
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;


