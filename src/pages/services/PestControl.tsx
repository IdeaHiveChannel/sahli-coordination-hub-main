import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Bug, ShieldCheck, Clock, MapPin, Shield, ArrowUp } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function PestControl() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // Parallax effects matching homepage
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const yHero = useTransform(scrollY, [0, 500], [0, -100]);

  const relatedServices = [
    { title: t('services.outdoor.title'), path: '/services#outdoor' },
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.moving.title'), path: t('services.moving.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  return (
    <Layout>
      {/* 1️⃣ Modern Immersive Hero Section */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="/Services/Pest Control.jpg" 
              alt="Pest Control Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/20 z-0" />
        </div>
        
        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-16 flex flex-col items-center md:items-start">
          <motion.div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start"
            style={{ y: yHero }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-xs font-black tracking-[0.2em] uppercase text-primary mb-4 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <Bug size={16} className="animate-pulse" />
              {t('services.outdoor.pest.title')}
            </motion.div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 leading-[1.1] tracking-tight text-white drop-shadow-2xl font-black w-full text-center md:text-start">
              {t('services.outdoor.pest.title')}
            </h1>

            <motion.div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs !text-white/90 mb-6 md:mb-8 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('services.outdoor.pest.desc')}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink(t('services.outdoor.pest.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Pest Control Hero CTA')}
                  className="cta-primary px-6 py-3 text-xs btn-shine shadow-xl shadow-primary/30"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('cta.request')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-background border-y border-border overflow-hidden">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-xl p-5 md:p-6 shadow-xl shadow-primary/5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-center">
              {t('services.outdoor.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-3 items-start group shrink-0 w-[260px] md:w-auto p-4 md:p-0 rounded-xl bg-background md:bg-transparent border border-border md:border-0 shadow-sm md:shadow-none">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs !text-foreground/70 leading-snug group-hover:text-foreground transition-colors duration-500 font-bold">{rule}</span>
                </div>
              ))}
            </Marquee>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Coordination Process */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6">
              {t('home.how.title')}
            </h2>
            <p className="text-xs !text-foreground/60">
              {t('home.how.subtitle')}
            </p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {coordinationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group shrink-0 w-[180px] md:w-auto"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary mb-5 shadow-xl shadow-primary/5 group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 16 })}
                  </div>
                </div>
                <p className="text-xs px-4 font-bold group-hover:text-primary transition-colors duration-500 leading-tight">{step.body}</p>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ Final CTA */}
      <section className="section-spacing bg-background border-t border-border overflow-hidden relative">
        <div className="container-sahli relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 md:mb-8 shadow-lg shadow-primary/5">
              <MessageSquare size={16} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl mb-6">
              {t('cta.final.title')}
            </h2>
            <p className="text-xs !text-foreground/60 mb-8 max-w-2xl mx-auto">
              {t('cta.final.body')}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.outdoor.pest.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Pest Control Final CTA')}
                className="cta-primary px-8 py-4 text-xs btn-shine shadow-xl shadow-primary/30"
              >
                <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare size={16} className="fill-primary-foreground" />
                {t('cta.request')}
              </motion.div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5️⃣ Related Services */}
      <section className="py-12 md:py-16 bg-foreground/[0.02] border-t border-border overflow-hidden">
        <div className="container-sahli">
          <div className="mb-8 md:mb-12 text-center md:text-start">
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-4">
              {t('services.related.title')}
            </h2>
            <p className="text-xs !text-foreground/50">
              {t('services.related.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {relatedServices.map((service, i) => (
              <Link 
                key={i}
                to={service.path}
                className="p-4 md:p-5 rounded-xl bg-background border border-border hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
              >
                <span className="text-xs font-bold group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-wider">{service.title}</span>
                <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUp size={16} className="text-primary rotate-45" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ Back to Home */}
      <section className="py-8 md:py-10 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-foreground/[0.02] border border-border hover:bg-foreground/[0.05] transition-all duration-500"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
              <ArrowUp size={16} className="-rotate-45" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">{t('nav.home')}</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
