import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Shield, 
  CheckCircle2, 
  Eye, 
  FileSearch, 
  MessageSquare, 
  Target, 
  HeartHandshake, 
  ClipboardList, 
  Fingerprint,
  Sparkles
} from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export default function TrustStandards() {
  const { t, dir, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40,
    });
  };

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
      {/* Advanced Hero Section */}
      <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center md:justify-end overflow-hidden bg-slate-950"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              x: mousePos.x * 0.2,
              rotate: mousePos.y * 0.02
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1920&fm=webp&fit=crop" 
              alt={t('trust.hero.alt')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover scale-110 grayscale"
            />
          </motion.div>
          
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {/* Advanced Overlays removed as per user request */}
          <div className="absolute inset-0 bg-slate-950/10 z-0" />
          
          {/* Premium Animated Blobs */}
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/3' : 'right-1/3'} w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen z-0`} 
          />
        </div>

        <div className="container-sahli relative z-20 pt-24 pb-12 md:pb-20 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-primary/20 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/70 mb-8 md:mb-10 mx-auto md:mx-0 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Shield size={14} className="text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
              {t('trust.hero.label')}
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl mb-4 md:mb-6 leading-[1] tracking-tight text-white drop-shadow-2xl font-black w-full text-center md:text-start">
              {t('trust.hero.title').split(' ').map((word, i) => (
                <div key={i} className="overflow-hidden inline-block mr-[0.3em]">
                  <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.08), duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg lg:text-xl xl:text-2xl !text-white/90 mb-6 md:mb-10 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0"
            >
              {t('trust.hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>

        {/* Advanced Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary via-primary/20 to-transparent relative">
            <motion.div 
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
            />
          </div>
        </motion.div>
      </section>

      {/* Standards Section - Enhanced Grid */}
      <section className="section-spacing bg-background relative overflow-hidden border-y border-border">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((standard, i) => (
              <motion.div 
                key={i}
                className="flex flex-col h-full group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-primary/40 font-black text-4xl md:text-5xl tracking-tighter transition-all duration-500 group-hover:text-primary group-hover:scale-110">
                    {standard.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl group-hover:rotate-12">
                    {standard.icon}
                  </div>
                </div>
                
                <div className="flex-1 p-8 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-xl border border-primary/10 group-hover:border-primary/40 transition-all duration-700 flex flex-col group-hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)] group-hover:-translate-y-2 group-hover:bg-primary/[0.02]">
                  <div className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 group-hover:text-primary transition-colors">
                    {t('trust.standard')}
                  </div>
                  <h3 className="text-xl font-black mb-6 text-foreground tracking-tight leading-none uppercase group-hover:text-primary transition-colors">
                    {standard.title}
                  </h3>
                  
                  <ul className="space-y-4 mt-auto">
                    {standard.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group/item">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-all duration-300 shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]" />
                        <span className="text-sm md:text-base text-foreground/70 leading-relaxed font-medium group-hover/item:text-foreground transition-colors">
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

      {/* During Service - Independent Execution - Architectural */}
      <section className="section-spacing bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,transparent_70%)] opacity-10" />
        </div>

        <div className="container-sahli relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto p-8 md:p-16 rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/10 relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">
                  <Sparkles size={14} />
                  {lang === 'ar' ? 'الاستقلالية' : 'Independence'}
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter leading-none">
                  {t('trust.blackbox.title')}
                </h2>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                  {t('trust.blackbox.body')}
                </p>
              </div>
              <div className="md:col-span-5 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-dashed border-white/10 animate-spin-slow flex items-center justify-center">
                    <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                  </div>
                  <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 text-white opacity-20" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* After Service - Audit & Witness */}
      <section className="section-spacing bg-background relative overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-foreground/5 rounded-full border border-border text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50">
                <FileSearch size={14} />
                {t('trust.audit.title')}
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tighter leading-none">
                {lang === 'ar' ? 'المراقبة والتحقق' : 'Monitoring & Verification'}
              </h2>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: t('trust.audit.title'), body: t('trust.audit.body'), icon: <FileSearch size={32} /> },
              { title: t('trust.witness.title'), body: t('trust.witness.body'), icon: <Eye size={32} /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="p-10 md:p-12 rounded-[3rem] bg-foreground/[0.02] border border-primary/10 group hover:border-primary/40 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)] hover:-translate-y-2 hover:bg-primary/[0.01]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:rotate-6 shadow-xl group-hover:shadow-primary/20">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-6 text-foreground uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-lg text-foreground/60 leading-relaxed font-medium group-hover:text-foreground/80 transition-colors">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Implications - Premium Grid */}
      <section className="section-spacing bg-slate-950 relative overflow-hidden border-t border-white/5">
        <div className="container-sahli relative z-10">
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">
              {t('trust.customer.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              t('trust.customer.point1'),
              t('trust.customer.point2'),
              t('trust.customer.point3'),
              t('trust.customer.point4')
            ].map((point, i) => (
              <motion.div 
                key={i}
                className="p-8 rounded-[2rem] bg-white/[0.03] border border-primary/10 hover:border-primary/40 transition-all duration-500 group hover:bg-primary/[0.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg">
                  <CheckCircle2 size={16} />
                </div>
                <p className={`text-base text-white/70 leading-relaxed font-medium group-hover:text-white transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="section-spacing bg-background relative overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black mb-8 text-foreground tracking-tighter leading-tight">
              {t('trust.cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 mb-12 md:mb-16 leading-relaxed font-medium max-w-2xl mx-auto">
              {t('trust.cta.body')}
            </p>
            
            <a
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Trust Standards Page')}
              className="group relative inline-flex items-center gap-8 py-4 px-4 bg-slate-950 rounded-full border border-white/10 hover:border-primary/50 transition-all duration-500"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                  <MessageSquare className="w-8 h-8 text-white fill-white/20" />
                </div>
              </div>
              <div className="flex flex-col text-start pr-8 pl-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
                <span className="text-lg font-black text-white uppercase tracking-wider">{t('trust.cta.whatsapp')}</span>
              </div>
            </a>
            
            <div className="mt-20 pt-10 border-t border-border">
              <p className="text-[10px] md:text-xs text-foreground/40 font-black uppercase tracking-[0.4em] max-w-3xl mx-auto leading-loose">
                {t('trust.micro.clarity')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
