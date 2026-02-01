import React, { useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, ShieldCheck, Search, Heart, Zap, Shield, Repeat, ArrowRight, CheckCircle2, Headphones, ClipboardList, Star } from 'lucide-react';
import { WHATSAPP_LINK } from '@/lib/constants';

const HowItWorks = () => {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effects for hero
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  return (
    <Layout>
      {/* Hero Section - Redesigned to be Advanced and Compact */}
      <section ref={containerRef} className="relative min-h-screen md:min-h-[90svh] flex flex-col justify-center overflow-hidden bg-background">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              opacity: opacity
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover opacity-20 grayscale scale-110"
            >
              <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          
          {/* Floating Blobs */}
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] animate-pulse-slow" />
        </div>

        <div className="container-sahli relative z-10 pt-24 md:pt-28 pb-12 md:pb-10 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-black tracking-widest uppercase mb-6 btn-shine mx-auto md:mx-0"
          >
            <Zap size={14} />
            {t('how.hero.label')}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.85] max-w-4xl mb-8">
            {t('how.hero.title').split(' ').map((word: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl font-medium leading-relaxed mb-8"
          >
            {t('how.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Coordination Phases: Before / During / After */}
      <section className="relative py-12 md:py-16 bg-background overflow-hidden border-b border-border/50">
        <div className="container-sahli relative z-10">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-none text-center">
              {t('how.flow.title')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Phase 1: Before Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col p-8 rounded-[2rem] bg-foreground/5 border border-border relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Headphones size={80} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="font-black text-lg">01</span>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-foreground uppercase group-hover:text-primary transition-colors">{t('how.phase1.title')}</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase1.item1')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase1.item2')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase1.item3')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phase 2: During Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col p-8 rounded-[2rem] bg-foreground/[0.02] border border-border relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ClipboardList size={80} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="font-black text-lg">02</span>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-foreground uppercase group-hover:text-primary transition-colors">{t('how.phase2.title')}</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase2.item1')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase2.item2')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase2.item3')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phase 3: After Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col p-8 rounded-[2rem] bg-foreground/5 border border-border relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Star size={80} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <span className="font-black text-lg">03</span>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight text-foreground uppercase group-hover:text-primary transition-colors">{t('how.phase3.title')}</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase3.item1')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase3.item2')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-foreground/70 text-sm font-medium">{t('how.phase3.item3')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important to Know - CORE POSITIONING */}
      <section className="section-spacing relative bg-background overflow-hidden border-b border-border/50">
        <div className="container-sahli relative z-10">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-none text-center">
              {t('home.important.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.05 }}
                className="flex items-start gap-3 p-5 rounded-2xl bg-foreground/[0.03] border border-border"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 flex-shrink-0">
                  <Shield size={12} className="fill-primary/20" />
                </div>
                <p className="text-sm font-bold text-foreground/80 leading-snug">
                  {t(`home.important.item${item}` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Principles - Compact Grid */}
      <section className="relative py-12 md:py-16 bg-background overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="glass-morphism rounded-3xl p-8 border border-border hover:border-primary/20 transition-all duration-500"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-black mb-4 tracking-tighter text-foreground uppercase">{t('how.execution.title')}</h3>
              <p className="text-foreground/70 leading-relaxed font-medium text-sm">
                {t('how.execution.body')}
              </p>
            </motion.div>
            <motion.div 
              className="glass-morphism rounded-3xl p-8 border border-border hover:border-primary/20 transition-all duration-500"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-black mb-4 tracking-tighter text-foreground uppercase">{t('how.network.title')}</h3>
              <p className="text-foreground/70 leading-relaxed font-medium text-sm">
                {t('how.network.body')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Final CTA - Contextual - Very Compact */}
      <section className="section-spacing bg-background relative overflow-hidden border-t border-border/50">
        <div className="absolute inset-0 z-0 opacity-[0.03] grayscale">
          <video autoPlay loop muted playsInline crossOrigin="anonymous" className="w-full h-full object-cover">
            <source src="https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container-sahli text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6 text-foreground">
              {t('cta.final.title')}
            </h2>
            <p className="text-base text-foreground/60 mb-8 font-medium">
              {t('cta.final.body')}
            </p>
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-base shadow-xl shadow-primary/20 hover:scale-105 transition-transform btn-shine"
              whileHover={{ y: -3 }}
            >
              <MessageCircle size={20} />
              {t('cta.final.cta')}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

export default HowItWorks;
