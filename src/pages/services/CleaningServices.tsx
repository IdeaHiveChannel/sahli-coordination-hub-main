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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const relatedServices = [
    { title: t('nav.homeMaintenance'), path: t('services.homeMaintenance.path') },
    { title: t('nav.movingServices'), path: t('services.moving.path') },
    { title: t('nav.outdoorSpecialized'), path: t('services.outdoor.path') },
    { title: t('nav.careLifestyle'), path: t('services.care.path') },
    { title: t('nav.electronicsTech'), path: t('services.electronics.path') },
  ];

  const categories = [
    { title: t('services.cleaning.regular.title'), desc: t('services.cleaning.regular.desc'), icon: <Sparkles size={28} /> },
    { title: t('services.cleaning.deep.title'), desc: t('services.cleaning.deep.desc'), icon: <Waves size={28} /> },
    { title: t('services.cleaning.specialized.title'), desc: t('services.cleaning.specialized.desc'), icon: <Zap size={28} /> }
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={20} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={20} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={20} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={20} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={20} /> }
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
      {/* 1️⃣ Modern Split Hero Section */}
      <section ref={containerRef} className="relative min-h-screen md:min-h-[90svh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Floating Background Blobs for homepage design base */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[160px] animate-pulse-slow z-0`} />
          <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow delay-1000 z-0`} />
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsla(var(--primary),0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-slate-950/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-background" />
        </div>

        <div className="container-sahli relative z-10 pt-20 md:pt-28 pb-10 md:pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-start"
          >
            <div className="mb-6 md:mb-8 text-label !text-primary inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-sm mx-auto md:mx-0 backdrop-blur-md">
              <img src="/logos/SahlLogo9.png" alt="" className="w-4 h-4 object-contain" />
              {t('services.cleaning.title')}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-6 md:mb-8 font-black leading-[1.1] tracking-tight w-full text-center md:text-start">
              {t('services.cleaning.title')}
            </h1>

            <p className="text-base md:text-xl lg:text-2xl !text-foreground/70 max-w-2xl mb-8 md:mb-12 w-full text-center md:text-start">
              {t('services.cleaning.subtitle')}
            </p>
            
            <p className="text-sm md:text-lg !text-foreground/90 max-w-2xl mb-10 w-full text-center md:text-start">
              {t('services.cleaning.body')}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href={getWhatsAppLink(t('services.cleaning.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Cleaning Hero CTA')}
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: dir === 'rtl' ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden border border-border shadow-xl"
        >
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]), scale: 1.1 }} className="absolute inset-0">
            <img 
              src="https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg" 
              alt="Cleaning Service Qatar"
              className="w-full h-full object-cover object-[75%_center] md:object-center transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
          
          <div className="absolute bottom-8 left-8 right-8 p-6 rounded-[2rem] bg-background/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{t('services.care.verifiedProvider')}</div>
                  <div className="text-sm font-bold text-foreground">{t('how.flow.subtitle')}</div>
                </div>
              </div>
            </div>
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
            className="bg-foreground/[0.02] border border-border rounded-[3rem] p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-5xl mb-6 md:mb-8 text-center font-black">
              {t('services.cleaning.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4">
              {[
                t('services.rules.cleaning'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-4 items-start group shrink-0 w-[260px] md:w-auto">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-label !text-foreground/70 leading-snug group-hover:text-foreground transition-colors duration-500">{rule}</span>
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
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl mb-6 md:mb-8 font-black">
              {t('services.cleaning.categories.title')}
            </h2>
            <p className="text-base md:text-xl !text-foreground/50">{t('services.cleaning.categories.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4" gap={24}>
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-[2rem] md:rounded-[1.25rem] bg-foreground/[0.02] border border-border hover:border-primary/20 transition-all duration-500 group shrink-0 w-[280px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {cat.icon}
                </div>
                <h3 className="text-subtitle mb-4 group-hover:text-primary transition-colors duration-500 font-black uppercase tracking-wider">{cat.title}</h3>
                <p className="text-body !text-foreground/60 leading-relaxed">
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
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-display mb-6">
              {t('how.flow.title')}
            </h2>
            <p className="text-subtitle !text-foreground/50">{t('how.flow.subtitle')}</p>
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
                <div className="w-24 h-24 rounded-[2rem] md:rounded-3xl bg-background border border-border flex items-center justify-center text-primary mb-8 shadow-xl group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500 shadow-primary/5">
                  <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                </div>
                <p className="text-body !text-foreground/80 leading-tight px-4">{step.body}</p>
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
              className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-primary/[0.03] border border-primary/10 shadow-xl shadow-primary/5"
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
              className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-foreground/[0.02] border border-border shadow-xl shadow-primary/5"
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
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-display mb-6 md:mb-8">
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
                    className="flex items-center gap-6 p-6 rounded-[2rem] md:rounded-2xl bg-foreground/[0.02] border border-border hover:border-primary/30 transition-all duration-500 group shrink-0 w-[240px] md:w-auto shadow-xl shadow-primary/5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <MapPin size={20} />
                    </div>
                    <span className="text-subtitle group-hover:text-primary transition-colors duration-500">{area}</span>
                  </motion.div>
                ))}
              </Marquee>
            </div>
            
            <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-border bg-foreground/[0.02] group">
              <img 
                src="https://images.pexels.com/photos/6195119/pexels-photo-6195119.jpeg" 
                alt="Cleaning Service Doha"
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

      {/* 9️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-background border-t border-border overflow-hidden relative">
        {floatingBlobs}
        <div className="container-sahli relative z-10">
            <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-12">
              <Clock size={48} />
            </div>
            <h2 className="text-display mb-12">
              {t('service.v1.cta.title')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a
                href={getWhatsAppLink(t('services.cleaning.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Cleaning Final CTA')}
                className="cta-primary px-16 py-8 btn-shine"
              >
                <motion.div
                  className="flex items-center gap-4"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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

      {/* 🔟 Related Services - Quick Links */}
      <section className="py-24 bg-foreground/[0.02] border-t border-border">
        <div className="container-sahli">
          <div className="mb-16">
            <h2 className="text-display mb-4">
              {t('services.related.title')}
            </h2>
            <p className="text-subtitle !text-foreground/50">
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

      {/* 11️⃣ Back to Home Link */}
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


