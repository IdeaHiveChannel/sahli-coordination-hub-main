import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, CheckCircle2, Heart, ShieldCheck, Clock, MapPin, AlertCircle, Baby } from 'lucide-react';
import { WHATSAPP_LINK } from '@/lib/constants';
import { trackWhatsAppClick } from '@/lib/gtag';

export default function Babysitting() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1'), icon: <MessageCircle size={20} /> },
    { title: '02', body: t('home.what.step2'), icon: <ShieldCheck size={20} /> },
    { title: '03', body: t('home.what.step3'), icon: <Clock size={20} /> },
    { title: '04', body: t('home.what.step4'), icon: <CheckCircle2 size={20} /> },
    { title: '05', body: t('home.what.step5'), icon: <CheckCircle2 size={20} /> }
  ];

  const includes = [
    t('service.babysitting.includes.item1'),
    t('service.babysitting.includes.item2'),
    t('service.babysitting.includes.item3'),
    t('service.babysitting.includes.item4')
  ];

  const areas = [
    t('service.ac.areas.item1'),
    t('service.ac.areas.item2'),
    t('service.ac.areas.item3')
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
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-sm mx-auto md:mx-0">
              <Baby size={14} className="animate-bounce" />
              {t('home.coordinate.care.title')}
            </div>

            <h1 className="text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter mb-8">
              {t('home.featured.babysitting')}
            </h1>

            <div className="relative mb-10 group w-full max-w-2xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative p-8 rounded-3xl bg-foreground/[0.03] border border-border backdrop-blur-xl">
                <h2 className="text-primary text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight flex items-center justify-center md:justify-start gap-3">
                  <AlertCircle className="text-primary shrink-0" size={28} />
                  {t('home.featured.babysitting')}
                </h2>
                <p className="text-foreground/60 text-lg md:text-xl font-medium leading-relaxed">
                  {t('services.role.clarification')}
                </p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-bold mb-10 max-w-2xl leading-tight tracking-tight">
              {t('services.comingSoon.notify')}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.div
                className="cta-primary px-10 py-5 text-lg btn-shine shadow-xl shadow-primary/10 opacity-50 cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
              >
                <MessageCircle size={22} className="fill-primary-foreground" />
                {t('services.status.soon')}
              </motion.div>
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
                src="https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg" 
                alt="Babysitting Service Qatar"
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
                  <div className="text-foreground font-bold">Trusted Caregivers</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="py-24 md:py-32 bg-background border-y border-border">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-[3rem] p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter mb-12 text-center leading-[0.9]">
                Service Guidelines
              </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                t('services.rules.care'),
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
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-6">
              {t('service.babysitting.includes.title')}
            </h2>
            <p className="text-foreground/50 font-bold text-lg uppercase tracking-widest">Premium Childcare Support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">{item}</h3>
                <div className="w-10 h-1 bg-primary/20 rounded-full group-hover:w-20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ How It Works - Visual Timeline */}
      <section className="py-24 md:py-32 bg-foreground/[0.02] border-y border-border relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-6">
              {t('how.flow.title')}
            </h2>
            <p className="text-foreground/50 font-bold text-lg uppercase tracking-widest">Standardized Coordination</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative">
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
                <p className="text-foreground font-black text-lg leading-tight tracking-tight px-4">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
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
              initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
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

      {/* 6️⃣ Areas Served - Map Style */}
      <section className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-8 leading-[0.9]">
                {t('service.ac.areas.title')}
              </h2>
              <div className="space-y-4">
                {areas.map((area, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-2xl bg-foreground/[0.02] border border-border hover:border-primary/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <MapPin size={24} />
                    </div>
                    <span className="text-2xl font-black text-foreground/80">{area}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-border bg-foreground/[0.02] flex items-center justify-center">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>
              <div className="relative text-center p-12">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-8 animate-bounce">
                  <MapPin size={48} />
                </div>
                <h3 className="text-3xl font-black text-foreground mb-4">Qatar Nationwide</h3>
                <p className="text-xl text-foreground/60 font-bold uppercase tracking-widest">Rapid Response Units</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ Important Note - High Visibility */}
      <section className="py-24 bg-background">
        <div className="container-sahli">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[4rem] bg-foreground text-background overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-2xl shadow-primary/20">
                <AlertCircle size={40} />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                  {t('service.v1.importantNote.title')}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <p className="text-xl md:text-2xl font-bold leading-tight text-background/80 border-l-4 border-primary pl-6">
                    {t('service.v1.importantNote.body1')}
                  </p>
                  <p className="text-xl md:text-2xl font-bold leading-tight text-background/80 border-l-4 border-primary/30 pl-6">
                    {t('service.v1.importantNote.body2')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8️⃣ Final CTA - High Impact */}
      <section className="py-32 bg-background border-t border-border overflow-hidden">
        <div className="container-sahli relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-12">
              <Clock size={48} />
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter mb-12 leading-[0.85]">
              {t('service.v1.cta.whatsapp')}
            </h2>
            <p className="text-xl md:text-2xl text-foreground/60 font-medium mb-12 max-w-3xl mx-auto leading-tight">
              {t('services.comingSoon.notify')}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <motion.div
                className="cta-primary px-16 py-8 text-xl md:text-2xl btn-shine shadow-3xl shadow-primary/30 opacity-50 cursor-not-allowed"
              >
                <MessageCircle size={32} className="fill-primary-foreground" />
                {t('services.comingSoon.btn')}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 9️⃣ Micro-Legal Clarity */}
      <footer className="py-20 bg-background border-t border-border">
        <div className="container-sahli">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] md:text-xs text-foreground/30 font-black max-w-2xl text-center md:text-left leading-relaxed uppercase tracking-[0.3em]">
              {t('services.microLegal')}
            </p>
            <div className="flex gap-8 text-[10px] font-black tracking-widest text-foreground/20 uppercase">
              <span>Qatar 2024</span>
              <span>SAHLI Coordination Hub</span>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
