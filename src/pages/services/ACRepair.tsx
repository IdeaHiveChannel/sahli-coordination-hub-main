import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, CheckCircle2, Snowflake, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp } from 'lucide-react';
import { WHATSAPP_LINK } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';

export default function ACRepair() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);

  const relatedServices = [
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.electrical.title'), path: t('services.homeMaintenance.electrical.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1'), icon: <MessageCircle size={20} /> },
    { title: '02', body: t('home.what.step2'), icon: <ShieldCheck size={20} /> },
    { title: '03', body: t('home.what.step3'), icon: <Clock size={20} /> },
    { title: '04', body: t('home.what.step4'), icon: <CheckCircle2 size={20} /> },
    { title: '05', body: t('home.what.step5'), icon: <CheckCircle2 size={20} /> }
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

  return (
    <Layout>
      {/* 1️⃣ Modern Split Hero Section */}
      <section ref={containerRef} className="relative min-h-screen md:min-h-[90svh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        </div>

        <div className="container-sahli relative z-10 pt-24 md:pt-28 pb-12 md:pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-start"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-black tracking-widest uppercase mb-6 btn-shine mx-auto md:mx-0">
              <Snowflake size={14} className="animate-spin-slow" />
              {t('services.homeMaintenance.ac.title')}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.85] max-w-4xl mb-8">
              {t('services.homeMaintenance.ac.title')}
            </h1>

            <div className="relative mb-10 group w-full max-w-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative p-8 rounded-3xl bg-foreground/[0.03] border border-border backdrop-blur-xl">
                <h2 className="text-primary text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight flex items-center justify-center md:justify-start gap-3">
                  <AlertCircle className="text-primary shrink-0" size={28} />
                  {t('services.homeMaintenance.ac.desc')}
                </h2>
                <p className="text-foreground/60 text-lg md:text-xl font-medium leading-relaxed">
                  {t('services.homeMaintenance.subtitle')}
                </p>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl font-medium leading-relaxed mb-8">
              {t('services.homeMaintenance.body')}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('AC Repair Hero CTA')}
                className="cta-primary px-10 py-5 text-lg btn-shine shadow-xl shadow-primary/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={22} className="fill-primary-foreground" />
                {t('cta.whatsapp')}
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden border border-border shadow-2xl"
          >
            <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]), scale: 1.1 }} className="absolute inset-0">
              <img 
                src="https://images.pexels.com/photos/5466804/pexels-photo-5466804.jpeg" 
                alt="AC Repair Service Qatar"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
            
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-background/80 backdrop-blur-md border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-xs font-black tracking-widest text-primary uppercase">Verified Provider</div>
                  <div className="text-foreground font-bold">Standardized Coordination</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-background border-y border-border/50">
        <div className="container-sahli">
          <div className="max-w-4xl mb-12 md:mb-16 text-center md:text-start">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-8">
              Service Guidelines
            </h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-[3rem] p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-base font-bold text-foreground/70 leading-snug group-hover:text-foreground transition-colors duration-500">{rule}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3️⃣ Visual Service Features */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-6">
              {t('service.v1.includes.title')}
            </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {includes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/40 hover:bg-foreground/[0.04] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-black text-foreground/90 group-hover:text-primary transition-colors duration-500 mb-2">
                  {item}
                </h3>
                <div className="w-8 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ How it works (Visual Timeline) */}
      <section className="section-spacing bg-foreground/[0.02] border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-6">
              {t('home.what.title')}
            </h2>
            <p className="text-foreground/50 font-bold text-lg uppercase tracking-widest">Simple. Fast. Transparent.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent z-0" />
            
            {coordinationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-3xl bg-background border border-border flex items-center justify-center text-primary mb-8 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                </div>
                <p className="text-foreground font-black text-xl leading-tight tracking-tight px-4">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-primary/[0.03] border border-primary/10"
            >
              <h3 className="text-xl font-black text-primary mb-8 uppercase tracking-widest">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-6">
                {[
                  t('home.hero.label'),
                  t('services.boundaries.is.body').split('\n')[1]
                ].map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-lg text-foreground/70 font-bold">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-foreground/[0.02] border border-border"
            >
              <h3 className="text-xl font-black text-foreground/40 mb-8 uppercase tracking-widest">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-6">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-lg text-foreground/40 font-bold">
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
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-8">
                {t('home.areas.title')}
              </h2>
              <div className="space-y-4">
                {areas.map((area, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-2xl bg-foreground/[0.02] border border-border hover:border-primary/30 transition-all duration-500 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <MapPin size={20} />
                    </div>
                    <span className="font-black text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-500">{area}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-border bg-foreground/[0.02] group">
              <img 
                src="https://images.pexels.com/photos/5466806/pexels-photo-5466806.jpeg" 
                alt="AC Repair Technician Doha"
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-8 py-4 bg-background/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl font-black text-primary tracking-widest uppercase text-sm">
                  Active in Doha
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ Important Note (High Contrast) */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 rounded-[4rem] bg-foreground text-background relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                  {t('service.v1.importantNote.title')}
                </h2>
                <div className="w-20 h-2 bg-primary rounded-full mb-8" />
              </div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-background/80 font-bold leading-relaxed">
                  {t('service.v1.importantNote.body1')}
                </p>
                <p className="text-xl md:text-2xl text-background/80 font-bold leading-relaxed">
                  {t('service.v1.importantNote.body2')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8️⃣ Final High-Impact CTA */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/5466804/pexels-photo-5466804.jpeg" 
            className="w-full h-full object-cover grayscale"
            alt="Background"
          />
        </div>
        
        <div className="container-sahli relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-[-0.05em] mb-12 leading-[0.85]">
              {t('service.v1.cta.whatsapp')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('AC Repair Final CTA')}
                className="cta-primary px-16 py-8 text-xl md:text-2xl btn-shine shadow-3xl shadow-primary/30"
              >
                <MessageCircle size={32} className="fill-primary-foreground" />
                {t('cta.whatsapp')}
              </motion.a>
              
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-2 text-primary font-black tracking-widest uppercase text-sm">
                  <ShieldCheck size={20} />
                  Safe & Secure
                </div>
                <div className="text-foreground/40 font-bold">No hidden fees. Pay directly.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9️⃣ Internal Linking (SEO Strategy) */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Link Up to Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-foreground/[0.02] border border-border group"
            >
              <h4 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Service Category</h4>
              <Link to="/home-maintenance-qatar" className="flex items-center gap-3 text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                <ArrowUp size={24} />
                {t('services.homeMaintenance.title')}
              </Link>
            </motion.div>

            {/* Link Sideways to Related */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-foreground/[0.02] border border-border md:col-span-2"
            >
              <h4 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-6">Related Services</h4>
              <div className="flex flex-wrap gap-4">
                {relatedServices.map((service, i) => (
                  <Link 
                    key={i} 
                    to={service.path}
                    className="px-6 py-3 rounded-xl bg-background border border-border font-bold text-foreground/70 hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground/40 font-bold hover:text-primary transition-colors">
              <ArrowUp size={16} className="-rotate-90" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}
