import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function Plumbing() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();

  // Parallax effects matching homepage
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const yHero = useTransform(scrollY, [0, 500], [0, -100]);

  const relatedServices = [
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.electrical.title'), path: t('services.homeMaintenance.electrical.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
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
              scale: scaleSpring
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="/Services/Home Maintenance - Hero.jpg" 
              alt={t('services.homeMaintenance.plumbing.title')}
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/20 z-0" />
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
              <div className="mb-4 md:mb-6 inline-flex items-center gap-3 px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full border border-primary/30 shadow-2xl">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs !text-white font-bold tracking-wide uppercase">
                  {t('services.homeMaintenance.plumbing.title')}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                {t('services.homeMaintenance.plumbing.title')}
              </h1>

              {/* Description Card - Glassmorphism */}
              <div className="relative mb-8 md:mb-10 group max-w-2xl">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-transparent rounded-2xl blur opacity-25" />
                <div className="relative p-5 md:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                  <h3 className="text-xs mb-3 flex items-center gap-3 font-bold text-white">
                    <AlertCircle className="text-primary-foreground shrink-0" size={16} />
                    {t('services.homeMaintenance.plumbing.desc')}
                  </h3>
                  <p className="text-xs text-white/90 font-medium">
                    {t('services.homeMaintenance.subtitle')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 md:gap-5">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.plumbing.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Plumbing Hero CTA')}
                  className="group relative px-6 py-3 bg-primary text-primary-foreground rounded-xl font-black text-xs overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-2">
                    <MessageSquare size={16} className="fill-current" />
                    {t('cta.request')}
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-slate-950/5 z-10" />
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-background border-y border-border overflow-hidden">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-xl p-4 md:p-5 shadow-xl shadow-primary/5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-center">
              {t('services.homeMaintenance.rules.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-3 items-center group p-4 rounded-xl bg-background border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs !text-foreground/70 leading-snug group-hover:text-foreground transition-colors duration-500 font-bold">{rule}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Visual Service Features */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6">
              {t('service.v1.includes.title')}
            </h2>
            <p className="text-xs !text-foreground/50">{t('services.homeMaintenance.plumbing.title')} {t('nav.cleaningServices')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {includes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-5 md:p-6 rounded-xl bg-foreground/[0.02] border border-border hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <CheckCircle2 size={16} />
                </div>
                <h3 className="text-xs mb-2 group-hover:text-primary transition-colors font-bold uppercase tracking-wider">{item}</h3>
                <div className="w-8 h-1 bg-primary/20 rounded-full group-hover:w-16 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ How It Works - Visual Timeline */}
      <section className="section-spacing bg-foreground/[0.02] border-y border-border relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 md:mb-6">
              {t('how.flow.title')}
            </h2>
            <p className="text-xs !text-foreground/50">{t('how.flow.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {coordinationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-background border border-border flex items-center justify-center text-primary mb-5 shadow-sm group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 16 })}
                  </div>
                </div>
                <p className="text-xs px-2 font-medium group-hover:text-primary transition-colors duration-500 leading-tight">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 md:p-6 rounded-xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5"
            >
              <div className="text-xl md:text-2xl font-black text-primary mb-1 group-hover:scale-110 transition-transform duration-500">100%</div>
              <div className="text-xs font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-500">{t('services.rules.inspection')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-5 md:p-6 rounded-xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5"
            >
              <div className="text-xl md:text-2xl font-black text-primary mb-1 group-hover:scale-110 transition-transform duration-500">24/7</div>
              <div className="text-xs font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-500">{t('home.what.step3.body')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 md:p-6 rounded-xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5"
            >
              <div className="text-xl md:text-2xl font-black text-primary mb-1 group-hover:scale-110 transition-transform duration-500">0%</div>
              <div className="text-xs font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-500">{t('services.rules.payment')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-5 md:p-6 rounded-xl bg-foreground/[0.02] border border-border flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-500 shadow-xl shadow-primary/5"
            >
              <div className="text-xl md:text-2xl font-black text-primary mb-1 group-hover:scale-110 transition-transform duration-500">5+</div>
              <div className="text-xs font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors duration-500">{t('home.areas.title')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served */}
      <section className="section-spacing bg-foreground/[0.02] border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl mb-5 md:mb-7">
                {t('home.areas.title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areas.map((area, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border shadow-sm hover:border-primary/30 transition-all group">
                    <MapPin className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                    <span className="text-xs font-bold group-hover:text-primary transition-colors">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-2xl">
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

      {/* 7️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-background border-t border-border overflow-hidden relative">
        <div className="container-sahli relative z-10 text-center max-w-4xl mx-auto">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-10">
            <Clock size={16} />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-10">
            {t('service.v1.cta.title')}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href={getWhatsAppLink(t('services.homeMaintenance.plumbing.whatsapp'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Plumbing Final CTA')}
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
        </div>
      </section>

      {/* 8️⃣ Related Services - Quick Links */}
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
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <ArrowUp className={`${dir === 'rtl' ? '-rotate-45' : 'rotate-45'} transition-transform duration-500 group-hover:scale-110`} size={16} />
                  </div>
                  <h3 className="text-xs font-bold leading-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  {t('cta.view')}
                  <ArrowUp size={16} className={`${dir === 'rtl' ? '-rotate-90' : 'rotate-90'}`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9️⃣ Back to Home Link */}
      <section className="py-12 md:py-16 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground/[0.02] border border-border hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
              <ArrowUp size={16} className="-rotate-90 rtl:rotate-90" />
            </div>
            <span className="text-xs font-bold !text-foreground/60 group-hover:text-foreground transition-colors duration-500 uppercase tracking-widest">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
