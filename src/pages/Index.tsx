import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
// Refined Index page with video media replacing 3D hero
import { useLanguage } from '@/contexts/LanguageContext';
import { ServiceRoof } from '@/components/motion/ServiceRoof';
import { TrustPanel, TrustStatement } from '@/components/motion/TrustPanel';
import { InfiniteMarquee } from '@/components/motion/InfiniteMarquee';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageSquare, ArrowRight, Wrench, Sparkles, Truck, Heart, GraduationCap, BookOpen, Shield, Zap, Repeat, UserCheck, Snowflake, Lightbulb, Droplets, Cog, Sofa, Baby, Search, Clock, DollarSign, ShieldCheck, PhoneOff, CheckCircle2, Fingerprint, Target, HeartHandshake, ClipboardList, Leaf, Cpu, Bug, Send, Building2 } from 'lucide-react';

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
  const { t, dir } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const differentiators = [
    { title: t('home.diff.item1'), icon: <Search size={24} /> },
    { title: t('home.diff.item2'), icon: <PhoneOff size={24} /> },
    { title: t('home.diff.item3'), icon: <UserCheck size={24} /> },
    { title: t('home.diff.item4'), icon: <DollarSign size={24} /> },
    { title: t('home.diff.item5'), icon: <ShieldCheck size={24} /> },
  ];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const heroMeta = [
    { label: t('home.hero.meta.bestFor'), icon: <Target size={16} /> },
    { label: t('home.hero.meta.coverage'), icon: <Shield size={16} /> },
    { label: t('home.hero.meta.model'), icon: <CheckCircle2 size={16} /> },
  ];

  const glanceItems = [
    { title: t('home.glance.item1.title'), desc: t('home.glance.item1.desc'), icon: <MessageSquare size={24} /> },
    { title: t('home.glance.item2.title'), desc: t('home.glance.item2.desc'), icon: <ShieldCheck size={24} /> },
    { title: t('home.glance.item3.title'), desc: t('home.glance.item3.desc'), icon: <Search size={24} /> },
    { title: t('home.glance.item4.title'), desc: t('home.glance.item4.desc'), icon: <HeartHandshake size={24} /> },
  ];

  const solutions = [
    { title: t('home.solutions.ac.title'), desc: t('home.solutions.ac.desc'), icon: <Snowflake size={32} /> },
    { title: t('home.solutions.electrical.title'), desc: t('home.solutions.electrical.desc'), icon: <Lightbulb size={32} /> },
    { title: t('home.solutions.plumbing.title'), desc: t('home.solutions.plumbing.desc'), icon: <Droplets size={32} /> },
    { title: t('home.solutions.appliances.title'), desc: t('home.solutions.appliances.desc'), icon: <Cog size={32} /> },
    { title: t('home.solutions.moving.title'), desc: t('home.solutions.moving.desc'), icon: <Truck size={32} /> },
    { title: t('home.solutions.cleaning.title'), desc: t('home.solutions.cleaning.desc'), icon: <Sparkles size={32} /> },
    { title: t('home.solutions.pest.title'), desc: t('home.solutions.pest.desc'), icon: <Bug size={32} /> },
    { title: t('home.solutions.childcare.title'), desc: t('home.solutions.childcare.desc'), icon: <Baby size={32} /> },
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
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
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
      title: t('services.homeMaintenance.title'), 
      description: t('services.homeMaintenance.subtitle'),
      imageUrl: "/Services/AC Maintenance.jpg",
      icon: <Wrench size={32} />,
      path: t('services.homeMaintenance.path'),
      whatsappKey: 'services.homeMaintenance.whatsapp',
      number: "01",
      subcategories: [
        t('services.homeMaintenance.ac.title'),
        t('services.homeMaintenance.electrical.title'),
        t('services.homeMaintenance.plumbing.title'),
        t('services.homeMaintenance.handyman.title'),
      ]
    },
    { 
      title: t('services.cleaning.title'), 
      description: t('services.cleaning.subtitle'),
      imageUrl: "/Services/Cleaning service.jpg",
      icon: <Sparkles size={32} />,
      path: t('services.cleaning.path'),
      whatsappKey: 'services.cleaning.whatsapp',
      number: "02",
      subcategories: [
        t('services.cleaning.regular.title'),
        t('services.cleaning.deep.title'),
        t('services.cleaning.specialized.title'),
      ]
    },
    { 
      title: t('services.moving.title'), 
      description: t('services.moving.subtitle'),
      imageUrl: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=800&fm=webp&fit=crop",
      icon: <Truck size={32} />,
      path: t('services.moving.path'),
      whatsappKey: 'services.moving.whatsapp',
      number: "03",
      subcategories: [
        t('services.moving.house.title'),
        t('services.moving.dismantling.title'),
        t('services.moving.storage.title'),
      ]
    },
    { 
      title: t('services.outdoor.title'), 
      description: t('services.outdoor.subtitle'),
      imageUrl: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=800&fm=webp&fit=crop",
      icon: <Leaf size={32} />,
      path: t('services.outdoor.path'),
      whatsappKey: 'services.outdoor.whatsapp',
      number: "04",
      subcategories: [
        t('services.outdoor.pest.title'),
        t('services.outdoor.pool.title'),
        t('services.outdoor.landscaping.title'),
        t('services.outdoor.waterproofing.title'),
      ]
    },
    { 
      title: t('services.care.title'), 
      description: t('services.care.subtitle'),
      imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&fm=webp&fit=crop',
      icon: <Heart size={32} />,
      path: t('services.care.path'),
      whatsappKey: 'services.care.whatsapp',
      number: "05",
      subcategories: [
        t('services.care.childcare.title'),
        t('services.care.healthcare.title'),
        t('services.care.pets.title'),
        t('services.care.beauty.title'),
        t('services.care.tutoring.title'),
        t('services.care.trainer.title'),
      ]
    },
    { 
      title: t('services.electronics.title'), 
      description: t('services.electronics.subtitle'),
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&fm=webp&fit=crop',
      icon: <Cpu size={32} />,
      path: t('services.electronics.path'),
      whatsappKey: 'services.electronics.whatsapp',
      number: "06",
      subcategories: [
        t('services.electronics.repair.title'),
        t('services.electronics.smart.title'),
        t('services.electronics.satellite.title'),
      ]
    }
  ];

  const marqueeItems = [
    t('home.microTrust.vetted'),
    t('home.microTrust.recorded'),
    t('home.microTrust.coordination'),
    t('footer.intermediary'),
  ];

  const featuredServices = [
    { title: t('services.homeMaintenance.ac.title'), icon: <Snowflake size={24} />, intent: "AC repair", path: '/services#home-maintenance', whatsappKey: 'services.homeMaintenance.ac.whatsapp' },
    { title: t('services.homeMaintenance.electrical.title'), icon: <Lightbulb size={24} />, intent: "electrical repair", path: '/services#home-maintenance', whatsappKey: 'services.homeMaintenance.electrical.whatsapp' },
    { title: t('services.homeMaintenance.plumbing.title'), icon: <Droplets size={24} />, intent: "plumbing", path: '/services#home-maintenance', whatsappKey: 'services.homeMaintenance.plumbing.whatsapp' },
    { title: t('services.electronics.repair.title'), icon: <Cog size={24} />, intent: "appliance repair", path: '/services#tech', whatsappKey: 'services.homeMaintenance.appliances.whatsapp' },
    { title: t('services.cleaning.deep.title'), icon: <Sparkles size={24} />, intent: "home deep cleaning", path: '/services#cleaning', whatsappKey: 'services.cleaning.whatsapp' },
    { title: t('services.outdoor.pest.title'), icon: <Bug size={24} />, intent: "pest control", path: '/services#outdoor', whatsappKey: 'services.homeMaintenance.pest.whatsapp' },
    { title: t('services.moving.house.title'), icon: <Truck size={24} />, intent: "house shifting", path: '/services#moving', whatsappKey: 'services.moving.whatsapp' },
    { title: t('services.care.childcare.title'), icon: <Baby size={24} />, intent: "nanny services", path: '/services#care', whatsappKey: 'services.care.childcare.whatsapp' },
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
      {/* Hero Section - Refined, Dynamic - Height adjusted for laptops/mobile */}
      <section ref={containerRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-background">
        {/* Background Video/Image with subtle overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              opacity: opacity
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="/Services/Home Maintenance - Hero.jpg" 
              alt="Professional Office Coordination"
              crossOrigin="anonymous"
              className="w-full h-full object-cover scale-105"
            />
          </motion.div>
          
          {/* Darker overlays to make images pop and remove whitish haze */}
          <div className="absolute inset-0 bg-slate-950/20 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-background z-10" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-slate-950/40 via-transparent to-transparent z-10`} />
          
          {/* Floating Background Blobs - Industrial Premium Style */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[160px] animate-pulse-slow z-0`} />
          <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[60px] md:blur-[120px] animate-pulse-slow delay-1000 z-0`} />
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          style={{ y: y2Spring }}
          className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 h-full bg-gradient-to-${dir === 'rtl' ? 'r' : 'l'} from-primary/[0.06] to-transparent pointer-events-none z-10`} 
        />

        <div className="container-sahli relative z-20 pb-10 md:pb-16 flex flex-col items-start text-start">
          <motion.div 
            className="max-w-[1400px] flex flex-col items-start"
            style={{ y: yHero }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-primary/20 rounded-full border border-primary/30 text-[0.7rem] font-black tracking-[0.25em] uppercase text-primary mb-6 md:mb-8 mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <img 
                src="/logos/SahlLogo9.png" 
                alt="SAHLI Logo" 
                className="w-4 h-4 object-contain animate-pulse" 
              />
              {t('home.hero.label')}
            </motion.div>
            
            <h1 className="text-display mb-4 md:mb-6 leading-[1.1] tracking-tight text-white drop-shadow-2xl">
              {t('home.hero.title')}
            </h1>

            <motion.div
              className="max-w-2xl flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-subtitle !text-white/90 mb-6 md:mb-8 font-medium leading-relaxed drop-shadow-lg">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mb-8 md:mb-10 justify-center md:justify-start">
                {heroMeta.map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2.5 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-[0.7rem] md:text-[0.75rem] font-black text-white shadow-sm"
                  >
                    <span className="text-primary p-1 bg-white/90 rounded-lg">{item.icon}</span>
                    {item.label}
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a 
                  href={getWhatsAppLink(t('cta.whatsapp.general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Hero Section')} 
                  className="cta-primary btn-shine w-full sm:w-auto group h-14 md:h-16 px-10 flex items-center justify-center rounded-2xl"
                >
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size="18" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="tracking-widest uppercase font-black text-xs md:text-sm">{t('home.hero.cta')}</span>
                  </motion.div>
                </a>
                
                <Link to="/services" className="w-full sm:w-auto">
                  <motion.button
                    className="w-full sm:w-auto h-14 md:h-16 px-10 bg-white text-slate-950 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-white/90 hover:scale-[1.02] transition-all duration-500 group shadow-[0_20px_50px_-12px_rgba(255,255,255,0.3)]"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('nav.services')}
                    <ArrowRight size="18" className={`${dir === 'rtl' ? 'rotate-180' : ''} group-hover:translate-x-2 transition-transform duration-500`} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator - refined */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary/30 to-transparent relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
              animate={{
                y: ['-100%', '200%']
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </section>

      <InfiniteMarquee 
        items={marqueeItems} 
        logos={[
          '/logos/SahlLogo9.png',
          '/logos/SahlLogo2.png',
          '/logos/SahlLogo3.png',
          '/logos/SahlLogo5.png'
        ]}
        speed={50} 
      />

      {/* 2. Service Solutions Grid */}
      <section id="services" className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="max-w-3xl mb-12 md:mb-16">
            <motion.h2 
              className="text-display mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.solutions.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseMove={handleCardMouseMove}
                style={{ 
                  '--mouse-x': `${mousePos.x}px`, 
                  '--mouse-y': `${mousePos.y}px` 
                } as any}
                className="group p-5 md:p-6 rounded-[1.25rem] premium-card flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/10">
                  {React.cloneElement(solution.icon as React.ReactElement, { size: 24 })}
                </div>
                <h3 className="text-base font-black mb-2 text-foreground group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
                <p className="text-[0.8rem] text-foreground/60 leading-relaxed">
                  {solution.desc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-primary font-black text-[0.7rem] opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                  {t('services.explore')} <ArrowRight size={12} className={dir === 'rtl' ? 'rotate-180' : ''} />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-foreground/60 mb-6 text-sm font-bold">
              {t('home.solutions.cta')}
            </p>
            <a 
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary btn-shine"
            >
              <div className="flex items-center gap-2.5">
                <Send size="18" />
                {t('home.final.cta')}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 2.5 Major Categories */}
      <section id="categories" className="section-spacing bg-background relative overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="max-w-3xl mb-8 md:mb-10">
            <motion.h2 
              className="text-display mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('services.title')}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {services.map((service, i) => (
              <ServiceRoof
                key={i}
                index={i}
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

      {/* 3. WHY SAHLI (At-a-glance Overview) */}
      <section className="section-spacing bg-foreground/[0.02] border-y border-border overflow-hidden relative">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2 
              className="text-2xl md:text-3xl font-black mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.glance.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {glanceItems.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseMove={handleCardMouseMove}
                style={{ 
                  '--mouse-x': `${mousePos.x}px`, 
                  '--mouse-y': `${mousePos.y}px` 
                } as any}
                className="group p-5 md:p-6 rounded-[1.25rem] premium-card flex flex-col h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                </div>
                <h3 className="text-sm font-black mb-2 text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-[0.8rem] text-foreground/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-primary font-black text-[0.65rem] tracking-widest uppercase opacity-40">
              {t('home.glance.mantra')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (Coordination Process) */}
      <section className="section-spacing bg-background relative overflow-hidden border-b border-border">
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mb-12 md:mb-16">
            <motion.h2 
              className="text-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.how.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: step * 0.1 }}
                className="relative z-10 p-6 md:p-7 rounded-[1.25rem] glass-morphism border border-border group hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-black text-base mb-5 group-hover:scale-110 transition-transform">
                  {step}
                </div>
                <h3 className="text-lg font-black mb-2.5 text-foreground">
                  {t(`home.how.step${step}.title` as any)}
                </h3>
                <p className="text-[0.8rem] text-foreground/60 leading-relaxed">
                  {t(`home.how.step${step}.desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIFFERENTIATORS (Comparison Section) - Visually Enhanced */}
      <section className="section-spacing bg-background relative overflow-hidden border-b border-border">
        {/* Abstract visual background element */}
        <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/3 h-full bg-primary/[0.02] -skew-x-12 transform origin-top pointer-events-none`} />
        
        <div className="container-sahli relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <motion.h2 
                className="text-display mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('home.diff.title')}
              </motion.h2>
              <p className="text-subtitle !text-foreground/60">
                Coordination means we handle the friction. You just get the results.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {differentiators.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 rounded-[1.25rem] bg-foreground/[0.02] border border-border hover:border-primary/30 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center mb-4 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                  {item.icon}
                </div>
                
                <h3 className="text-sm font-black text-foreground relative z-10 leading-tight">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 text-sm font-bold text-foreground/40 italic"
          >
            {t('home.diff.footer')}
          </motion.p>

          {/* Visual Showcase Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 md:p-12 rounded-[2rem] bg-foreground/5 border border-border relative overflow-hidden group"
          >
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Home Interior"
                className="w-full h-full object-cover opacity-10 group-hover:scale-105 transition-transform duration-1000"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[0.65rem] font-black text-primary uppercase tracking-widest mb-6">
                <Sparkles size={12} />
                The Sahli Standard
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Everything coordinated, <br className="hidden md:block" /> nothing left to chance.</h3>
              <p className="text-foreground/60 mb-8 max-w-lg">
                We don't just give you a list of numbers. we coordinate with the company, ensure they have the details, and follow up until the job is done.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
                  <CheckCircle2 size={16} className="text-primary" />
                  Direct WhatsApp access
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
                  <CheckCircle2 size={16} className="text-primary" />
                  Vetted provider network
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-foreground/80">
                  <CheckCircle2 size={16} className="text-primary" />
                  Post-service quality check
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. STANDARDS Section - Enhanced Design */}
      <section className="section-spacing relative overflow-hidden bg-background border-b border-border">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[0.65rem] font-black text-primary uppercase tracking-widest mb-6">
                <ShieldCheck size={12} />
                {t('home.standards.label')}
              </div>
              <h2 className="text-display mb-6">
                {t('home.standards.title')}
              </h2>
              <p className="text-subtitle !text-foreground/70 max-w-2xl">
                {t('home.standards.subtitle')}
              </p>
            </motion.div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { id: 1, icon: <Building2 size={24} /> },
              { id: 2, icon: <Wrench size={24} /> },
              { id: 3, icon: <PhoneOff size={24} /> },
              { id: 4, icon: <Clock size={24} /> },
              { id: 5, icon: <ShieldCheck size={24} /> }
            ].map((standard, index) => (
              <motion.div 
                key={standard.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 md:p-8 rounded-2xl border border-border bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-500 flex flex-col items-start w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.02] rounded-2xl transition-colors duration-500" />
                
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/10">
                  {standard.icon}
                </div>
                
                <h3 className="text-xl font-black mb-3 text-foreground group-hover:text-primary transition-colors">
                  {t(`home.standards.item${standard.id}` as any)}
                </h3>
                
                <p className="text-sm text-foreground/60 leading-relaxed font-medium">
                  {t(`home.standards.item${standard.id}.desc` as any)}
                </p>

                {/* Decorative corner element */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COVERAGE - Visually Enhanced */}
      <section className="section-spacing relative overflow-hidden bg-background border-b border-border min-h-[50vh] flex items-center">
        {/* Background image of Qatar/Doha with strong overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/Services/Qatar West Bay.jpg" 
            alt="Doha Qatar Skyline"
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
                  Nationwide Service
                </div>
                <h2 className="text-display mb-6">
                  {t('home.coverage.title')}
                </h2>
                <p className="text-subtitle !text-foreground/70 mb-8 max-w-md">
                  {t('home.coverage.desc')}
                </p>
                
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {t('home.coverage.cities').split(' • ').map((city, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-xs md:text-sm font-black text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                    >
                      {city}
                    </motion.span>
                  ))}
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
                    alt="Qatar Modern Architecture"
                    className="w-full h-full object-cover opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-slate-950/60 to-transparent">
                    <h4 className="text-lg font-black text-white mb-2">Coordination Hub</h4>
                    <p className="text-xs text-white/70">Connecting you with verified providers across the peninsula.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. CLARITY (Important to Know) */}
      <section className="section-spacing bg-background border-b border-border">
        <div className="container-sahli">
          <div className="max-w-3xl mb-12">
            <motion.h2 
              className="text-display mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.clarity.title')}
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
                className="flex items-start gap-3 md:gap-3.5 p-4 md:p-5 rounded-[1.25rem] bg-foreground/[0.03] border border-border group hover:bg-foreground/[0.05] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <span className="font-black text-xs">{item}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-black text-foreground">{t(`home.clarity.item${item}` as any)}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] to-transparent" />
        <div className="container-sahli text-center relative z-10">
          <motion.div
            className="max-w-3xl mx-auto p-8 md:p-12 rounded-[1.5rem] glass-morphism border border-primary/20 shadow-2xl shadow-primary/5"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-black mb-4 text-foreground leading-tight">
              {t('home.final.title')}
            </h2>
            <p className="text-base md:text-lg font-bold text-foreground/60 mb-8">
              {t('home.final.subtitle')}
            </p>
            
            <div className="flex justify-center">
              <a 
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Final CTA')}
                className="cta-primary btn-shine group"
              >
                <div className="flex items-center gap-2.5">
                  <Send size="20" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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


