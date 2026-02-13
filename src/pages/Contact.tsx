import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageSquare, Mail, Clock, ShieldCheck, Globe } from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

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
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), springConfig);

  const splitWords = (text: string) => text.split(' ');

  const contactMethods: ContactMethod[] = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: t('cta.request'),
      value: t('contact.whatsapp.value'),
      link: getWhatsAppLink(t('cta.whatsapp.general')),
      primary: true,
      isInternal: false
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
      {/* 1️⃣ Hero Section - Consistent with Homepage */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y, scale }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-[75%_center] md:object-center scale-105"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-customer-service-representative-working-at-a-computer-4540-large.mp4" type="video/mp4" />
            </video>
            
            {/* Overlays removed as per user request */}
            <div className="absolute inset-0 bg-slate-950/40 z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-0" />
          </motion.div>
        </div>

        <div className="container-sahli relative z-10 pt-32 pb-12 md:pb-24 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center md:items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-primary/20 rounded-full border border-primary/30 text-[10px] font-black uppercase tracking-widest mb-3 shadow-lg btn-shine mx-auto md:mx-0">
              <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain" />
              {t('nav.contact')}
            </div>

            <h1 className="text-foreground text-display-sm mb-2 md:mb-3 w-full text-center md:text-start">
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
                  className="inline-block me-[0.15em] origin-bottom"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <p className="text-[0.85rem] md:text-sm text-foreground/60 mb-4 max-w-2xl leading-relaxed">
              {t('contact.primary')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto md:mx-0">
              {contactMethods.map((method: ContactMethod, i: number) => {
                const Content = (
                  <>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${
                      method.primary ? 'bg-white/20' : 'bg-primary/10 text-primary'
                    }`}>
                      {React.cloneElement(method.icon as React.ReactElement, { className: "w-4 h-4" })}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                      method.primary ? 'text-white/60' : 'text-primary'
                    }`}>
                      {method.title}
                    </div>
                    <div className={`text-[0.8rem] font-medium ${
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
                      className={`group relative p-4 rounded-2xl transition-all duration-500 overflow-hidden ${
                        method.primary 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 btn-shine' 
                        : 'bg-foreground/[0.03] border border-border hover:border-primary/30'
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        whileHover={{ y: -3, scale: 1.01 }}
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
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative p-4 rounded-2xl transition-all duration-500 overflow-hidden ${
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
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary/30 to-transparent relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-primary"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* 2️⃣ Coordination Commitment - Compact */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-2xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-[0.85rem] font-bold text-foreground mb-1">{t('contact.commitment.fast.title')}</h3>
              <p className="text-[0.75rem] text-foreground/60 leading-relaxed">
                {t('contact.commitment.fast.body')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="p-4 rounded-2xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-[0.85rem] font-bold text-foreground mb-1">{t('contact.commitment.verified.title')}</h3>
              <p className="text-[0.75rem] text-foreground/60 leading-relaxed">
                {t('contact.commitment.verified.body')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-2xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-[0.85rem] font-bold text-foreground mb-1">{t('contact.commitment.regional.title')}</h3>
              <p className="text-[0.75rem] text-foreground/60 leading-relaxed">
                {t('contact.commitment.regional.body')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Final CTA - Compact */}
      <section className="py-6 md:py-12 bg-background border-t border-border">
        <div className="container-sahli text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-display-sm mb-2 text-foreground">
              {t('cta.final.title')}
            </h2>
            <p className="text-[0.85rem] md:text-sm text-foreground/60 mb-4 leading-relaxed">
              {t('cta.final.body')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Contact Page - Bottom CTA')}
                className="cta-primary inline-block"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  {t('cta.final.cta')}
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}


