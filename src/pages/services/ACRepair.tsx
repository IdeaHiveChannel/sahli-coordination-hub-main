import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Snowflake, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function ACRepair() {
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
  const y2Spring = useSpring(y2, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const yHero = useTransform(scrollY, [0, 500], [0, -100]);

  const relatedServices = [
    { title: t('nav.homeMaintenance'), path: t('services.homeMaintenance.path') },
    { title: t('nav.cleaningServices'), path: t('services.cleaning.path') },
    { title: t('nav.movingServices'), path: t('services.moving.path') },
    { title: t('nav.outdoorSpecialized'), path: t('services.outdoor.path') },
    { title: t('nav.careLifestyle'), path: t('services.care.path') },
    { title: t('nav.electronicsTech'), path: t('services.electronics.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={20} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={20} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={20} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={20} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={20} /> }
  ];

  const includes = [
    t('services.homeMaintenance.ac.items').split('\n')[0] || 'Filter Cleaning',
    t('services.homeMaintenance.ac.items').split('\n')[1] || 'Gas Pressure Check',
    t('services.homeMaintenance.ac.items').split('\n')[2] || 'Electrical Component Check',
    t('services.homeMaintenance.ac.items').split('\n')[3] || 'Drain Line Cleaning'
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
              src="https://images.pexels.com/photos/5466804/pexels-photo-5466804.jpeg" 
              alt={t('services.homeMaintenance.ac.title')}
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>
          
          {/* Overlays matching homepage */}
          <div className="absolute inset-0 bg-slate-950/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-background z-10" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-slate-950/60 via-transparent to-transparent z-10`} />
          
          {/* Floating Background Blobs */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[60px] md:blur-[120px] animate-pulse-slow z-0`} />
          <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary/10 rounded-full blur-[50px] md:blur-[100px] animate-pulse-slow delay-1000 z-0`} />
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          style={{ y: y2Spring }}
          className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 h-full bg-gradient-to-${dir === 'rtl' ? 'r' : 'l'} from-primary/[0.06] to-transparent pointer-events-none z-10`} 
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
              className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-[0.6rem] md:text-[0.65rem] font-black tracking-[0.25em] uppercase text-primary mb-4 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <img 
                src="/logos/SahlLogo9.png" 
                alt="" 
                className="w-3.5 h-3.5 object-contain animate-pulse" 
              />
              {t('services.homeMaintenance.ac.title')}
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mb-4 md:mb-6 leading-[1] tracking-tight text-white drop-shadow-2xl font-black w-full text-center md:text-start">
              {t('services.homeMaintenance.ac.title')}
            </h1>

            <motion.div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl !text-white/90 mb-6 md:mb-10 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('services.homeMaintenance.subtitle')}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.ac.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('AC Repair Hero')}
                  className="cta-primary px-12 py-6 btn-shine shadow-xl shadow-primary/30"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare size={24} className="fill-primary-foreground" />
                    {t('cta.request')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-background border-y border-border/50">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-[3rem] p-8 md:p-12"
          >
            <h2 className="text-display mb-8 md:mb-12 text-center">
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
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl mb-4 md:mb-6 font-black">
              {t('service.v1.includes.title')}
            </h2>
            </div>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={20}>
            {includes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[2rem] md:rounded-[1.25rem] bg-foreground/[0.02] border border-border hover:border-primary/40 hover:bg-foreground/[0.04] transition-all duration-500 shrink-0 w-[280px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-subtitle mb-2">
                  {item}
                </h3>
                <div className="w-8 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ How it works (Visual Timeline) */}
      <section className="section-spacing bg-foreground/[0.02] border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
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
                className="relative z-10 flex flex-col items-center text-center group shrink-0 w-[240px] md:w-auto"
              >
                <div className="w-24 h-24 rounded-3xl bg-background border border-border flex items-center justify-center text-primary mb-8 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                </div>
                <p className="text-label !text-foreground/80 px-4">{step.body}</p>
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-primary/[0.03] border border-primary/10"
            >
              <h3 className="text-subtitle !text-primary mb-8">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-6">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-body !text-foreground/70">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-foreground/[0.02] border border-border"
            >
              <h3 className="text-subtitle !text-foreground/40 mb-8">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-6">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-body !text-foreground/40">
                    <div className="w-2 h-2 rounded-full bg-foreground/20 shrink-0" />
                    {item}
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-display mb-6 md:mb-8 text-center md:text-start">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={16}>
                {areas.map((area, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 md:gap-6 p-5 md:p-6 rounded-[2rem] md:rounded-2xl bg-background md:bg-foreground/[0.02] border border-border hover:border-primary/30 transition-all group shrink-0 w-[240px] md:w-auto shadow-xl shadow-primary/5"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                      <MapPin size={20} className="md:w-6 md:h-6" />
                    </div>
                    <span className="text-base md:text-subtitle font-bold group-hover:text-primary transition-colors duration-500">{area}</span>
                  </motion.div>
                ))}
              </Marquee>
            </div>
            
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-border bg-foreground/[0.02] flex items-center justify-center shadow-2xl shadow-primary/5 group">
              <img 
                src="https://images.pexels.com/photos/5466806/pexels-photo-5466806.jpeg" 
                alt="AC Repair Technician Doha"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-8 py-4 bg-background/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg text-label !text-primary">
                  {t('services.areas.qatarNationwide')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-background border-t border-border overflow-hidden relative">
        {floatingBlobs}
        <div className="container-sahli relative z-10 text-center max-w-4xl mx-auto">
          <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-12">
            <Clock size={48} />
          </div>
          <h2 className="text-display mb-12">
            {t('service.v1.cta.title')}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a
              href={getWhatsAppLink(t('services.homeMaintenance.ac.whatsapp'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('AC Repair Final CTA')}
              className="cta-primary px-16 py-8 btn-shine shadow-xl shadow-primary/30"
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare size={32} className="fill-primary-foreground" />
                {t('cta.request')}
              </motion.div>
            </a>
            
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-2 text-label !text-primary">
                <ShieldCheck size={20} />
                {t('services.security.safeSecure')}
              </div>
              <div className="text-label !text-foreground/40">{t('services.rules.payment')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9️⃣ Related Services - Quick Links */}
      <section className="section-spacing bg-foreground/[0.02] border-t border-border">
        <div className="container-sahli">
          <div className="mb-16 text-center md:text-start">
            <h2 className="text-display mb-4">
              {t('services.related.title')}
            </h2>
            <p className="text-label !text-foreground/50">
              {t('services.related.subtitle')}
            </p>
          </div>
          <Marquee speed={0.4} className="-mx-4 px-4" gap={24}>
            {relatedServices.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="group p-8 rounded-[2rem] md:rounded-3xl bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 shrink-0 w-[280px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-subtitle group-hover:text-primary transition-colors">
                    {service.title}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <ArrowUp className="rotate-45" size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 🔟 Back to Home Link */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-label !text-foreground/60 group-hover:text-foreground transition-colors">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}


