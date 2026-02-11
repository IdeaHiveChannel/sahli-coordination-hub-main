import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, ShieldCheck, Clock, MapPin, AlertCircle } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export default function Plumbing() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();

  // Parallax effects matching homepage
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const yHero = useTransform(scrollY, [0, 500], [0, -100]);

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={20} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={20} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={20} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={20} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={20} /> }
  ];

  const includes = [
    t('services.homeMaintenance.plumbing.items').split('\n')[0] || 'Leak Detection',
    t('services.homeMaintenance.plumbing.items').split('\n')[1] || 'Pipe Repair',
    t('services.homeMaintenance.plumbing.items').split('\n')[2] || 'Fixture Installation',
    t('services.homeMaintenance.plumbing.items').split('\n')[3] || 'Drain Unblocking'
  ];

  const areas = [
    t('home.areas.item1'),
    t('home.areas.item2'),
    t('home.areas.item3')
  ];

  return (
    <Layout>
      {/* 1️⃣ Modern Immersive Hero Section - Aligned with Homepage */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background">
        {/* Background Image with Homepage Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              opacity: opacity
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="https://images.pexels.com/photos/2310913/pexels-photo-2310913.jpeg" 
              alt={t('services.homeMaintenance.plumbing.title')}
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Darker Overlay for better text readability on immersive hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="container-sahli relative z-20 pb-12 md:pb-24">
          <div className="max-w-4xl">
            <motion.div
              style={{ y: yHero }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Service Label */}
              <div className="mb-6 md:mb-8 inline-flex items-center gap-3 px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm md:text-label !text-white font-bold tracking-wide uppercase">
                  {t('services.homeMaintenance.plumbing.title')}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 md:mb-8 font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                {t('services.homeMaintenance.plumbing.title')}
              </h1>

              {/* Description Card - Glassmorphism */}
              <div className="relative mb-8 md:mb-10 group max-w-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent rounded-3xl blur opacity-25" />
                <div className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                  <h3 className="text-xl md:text-2xl mb-4 flex items-center gap-3 font-bold text-white">
                    <AlertCircle className="text-primary-foreground shrink-0" size={28} />
                    {t('services.homeMaintenance.plumbing.desc')}
                  </h3>
                  <p className="text-lg md:text-xl text-white/90 font-medium">
                    {t('services.homeMaintenance.subtitle')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 md:gap-6">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.plumbing.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Plumbing Hero CTA')}
                  className="group relative px-8 md:px-12 py-4 md:py-6 bg-primary text-primary-foreground rounded-2xl font-black text-lg md:text-xl overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-3">
                    <MessageSquare size={24} className="fill-current" />
                    {t('cta.request')}
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"
          style={{ opacity }}
        />
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-background border-y border-border overflow-hidden">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-xl shadow-primary/5"
          >
            <h2 className="text-2xl md:text-display mb-8 md:mb-12 text-center font-black">
              {t('services.homeMaintenance.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4">
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-4 items-start group shrink-0 w-[260px] md:w-auto p-4 md:p-0 rounded-2xl bg-background md:bg-transparent border border-border md:border-0 shadow-sm md:shadow-none">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-sm md:text-label !text-foreground/70 leading-snug group-hover:text-foreground transition-colors duration-500 font-bold">{rule}</span>
                </div>
              ))}
            </Marquee>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Visual Service Features */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl mb-6 md:mb-8 font-black">
              {t('service.v1.includes.title')}
            </h2>
            <p className="text-base md:text-xl !text-foreground/50">{t('services.homeMaintenance.plumbing.title')} {t('nav.cleaningServices')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={24}>
            {includes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="shrink-0 w-[280px] md:w-auto group relative p-8 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-subtitle mb-2 group-hover:text-primary transition-colors font-bold">{item}</h3>
                <div className="w-10 h-1 bg-primary/20 rounded-full group-hover:w-20 transition-all duration-500" />
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ How It Works - Visual Timeline */}
      <section className="section-spacing bg-foreground/[0.02] border-y border-border relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl mb-6 font-black">
              {t('how.flow.title')}
            </h2>
            <p className="text-base md:text-xl !text-foreground/50">{t('how.flow.subtitle')}</p>
          </div>
          
          <Marquee speed={0.4} className="-mx-4 px-4" gap={48}>
            {coordinationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="shrink-0 w-[240px] md:w-auto relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-background border border-border flex items-center justify-center text-primary mb-6 md:mb-8 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs md:text-sm shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                </div>
                <p className="text-sm md:text-lg text-foreground font-black leading-tight tracking-tight px-4">{step.body}</p>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-foreground/[0.02] border border-border flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5"
            >
              <div className="text-3xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-500">100%</div>
              <div className="text-xs md:text-sm font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-500">{t('services.rules.inspection')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-[2rem] bg-foreground/[0.02] border border-border flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5"
            >
              <div className="text-3xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-500">24/7</div>
              <div className="text-xs md:text-sm font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-500">{t('home.what.step3.body')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-[2rem] bg-foreground/[0.02] border border-border flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5"
            >
              <div className="text-3xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-500">0%</div>
              <div className="text-xs md:text-sm font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-500">{t('services.rules.payment')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-[2rem] bg-foreground/[0.02] border border-border flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5"
            >
              <div className="text-3xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-500">5+</div>
              <div className="text-xs md:text-sm font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-500">{t('home.areas.title')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served */}
      <section className="section-spacing bg-foreground/[0.02] border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl mb-6 md:mb-8 font-black">
                {t('home.areas.title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {areas.map((area, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-background border border-border shadow-sm">
                    <MapPin className="text-primary shrink-0" size={20} />
                    <span className="font-bold">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" 
                alt="Qatar Areas Served" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ CTA Section */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">{t('cta.ready')}</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 relative z-10">{t('cta.whatsapp.general')}</p>
            <a
              href={getWhatsAppLink(t('services.homeMaintenance.plumbing.whatsapp'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Plumbing Footer CTA')}
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-primary rounded-2xl font-black text-xl hover:scale-105 transition-transform relative z-10"
            >
              <MessageSquare size={24} className="fill-current" />
              {t('cta.request')}
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
