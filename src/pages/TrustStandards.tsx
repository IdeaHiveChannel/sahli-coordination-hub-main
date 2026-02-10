import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Shield, CheckCircle2, Eye, FileSearch, UserCheck, Scale, MessageSquare, Target, HeartHandshake, ClipboardList, Fingerprint } from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export default function TrustStandards() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  const standards = [
    {
      number: t('trust.vetting.number'),
      title: t('trust.vetting.title'),
      items: [t('trust.vetting.item1'), t('trust.vetting.item2')],
      icon: <Fingerprint size={24} />
    },
    {
      number: t('trust.competency.number'),
      title: t('trust.competency.title'),
      items: [t('trust.competency.item1')],
      icon: <Target size={24} />
    },
    {
      number: t('trust.behavioral.number'),
      title: t('trust.behavioral.title'),
      items: [t('trust.behavioral.item1')],
      icon: <HeartHandshake size={24} />
    },
    {
      number: t('trust.rules.number'),
      title: t('trust.rules.title'),
      items: [t('trust.rules.item1'), t('trust.rules.item2'), t('trust.rules.item3')],
      icon: <ClipboardList size={24} />
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-[40svh] md:min-h-[50svh] flex flex-col justify-center overflow-hidden bg-background">
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
              src="https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1920&fm=webp&fit=crop" 
              alt={t('trust.hero.alt')} 
              crossOrigin="anonymous"
              loading="lazy"
              className="w-full h-full object-cover object-[75%_center] md:object-center"
            />
          </motion.div>
          {/* Darker overlays to make images pop and remove whitish haze */}
          <div className="absolute inset-0 bg-slate-950/20 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-background z-10" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-slate-950/40 via-transparent to-transparent z-10`} />
          
          {/* Floating Background Blobs */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/20 rounded-full blur-[80px] md:blur-[160px] animate-pulse-slow z-0`} />
          <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[200px] h-[200px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow delay-1000 z-0`} />
        </div>

        <div className="container-sahli relative z-10 pt-36 md:pt-48 pb-6 md:pb-8 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center md:items-start"
            style={{ y: y2Spring }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full border border-primary/30 text-[10px] font-black tracking-widest uppercase mb-4 shadow-lg btn-shine mx-auto md:mx-0"
            >
              <Shield size={12} className="text-primary" />
              {t('trust.hero.label')}
            </motion.div>

            <h1 className="text-display text-foreground max-w-4xl mb-4 md:mb-6 w-full text-center md:text-start">
              {t('trust.hero.title')}
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-xl lg:text-2xl text-foreground/70 max-w-2xl font-medium w-full text-center md:text-start"
            >
              {t('trust.hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="relative py-8 md:py-16 bg-background overflow-hidden border-y border-border">
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {standards.map((standard, i) => (
              <motion.div 
                key={i}
                className="flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-primary/40 font-black text-display-sm tracking-tighter">
                    {standard.number} <span className="opacity-20">/</span>
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {standard.icon}
                  </div>
                </div>
                
                <div className="flex-1 p-6 rounded-[1.5rem] glass-morphism border border-border group hover:border-primary/20 transition-all duration-700 flex flex-col hover:shadow-lg">
                  <div className="mb-1.5 text-[10px] font-black uppercase tracking-widest !text-foreground/40">
                    {t('trust.standard')}
                  </div>
                  <h3 className="text-[0.9rem] md:text-[1rem] font-bold mb-4 text-foreground">
                    {standard.title}
                  </h3>
                  
                  <ul className="space-y-3 mt-auto">
                    {standard.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-[0.8rem] md:text-[0.85rem] text-foreground/70 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* During Service (Independent Execution) */}
      <section className="relative py-8 md:py-16 bg-background overflow-hidden">
        <div className="container-sahli relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto p-6 md:p-10 rounded-[2rem] bg-foreground/5 border border-border relative overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 bg-primary/20 rounded-full border border-primary/30 text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8">
              {t('trust.blackbox.title')}
            </div>
            <h2 className="text-display-sm mb-4 md:mb-6 text-foreground">
              {t('trust.blackbox.title')}
            </h2>
            <p className="text-[0.85rem] md:text-sm text-foreground/70 leading-relaxed">
              {t('trust.blackbox.body')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* After Service (Audit & Witness) */}
      <section className="relative py-8 md:py-16 bg-background overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="mb-8 md:mb-12">
            <div className="inline-block px-3 py-1 bg-foreground/5 rounded-full border border-border text-[10px] font-black uppercase tracking-widest !text-foreground/50 mb-4 md:mb-6">
              {t('trust.audit.title')}
            </div>
            <h2 className="text-display-sm text-foreground">
              {t('trust.audit.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { title: t('trust.audit.title'), body: t('trust.audit.body'), icon: <FileSearch size={24} /> },
              { title: t('trust.witness.title'), body: t('trust.witness.body'), icon: <Eye size={24} /> }
            ].map((item: { title: string; body: string; icon: React.ReactNode }, i: number) => (
              <motion.div 
                key={i}
                className="p-6 md:p-8 rounded-[2rem] glass-morphism border border-border group hover:border-primary/20 transition-all duration-700 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center text-primary mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-[0.9rem] md:text-[1rem] font-bold mb-3 md:mb-4 text-foreground">{item.title}</h3>
                <p className="text-[0.8rem] md:text-[0.85rem] text-foreground/60 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Implications */}
      <section className="relative py-8 md:py-16 bg-background overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="mb-8 md:mb-12">
            <h2 className="text-display-sm text-foreground">
              {t('trust.customer.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              t('trust.customer.point1'),
              t('trust.customer.point2'),
              t('trust.customer.point3'),
              t('trust.customer.point4')
            ].map((point: string, i: number) => (
              <motion.div 
                key={i}
                className="p-5 md:p-6 rounded-[1.25rem] bg-foreground/[0.02] border border-border hover:border-primary/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className={`text-[0.8rem] md:text-[0.85rem] text-foreground leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 md:py-16 bg-background overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-display-sm mb-4 md:mb-6 text-foreground">
              {t('trust.cta.title')}
            </h2>
            <p className="text-[0.9rem] md:text-[1rem] text-foreground/60 mb-8 md:mb-10 leading-relaxed">
              {t('trust.cta.body')}
            </p>
            <a
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Trust Standards Page')}
              className="cta-primary btn-shine"
            >
              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ y: -3 }}
              >
                <MessageSquare size={18} />
                {t('trust.cta.whatsapp')}
              </motion.div>
            </a>
            
            <p className="mt-12 md:mt-16 text-[0.7rem] md:text-[0.75rem] text-foreground/40 font-black uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
              {t('trust.micro.clarity')}
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
