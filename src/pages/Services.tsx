import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { 
  ChevronDown, 
  MessageSquare, 
  Wrench, 
  Sparkles, 
  Truck,
  Heart, 
  BookOpen,
  CheckCircle2,
  Wind,
  Zap,
  Droplets,
  Tv,
  Hammer,
  Bug,
  Home,
  Sofa,
  Waves,
  Box,
  HardHat,
  Shield,
  Snowflake,
  Cog,
  Baby,
  Stethoscope,
  Activity,
  Star,
  Music,
  Dumbbell,
  Smartphone,
  ShieldCheck,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { WHATSAPP_LINK } from '@/lib/constants';

interface CollapsibleModuleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string;
  isOpen: boolean;
  onToggle: () => void;
}

function CollapsibleModule({ icon, title, description, items, isOpen, onToggle }: CollapsibleModuleProps) {
  const { dir } = useLanguage();
  
  return (
    <div className={`border-b border-border last:border-0 transition-all duration-700 ${isOpen ? 'bg-foreground/[0.03] backdrop-blur-md' : 'hover:bg-foreground/[0.01]'}`}>
      <button
        onClick={onToggle}
        className="w-full py-3 md:py-4 flex items-center justify-between group transition-all px-4 md:px-5"
      >
        <div className="flex items-center gap-5 md:gap-7">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-2 md:p-3 rounded-xl glass-morphism text-primary transition-all duration-500 shadow-2xl ${isOpen ? 'bg-primary text-primary-foreground scale-110 shadow-primary/20' : 'group-hover:bg-primary/10'}`}
          >
            {React.cloneElement(icon as React.ReactElement, { size: 18 })}
          </motion.div>
          <div className="text-start">
            <h3 className={`text-base md:text-lg font-black tracking-tight mb-1 transition-all duration-500 ${isOpen ? 'text-foreground' : 'text-foreground/70 group-hover:text-foreground'}`}>
              {title}
            </h3>
            <p className={`text-start text-[10px] md:text-xs font-medium transition-all duration-500 ${isOpen ? 'text-foreground' : 'text-foreground/60 group-hover:text-foreground/80'}`}>
              {description}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ 
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.2 : 1
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`transition-colors duration-500 ${isOpen ? 'text-primary' : 'text-foreground/20 group-hover:text-primary/50'}`}
        >
          <ChevronDown size={20} strokeWidth={3} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className={`pb-7 ps-4 md:ps-[64px] pe-4 md:pe-7 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5`}>
              {items.split('\n').map((item: string, idx: number) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
                  className="flex items-start gap-3 text-foreground font-semibold text-sm group/item py-1"
                >
                  <img src="/logos/SahlLogo9.png" alt="" loading="lazy" className="w-3 h-3 object-contain opacity-40 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300 shadow-sm shadow-primary/20 mt-1" />
                  <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const { t, dir, lang } = useLanguage();
  const location = useLocation();
  const [activeRoof, setActiveRoof] = useState('home-maintenance');
  const [openModule, setOpenModule] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.2]), springConfig);
  const yText = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), springConfig);

  const roofs = React.useMemo(() => [
    { id: 'home-maintenance', label: t('services.homeMaintenance.title') },
    { id: 'cleaning', label: t('services.cleaning.title') },
    { id: 'moving', label: t('services.moving.title') },
    { id: 'outdoor', label: t('services.outdoor.title') },
    { id: 'care', label: t('services.care.title') },
    { id: 'tech', label: t('services.electronics.title') },
  ], [t]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = roofs.map((roof: { id: string }) => document.getElementById(roof.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveRoof(roofs[index].id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [roofs]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setActiveRoof(id);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const handleRoofClick = (id: string) => {
    setActiveRoof(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero / Selector Area - Compact & Advanced */}
      <section ref={containerRef} className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden bg-background">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ 
              y: y,
              scale: scale,
              opacity: opacity
            }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover grayscale opacity-[0.15] scale-110"
            >
              {/* <source src="https://videos.pexels.com/video-files/4492147/4492147-uhd_2560_1440_25fps.mp4" type="video/mp4" /> */}
            </video>
            <div className={`absolute inset-0 bg-gradient-to-r ${lang === 'ar' ? 'from-primary/20 via-transparent to-transparent' : 'from-transparent via-transparent to-primary/20'} mix-blend-overlay opacity-30`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.1),transparent_70%)]" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
        </div>

        <div className="container-sahli relative z-10 pt-20 md:pt-28 pb-10 md:pb-10">
          <motion.div
            style={{ y: yText }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="mb-6 md:mb-8 text-foreground text-4xl sm:text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter">
              {t('services.title').split(' ').map((word: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                  className="inline-block me-[0.2em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg text-foreground/80 font-medium leading-tight max-w-2xl mb-6 md:mb-8 mx-auto"
            >
              {t('services.intro')}
            </motion.p>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[10px] md:text-xs text-primary font-black uppercase tracking-widest opacity-60"
            >
              {t('footer.intermediary')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Selector - Enhanced Visuals */}
      <div className="sticky top-[56px] md:top-[64px] z-40 w-full glass-morphism border-y border-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="container-sahli relative">
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-3 scroll-smooth items-center md:justify-center">
            {roofs.map((roof: { id: string; label: string; status?: string }, idx: number) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={roof.id}
                onClick={() => handleRoofClick(roof.id)}
                className={`relative group whitespace-nowrap px-4 py-2.5 md:px-5 md:py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-700 flex items-center gap-4 ${
                  activeRoof === roof.id
                    ? 'text-primary-foreground'
                    : 'text-foreground/40 hover:text-foreground'
                }`}
              >
                {activeRoof === roof.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full -z-10 shadow-2xl shadow-primary/40"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-4">
                  {activeRoof === roof.id ? (
                    <img src="/logos/SahlLogo9.png" alt="" loading="lazy" className="w-4 h-4 object-contain brightness-0 invert" />
                  ) : (
                    <img src="/logos/SahlLogo9.png" alt="" loading="lazy" className="w-4 h-4 object-contain opacity-20 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
                  )}
                  {roof.label}
                  {roof.status === 'comingSoon' && (
                    <span className="text-[8px] px-1.5 py-0.5 rounded-sm bg-primary/20 text-primary border border-primary/30">
                      {t('services.status.comingSoon')}
                    </span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* Scroll Indicator (Mobile) */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden" />
        </div>
      </div>

      {/* Roof 1: Home Maintenance - Compact */}
      <section id="home-maintenance" className="relative py-8 md:py-16 scroll-mt-32 bg-background overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Wrench size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 01
                  </span>
                </div>
                <h2 className="mb-4 md:mb-6 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.homeMaintenance.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 md:mb-8 leading-tight">
                  {t('services.homeMaintenance.body')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-4 h-4" />
                    </div>
                    <p className="text-[13px] font-bold text-foreground/80 leading-tight">
                      {t('services.homeMaintenance.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-foreground/[0.02] rounded-2xl border border-border shadow-xl overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Wind size={18} />}
                  title={t('services.homeMaintenance.ac.title')}
                  description={t('services.homeMaintenance.ac.desc')}
                  items={t('services.homeMaintenance.ac.items')}
                  isOpen={openModule === 'ac'}
                  onToggle={() => setOpenModule(openModule === 'ac' ? null : 'ac')}
                />
                <CollapsibleModule
                  icon={<Zap size={18} />}
                  title={t('services.homeMaintenance.electrical.title')}
                  description={t('services.homeMaintenance.electrical.desc')}
                  items={t('services.homeMaintenance.electrical.items')}
                  isOpen={openModule === 'electrical'}
                  onToggle={() => setOpenModule(openModule === 'electrical' ? null : 'electrical')}
                />
                <CollapsibleModule
                  icon={<Droplets size={18} />}
                  title={t('services.homeMaintenance.plumbing.title')}
                  description={t('services.homeMaintenance.plumbing.desc')}
                  items={t('services.homeMaintenance.plumbing.items')}
                  isOpen={openModule === 'plumbing'}
                  onToggle={() => setOpenModule(openModule === 'plumbing' ? null : 'plumbing')}
                />
                <CollapsibleModule
                  icon={<Hammer size={18} />}
                  title={t('services.homeMaintenance.handyman.title')}
                  description={t('services.homeMaintenance.handyman.desc')}
                  items={t('services.homeMaintenance.handyman.items')}
                  isOpen={openModule === 'handyman'}
                  onToggle={() => setOpenModule(openModule === 'handyman' ? null : 'handyman')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={WHATSAPP_LINK}
                  onClick={() => trackRequestClick('Services - Home Maintenance')}
                  className="cta-primary inline-flex shadow-xl shadow-primary/20 btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={18} className="fill-primary-foreground" />
                    {t('services.homeMaintenance.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 2: Cleaning & Coordination - Compact */}
      <section id="cleaning" className="relative py-8 md:py-16 bg-foreground/[0.01] scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Sparkles size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 02
                  </span>
                </div>
                <h2 className="mb-4 md:mb-6 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.cleaning.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 md:mb-8 leading-tight">
                  {t('services.cleaning.body')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Heart className="text-primary w-4 h-4" />
                    </div>
                    <p className="text-[13px] font-bold text-foreground/80 leading-tight">
                      {t('services.cleaning.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-foreground/[0.02] rounded-2xl border border-border shadow-xl overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Home size={18} />}
                  title={t('services.cleaning.general.title')}
                  description={t('services.cleaning.general.desc')}
                  items={t('services.cleaning.general.items')}
                  isOpen={openModule === 'general-cleaning'}
                  onToggle={() => setOpenModule(openModule === 'general-cleaning' ? null : 'general-cleaning')}
                />
                <CollapsibleModule
                  icon={<Sofa size={18} />}
                  title={t('services.cleaning.deep.title')}
                  description={t('services.cleaning.deep.desc')}
                  items={t('services.cleaning.deep.items')}
                  isOpen={openModule === 'deep-cleaning'}
                  onToggle={() => setOpenModule(openModule === 'deep-cleaning' ? null : 'deep-cleaning')}
                />
                <CollapsibleModule
                  icon={<Waves size={18} />}
                  title={t('services.cleaning.furniture.title')}
                  description={t('services.cleaning.furniture.desc')}
                  items={t('services.cleaning.furniture.items')}
                  isOpen={openModule === 'furniture-cleaning'}
                  onToggle={() => setOpenModule(openModule === 'furniture-cleaning' ? null : 'furniture-cleaning')}
                />
                <CollapsibleModule
                  icon={<Bug size={18} />}
                  title={t('services.cleaning.pest.title')}
                  description={t('services.cleaning.pest.desc')}
                  items={t('services.cleaning.pest.items')}
                  isOpen={openModule === 'pest-control'}
                  onToggle={() => setOpenModule(openModule === 'pest-control' ? null : 'pest-control')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={WHATSAPP_LINK}
                  onClick={() => trackRequestClick('Services - Cleaning')}
                  className="cta-primary inline-flex shadow-xl shadow-primary/20 btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={18} className="fill-primary-foreground" />
                    {t('services.cleaning.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 3: Moving & Storage - Compact */}
      <section id="moving" className="relative py-8 md:py-16 bg-background scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Truck size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 03
                  </span>
                </div>
                <h2 className="mb-4 md:mb-6 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.moving.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 md:mb-8 leading-tight">
                  {t('services.moving.body')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Shield className="text-primary w-4 h-4" />
                    </div>
                    <p className="text-[13px] font-bold text-foreground/80 leading-tight">
                      {t('services.moving.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-foreground/[0.02] rounded-2xl border border-border shadow-xl overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Box size={18} />}
                  title={t('services.moving.full.title')}
                  description={t('services.moving.full.desc')}
                  items={t('services.moving.full.items')}
                  isOpen={openModule === 'full-moving'}
                  onToggle={() => setOpenModule(openModule === 'full-moving' ? null : 'full-moving')}
                />
                <CollapsibleModule
                  icon={<Truck size={18} />}
                  title={t('services.moving.international.title')}
                  description={t('services.moving.international.desc')}
                  items={t('services.moving.international.items')}
                  isOpen={openModule === 'intl-moving'}
                  onToggle={() => setOpenModule(openModule === 'intl-moving' ? null : 'intl-moving')}
                />
                <CollapsibleModule
                  icon={<ShieldCheck size={18} />}
                  title={t('services.moving.storage.title')}
                  description={t('services.moving.storage.desc')}
                  items={t('services.moving.storage.items')}
                  isOpen={openModule === 'storage'}
                  onToggle={() => setOpenModule(openModule === 'storage' ? null : 'storage')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={WHATSAPP_LINK}
                  onClick={() => trackRequestClick('Services - Moving')}
                  className="cta-primary inline-flex shadow-xl shadow-primary/20 btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={18} className="fill-primary-foreground" />
                    {t('services.moving.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 4: Outdoor & Construction - Compact */}
      <section id="outdoor" className="relative py-8 md:py-16 bg-foreground/[0.01] scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <HardHat size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 04
                  </span>
                </div>
                <h2 className="mb-4 md:mb-6 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.outdoor.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 md:mb-8 leading-tight">
                  {t('services.outdoor.body')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Sparkles className="text-primary w-4 h-4" />
                    </div>
                    <p className="text-[13px] font-bold text-foreground/80 leading-tight">
                      {t('services.outdoor.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-foreground/[0.02] rounded-2xl border border-border shadow-xl overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Waves size={18} />}
                  title={t('services.outdoor.pool.title')}
                  description={t('services.outdoor.pool.desc')}
                  items={t('services.outdoor.pool.items')}
                  isOpen={openModule === 'pool-maintenance'}
                  onToggle={() => setOpenModule(openModule === 'pool-maintenance' ? null : 'pool-maintenance')}
                />
                <CollapsibleModule
                  icon={<Heart size={18} />}
                  title={t('services.outdoor.garden.title')}
                  description={t('services.outdoor.garden.desc')}
                  items={t('services.outdoor.garden.items')}
                  isOpen={openModule === 'landscaping'}
                  onToggle={() => setOpenModule(openModule === 'landscaping' ? null : 'landscaping')}
                />
                <CollapsibleModule
                  icon={<HardHat size={18} />}
                  title={t('services.outdoor.construction.title')}
                  description={t('services.outdoor.construction.desc')}
                  items={t('services.outdoor.construction.items')}
                  isOpen={openModule === 'renovation'}
                  onToggle={() => setOpenModule(openModule === 'renovation' ? null : 'renovation')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={WHATSAPP_LINK}
                  onClick={() => trackRequestClick('Services - Outdoor')}
                  className="cta-primary inline-flex shadow-xl shadow-primary/20 btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={18} className="fill-primary-foreground" />
                    {t('services.outdoor.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 5: Home Care & Wellness - Coming Soon */}
      <section id="care" className="relative py-8 md:py-16 bg-background scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shadow-lg shadow-primary/10"
                  >
                    <Heart size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary/60 text-[9px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain opacity-40" />
                    {t('services.status.comingSoon')} — 05
                  </span>
                </div>
                <h2 className="mb-4 md:mb-6 text-foreground/80 text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.care.title')}</h2>
                <p className="text-sm md:text-base text-foreground/50 font-medium mb-6 md:mb-8 leading-tight">
                  {t('services.care.body')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.02] border border-border/30 relative overflow-hidden"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="text-primary/40 w-4 h-4" />
                    </div>
                    <p className="text-[13px] font-bold text-foreground/40 leading-tight">
                      {t('services.care.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-foreground/[0.01] rounded-2xl border border-border/50 shadow-sm overflow-hidden opacity-60"
            >
              <div className="divide-y divide-border/30">
                <CollapsibleModule
                  icon={<Baby size={18} />}
                  title={t('services.care.babysitting.title')}
                  description={t('services.care.babysitting.desc')}
                  items={t('services.care.babysitting.items')}
                  isOpen={openModule === 'nanny'}
                  onToggle={() => setOpenModule(openModule === 'nanny' ? null : 'nanny')}
                />
                <CollapsibleModule
                  icon={<Stethoscope size={18} />}
                  title={t('services.care.nursing.title')}
                  description={t('services.care.nursing.desc')}
                  items={t('services.care.nursing.items')}
                  isOpen={openModule === 'nursing'}
                  onToggle={() => setOpenModule(openModule === 'nursing' ? null : 'nursing')}
                />
                <CollapsibleModule
                  icon={<Activity size={18} />}
                  title={t('services.care.wellness.title')}
                  description={t('services.care.wellness.desc')}
                  items={t('services.care.wellness.items')}
                  isOpen={openModule === 'wellness'}
                  onToggle={() => setOpenModule(openModule === 'wellness' ? null : 'wellness')}
                />
              </div>

              <div className="py-6 border-t border-border/30 text-center bg-foreground/[0.005]">
                <button 
                  disabled
                  className="px-8 py-3 rounded-xl bg-foreground/10 text-foreground/30 text-[10px] font-black uppercase tracking-widest cursor-not-allowed"
                >
                  {t('services.status.notAvailable')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 6: Electronics & Tech - Coming Soon */}
      <section id="tech" className="relative py-8 md:py-16 bg-foreground/[0.01] scroll-mt-32 overflow-hidden mb-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shadow-lg shadow-primary/10"
                  >
                    <Smartphone size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary/60 text-[9px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain opacity-40" />
                    {t('services.status.comingSoon')} — 06
                  </span>
                </div>
                <h2 className="mb-4 md:mb-6 text-foreground/80 text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.electronics.title')}</h2>
                <p className="text-sm md:text-base text-foreground/50 font-medium mb-6 md:mb-8 leading-tight">
                  {t('services.electronics.body')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.02] border border-border/30 relative overflow-hidden"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="text-primary/40 w-4 h-4" />
                    </div>
                    <p className="text-[13px] font-bold text-foreground/40 leading-tight">
                      {t('services.electronics.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-foreground/[0.01] rounded-2xl border border-border/50 shadow-sm overflow-hidden opacity-60"
            >
              <div className="divide-y divide-border/30">
                <CollapsibleModule
                  icon={<Tv size={18} />}
                  title={t('services.electronics.tv.title')}
                  description={t('services.electronics.tv.desc')}
                  items={t('services.electronics.tv.items')}
                  isOpen={openModule === 'tv-repair'}
                  onToggle={() => setOpenModule(openModule === 'tv-repair' ? null : 'tv-repair')}
                />
                <CollapsibleModule
                  icon={<Smartphone size={18} />}
                  title={t('services.electronics.mobile.title')}
                  description={t('services.electronics.mobile.desc')}
                  items={t('services.electronics.mobile.items')}
                  isOpen={openModule === 'mobile-repair'}
                  onToggle={() => setOpenModule(openModule === 'mobile-repair' ? null : 'mobile-repair')}
                />
                <CollapsibleModule
                  icon={<Cog size={18} />}
                  title={t('services.electronics.smart.title')}
                  description={t('services.electronics.smart.desc')}
                  items={t('services.electronics.smart.items')}
                  isOpen={openModule === 'smart-home'}
                  onToggle={() => setOpenModule(openModule === 'smart-home' ? null : 'smart-home')}
                />
              </div>

              <div className="py-6 border-t border-border/30 text-center bg-foreground/[0.005]">
                <button 
                  disabled
                  className="px-8 py-3 rounded-xl bg-foreground/10 text-foreground/30 text-[10px] font-black uppercase tracking-widest cursor-not-allowed"
                >
                  {t('services.status.notAvailable')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Banner / Bottom CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-black tracking-widest uppercase mb-10 shadow-lg btn-shine">
              <img src="/logos/SahlLogo9.png" alt="" className="w-5 h-5 object-contain" />
              {t('about.position.title')}
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-10">
              {t('services.cta.title')}
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/70 font-medium mb-12 max-w-2xl mx-auto leading-tight">
              {t('services.cta.body')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={WHATSAPP_LINK}
                onClick={() => trackRequestClick('Services - Bottom CTA')}
                className="cta-primary text-lg px-10 py-5 w-full sm:w-auto shadow-2xl shadow-primary/30 btn-shine"
              >
                <div className="flex items-center justify-center gap-3">
                  <MessageSquare size={22} className="fill-primary-foreground" />
                  {t('services.cta.button')}
                </div>
              </a>
              
              <Link 
                to="/about"
                className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-all duration-500"
              >
                {t('nav.about')}
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
