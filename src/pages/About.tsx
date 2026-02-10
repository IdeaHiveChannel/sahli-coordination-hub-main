import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageSquare, XCircle, ShieldCheck, Zap, Users, Calculator, FileText } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export default function About() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  const notList = [
    { title: t('about.not.marketplace'), icon: <Users className="w-4 h-4" /> },
    { title: t('about.not.provider'), icon: <ShieldCheck className="w-4 h-4" /> },
    { title: t('about.not.execution'), icon: <Zap className="w-4 h-4" /> },
    { title: t('about.not.pricing'), icon: <Calculator className="w-4 h-4" /> },
    { title: t('about.not.contract'), icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <Layout>
      {/* Hero Section - Compact and Advanced */}
      <section ref={containerRef} className="relative min-h-[40svh] md:min-h-[50svh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              opacity: opacity
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920&auto=format&fit=crop" 
              alt={t('nav.about')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-[75%_center] md:object-center opacity-100 scale-105"
            />
          </motion.div>
          {/* Darker overlays to make images pop and remove whitish haze */}
          <div className="absolute inset-0 bg-slate-950/20 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-background z-10" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-slate-950/40 via-transparent to-transparent z-10`} />
          
          {/* Floating Background Blobs for homepage design base */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[140px] animate-pulse-slow`} />
          <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[200px] h-[200px] bg-primary/5 rounded-full blur-[100px] animate-pulse-slow`} />
        </div>

        <div className="container-sahli relative z-10 pt-36 md:pt-48 pb-4 flex flex-col items-center md:items-start">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-0.5 bg-primary/20 rounded-full border border-primary/30 text-[10px] font-black tracking-widest uppercase mb-2 shadow-md btn-shine mx-auto md:mx-0"
          >
            <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain" />
            {t('nav.about')}
          </motion.div>

          <h1 className="text-display text-foreground max-w-4xl mb-2 md:mb-3 w-full text-center md:text-start">
            {t('about.title').split(' ').map((word: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                className="inline-block me-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>
      </section>

      {/* Why We Exist - Compact Split Layout */}
      <section className="relative py-6 md:py-12 bg-background overflow-hidden border-y border-border/50">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-primary/5 rounded-full blur-[100px] md:blur-[160px] animate-pulse-slow z-0`} />
        </div>
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 p-6 md:p-8 rounded-[2.5rem] bg-foreground/[0.02] backdrop-blur-md border border-border/50"
            >
              <h2 className="text-display-sm mb-2 md:mb-3 text-foreground">
                {t('about.reason.title')}
              </h2>
              <p className="text-[0.85rem] md:text-sm !text-foreground/70 leading-relaxed">
                {t('about.reason.body')}
              </p>
            </motion.div>
            
            <motion.div
              className="relative aspect-video lg:aspect-[21/9] rounded-xl overflow-hidden border border-border/50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" 
                alt={t('about.reason.alt')} 
                className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What SAHLI Is Not - Compact Grid */}
      <section className="relative py-6 md:py-12 bg-background overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow delay-1000 z-0`} />
        </div>
        <div className="container-sahli relative z-10">
          <div className="flex flex-col items-center mb-4 md:mb-6">
            <h2 className="text-center text-display-sm text-foreground">
              {t('about.not.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-7xl mx-auto">
            {notList.map((item, i: number) => (
              <motion.div
                key={i}
                className="p-3 md:p-4 rounded-2xl bg-foreground/[0.02] backdrop-blur-md border border-border hover:border-primary/30 transition-all duration-700 group text-center relative overflow-hidden hover:shadow-2xl hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 relative shadow-inner">
                  {item.icon}
                  <div className="absolute -top-1 -right-1 bg-white rounded-full shadow-sm p-0.5">
                    <XCircle className="w-3 h-3 text-primary" />
                  </div>
                </div>
                <h3 className="text-[0.75rem] font-black text-foreground/80 group-hover:text-foreground transition-colors uppercase tracking-widest">{item.title}</h3>
                
                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision/Position - Architectural Focus - Compact */}
      <section className="relative py-6 md:py-12 bg-background overflow-hidden border-y border-border/50">
        <div className="container-sahli relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center p-6 md:p-10 rounded-[3rem] bg-foreground/[0.03] backdrop-blur-xl border border-border/50 relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 text-[10px] font-black uppercase tracking-widest text-primary mb-4 btn-shine">
                <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain" />
                {t('about.position.title')}
              </div>
              <p className="text-[0.85rem] md:text-[0.95rem] text-foreground/80 italic font-medium leading-relaxed max-w-2xl mx-auto">
                {t('about.position.body')}
              </p>
            </div>
            {/* Architectural accent */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Consistent and Compact */}
      <section className="py-12 md:py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/2 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow z-0`} />
        </div>
        <div className="container-sahli text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 shadow-inner">
              <MessageSquare size={32} />
            </div>
            <h2 className="text-display-sm mb-4 md:mb-6">
              {t('cta.final.title')}
            </h2>
            <p className="text-[0.85rem] md:text-sm !text-foreground/60 mb-8 md:mb-12 max-w-lg mx-auto leading-relaxed">
              {t('cta.final.body')}
            </p>
            <a
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('About Page')}
              className="cta-primary px-12 py-6 btn-shine shadow-xl shadow-primary/20"
            >
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare size={20} className="fill-primary-foreground" />
                {t('cta.final.cta')}
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

