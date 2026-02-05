import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
// Refined Index page with video media replacing 3D hero
import { useLanguage } from '@/contexts/LanguageContext';
import { ServiceRoof } from '@/components/motion/ServiceRoof';
import { TrustPanel, TrustStatement } from '@/components/motion/TrustPanel';
import { InfiniteMarquee } from '@/components/motion/InfiniteMarquee';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageSquare, ArrowRight, Wrench, Sparkles, Truck, Heart, GraduationCap, BookOpen, Shield, Zap, Repeat, UserCheck, Snowflake, Lightbulb, Droplets, Cog, Sofa, Baby, Search, Clock, DollarSign, ShieldCheck, PhoneOff, CheckCircle2, Fingerprint, Target, HeartHandshake, ClipboardList, Leaf, Cpu, Bug, Send } from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { WHATSAPP_LINK } from '@/lib/constants';

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
      imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&fm=webp&fit=crop",
      icon: <Wrench size={32} />,
      path: t('services.homeMaintenance.path'),
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
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&fm=webp&fit=crop",
      icon: <Sparkles size={32} />,
      path: t('services.cleaning.path'),
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
      imageUrl: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=800&fm=webp&fit=crop",
      icon: <Truck size={32} />,
      path: t('services.moving.path'),
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
      imageUrl: "https://images.unsplash.com/photo-1592417817098-8fd3d9ebc4a5?q=80&w=800&fm=webp&fit=crop",
      icon: <Leaf size={32} />,
      path: t('services.outdoor.path'),
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
      imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&fm=webp&fit=crop',
      icon: <Heart size={32} />,
      path: t('services.care.path'),
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
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&fm=webp&fit=crop',
      icon: <Cpu size={32} />,
      path: t('services.electronics.path'),
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
    { title: t('services.homeMaintenance.ac.title'), icon: <Snowflake size={24} />, intent: "AC repair", path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.electrical.title'), icon: <Lightbulb size={24} />, intent: "electrical repair", path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.plumbing.title'), icon: <Droplets size={24} />, intent: "plumbing", path: '/services#home-maintenance' },
    { title: t('services.electronics.repair.title'), icon: <Cog size={24} />, intent: "appliance repair", path: '/services#tech' },
    { title: t('services.cleaning.deep.title'), icon: <Sparkles size={24} />, intent: "home deep cleaning", path: '/services#cleaning' },
    { title: t('services.outdoor.pest.title'), icon: <Bug size={24} />, intent: "pest control", path: '/services#outdoor' },
    { title: t('services.moving.house.title'), icon: <Truck size={24} />, intent: "house shifting", path: '/services#moving' },
    { title: t('services.care.childcare.title'), icon: <Baby size={24} />, intent: "nanny services", path: '/services#care' },
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
      <section ref={containerRef} className="relative min-h-screen md:min-h-[90svh] flex flex-col justify-center overflow-hidden bg-background">
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
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover opacity-20 grayscale scale-110"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-working-in-a-modern-office-4682-large.mp4" type="video/mp4" />
              {/* Fallback image */}
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt="Professional Office Coordination"
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </video>
          </motion.div>
          
          {/* Multi-layered gradients for depth and text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-background via-background/80 to-transparent`} />
          
          {/* Floating Background Blobs - Industrial Premium Style */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[160px] mix-blend-screen animate-pulse-slow`} />
          <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[120px] mix-blend-screen animate-pulse-slow delay-1000`} />
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          style={{ y: y2Spring }}
          className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 h-full bg-gradient-to-${dir === 'rtl' ? 'r' : 'l'} from-primary/[0.08] to-transparent pointer-events-none`} 
        />

        <div className="container-sahli relative z-10 pt-20 md:pt-28 pb-10 md:pb-10 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div 
            className="max-w-7xl xl:max-w-[90%] flex flex-col items-center md:items-start"
            style={{ y: yHero }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-4 px-5 py-2 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-6 md:mb-8 mx-auto md:mx-0 shadow-lg shadow-primary/5 group overflow-hidden relative btn-shine"
            >
              <img 
                src="/logos/SahlLogo9.png" 
                alt="SAHLI Logo" 
                className="w-4 h-4 object-contain" 
              />
              {t('home.hero.label')}
            </motion.div>
            
            <h1 className="mb-6 md:mb-8 text-foreground text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter">
              {t('home.hero.title')}
            </h1>

            <motion.div
              className="mb-6 md:mb-8 max-w-2xl flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xl md:text-2xl text-foreground/90 font-bold mb-4 md:mb-6 tracking-tight">
                {t('home.hero.subtitle')}
              </p>
              
              <p className="text-lg md:text-lg text-foreground/70 mb-8 md:mb-10 leading-relaxed font-medium tracking-tight">
                {t('home.hero.subtext')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/request"
                  onClick={() => trackRequestClick('Hero Section')}
                  className="w-full sm:w-auto px-6 py-4 md:px-8 md:py-4 bg-primary text-primary-foreground rounded-[1.25rem] md:rounded-[1.5rem] font-black text-base md:text-base flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 group btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size="20" className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                    {t('home.hero.cta')}
                  </motion.div>
                </Link>
                
                <Link to="/services" className="w-full sm:w-auto">
                  <motion.button
                    className="w-full sm:w-auto px-6 py-4 md:px-8 md:py-4 bg-foreground/5 backdrop-blur-2xl border border-border text-foreground rounded-[1.25rem] md:rounded-[1.5rem] font-black text-base md:text-base flex items-center justify-center gap-3 hover:bg-foreground/10 transition-all group btn-shine"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('nav.services')}
                    <ArrowRight size="20" className={`md:w-6 md:h-6 ${dir === 'rtl' ? 'rotate-180' : ''} group-hover:translate-x-2 transition-transform`} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator - refined */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 font-black rotate-90 mb-10 origin-center">
            {t('home.hero.scroll')}
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-primary/30 to-transparent relative overflow-hidden">
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

      {/* Marquee Section - Dark */}
      <div className="bg-background border-y border-border">
        <InfiniteMarquee items={marqueeItems} />
      </div>

      {/* Featured Services Section - Common Requests We Coordinate */}
      <section className="section-spacing bg-background relative overflow-hidden pb-0">
        <div className="container-sahli relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <motion.div 
                className="max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-foreground text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-[0.9] tracking-tighter mb-6 md:mb-8">
                  {t('home.featured.title')}
                </h2>
              </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredServices.map((service: { title: string; icon: React.ReactNode; intent: string; path?: string }, index: number) => {
              const content = (
                <>
                  {/* Desktop subtle hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />
                  
                  <div className="relative z-10 text-primary mb-4 transform transition-transform duration-500 group-hover:scale-110">
                    {React.cloneElement(service.icon as React.ReactElement, { strokeWidth: 2 })}
                  </div>
                  <h3 className="relative z-10 text-sm md:text-base font-black tracking-tight text-foreground/90 group-hover:text-primary transition-colors duration-500 leading-tight">
                    {service.title}
                  </h3>
                </>
              );

              const commonProps = {
                className: "group relative h-40 md:h-48 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] glass-morphism border border-border flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden",
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.05 },
                whileHover: { 
                  y: -5,
                  borderColor: "rgba(var(--primary), 0.3)",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)"
                }
              };

              if (service.path) {
                return (
                  <motion.div key={index} {...commonProps}>
                    <Link to={service.path} className="absolute inset-0 z-20" />
                    {content}
                  </motion.div>
                );
              }

              return (
                <Link
                  key={index}
                  to="/request-service"
                  onClick={() => trackRequestClick(`Featured Service: ${service.title}`)}
                  className={commonProps.className}
                >
                  <motion.div
                    className="flex flex-col items-center justify-center h-full w-full"
                    initial={commonProps.initial}
                    whileInView={commonProps.whileInView}
                    viewport={commonProps.viewport}
                    transition={commonProps.transition}
                    whileHover={commonProps.whileHover}
                  >
                    {content}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="flex justify-center mt-12 md:mt-16">
            <Link to="/services">
              <motion.button
                className="px-8 py-4 bg-foreground/5 backdrop-blur-2xl border border-border text-foreground rounded-[1.25rem] md:rounded-[1.5rem] font-black text-sm md:text-base uppercase tracking-widest flex items-center gap-3 hover:bg-foreground/10 transition-all group btn-shine"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('home.featured.viewAll')}
                <ArrowRight size="18" className={`${dir === 'rtl' ? 'rotate-180' : ''} group-hover:translate-x-2 transition-transform`} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* One Roof. Many Needs. Section - Dark & Premium */}
      <section id="services" className="section-spacing bg-background relative overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none`} />
        <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none`} />

        <div className="container-sahli relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-12">
            <div className="max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8"
              >
                <img src="/logos/SahlLogo9.png" alt="" className="w-4 h-4 object-contain" />
                {t('nav.services')}
              </motion.div>
              <motion.div 
                className="max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-foreground text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-[0.9] tracking-tighter mb-6 md:mb-8">
                  {t('home.coordinate.title')}
                </h2>
              </motion.div>
            </div>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-10 xl:gap-12">
            {services.map((service: ServiceItem, index: number) => (
              <ServiceRoof 
                key={index} 
                {...service} 
                index={index} 
                showDescription={true} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Difference & Important Info */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli grid lg:grid-cols-2 gap-12 md:gap-20">
          {/* Difference */}
          <div>
            <motion.h2
              className="text-foreground text-3xl font-black tracking-tighter mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {t('home.diff.title')}
            </motion.h2>
            <div className="space-y-4">
              {[
                t('home.diff.item1'),
                t('home.diff.item2'),
                t('home.diff.item3'),
                t('home.diff.item4'),
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-border group hover:border-primary/30 transition-all duration-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <ArrowRight size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  </div>
                  <span className="font-black text-foreground/80">{item}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-primary font-black uppercase tracking-widest text-xs">
              {t('home.diff.footer')}
            </p>
          </div>

          {/* Important */}
          <div className="p-8 md:p-10 rounded-[2rem] bg-foreground/[0.02] border border-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
            <motion.h2
              className="text-foreground text-3xl font-black tracking-tighter mb-10 relative z-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {t('home.important.title')}
            </motion.h2>
            <div className="space-y-6 relative z-10">
              {[
                t('home.important.item1'),
                t('home.important.item2'),
                t('home.important.item3'),
                t('home.important.item4'),
                t('home.important.item5'),
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-foreground/60 font-medium leading-tight">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Coordination Works Section */}
      <section className="section-spacing bg-background relative overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mb-16">
            <motion.h2 
              className="text-foreground text-3xl md:text-5xl font-black tracking-tighter mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.what.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-foreground/60 font-medium leading-tight max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('home.what.intro')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t('home.what.step1.title'), icon: <MessageSquare size={32} /> },
              { title: t('home.what.step2.title'), icon: <Search size={32} /> },
              { title: t('home.what.step3.title'), icon: <CheckCircle2 size={32} /> },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="p-10 rounded-[2.5rem] bg-foreground/[0.02] border border-border group hover:border-primary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-xl font-black text-foreground/90 group-hover:text-foreground transition-colors leading-tight">
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Standards Section */}
      <section className="relative bg-background overflow-hidden border-t border-border">
        <div className="container-sahli py-20 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-6"
              >
                <img src="/logos/SahlLogo9.png" alt="" className="w-4 h-4 object-contain" />
                {t('nav.trustStandards')}
              </motion.div>
              <motion.h2
                className="text-foreground text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('home.trust.title')}
              </motion.h2>
            </div>
            <motion.p 
              className="text-lg md:text-xl text-foreground/60 font-medium max-w-md leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t('home.trust.body')}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPanels.map((panel: TrustPanel, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col h-full"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-primary/40 font-black text-3xl tracking-tighter">
                    {(i === 0 && t('trust.vetting.number')) ||
                     (i === 1 && t('trust.competency.number')) ||
                     (i === 2 && t('trust.behavioral.number')) ||
                     (i === 3 && t('trust.rules.number'))} <span className="opacity-20">/</span>
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {i === 0 && <Fingerprint size={24} />}
                    {i === 1 && <Target size={24} />}
                    {i === 2 && <HeartHandshake size={24} />}
                    {i === 3 && <ClipboardList size={24} />}
                  </div>
                </div>

                <div className="flex-1 p-8 rounded-[2rem] glass-morphism border border-border group-hover:border-primary/20 transition-all duration-700 flex flex-col">
                  <div className="mb-2 text-[10px] font-bold tracking-widest uppercase text-foreground/40">
                    {t('trust.standard')}
                  </div>
                  <h3 className="text-2xl font-black mb-6 tracking-tight text-foreground leading-none">
                    {panel.title}
                  </h3>
                  
                  <ul className="space-y-3 mt-auto">
                    {panel.items.map((item: { title: string }, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/70 font-bold text-sm leading-tight">
                          {item.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served Section - SEO FIX */}
      <section className="section-spacing bg-background relative overflow-hidden border-t border-border">
        <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none`} />
        
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mb-12 md:mb-16">
            <motion.h2
              className="text-foreground text-3xl sm:text-4xl font-black tracking-tighter mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t('home.areas.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              t('home.areas.item1'),
              t('home.areas.item2'),
              t('home.areas.item3'),
              t('home.areas.item4'),
            ].map((area, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-foreground/[0.02] border border-border flex items-center gap-4 group hover:border-primary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-bold text-foreground/80 group-hover:text-foreground transition-colors">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Dark & Intense */}
      <section className="section-spacing-lg bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.1] grayscale contrast-150">
          <video
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          >
            {/* <source src="https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4" type="video/mp4" /> */}
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background" />
        
        {/* Decorative Blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.05] rounded-full blur-[180px] pointer-events-none" />

        <div className="container-sahli text-center relative z-10">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-12 md:mb-16 text-foreground leading-[0.85]">
              {t('home.cta.final.text')}
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link
                to="/request-service"
                onClick={() => trackRequestClick('Bottom CTA')}
                className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-primary text-primary-foreground rounded-[1.25rem] md:rounded-[1.5rem] font-black text-base md:text-lg flex items-center justify-center gap-4 shadow-3xl shadow-primary/40 group btn-shine"
              >
                <motion.div
                  className="flex items-center gap-4"
                  whileHover={{ y: -10, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare size="24" className="md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
                  {t('home.cta.final.subtext')}
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
