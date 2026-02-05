import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageSquare, Mail, Clock, ShieldCheck, Globe } from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
  primary: boolean;
  isInternal?: boolean;
}

export default function Contact() {
  const { t, dir } = useLanguage();
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

  const contactMethods: ContactMethod[] = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: t('cta.request'),
      value: t('contact.whatsapp.value'),
      link: "/request-service",
      primary: true,
      isInternal: true
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: t('contact.email.label'),
      value: t('contact.email.value'),
      link: `mailto:${t('contact.email.value')}`,
      primary: false
    }
  ];

  return (
    <Layout>
      {/* 1️⃣ Hero Section - Compact & Advanced */}
      <section ref={containerRef} className="relative min-h-screen md:min-h-[90svh] flex flex-col justify-center overflow-hidden bg-background">
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
              className="w-full h-full object-cover grayscale opacity-[0.15] scale-110"
            >
              {/* <source src="https://videos.pexels.com/video-files/3196611/3196611-uhd_2560_1440_25fps.mp4" type="video/mp4" /> */}
            </video>
            
            {/* Multi-layered gradients for depth and text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
            <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-background via-background/60 to-transparent`} />
            
            {/* Floating Background Blobs */}
            <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow`} />
            <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[250px] h-[250px] bg-primary/5 rounded-full blur-[80px] animate-pulse-slow delay-1000`} />
          </motion.div>
        </div>

        <div className="container-sahli relative z-10 pt-24 md:pt-28 pb-12 md:pb-10 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-lg btn-shine mx-auto md:mx-0">
              <img src="/logos/SahlLogo9.png" alt="" className="w-4 h-4 object-contain" />
              {t('nav.contact')}
            </div>

            <h1 className="text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.85] tracking-tighter mb-8">
              {t('contact.title').split(' ').map((word: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 + i * 0.1, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block mr-[0.15em] origin-bottom"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <p className="text-base md:text-lg text-foreground/60 font-medium mb-10 max-w-2xl leading-relaxed tracking-tight">
              {t('contact.primary')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto md:mx-0">
              {contactMethods.map((method: ContactMethod, i: number) => {
                const Content = (
                  <>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                      method.primary ? 'bg-white/20' : 'bg-primary/10 text-primary'
                    }`}>
                      {React.cloneElement(method.icon as React.ReactElement, { className: "w-6 h-6" })}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${
                      method.primary ? 'text-white/60' : 'text-primary'
                    }`}>
                      {method.title}
                    </div>
                    <div className={`text-base md:text-lg font-black tracking-tight ${
                      method.primary ? 'text-white' : 'text-foreground/90'
                    }`}>
                      {method.value}
                    </div>
                  </>
                );

                if (method.isInternal) {
                  return (
                    <Link
                      key={i}
                      to={method.link}
                      onClick={() => trackRequestClick('Contact Page - Primary')}
                      className={`group relative p-5 rounded-3xl transition-all duration-500 overflow-hidden ${
                        method.primary 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 btn-shine' 
                        : 'bg-foreground/[0.03] border border-border hover:border-primary/30'
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {Content}
                      </motion.div>
                    </Link>
                  );
                }

                return (
                  <motion.a
                    key={i}
                    href={method.link}
                    target={method.primary ? "_blank" : undefined}
                    rel={method.primary ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative p-5 rounded-3xl transition-all duration-500 overflow-hidden ${
                      method.primary 
                      ? 'bg-primary text-white shadow-xl shadow-primary/20 btn-shine' 
                      : 'bg-foreground/[0.03] border border-border hover:border-primary/30'
                    }`}
                  >
                    {Content}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary/30 to-transparent relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* 2️⃣ Coordination Commitment - Compact */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-foreground mb-2">{t('contact.commitment.fast.title')}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed font-medium">
                {t('contact.commitment.fast.body')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="p-6 rounded-3xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-foreground mb-2">{t('contact.commitment.verified.title')}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed font-medium">
                {t('contact.commitment.verified.body')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-3xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-foreground mb-2">{t('contact.commitment.regional.title')}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed font-medium">
                {t('contact.commitment.regional.body')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Final CTA - Compact */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 leading-none">
              {t('cta.final.title')}
            </h2>
            <p className="text-lg text-foreground/60 font-medium mb-8 leading-tight">
              {t('cta.final.body')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/request-service"
                onClick={() => trackRequestClick('Contact Page - Bottom CTA')}
                className="cta-primary px-10 py-4 text-base inline-block"
              >
                {t('cta.final.cta')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

