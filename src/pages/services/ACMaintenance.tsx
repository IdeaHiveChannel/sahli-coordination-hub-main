import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Snowflake, ShieldCheck, Clock, MapPin, ArrowUp } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function ACMaintenance() {
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
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.ac.title'), path: t('services.homeMaintenance.ac.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const includes = [
    'Complete Filter Cleaning',
    'Evaporator Coil Check',
    'Condenser Coil Cleaning',
    'Gas Pressure Verification',
    'Drain Line Clearing',
    'Electrical Component Test'
  ];

  const areas = [
    t('home.areas.item1'),
    t('home.areas.item2'),
    t('home.areas.item3')
  ];

  return (
    <Layout>
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
              src="/Services/AC Maintenance.jpg" 
              alt="Professional AC Maintenance Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-slate-950/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-0" />
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
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-xs font-black tracking-[0.2em] uppercase text-primary mb-3 md:mb-4 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <Snowflake size={16} className="animate-pulse" />
              AC Maintenance Qatar
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-[1.1] tracking-tight text-white drop-shadow-2xl font-black w-full text-center md:text-start">
              Preventive AC Maintenance
            </h1>

            <motion.div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-base md:text-lg !text-white/90 mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-xl mx-auto md:mx-0">
                Protect your cooling system with scheduled maintenance. We coordinate certified technicians for thorough inspections and cleaning across Doha.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.ac.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('AC Maintenance Hero')}
                  className="cta-primary px-8 py-4 text-xs btn-shine shadow-xl shadow-primary/30"
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

      {/* Service Rules */}
      <section className="py-12 md:py-16 bg-background border-y border-border/50">
        <div className="container-sahli">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-foreground/[0.02] border border-border rounded-xl p-5 md:p-6"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-center font-bold">
              Maintenance Standards
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={16}>
              {[
                t('services.rules.inspection'),
                'Specialized Equipment Used',
                'Performance Report Provided',
                t('services.rules.payment')
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

      {/* Includes */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-6 md:mb-8 text-center md:text-start">
            What Maintenance Includes
          </h2>
          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {includes.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-5 md:p-6 rounded-xl bg-foreground/[0.02] border border-border hover:border-primary/40 hover:bg-foreground/[0.04] transition-all duration-500 shrink-0 w-[260px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <CheckCircle2 size={16} />
                </div>
                <h3 className="text-xs font-bold mb-2">{item}</h3>
                <div className="w-8 h-0.5 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-spacing bg-foreground/[0.02] border-t border-border">
        <div className="container-sahli">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-center md:text-start font-black">
            {t('services.related.title')}
          </h2>
          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {relatedServices.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="group p-5 rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 shrink-0 w-[260px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-wider">
                    {service.title}
                  </span>
                  <ArrowUp className="w-4 h-4 rotate-45 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </div>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      <section className="py-10 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-xs font-bold !text-foreground/60 group-hover:text-foreground transition-colors uppercase tracking-widest">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
