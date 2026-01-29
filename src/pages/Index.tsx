import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
// Refined Index page with video media replacing 3D hero
import { useLanguage } from '@/contexts/LanguageContext';
import { SystemDiagram } from '@/components/motion/SystemDiagram';
import { ServiceRoof } from '@/components/motion/ServiceRoof';
import { TrustPanel, TrustStatement } from '@/components/motion/TrustPanel';
import { InfiniteMarquee } from '@/components/motion/InfiniteMarquee';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, ArrowRight, Wrench, Sparkles, Truck, Heart, BookOpen, Shield, Zap, Repeat, UserCheck } from 'lucide-react';

import { WHATSAPP_LINK } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/gtag';

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
            "text": "SAHLI follows up after every service. If coordination standards or service quality are not met, we intervene to facilitate a resolution or assign a replacement provider as per our procedural rules."
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
      title: t('services.homeRepair.title'), 
      description: t('services.homeRepair.body'),
      imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&fm=webp&fit=crop",
      path: "/services/home-repair",
      subcategories: [
        t('services.homeRepair.ac.title'),
        t('services.homeRepair.electrical.title'),
        t('services.homeRepair.plumbing.title'),
        t('services.homeRepair.appliances.title'),
        t('services.homeRepair.handyman.title'),
        t('services.homeRepair.pest.title'),
      ]
    },
    { 
      title: t('services.cleaning.title'), 
      description: t('services.cleaning.body'),
      imageUrl: "https://images.unsplash.com/photo-1528740561666-dc2479da08ad?q=80&w=800&fm=webp&fit=crop",
      path: "/services/cleaning",
      subcategories: [
        t('services.cleaning.deep.title'),
        t('services.cleaning.upholstery.title'),
      ]
    },
    { 
      title: t('services.moving.title'), 
      description: t('services.moving.body'),
      imageUrl: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=800&fm=webp&fit=crop",
      path: "/services/moving",
      subcategories: [
        t('services.moving.house.title'),
      ]
    },
    { 
      title: t('services.care.title'), 
      description: t('services.care.body'),
      path: '/services#care-childcare',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&fm=webp&fit=crop',
      icon: <Heart size={32} />,
      status: 'coming-soon' as const,
      subcategories: []
    },
    { 
      title: t('services.lessons.title'), 
      description: t('services.lessons.body'),
      path: '/services#lessons-lifestyle',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&fm=webp&fit=crop',
      icon: <BookOpen size={32} />,
      status: 'coming-soon' as const,
      subcategories: []
    }
  ];

  const marqueeItems = [
    t('home.microTrust.vetted'),
    t('home.microTrust.recorded'),
    t('home.microTrust.coordination'),
    t('home.hero.label'),
  ];

  const trustPanels = [
    {
      title: t('trust.vetting.title'),
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1000&fm=webp&fit=crop',
      videoUrl: 'https://videos.pexels.com/video-files/4491451/4491451-uhd_2560_1440_24fps.mp4',
      items: [
        { title: t('trust.vetting.legal.title'), description: t('trust.vetting.legal.body') },
        { title: t('trust.vetting.competency.title'), description: t('trust.vetting.competency.body') },
        { title: t('trust.vetting.behavioral.title'), description: t('trust.vetting.behavioral.body') },
      ]
    },
    {
      title: t('trust.conduct.title'),
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&fm=webp&fit=crop',
      videoUrl: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
      items: [
        { title: t('trust.conduct.rule1.title'), description: t('trust.conduct.rule1.body') },
        { title: t('trust.conduct.rule2.title'), description: t('trust.conduct.rule2.body') },
        { title: t('trust.conduct.rule3.title'), description: t('trust.conduct.rule3.body') },
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
              <source src="https://videos.pexels.com/video-files/4489749/4489749-uhd_2560_1440_25fps.mp4" type="video/mp4" />
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

        <div className="container-sahli relative z-10 pt-36 md:pt-40 pb-20 md:pb-16 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div 
            className="max-w-7xl xl:max-w-[90%] flex flex-col items-center md:items-start"
            style={{ y: yHero }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-4 px-5 py-2 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-8 mx-auto md:mx-0 shadow-lg shadow-primary/5 group overflow-hidden relative btn-shine"
            >
              <img 
                src="/logos/Sahl Logo.png" 
                alt="" 
                className="w-5 h-5 object-contain" 
              />
              {t('home.hero.label')}
            </motion.div>
            
            <h1 className="mb-10 text-foreground text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter">
              {t('home.hero.title').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.2 + i * 0.08, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block mr-[0.15em] origin-bottom"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="mb-10 max-w-2xl flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg md:text-lg text-foreground/80 mb-12 md:mb-10 leading-relaxed font-medium tracking-tight">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <motion.a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('Hero Section')}
                  className="w-full sm:w-auto px-6 py-4 md:px-8 md:py-4 bg-primary text-primary-foreground rounded-[1.25rem] md:rounded-[1.5rem] font-black text-base md:text-base flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 group btn-shine"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size="20" className="md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
                  {t('home.hero.cta')}
                </motion.a>
                
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
            SCROLL
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
                <img src="/logos/Sahl Logo 7.png" alt="" className="w-4 h-4 object-contain" />
                {t('home.coordinate.title')}
              </motion.div>
              <motion.h2
                className="text-foreground text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-[0.9] tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {t('home.coordinate.title')}
              </motion.h2>
            </div>
            
            <motion.p
              className="text-foreground/60 max-w-sm text-base lg:text-base leading-relaxed font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {t('home.footer.clarity')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-10 xl:gap-12">
            {services.map((service, index) => (
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

      {/* Framing Section - Statement - Dark */}
      <div className="bg-background py-12 md:py-24 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.05),transparent_70%)]" />
        <TrustStatement 
          index={0}
          text={t('home.framing.title')}
        />
        <div className="container-sahli text-center relative z-10 mb-8">
          <p className="text-primary font-black tracking-widest uppercase text-xs mb-4">
            {t('home.framing.subtitle')}
          </p>
        </div>
        <TrustStatement 
          index={1}
          text={t('home.framing.body')}
        />
      </div>

      {/* Why SAHLI - Operating Principles - Dark & Glassmorphic */}
      <section className="relative section-spacing bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-[180px] pointer-events-none`} />

        <div className="container-sahli mb-16 md:mb-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8"
          >
            <img src="/logos/Sahl Logo 7.png" alt="" className="w-4 h-4 object-contain" />
            {t('home.hero.label')}
          </motion.div>
          <motion.h2
            className="text-foreground text-3xl sm:text-4xl md:text-4xl font-black leading-tight tracking-tighter max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home.why.title')}
          </motion.h2>
        </div>
        <div className="container-sahli grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 relative z-10">
          {[
            { 
              title: t('home.why.noDirectories.title'), 
              body: t('home.why.noDirectories.body'),
              icon: <Zap className="text-primary" />
            },
            { 
              title: t('home.why.vetted.title'), 
              body: t('home.why.vetted.body'),
              icon: <Shield className="text-primary" />
            },
            { 
              title: t('home.why.briefed.title'), 
              body: t('home.why.briefed.body'),
              icon: <Repeat className="text-primary" />
            },
            { 
              title: t('home.why.control.title'), 
              body: t('home.why.control.body'),
              icon: <UserCheck className="text-primary" />
            }
          ].map((principle, i) => (
            <motion.div
              key={i}
              className="p-6 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-foreground/[0.02] border border-border group hover:bg-foreground/[0.04] hover:border-primary/30 transition-all duration-700 backdrop-blur-sm btn-shine"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[0.8rem] md:rounded-[1rem] bg-foreground/5 flex items-center justify-center mb-6 md:mb-10 shadow-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                {React.cloneElement(principle.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-lg md:text-lg lg:text-xl font-black mb-4 md:mb-6 tracking-tighter text-foreground leading-none">{principle.title}</h3>
              <p className="text-foreground/50 leading-relaxed font-medium text-sm md:text-base group-hover:text-foreground/80 transition-colors duration-500">{principle.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust & Standards Section */}
      <section className="relative bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute top-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px] pointer-events-none`} />

        <div className="container-sahli py-20 md:py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8"
          >
            <img src="/logos/Sahl Logo 7.png" alt="" className="w-4 h-4 object-contain" />
            {t('trust.label')}
          </motion.div>
          <motion.h2
            className="text-foreground text-3xl md:text-4xl font-black mb-10 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home.trust.title')}
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-foreground/60 max-w-3xl leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('home.trust.body')}
          </motion.p>
        </div>
        
        <div className="space-y-4 md:space-y-6 pb-20 md:pb-24">
          {trustPanels.map((panel, i) => (
            <TrustPanel key={i} {...panel} index={i} />
          ))}
        </div>
      </section>

      {/* System Flow Section - Dark */}
      <section className="section-spacing bg-section-darker relative overflow-hidden">
        {/* Background Decorative Pulses */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[150px] animate-pulse" />
        
        <div className="container-sahli text-center mb-16 relative z-10">
          <motion.span 
            className="text-primary font-black tracking-[0.3em] text-[10px] uppercase mb-4 block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home.flow.title')}
          </motion.span>
          <motion.h2
            className="text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('home.flow.title')}
          </motion.h2>
        </div>
        <SystemDiagram />
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
            <source src="https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4" type="video/mp4" />
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
              {t('cta.final.title').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="inline-block mr-[0.2em]"
                >
                  {word === 'Ready' || word === 'SAHLI' || word === 'جاهزون' || word === 'سهلي' ? <span className="text-primary">{word}</span> : word}
                </motion.span>
              ))}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-foreground/60 mb-12 md:mb-20 max-w-4xl mx-auto leading-relaxed font-medium tracking-tight">
              {t('cta.final.body')}
            </p>

            {/* Micro-FAQ Block */}
            <motion.div 
              className="max-w-2xl mx-auto mb-16 p-8 rounded-[2rem] glass-morphism border border-primary/20 text-start relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-lg font-black mb-4 flex items-center gap-3 text-primary">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">?</span>
                {t('faq.micro.question')}
              </h3>
              <p className="text-foreground/70 leading-relaxed font-medium">
                {t('faq.micro.answer')}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <motion.a
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('Bottom CTA')}
                className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-primary text-primary-foreground rounded-[1.25rem] md:rounded-[1.5rem] font-black text-base md:text-lg flex items-center justify-center gap-4 shadow-3xl shadow-primary/40 group btn-shine"
              >
                <MessageCircle size="24" className="md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
                {t('cta.final.cta')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
