import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, Search, ShieldCheck, CheckCircle2, HeartHandshake, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function SystemDiagram() {
  const { t, dir } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const glowTop = useTransform(pathLength, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      title: t('home.what.step1.title'),
      description: t('home.what.step1.body'),
      icon: <MessageCircle size={28} />,
      color: 'from-primary/20 to-foreground/5',
      accent: 'text-primary',
      imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1200&fm=webp&fit=crop'
    },
    {
      title: t('home.what.step2.title'),
      description: t('home.what.step2.body'),
      icon: <Share2 size={28} />,
      color: 'from-primary/20 to-foreground/5',
      accent: 'text-primary',
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1200&fm=webp&fit=crop'
    },
    {
      title: t('home.what.step3.title'),
      description: t('home.what.step3.body'),
      icon: <ShieldCheck size={28} />,
      color: 'from-primary/20 to-foreground/5',
      accent: 'text-primary',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&fm=webp&fit=crop'
    },
    {
      title: t('home.what.step4.title'),
      description: t('home.what.step4.body'),
      icon: <HeartHandshake size={28} />,
      color: 'from-primary/20 to-foreground/5',
      accent: 'text-primary',
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1200&fm=webp&fit=crop'
    },
    {
      title: t('home.what.step5.title'),
      description: t('home.what.step5.body'),
      icon: <CheckCircle2 size={28} />,
      color: 'from-primary/20 to-foreground/5',
      accent: 'text-primary',
      imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=1200&fm=webp&fit=crop'
    }
  ];

  const isRtl = dir === 'rtl';

  return (
    <div ref={containerRef} className="container-sahli py-12 md:py-32 relative" style={{ position: 'relative' }} dir={dir}>
      {/* Background Decorative Line - Animated Path */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-border hidden lg:block -translate-x-1/2">
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-primary origin-top"
          style={{ height: "100%", scaleY: pathLength }}
        />
        
        {/* Animated Glow Logo */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center"
          style={{ top: glowTop }}
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
          <img 
            src="/logos/SahlLogo9.png" 
            alt="" 
            className="w-5 h-5 object-contain relative z-10" 
          />
        </motion.div>
      </div>
      
      <div className="flex flex-col gap-12 md:gap-24 relative">
        {steps.map((step: { title: string; description: string; icon: React.ReactNode; color: string; accent: string; imageUrl: string }, index: number) => {
          // Adjust logic for RTL: even items are on the right in LTR, left in RTL
          const isEven = index % 2 === 0;
          const contentOnRight = isRtl ? !isEven : isEven;
          
          return (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-20 ${contentOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              initial={{ opacity: 0, x: contentOnRight ? (isRtl ? -50 : 50) : (isRtl ? 50 : -50) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onViewportEnter={() => setActiveStep(index)}
            >
              {/* Content Side */}
              <div className={`flex-1 w-full ${contentOnRight ? (isRtl ? 'lg:text-left' : 'lg:text-right') : (isRtl ? 'lg:text-right' : 'lg:text-left')} text-center`}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-block p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-foreground/[0.02] border border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] hover:shadow-[0_48px_80px_-24px_rgba(var(--primary-rgb),0.15)] transition-all duration-700 group relative overflow-hidden glass-card`}
                >
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <img 
                      src={step.imageUrl} 
                      alt="" 
                      crossOrigin="anonymous"
                      loading="lazy"
                      className="w-full h-full object-cover opacity-[0.03] grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-[0.07]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-transparent" />
                  </div>

                  {/* Step Number Background */}
                  <div className={`absolute -top-8 md:-top-12 ${isRtl ? '-left-8 md:-left-12' : '-right-8 md:-right-12'} text-[100px] md:text-[140px] font-black text-primary/[0.03] select-none group-hover:text-primary/[0.07] transition-all duration-700 z-0`}>
                    {index + 1}
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block px-5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] md:text-xs font-black tracking-[0.4em] uppercase mb-8 md:mb-10 border border-primary/20">
                      {t('nav.howItWorks')} {index + 1}
                    </span>
                    <div className={`flex flex-col ${contentOnRight ? (isRtl ? 'lg:items-start' : 'lg:items-end') : (isRtl ? 'lg:items-end' : 'lg:items-start')} items-center gap-8 mb-8`}>
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.color} border border-border flex items-center justify-center ${step.accent} shadow-2xl group-hover:rotate-6 transition-all duration-700 group-hover:scale-110 glow-red`}>
                        {step.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground leading-tight">{step.title}</h3>
                    </div>
                    <p className="text-base md:text-xl text-foreground/85 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0 text-pretty">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Center Icon Side - Desktop Only */}
              <div className="hidden lg:flex flex-shrink-0 w-24 h-24 rounded-full bg-background border-4 border-border items-center justify-center z-10 relative">
                <motion.div
                  animate={{ 
                    scale: activeStep === index ? [1, 1.2, 1] : 1,
                    backgroundColor: activeStep === index ? 'hsla(var(--primary), 1)' : 'hsla(var(--primary), 0.1)',
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${activeStep === index ? 'text-primary-foreground shadow-[0_0_30px_hsla(var(--primary),0.5)]' : 'text-primary'}`}
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Empty Side for balance */}
              <div className="flex-1 hidden lg:block" />
            </motion.div>
          );
        })}
      </div>

      {/* Closing Statement */}
      <motion.div 
        className="mt-24 md:mt-48 text-center max-w-2xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/30 mb-8">
          <HeartHandshake />
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{t('home.inspection.title')}</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground mb-4">
          {t('home.inspection.title')}
        </h3>
        <p className="text-lg md:text-xl text-foreground/60 font-medium leading-relaxed">
          {t('home.inspection.body')}
        </p>
      </motion.div>
    </div>
  );
}
