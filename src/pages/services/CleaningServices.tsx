import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Sparkles, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp, Waves, Zap } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function CleaningServices() {
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
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.moving.title'), path: '/services#moving' },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
  ];

  const categories = [
    { title: t('services.cleaning.regular.title'), desc: t('services.cleaning.regular.desc'), icon: <Sparkles size={16} /> },
    { title: t('services.cleaning.deep.title'), desc: t('services.cleaning.deep.desc'), icon: <Waves size={16} /> },
    { title: t('services.cleaning.specialized.title'), desc: t('services.cleaning.specialized.desc'), icon: <Zap size={16} /> }
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const includes = [
    t('services.cleaning.deep.items').split('\n')[0] || 'House Deep Cleaning',
    t('services.cleaning.deep.items').split('\n')[1] || 'Sofa & Carpet Cleaning',
    t('services.cleaning.deep.items').split('\n')[2] || 'Window Cleaning',
    t('services.cleaning.deep.items').split('\n')[3] || 'Move-in/out Cleaning'
  ];

  const areas = [
    t('home.areas.item1'),
    t('home.areas.item2'),
    t('home.areas.item3')
  ];

  const floatingBlobs = (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[160px] animate-pulse-slow z-0`} />
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow delay-1000 z-0`} />
    </div>
  );

  return (
    <Layout>
      {/* Hero Section - Aligned with Homepage Full-Width Design */}
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
              src="/Services/Cleaning service.jpg" 
              alt="Professional Home Cleaning Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/20 z-0" />
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          style={{ y: y2Spring }}
          className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 h-full bg-slate-950/5 pointer-events-none z-10`} 
        />

        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-20 flex flex-col items-center md:items-start">
          <motion.div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start"
            style={{ y: yHero }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-xs font-black tracking-[0.25em] uppercase text-primary mb-4 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <img 
                src="/logos/SahlLogo9.png" 
                alt="" 
                className="w-3.5 h-3.5 object-contain animate-pulse" 
              />
              {t('services.cleaning.title')}
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-[1.1] tracking-tight text-white drop-shadow-2xl font-black w-full text-center md:text-start">
              {t('services.cleaning.title')}
            </h1>

            <motion.div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-base md:text-lg !text-white/90 mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('services.cleaning.subtitle')}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink(t('services.cleaning.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Cleaning Hero CTA')}
                  className="cta-primary px-6 py-3 text-xs btn-shine shadow-xl shadow-primary/30"
                >
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ y: -2, scale: 1.02 }}
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
      <section className="section-spacing bg-background border-y border-border">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-xl p-4 md:p-5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight mb-6 md:mb-8 text-center">
              {t('services.cleaning.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.rules.cleaning'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-2.5 items-center group shrink-0 w-[240px] px-5">
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

      {/* 3️⃣ Service Categories */}
      <section className="section-spacing bg-background relative overflow-hidden">
        {floatingBlobs}
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-3 md:mb-4">
              {t('services.cleaning.categories.title')}
            </h2>
            <p className="text-xs !text-foreground/50">{t('services.cleaning.categories.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 md:p-6 rounded-xl bg-background border border-border hover:border-primary/20 transition-all duration-500 group shrink-0 w-[240px] shadow-xl shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 16 })}
                </div>
                <h3 className="text-xs mb-3 group-hover:text-primary transition-colors duration-500 font-black uppercase tracking-wider">{cat.title}</h3>
                <p className="text-xs !text-foreground/60 leading-relaxed">
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ How it works (Visual Timeline) */}
      <section className="section-spacing bg-foreground/[0.02] border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-3 md:mb-4">
              {t('how.flow.title')}
            </h2>
            <p className="text-xs !text-foreground/50">{t('how.flow.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {coordinationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group shrink-0 w-[160px]"
              >
                <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center text-primary mb-6 shadow-xl shadow-primary/5 group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 16 })}
                  </div>
                </div>
                <p className="text-xs px-4 font-medium group-hover:text-primary transition-colors duration-500">{step.body}</p>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-xl bg-primary/[0.03] border border-primary/10 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs !text-primary mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-xs !text-foreground/70 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-foreground transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-xl bg-foreground/[0.02] border border-border shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs !text-foreground/40 mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-xs !text-foreground/40 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-foreground/60 transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served (Map View Style) */}
      <section className="section-spacing bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-6 md:mb-8 text-center md:text-start">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
                {areas.map((area, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 md:gap-4 p-2.5 rounded-xl bg-background md:bg-foreground/[0.02] border border-border hover:border-primary/30 transition-all group shrink-0 w-[160px] shadow-xl shadow-primary/5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                      <MapPin size={16} />
                    </div>
                    <span className="text-xs font-bold group-hover:text-primary transition-colors duration-500">{area}</span>
                  </motion.div>
                ))}
              </Marquee>
            </div>
            
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-foreground/[0.02] flex items-center justify-center shadow-2xl shadow-primary/5 group">
              <img 
                src="https://images.pexels.com/photos/6195119/pexels-photo-6195119.jpeg" 
                alt="Cleaning Service Doha"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-6 py-3 bg-background/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg text-xs !text-primary font-bold">
                  {t('services.areas.qatarNationwide')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-background border-t border-border overflow-hidden relative">
        {floatingBlobs}
        <div className="container-sahli relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 md:mb-8">
              <Clock size={16} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-8 md:mb-10 tracking-tight">
              {t('service.v1.cta.title')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <a
                href={getWhatsAppLink(t('services.cleaning.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Cleaning Final CTA')}
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
        </div>
      </section>

      {/* 🔟 Related Services - Quick Links */}
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
                className="p-3 md:p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
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

      {/* 11️⃣ Back to Home Link */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-xs !text-foreground/60 group-hover:text-foreground transition-colors">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}


