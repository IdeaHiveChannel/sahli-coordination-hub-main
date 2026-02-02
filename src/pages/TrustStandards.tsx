import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Shield, CheckCircle2, Eye, FileSearch, UserCheck, Scale, MessageCircle, Target, HeartHandshake, ClipboardList, Fingerprint } from 'lucide-react';

import { WHATSAPP_LINK } from '@/lib/constants';

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
      icon: <Fingerprint size={28} />
    },
    {
      number: t('trust.competency.number'),
      title: t('trust.competency.title'),
      items: [t('trust.competency.item1')],
      icon: <Target size={28} />
    },
    {
      number: t('trust.behavioral.number'),
      title: t('trust.behavioral.title'),
      items: [t('trust.behavioral.item1')],
      icon: <HeartHandshake size={28} />
    },
    {
      number: t('trust.rules.number'),
      title: t('trust.rules.title'),
      items: [t('trust.rules.item1'), t('trust.rules.item2'), t('trust.rules.item3')],
      icon: <ClipboardList size={28} />
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-[50vh] md:min-h-[55vh] flex flex-col justify-center overflow-hidden bg-background">
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
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover opacity-[0.15] grayscale"
            >
              {/* <source src="https://videos.pexels.com/video-files/4492147/4492147-uhd_2560_1440_25fps.mp4" type="video/mp4" /> */}
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1200&fm=webp&fit=crop" 
                alt={t('trust.hero.alt')} 
                crossOrigin="anonymous"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-background via-background/80 to-transparent`} />
          
          {/* Floating Background Blobs */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[140px] mix-blend-screen animate-pulse-slow`} />
        </div>

        <div className="container-sahli relative z-10 pt-28 md:pt-24 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start text-center md:text-start max-w-4xl"
            style={{ y: y2Spring }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <img 
                src="/logos/Sahl Logo 9.png" 
                alt={t('trust.seal.alt')} 
                className="relative w-16 h-16 md:w-20 md:h-20 object-contain filter brightness-0 invert opacity-80" 
              />
            </motion.div>

            <h1 className="mb-6 text-foreground text-3xl sm:text-4xl md:text-5xl font-black leading-[0.9] tracking-tighter">
              {t('trust.label')}
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/60 font-medium leading-tight max-w-2xl mb-8 md:mb-10">
              {t('trust.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="relative py-16 md:py-24 bg-background overflow-hidden border-y border-border">
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {standards.map((standard, i) => (
              <motion.div 
                key={i}
                className="flex flex-col h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-primary/40 font-black text-4xl md:text-5xl tracking-tighter">
                    {standard.number} <span className="opacity-20">/</span>
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {standard.icon}
                  </div>
                </div>
                
                <div className="flex-1 p-8 rounded-[2rem] glass-morphism border border-border group hover:border-primary/20 transition-all duration-700 flex flex-col">
                  <div className="mb-2 text-[10px] font-bold tracking-widest uppercase text-foreground/40">
                    {t('trust.standard')}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-foreground leading-none">
                    {standard.title}
                  </h3>
                  
                  <ul className="space-y-4 mt-auto">
                    {standard.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-foreground/70 font-bold text-sm md:text-base leading-tight">
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
      <section className="relative py-16 md:py-20 bg-background overflow-hidden">
        <div className="container-sahli relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-foreground/5 border border-border relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-bold tracking-widest uppercase mb-8 md:mb-10">
              {t('trust.blackbox.title')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-none mb-6 md:mb-8">
              {t('trust.blackbox.title')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-medium">
              {t('trust.blackbox.body')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* After Service (Audit & Witness) */}
      <section className="relative py-16 md:py-20 bg-background overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="mb-12 md:mb-16">
            <div className="inline-block px-4 py-1.5 bg-foreground/5 rounded-full border border-border text-foreground/50 text-[10px] font-bold tracking-widest uppercase mb-6 md:mb-8">
              {t('trust.audit.title')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-none">
              {t('trust.audit.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: t('trust.audit.title'), body: t('trust.audit.body'), icon: <FileSearch size={32} /> },
              { title: t('trust.witness.title'), body: t('trust.witness.body'), icon: <Eye size={32} /> }
            ].map((item: { title: string; body: string; icon: React.ReactNode }, i: number) => (
              <motion.div 
                key={i}
                className="p-8 md:p-10 rounded-[2.5rem] glass-morphism border border-border group hover:border-primary/20 transition-all duration-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center text-primary mb-8 md:mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tight text-foreground leading-none">{item.title}</h3>
                <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-medium">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Implications */}
      <section className="relative py-16 md:py-20 bg-background overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-none">
              {t('trust.customer.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              t('trust.customer.point1'),
              t('trust.customer.point2'),
              t('trust.customer.point3'),
              t('trust.customer.point4')
            ].map((point: string, i: number) => (
              <motion.div 
                key={i}
                className="p-6 md:p-8 rounded-[1.5rem] bg-foreground/[0.02] border border-border hover:border-primary/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className={`text-base md:text-lg font-bold text-foreground leading-tight ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-24 bg-background overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-6 md:mb-8 text-foreground leading-[0.9]">
              {t('trust.cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 mb-10 md:mb-12 font-medium">
              {t('trust.cta.body')}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary btn-shine px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl shadow-2xl shadow-primary/20 inline-flex items-center gap-4"
            >
              <MessageCircle size={24} />
              {t('trust.cta.whatsapp')}
            </motion.a>
            
            <p className="mt-16 md:mt-20 text-sm md:text-base text-foreground/40 font-medium max-w-2xl mx-auto leading-relaxed">
              {t('trust.micro.clarity')}
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
