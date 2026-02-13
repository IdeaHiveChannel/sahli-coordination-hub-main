import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, MapPin, ShieldCheck, Clock, Star, Zap, Snowflake, Droplets, Wrench, Bug } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';
import { Link } from 'react-router-dom';

export default function ThePearl() {
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

  const districtServices = [
    { title: t('services.homeMaintenance.ac.title'), path: t('services.homeMaintenance.ac.path'), icon: <Snowflake size={24} /> },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path'), icon: <Zap size={24} /> },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path'), icon: <Bug size={24} /> },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path'), icon: <Droplets size={24} /> },
    { title: t('services.homeMaintenance.electrical.title'), path: t('services.homeMaintenance.electrical.path'), icon: <Zap size={24} /> },
    { title: t('nav.movingServices'), path: t('services.moving.path'), icon: <Wrench size={24} /> },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={20} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={20} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={20} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={20} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={20} /> }
  ];

  const neighborhoods = [
    'Porto Arabia', 'Viva Bahriya', 'Qanat Quartier', 'Abraj Quartier', 'Medina Centrale', 'Giardino Village', 'Floresta Gardens'
  ];

  return (
    <Layout>
      {/* 1️⃣ Hero Section */}
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
              src="https://images.unsplash.com/photo-1578895101408-1a3ee986794e?q=80&w=2070&auto=format&fit=crop" 
              alt="The Pearl Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-slate-950/10 z-0" />
        </div>
        
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
              <MapPin size={14} className="animate-pulse" />
              The Pearl-Qatar
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 leading-[1] tracking-tight text-white drop-shadow-2xl font-black w-full text-center md:text-start">
              Home Services <br className="hidden md:block" /> in The Pearl
            </h1>

            <motion.div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-white/80 mb-6 md:mb-10 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                Luxury coordination for The Pearl's island living. We manage high-standard maintenance, cleaning, and specialized services for your waterfront home.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink('Hi SAHLI, I need home services in The Pearl. Can you coordinate a provider for me?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('The Pearl Hero CTA')}
                  className="cta-primary px-5 py-2.5 text-[10px] sm:text-[11px] btn-shine shadow-xl shadow-primary/30"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageSquare size={18} className="fill-primary-foreground" />
                    {t('cta.request')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ Districts/Neighborhoods Marquee */}
      <section className="py-8 bg-foreground/[0.02] border-y border-border overflow-hidden">
        <Marquee speed={0.3} className="px-4">
          {neighborhoods.map((name, i) => (
            <div key={i} className="flex items-center gap-2 px-8 py-2 rounded-full bg-background border border-border mx-4">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm font-bold uppercase tracking-widest text-foreground/60">{name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* 3️⃣ Services Grid */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl mb-4 md:mb-6 font-black">
              Services We Coordinate in The Pearl
            </h2>
            <p className="text-[10px] sm:text-[11px] md:text-xs text-foreground/60">
              Catering to the unique requirements of island living with professional service coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtServices.map((service, i) => (
              <Link key={i} to={service.path}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <h3 className="text-base md:text-lg font-black mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <div className="mt-auto flex items-center gap-2 text-primary font-bold text-xs">
                    Learn More <CheckCircle2 size={14} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Why SAHLI in The Pearl */}
      <section className="section-spacing bg-foreground/5 relative overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xl md:text-2xl mb-8 font-black">
                Island Standard <br /> Service Coordination
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Waterfront Experts', body: 'Our providers are experienced in the specific maintenance needs of waterfront and marine-adjacent properties.' },
                  { title: 'Premium Vetting', body: 'Only the highest-rated service providers are selected for The Pearl’s luxury residential standard.' },
                  { title: 'Convenience First', body: 'We manage the logistics of coordinating with tower management and security for seamless service delivery.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Star size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-1">{item.title}</h4>
                      <p className="text-[10px] sm:text-[11px] md:text-xs text-foreground/60">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-border shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/14840714/pexels-photo-14840714.jpeg" 
                alt="The Pearl-Qatar" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Coordination Process */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl mb-4 md:mb-6 font-black">
              {t('home.how.title')}
            </h2>
            <p className="text-[10px] sm:text-[11px] md:text-xs text-foreground/60">
              {t('home.how.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 relative">
            {coordinationSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group p-6 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/50 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(step.icon as React.ReactElement, { size: 18 })}
                </div>
                <div className="text-3xl font-black text-primary/10 mb-2">{step.title}</div>
                <p className="text-[10px] sm:text-[11px] md:text-xs font-medium leading-relaxed text-foreground/70 group-hover:text-foreground transition-colors duration-500">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ Final CTA */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-10 md:p-16 rounded-[3rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-6 relative z-10">Ready to coordinate in The Pearl?</h2>
            <p className="text-xs md:text-sm mb-10 opacity-90 relative z-10">Message SAHLI on WhatsApp for verified home services.</p>
            <a
              href={getWhatsAppLink('Hi SAHLI, I need home services in The Pearl. Can you coordinate a provider for me?')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('The Pearl Footer CTA')}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white text-primary rounded-xl font-black text-[10px] sm:text-[11px] hover:scale-105 transition-transform relative z-10"
            >
              <MessageSquare size={18} className="fill-current" />
              {t('cta.request')}
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
