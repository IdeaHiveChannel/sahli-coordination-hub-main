import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

import { WHATSAPP_LINK } from '@/lib/constants';

export default function HomeRepair() {
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

  const coordinationSteps = [
    { title: t('home.flow.step1.title'), body: t('home.flow.step1.body') },
    { title: t('home.flow.step2.title'), body: t('home.flow.step2.body') },
    { title: t('home.flow.step3.title'), body: t('home.flow.step3.body') },
    { title: t('home.flow.step4.title'), body: t('home.flow.step4.body') }
  ];

  const categories = [
    { title: t('services.homeRepair.ac.title'), desc: t('services.homeRepair.ac.desc') },
    { title: t('services.homeRepair.electrical.title'), desc: t('services.homeRepair.electrical.desc') },
    { title: t('services.homeRepair.plumbing.title'), desc: t('services.homeRepair.plumbing.desc') },
    { title: t('services.homeRepair.appliances.title'), desc: t('services.homeRepair.appliances.desc') },
    { title: t('services.homeRepair.handyman.title'), desc: t('services.homeRepair.handyman.desc') },
    { title: t('services.homeRepair.pest.title'), desc: t('services.homeRepair.pest.desc') }
  ];

  return (
    <Layout>
      {/* 1️⃣ Page Header - Compact & Advanced */}
      <section ref={containerRef} className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center overflow-hidden bg-background">
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
              className="w-full h-full object-cover grayscale opacity-[0.1] scale-110"
            >
              <source src="https://videos.pexels.com/video-files/4492147/4492147-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          </motion.div>
        </div>
        
        <div className="container-sahli relative z-10 pt-24 md:pt-32 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-black tracking-widest uppercase mb-6 shadow-lg shadow-primary/5">
              <img src="/logos/Sahl Logo 9.png" alt="" className="w-4 h-4 object-contain" />
              {t('services.homeRepair.title')}
            </div>

            <h1 className="text-foreground text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter mb-4">
              {t('services.homeRepair.subtitle')}
            </h1>
            
            <p className="text-sm md:text-base text-foreground/40 font-medium mb-8 max-w-2xl leading-relaxed">
              {t('services.role.clarification')}
            </p>

            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary inline-flex items-center gap-3 btn-shine"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={18} className="fill-primary-foreground" />
              {t('cta.whatsapp')}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block - Compact */}
      <section className="bg-background py-8 md:py-10 border-y border-border">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-2xl p-6"
          >
            <h3 className="text-[10px] font-black tracking-widest mb-6 text-primary uppercase opacity-60">
              {t('services.rules.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-[13px] md:text-sm font-bold text-foreground/70 leading-tight">{rule}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Service Categories - Compact */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat: { title: string; desc: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 md:p-8 rounded-3xl bg-foreground/[0.02] border border-border hover:border-primary/20 transition-all duration-500"
              >
                <h3 className="text-lg md:text-xl font-black text-foreground mb-2 md:mb-3 tracking-tight leading-none">{cat.title}</h3>
                <p className="text-foreground/60 leading-tight text-sm md:text-base font-medium">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ How Coordination Works - Compact */}
      <section className="py-12 md:py-16 bg-background border-t border-border">
        <div className="container-sahli">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter mb-4 leading-none">
              {t('how.flow.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {coordinationSteps.map((step: { title: string; body: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative"
              >
                <div className="text-primary font-black mb-2 text-sm uppercase tracking-widest">{step.title}</div>
                <p className="text-foreground/60 font-medium leading-tight text-sm">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block - Compact */}
      <section className="py-12 md:py-16 bg-background border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 rounded-3xl bg-primary/[0.03] border border-primary/10"
            >
              <h3 className="text-base font-black text-primary mb-6 uppercase tracking-widest leading-none">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-3">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-foreground/70 font-bold text-sm md:text-base leading-none">
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
              className="p-8 rounded-3xl bg-foreground/[0.02] border border-border"
            >
              <h3 className="text-base font-black text-foreground/40 mb-6 uppercase tracking-widest leading-none">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-3">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-foreground/40 font-bold text-sm md:text-base leading-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Final CTA - Compact */}
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="container-sahli text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter mb-4 leading-none">
              {t('cta.final.title')}
            </h2>
            <p className="text-lg text-foreground/60 font-medium mb-8 leading-tight">
              {t('cta.final.body')}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary px-10 py-4 text-base btn-shine"
            >
              {t('cta.whatsapp')}
            </motion.a>
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

