import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CheckCircle2, Heart, ShieldCheck, UserCheck, Activity, MessageCircle } from 'lucide-react';

import { WHATSAPP_LINK } from '@/lib/constants';

export default function CareChildcare() {
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

  const categories = [
    { title: t('services.care.doctor.title'), desc: t('services.care.doctor.desc') },
    { title: t('services.care.nursing.title'), desc: t('services.care.nursing.desc') },
    { title: t('services.care.newborn.title'), desc: t('services.care.newborn.desc') },
    { title: t('services.care.elderly.title'), desc: t('services.care.elderly.desc') },
    { title: t('services.care.childcare.title'), desc: t('services.care.childcare.desc') }
  ];

  const coordinationSteps = [
    { title: t('home.flow.step1.title'), body: t('home.flow.step1.body') },
    { title: t('home.flow.step2.title'), body: t('home.flow.step2.body') },
    { title: t('home.flow.step3.title'), body: t('home.flow.step3.body') },
    { title: t('home.flow.step4.title'), body: t('home.flow.step4.body') }
  ];

  return (
    <Layout>
      {/* 1️⃣ Page Header */}
      <section ref={containerRef} className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            className="w-full h-full object-cover opacity-[0.08] grayscale"
          >
            <source src="https://videos.pexels.com/video-files/4549414/4549414-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <img 
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&fm=webp&fit=crop" 
              alt="Care and Childcare" 
              crossOrigin="anonymous"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
        <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] mix-blend-screen animate-pulse-slow`} />
        
        <div className="container-sahli relative z-10 pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase mb-8">
              {t('services.status.soon')}
            </div>

            <h1 className="text-foreground text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-8">
              {t('services.care.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 font-medium mb-4 leading-tight">
              {t('services.care.body')}
            </p>
            
            <p className="text-sm md:text-base text-foreground/40 font-medium mb-10">
              {t('services.role.clarification')}
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-primary inline-flex items-center gap-4 opacity-50 cursor-not-allowed"
            >
              <MessageCircle size={20} className="fill-primary-foreground" />
              {t('services.status.soon')} (Notify me)
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="bg-background py-12 border-y border-border">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-[2rem] p-8 md:p-10"
          >
            <h3 className="text-[10px] font-black tracking-[0.3em] mb-8 text-primary uppercase">
              {t('services.rules.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                t('services.rules.care'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-bold text-foreground/70">{rule}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Service Categories */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/20 transition-all duration-500"
              >
                <h3 className="text-xl font-black text-foreground mb-4">{cat.title}</h3>
                <p className="text-foreground/60 leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ How Coordination Works (Service-Specific) */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter mb-4">
              {t('how.flow.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {coordinationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-primary font-black mb-4">{step.title}</div>
                <p className="text-foreground/60 font-medium leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-primary/[0.03] border border-primary/10"
            >
              <h3 className="text-lg font-black text-primary mb-6 uppercase tracking-wider">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4">
                {[
                  t('home.hero.label'),
                  t('services.rules.care')
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center text-foreground/70 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-foreground/[0.02] border border-border"
            >
              <h3 className="text-lg font-black text-foreground/40 mb-6 uppercase tracking-wider">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-foreground/40 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Final CTA */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter mb-6">
              {t('cta.final.title')}
            </h2>
            <p className="text-xl text-foreground/60 font-medium mb-12">
              Tell us what you need. We'll notify you when this service domain goes live.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-primary px-12 py-6 text-lg opacity-50 cursor-not-allowed"
            >
              Notify me
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7️⃣ Micro-Legal Clarity */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container-sahli text-center">
          <p className="text-[10px] md:text-xs text-foreground/30 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
            {t('services.microLegal')}
          </p>
        </div>
      </footer>
    </Layout>
  );
}
