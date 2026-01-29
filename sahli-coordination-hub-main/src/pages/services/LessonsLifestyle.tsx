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
            <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <img 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" 
              alt="Lessons and Lifestyle" 
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
        <div className="container-sahli relative z-10 pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em]">{t('services.status.soon')}</span>
            </div>

            <span className="text-primary font-black tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 block">
              {t('nav.services')} / {t('services.lessons.title')}
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-6">
              {t('services.lessons.title')}
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 font-bold mb-8 max-w-2xl">
              {t('services.lessons.body')}
            </p>

            <div className="text-xs md:text-sm text-foreground/40 font-bold uppercase tracking-widest mb-10">
              {t('services.role.clarification')}
            </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              t('services.rules.lessons'),
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
        </div>
      </section>

      {/* 3️⃣ Service Categories */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lifestyleServices.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-foreground/[0.02] border border-border group hover:border-primary/20 transition-all duration-500"
              >
                <h3 className="text-xl font-black mb-6 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs">
                    0{idx + 1}
                  </span>
                  {category.title}
                </h3>
                <ul className="space-y-4">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base text-foreground/60 font-bold leading-tight">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Relationship-based matching note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4 items-center max-w-3xl mx-auto"
          >
            <Info className="text-primary shrink-0" size={24} />
            <p className="text-sm md:text-base font-bold text-primary/80">
              {t('services.lessons.rule')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ How Coordination Works (Service-Specific) */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-12 text-center">
            {t('how.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", text: t('how.flow.step1.title') },
              { step: "02", text: t('services.flow.provider') },
              { step: "03", text: t('services.flow.visit') },
              { step: "04", text: t('how.flow.step3.title') }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-4xl font-black text-primary/10 mb-4">{item.step}</div>
                <p className="font-bold text-foreground/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-widest text-primary">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4">
                {[
                  t('services.boundary.is.item1'),
                  t('services.boundary.is.item2'),
                  t('services.boundary.is.item3')
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center font-bold text-foreground/70">
                    <CheckCircle2 size={18} className="text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-widest text-foreground/40">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4">
                {[
                  t('services.boundary.not.item1'),
                  t('services.boundary.not.item2'),
                  t('services.boundary.not.item3')
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center font-bold text-foreground/40">
                    <div className="w-4 h-4 rounded-full border-2 border-foreground/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Final CTA */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
            {t('cta.final.title')}
          </h2>
          <p className="text-xl text-foreground/60 font-bold mb-12 max-w-2xl mx-auto">
            Tell us what you need. We'll notify you when this service domain goes live.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-primary px-12 py-6 text-lg opacity-50 cursor-not-allowed"
          >
            Notify me
          </motion.div>
        </div>
      </section>

      {/* 7️⃣ Micro-Legal Clarity */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container-sahli">
          <p className="text-xs md:text-sm text-foreground/40 font-bold text-center leading-relaxed max-w-3xl mx-auto">
            {t('services.footer.micro')}
          </p>
        </div>
      </footer>
    </Layout>
  );
}
