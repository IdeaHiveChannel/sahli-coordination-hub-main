import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { CheckCircle2, MessageCircle, Info, GraduationCap, Languages, FileText, Dumbbell, Sparkles, Monitor, ShieldCheck, Clock, AlertCircle, MapPin } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/gtag';

import { WHATSAPP_LINK } from '@/lib/constants';

export default function LessonsLifestyle() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const lifestyleServices = [
    { 
      title: t('services.lessons.tutoring.title'), 
      items: t('services.lessons.tutoring.items').split('\n'),
      icon: <GraduationCap className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-500" />
    },
    { 
      title: t('services.lessons.language.title'), 
      items: t('services.lessons.language.items').split('\n'),
      icon: <Languages className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-500" />
    },
    { 
      title: t('services.lessons.exam.title'), 
      items: t('services.lessons.exam.items').split('\n'),
      icon: <FileText className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-500" />
    },
    { 
      title: t('services.lessons.fitness.title'), 
      items: t('services.lessons.training.items').split('\n'),
      icon: <Dumbbell className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-500" />
    },
    { 
      title: t('services.lessons.yoga.title'), 
      items: t('services.lessons.yoga.items').split('\n'),
      icon: <Sparkles className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-500" />
    },
    { 
      title: t('services.lessons.smarthome.title'), 
      items: t('services.lessons.smarthome.items').split('\n'),
      icon: <Monitor className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-500" />
    },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1'), icon: <MessageCircle size={20} /> },
    { title: '02', body: t('home.what.step2'), icon: <ShieldCheck size={20} /> },
    { title: '03', body: t('home.what.step3'), icon: <Clock size={20} /> },
    { title: '04', body: t('home.what.step4'), icon: <CheckCircle2 size={20} /> },
    { title: '05', body: t('home.what.step5'), icon: <CheckCircle2 size={20} /> }
  ];

  const areas = [
    t('service.ac.areas.item1'),
    t('service.ac.areas.item2'),
    t('service.ac.areas.item3')
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <Layout>
      {/* 1️⃣ Modern Split Hero Section */}
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        </div>

        <div className="container-sahli relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              {t('services.status.soon')}
            </div>

            <h1 className="text-foreground text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter mb-8">
              {t('services.lessons.title')}
            </h1>

            <div className="relative mb-10 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative p-8 rounded-3xl bg-foreground/[0.03] border border-border backdrop-blur-xl">
                <h2 className="text-primary text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight flex items-center gap-3">
                  <AlertCircle className="text-primary shrink-0" size={28} />
                  {t('services.lessons.title')}
                </h2>
                <p className="text-foreground/60 text-lg md:text-xl font-medium leading-relaxed">
                  {t('services.role.clarification')}
                </p>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-bold mb-10 max-w-2xl leading-tight tracking-tight">
              {t('service.v1.humanProblem.body')}
            </p>

            <div className="flex flex-wrap gap-4">
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
            initial={{ opacity: 0, scale: 0.9, x: dir === 'rtl' ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden border border-border shadow-2xl"
          >
            <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]), scale: 1.1 }} className="absolute inset-0">
              <img 
                src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg" 
                alt="Lessons and Lifestyle Service Qatar"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
            
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-background/80 backdrop-blur-md border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <div className="text-xs font-black tracking-widest text-primary uppercase">Expert Tutors</div>
                  <div className="text-foreground font-bold">Lifestyle Excellence</div>
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
                t('services.rules.lessons'),
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

      {/* 3️⃣ Service Categories */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-6">
              Our Educational Services
            </h2>
            <p className="text-foreground/50 font-bold text-lg uppercase tracking-widest">Master Your Future</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifestyleServices.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/20 transition-all duration-500 group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                  {cat.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-foreground mb-4 tracking-tight leading-none group-hover:text-primary transition-colors duration-500">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item: string, i: number) => (
                    <li key={i} className="flex gap-3 text-foreground/60 leading-relaxed text-base font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex gap-6 items-center max-w-4xl mx-auto"
          >
            <Info className="text-primary shrink-0" size={32} />
            <p className="text-lg md:text-xl font-bold text-primary/80 leading-relaxed">
              {t('services.lessons.rule')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4️⃣ How Coordination Works */}
      <section className="py-24 md:py-32 bg-foreground/[0.02] border-y border-border relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] mb-6">
              {t('how.flow.title')}
            </h2>
            <p className="text-foreground/50 font-bold text-lg uppercase tracking-widest">Seamless Coordination</p>
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
                  t('services.boundary.is.item1'),
                  t('services.boundary.is.item2'),
                  t('services.boundary.is.item3')
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
                {[
                  t('services.boundary.not.item1'),
                  t('services.boundary.not.item2'),
                  t('services.boundary.not.item3')
                ].map((item: string, i: number) => (
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

      {/* 8️⃣ Final CTA */}
      <section className="py-32 md:py-48 bg-background relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg" 
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
              {t('cta.final.title')}
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
          </motion.div>
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
