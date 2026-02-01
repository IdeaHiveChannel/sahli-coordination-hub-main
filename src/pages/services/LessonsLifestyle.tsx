import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CheckCircle2, MessageCircle, Info } from 'lucide-react';

import { WHATSAPP_LINK } from '@/lib/constants';

export default function LessonsLifestyle() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const lifestyleServices = [
    { title: t('services.lessons.tutoring.title'), items: t('services.lessons.tutoring.items').split('\n') },
    { title: t('services.lessons.language.title'), items: t('services.lessons.language.items').split('\n') },
    { title: t('services.lessons.exam.title'), items: t('services.lessons.exam.items').split('\n') },
    { title: t('services.lessons.fitness.title'), items: t('services.lessons.training.items').split('\n') },
    { title: t('services.lessons.yoga.title'), items: t('services.lessons.yoga.items').split('\n') },
    { title: t('services.lessons.smarthome.title'), items: t('services.lessons.smarthome.items').split('\n') },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), springConfig);

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
              className="w-full h-full object-cover grayscale opacity-[0.15] scale-110"
            >
              <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
            
            {/* Multi-layered gradients for depth and text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
            <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-background via-background/60 to-transparent`} />
            
            {/* Floating Background Blobs */}
            <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow`} />
            <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[250px] h-[250px] bg-primary/5 rounded-full blur-[80px] animate-pulse-slow delay-1000`} />
          </motion.div>
        </div>
        
        <div className="container-sahli relative z-10 pt-32 md:pt-40 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-lg shadow-primary/5 btn-shine">
              <img src="/logos/Sahl Logo 9.png" alt="" className="w-4 h-4 object-contain" />
              {t('services.status.soon')}
            </div>

            <h1 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter mb-8">
              {t('services.lessons.title').split(' ').map((word: string, i: number) => (
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
              {t('services.role.clarification')}
            </p>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cta-primary inline-flex items-center gap-3 opacity-50 cursor-not-allowed btn-shine shadow-xl shadow-primary/10"
            >
              <MessageCircle size={18} className="fill-primary-foreground" />
              {t('services.status.soon')}
            </motion.div>
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

      {/* 2️⃣ Service Rules Block - Compact */}
      <section className="bg-background py-8 border-y border-border">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-3xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                t('services.rules.lessons'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span className="text-sm font-bold text-foreground/70 leading-snug">{rule}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Service Categories - Compact */}
      <section className="py-16 bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lifestyleServices.map((category: { title: string; items: string[] }, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-3xl bg-foreground/[0.02] border border-border group hover:border-primary/20 transition-all duration-300"
              >
                <h3 className="text-lg font-black mb-4 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px]">
                    0{idx + 1}
                  </span>
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/60 font-medium leading-tight">
                      <div className="w-1 h-1 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-5 rounded-3xl bg-primary/5 border border-primary/10 flex gap-4 items-center max-w-3xl mx-auto"
          >
            <Info className="text-primary shrink-0" size={20} />
            <p className="text-sm font-bold text-primary/80">
              {t('services.lessons.rule')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ How Coordination Works - Compact */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container-sahli text-center md:text-left">
          <h2 className="text-3xl font-black tracking-tighter mb-10 leading-none">
            {t('how.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: "01", text: t('home.what.step1') },
              { step: "02", text: t('home.what.step2') },
              { step: "03", text: t('home.what.step3') },
              { step: "04", text: t('home.what.step4') },
              { step: "05", text: t('home.what.step5') }
            ].map((item: { step: string; text: string }, i: number) => (
              <div key={i} className="relative">
                <div className="text-3xl font-black text-primary/10 mb-2 leading-none">{item.step}</div>
                <p className="text-sm font-bold text-foreground/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block - Compact */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-primary/[0.03] border border-primary/10">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-3">
                {[
                  t('services.boundary.is.item1'),
                  t('services.boundary.is.item2'),
                  t('services.boundary.is.item3')
                ].map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm font-bold text-foreground/70">
                    <CheckCircle2 size={16} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-3xl bg-foreground/[0.02] border border-border">
              <h3 className="text-sm font-black uppercase tracking-widest text-foreground/40 mb-6">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-3">
                {[
                  t('services.boundary.not.item1'),
                  t('services.boundary.not.item2'),
                  t('services.boundary.not.item3')
                ].map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm font-bold text-foreground/40">
                    <div className="w-4 h-4 rounded-full border-2 border-foreground/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-none">
              {t('cta.final.title')}
            </h2>
            <p className="text-lg text-foreground/60 font-medium mb-8 leading-tight">
              {t('services.comingSoon.notify')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-primary px-10 py-4 text-base opacity-50 cursor-not-allowed btn-shine"
            >
              {t('services.comingSoon.btn')}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7️⃣ Micro-Legal Clarity - Compact */}
      <footer className="py-10 bg-background border-t border-border">
        <div className="container-sahli text-center">
          <p className="text-[10px] text-foreground/30 font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
            {t('services.footer.micro')}
          </p>
        </div>
      </footer>
    </Layout>
  );
}
