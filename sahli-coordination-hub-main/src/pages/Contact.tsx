import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, Mail, Clock, ShieldCheck, Globe, Instagram, Facebook } from 'lucide-react';

import { WHATSAPP_LINK, INSTAGRAM_LINK, FACEBOOK_LINK } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/gtag';

export default function Contact() {
  const { t, lang, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), springConfig);

  const splitWords = (text: string) => text.split(' ');

  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t('cta.whatsapp'),
      value: '+966 50 000 0000',
      link: WHATSAPP_LINK,
      primary: true
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t('contact.email.label'),
      value: t('contact.email.value'),
      link: `mailto:${t('contact.email.value')}`,
      primary: false
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: 'Instagram',
      value: '@sahliqatar',
      link: INSTAGRAM_LINK,
      primary: false
    },
    {
      icon: <Facebook className="w-8 h-8" />,
      title: 'Facebook',
      value: 'Sahli Qatar',
      link: FACEBOOK_LINK,
      primary: false
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-background">
        {/* Floating Background Blobs */}
        <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[140px] mix-blend-screen animate-pulse-slow`} />
        <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary/5 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen animate-pulse-slow delay-1000`} />
        
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y, scale, opacity }}
            className="absolute inset-0"
          >
            <video
          autoPlay
          loop
          muted
          playsInline
          crossOrigin="anonymous"
          className="w-full h-full object-cover opacity-[0.05] grayscale"
        >
          <source src="https://videos.pexels.com/video-files/3196611/3196611-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
            alt="Contact Support" 
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
        </video>
            <div className={`absolute inset-0 bg-gradient-to-r ${dir === 'rtl' ? 'from-primary/10 via-transparent to-transparent' : 'from-transparent via-transparent to-primary/10'} mix-blend-overlay opacity-30`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.05),transparent_70%)]" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="container-sahli relative z-10 pt-32 md:pt-24">
          <div className="max-w-6xl xl:max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6 md:mb-8"
            >
              <div className="h-[1px] w-12 bg-primary/50" />
              <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">
                {t('nav.contact')}
              </span>
            </motion.div>
            
            <h1 className="mb-8 md:mb-10 text-foreground text-3xl sm:text-3xl md:text-3xl lg:text-3xl font-black leading-[0.95] md:leading-[0.9] tracking-tighter flex flex-wrap gap-x-4 md:gap-x-6">
              {splitWords(t('contact.title')).map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.2 + i * 0.1, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block origin-bottom py-2"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-foreground/60 mb-10 md:mb-12 max-w-2xl leading-relaxed font-medium"
            >
              {t('contact.primary')}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-7xl">
              {contactMethods.map((method, i) => (
                <motion.a
                  key={i}
                  href={method.link}
                  target={method.primary ? "_blank" : undefined}
                  rel={method.primary ? "noopener noreferrer" : undefined}
                  onClick={() => method.primary && trackWhatsAppClick('Contact Page - Primary')}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative p-5 md:p-6 rounded-xl md:rounded-2xl transition-all duration-700 overflow-hidden ${
                    method.primary 
                    ? 'bg-primary text-white hover:scale-[1.02] shadow-2xl shadow-primary/20' 
                    : 'bg-foreground/[0.03] border border-border hover:border-primary/30'
                  }`}
                >
                  {method.primary && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  )}
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-5 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                    method.primary ? 'bg-white/20' : 'bg-primary/10 text-primary'
                  }`}>
                    {React.cloneElement(method.icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${
                    method.primary ? 'text-white/60' : 'text-primary'
                  }`}>
                    {method.title}
                  </div>
                  <div className={`text-lg md:text-xl font-black tracking-tight ${
                    method.primary ? 'text-white' : 'text-foreground/90 group-hover:text-foreground'
                  }`}>
                    {method.value}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coordination Commitment */}
      <section className="section-spacing bg-background relative overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 md:p-6 rounded-xl md:rounded-2xl glass-morphism border border-border flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Clock className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-foreground mb-3 md:mb-4">{t('contact.commitment.fast.title')}</h3>
              <p className="text-xs md:text-sm text-foreground/60 leading-relaxed font-medium">
                {t('contact.commitment.fast.body')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-5 md:p-6 rounded-xl md:rounded-2xl glass-morphism border border-border flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-foreground mb-3 md:mb-4">{t('contact.commitment.verified.title')}</h3>
              <p className="text-xs md:text-sm text-foreground/60 leading-relaxed font-medium">
                {t('contact.commitment.verified.body')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 md:p-6 rounded-xl md:rounded-2xl glass-morphism border border-border flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Globe className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-foreground mb-3 md:mb-4">{t('contact.commitment.regional.title')}</h3>
              <p className="text-xs md:text-sm text-foreground/60 leading-relaxed font-medium">
                {t('contact.commitment.regional.body')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto p-5 md:p-8 rounded-xl md:rounded-2xl bg-foreground/[0.02] border border-border relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <h2 className="text-foreground mb-6 md:mb-8 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black tracking-tighter leading-none">
              {t('cta.final.title')}
            </h2>
            <p className="text-base md:text-lg text-foreground/60 mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
              {t('cta.final.body')}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('Contact Page - Bottom CTA')}
              className="cta-primary px-8 py-4 md:px-10 md:py-4 text-base md:text-base"
            >
              {t('cta.whatsapp')}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

