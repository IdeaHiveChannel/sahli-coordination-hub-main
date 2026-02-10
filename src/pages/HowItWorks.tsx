import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageSquare, ShieldCheck, Search, Heart, Zap, Shield, Repeat, ArrowRight, CheckCircle2, Headphones, ClipboardList, Star } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

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
      <section ref={containerRef} className="relative min-h-[40svh] md:min-h-[50svh] flex flex-col justify-center overflow-hidden bg-background">
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
            <img 
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1920&auto=format&fit=crop" 
              alt={t('how.hero.label')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-[75%_center] md:object-center opacity-60 scale-110"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          
          {/* Floating Blobs for homepage design base */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/15 rounded-full blur-[80px] md:blur-[140px] animate-pulse-slow z-0`} />
          <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[200px] h-[200px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow delay-1000 z-0`} />
        </div>

        <div className="container-sahli relative z-10 pt-24 md:pt-14 pb-4 flex flex-col items-center md:items-start">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/20 rounded-full border border-primary/30 text-[9px] font-black uppercase tracking-widest mb-2.5 btn-shine mx-auto md:mx-0"
          >
            <Zap size={9} />
            {t('how.hero.label')}
          </motion.div>

          <h1 className="text-display text-foreground max-w-2xl mb-2.5 md:mb-3 w-full text-center md:text-start">
            {t('how.hero.title').split(' ').map((word: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                className="inline-block me-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[0.85rem] md:text-sm text-foreground/70 max-w-lg mb-3 md:mb-5 leading-relaxed w-full text-center md:text-start"
          >
            {t('how.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Coordination Phases: Before / During / After */}
      <section className="relative py-6 md:py-12 bg-background overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-[100px] md:blur-[160px] animate-pulse-slow z-0`} />
        </div>
        <div className="container-sahli relative z-10">
            <h2 className="text-display text-center mb-6 md:mb-8">
              {t('how.flow.title')}
            </h2>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-5">
            {/* Phase 1: Before Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col p-6 rounded-[2rem] bg-foreground/[0.02] backdrop-blur-md border border-border relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Headphones size={48} />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  <span className="font-black text-xs">01</span>
                </div>
                <h3 className="text-[0.85rem] mb-3 text-foreground uppercase group-hover:text-primary transition-colors font-black tracking-wider">{t('how.phase1.title')}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase1.item1')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase1.item2')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase1.item3')}</p>
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
              className="flex flex-col p-6 rounded-[2rem] bg-foreground/[0.03] backdrop-blur-md border border-border relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <ClipboardList size={48} />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  <span className="font-black text-xs">02</span>
                </div>
                <h3 className="text-[0.85rem] mb-3 text-foreground uppercase group-hover:text-primary transition-colors font-black tracking-wider">{t('how.phase2.title')}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase2.item1')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase2.item2')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase2.item3')}</p>
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
              className="flex flex-col p-6 rounded-[2rem] bg-foreground/[0.02] backdrop-blur-md border border-border relative overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Star size={48} />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  <span className="font-black text-xs">03</span>
                </div>
                <h3 className="text-[0.85rem] mb-3 text-foreground uppercase group-hover:text-primary transition-colors font-black tracking-wider">{t('how.phase3.title')}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase3.item1')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase3.item2')}</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[0.8rem] text-foreground/70 leading-relaxed">{t('how.phase3.item3')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Important to Know - CORE POSITIONING */}
      <section className="py-12 md:py-20 relative bg-background overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow delay-1000 z-0`} />
        </div>
        <div className="container-sahli relative z-10">
          <div className="flex flex-col items-center mb-10 md:mb-16">
            <h2 className="text-display text-center">
              {t('home.clarity.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.05 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-foreground/[0.03] backdrop-blur-md border border-border shadow-lg group hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Shield size={12} className="fill-primary/20" />
                </div>
                <p className="text-[0.85rem] text-foreground/80 leading-relaxed">
                  {t(`home.clarity.item${item}` as TranslationKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Principles - Compact Grid */}
      <section className="relative py-12 md:py-20 bg-background overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div 
              className="bg-foreground/[0.02] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-border hover:border-primary/20 transition-all duration-700 shadow-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 shadow-inner">
                <Zap size={24} />
              </div>
              <h3 className="text-[1rem] font-black mb-4 text-foreground uppercase tracking-wider">{t('how.execution.title')}</h3>
              <p className="text-[0.85rem] text-foreground/70 leading-relaxed">
                {t('how.execution.body')}
              </p>
            </motion.div>
            <motion.div 
              className="bg-foreground/[0.03] backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-border hover:border-primary/20 transition-all duration-700 shadow-2xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 shadow-inner">
                <Search size={24} />
              </div>
              <h3 className="text-[1rem] font-black mb-4 text-foreground uppercase tracking-wider">{t('how.network.title')}</h3>
              <p className="text-[0.85rem] text-foreground/70 leading-relaxed">
                {t('how.network.body')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA - Contextual - Very Compact */}
      <section className="py-16 md:py-28 bg-background relative overflow-hidden border-t border-border/50">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/2 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow z-0`} />
        </div>
        <div className="container-sahli text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-10 shadow-inner">
              <MessageSquare size={32} />
            </div>
            <h2 className="text-display mb-4 md:mb-6">
              {t('cta.final.title')}
            </h2>
            <p className="text-[0.9rem] text-foreground/60 mb-10 md:mb-14 max-w-lg mx-auto leading-relaxed">
              {t('cta.final.body')}
            </p>
            <a
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('How It Works Page')}
              className="cta-primary px-16 py-8 btn-shine shadow-xl shadow-primary/20"
            >
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare size={24} className="fill-primary-foreground" />
                {t('cta.final.cta')}
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

export default HowItWorks;

