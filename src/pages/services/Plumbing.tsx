import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Droplets, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export default function Plumbing() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const relatedServices = [
    { title: t('nav.homeMaintenance'), path: t('services.homeMaintenance.path') },
    { title: t('nav.cleaningServices'), path: t('services.cleaning.path') },
    { title: t('nav.movingServices'), path: t('services.moving.path') },
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

  const floatingBlobs = (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[160px] animate-pulse-slow z-0`} />
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow delay-1000 z-0`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsla(var(--primary),0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-slate-950/5" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-background" />
    </div>
  );

  return (
    <Layout>
      {/* 1️⃣ Modern Split Hero Section */}
      <section ref={containerRef} className="relative min-h-screen md:min-h-[90svh] flex flex-col justify-center overflow-hidden bg-background">
        {floatingBlobs}

        <div className="container-sahli relative z-10 pt-20 md:pt-28 pb-10 md:pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start text-center md:text-start"
          >
            <div className="mb-6 md:mb-8 text-label !text-primary inline-flex items-center gap-3 px-4 py-2 bg-primary/10 backdrop-blur-md rounded-full border border-primary/20 shadow-sm mx-auto md:mx-0">
              <img src="/logos/SahlLogo9.png" alt="Sahli" className="w-4 h-4 object-contain animate-pulse-slow" />
              {t('services.homeMaintenance.plumbing.title')}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 font-black leading-[1.1] tracking-tight w-full">
              {t('services.homeMaintenance.plumbing.title')}
            </h1>

            <div className="relative mb-8 md:mb-10 group w-full max-w-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative p-6 md:p-8 rounded-[2rem] md:rounded-3xl bg-foreground/[0.03] border border-border backdrop-blur-xl flex flex-col items-center md:items-start text-center md:text-start">
                <h3 className="text-xl md:text-2xl mb-4 flex items-center justify-center md:justify-start gap-3 font-bold w-full leading-tight">
                  <AlertCircle className="text-primary shrink-0" size={28} />
                  {t('services.homeMaintenance.plumbing.desc')}
                </h3>
                <p className="text-lg md:text-xl !text-foreground/80 w-full font-medium">
                  {t('services.homeMaintenance.subtitle')}
                </p>
              </div>
            </div>
            
            <p className="text-base md:text-lg !text-foreground/80 mb-8 md:mb-10 max-w-2xl w-full">
              {t('services.homeMaintenance.body')}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href={getWhatsAppLink(t('services.homeMaintenance.plumbing.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Plumbing Hero CTA')}
                className="cta-primary px-12 py-6 btn-shine"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
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
            className="relative aspect-square lg:aspect-[4/5] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-border shadow-2xl shadow-primary/5"
          >
            <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]), scale: 1.1 }} className="absolute inset-0">
              <img 
              src="https://images.pexels.com/photos/2310913/pexels-photo-2310913.jpeg" 
              alt="Plumbing Service Qatar"
              className="w-full h-full object-cover object-[75%_center] md:object-center transition-all duration-700"
            />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </motion.div>
            
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 p-5 md:p-6 rounded-2xl bg-background/80 backdrop-blur-md border border-white/10 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <ShieldCheck size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-widest text-primary uppercase">{t('services.care.verifiedProvider')}</div>
                  <div className="text-xs md:text-sm text-foreground font-bold">{t('how.flow.subtitle')}</div>
                </div>
              </div>
            </div>
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
          <Marquee speed={0.4} className="-mx-4 px-4" gap={24}>
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="shrink-0 w-[300px] md:w-auto p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-primary/[0.03] border border-primary/10 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xl md:text-subtitle !text-primary mb-6 md:mb-8 font-bold">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4 md:space-y-6">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-base md:text-lg text-foreground/70 font-bold">
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
              className="shrink-0 w-[300px] md:w-auto p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-foreground/[0.02] border border-border shadow-xl shadow-black/5"
            >
              <h3 className="text-xl md:text-subtitle !text-foreground/40 mb-6 md:mb-8 font-bold">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4 md:space-y-6">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-4 items-center text-base md:text-lg text-foreground/40 font-bold">
                    <div className="w-2 h-2 rounded-full bg-foreground/20 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Marquee>
        </div>
      </section>

      {/* 6️⃣ Areas Served - Map Style */}
      <section className="section-spacing bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-display mb-8 md:mb-12 font-black text-center md:text-start">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={16}>
                {areas.map((area, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="shrink-0 w-[260px] md:w-auto flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl bg-foreground/[0.02] border border-border hover:border-primary/30 transition-all group shadow-sm hover:shadow-md"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <MapPin size={20} className="md:w-6 md:h-6" />
                    </div>
                    <span className="text-base md:text-subtitle font-bold !text-foreground/80 group-hover:text-primary transition-colors">{area}</span>
                  </motion.div>
                ))}
              </Marquee>
            </div>
            <div className="relative aspect-square rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-border bg-foreground/[0.02] flex items-center justify-center shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>
              <div className="relative text-center p-8 md:p-12">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-6 md:mb-8 animate-bounce">
                  <MapPin size={40} className="md:w-12 md:h-12" />
                </div>
                <h3 className="text-2xl md:text-display mb-4 font-black">{t('services.areas.qatarNationwide')}</h3>
                <p className="text-sm md:text-xl text-foreground/60 font-black uppercase tracking-widest">{t('services.areas.rapidResponse')}</p>
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
              href={getWhatsAppLink(t('services.homeMaintenance.plumbing.whatsapp'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Plumbing Final CTA')}
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
      <section className="py-16 md:py-24 bg-foreground/[0.02] border-t border-border overflow-hidden">
        <div className="container-sahli">
          <div className="mb-12 md:mb-16 text-center md:text-start">
            <h2 className="text-3xl md:text-display mb-4 font-black">
              {t('services.related.title')}
            </h2>
            <p className="text-sm md:text-label !text-foreground/50 uppercase font-bold tracking-wider">
              {t('services.related.subtitle')}
            </p>
          </div>
          <Marquee speed={0.4} className="-mx-4 px-4">
            {relatedServices.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="shrink-0 w-[260px] md:w-auto group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-background border border-border hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-subtitle font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowUp size={20} className="rotate-45 md:rotate-90" />
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
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={16} className="-rotate-90" />
            </div>
            <span className="text-sm font-bold text-foreground/60 group-hover:text-primary transition-colors">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}


