import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { 
  ChevronDown, 
  MessageCircle, 
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
                  className="flex items-center gap-3 text-foreground font-semibold text-sm group/item py-1"
                >
                  <img src="/logos/Sahl Logo 9.png" alt="" loading="lazy" className="w-3 h-3 object-contain opacity-40 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300 shadow-sm shadow-primary/20" />
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
              <source src="https://videos.pexels.com/video-files/4492147/4492147-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
            <div className={`absolute inset-0 bg-gradient-to-r ${lang === 'ar' ? 'from-primary/20 via-transparent to-transparent' : 'from-transparent via-transparent to-primary/20'} mix-blend-overlay opacity-30`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.1),transparent_70%)]" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
        </div>

        <div className="container-sahli relative z-10 pt-24 md:pt-32 pb-12">
          <motion.div
            style={{ y: yText }}
            className="max-w-4xl"
          >
            <h1 className="mb-6 text-foreground text-4xl sm:text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter">
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
              className="text-base md:text-lg text-foreground/80 font-medium leading-tight max-w-2xl mb-6"
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
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-3 scroll-smooth items-center">
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
                    <img src="/logos/Sahl Logo 9.png" alt="" loading="lazy" className="w-4 h-4 object-contain brightness-0 invert" />
                  ) : (
                    <img src="/logos/Sahl Logo 9.png" alt="" loading="lazy" className="w-4 h-4 object-contain opacity-20 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
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
      <section id="home-maintenance" className="relative py-12 md:py-16 scroll-mt-32 bg-background overflow-hidden">
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
              <div className="sticky top-32 md:top-40 lg:top-44">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Wrench size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/Sahl Logo 9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 01
                  </span>
                </div>
                <h2 className="mb-4 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.homeMaintenance.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 leading-tight">
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
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex shadow-xl shadow-primary/20 btn-shine"
                >
                  <MessageCircle size={18} className="fill-primary-foreground" />
                  {t('services.homeMaintenance.cta')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 2: Cleaning & Logistics - Compact */}
      <section id="cleaning" className="relative py-12 md:py-16 bg-foreground/[0.01] scroll-mt-32 overflow-hidden">
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
              <div className="sticky top-32 md:top-40 lg:top-44">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Sparkles size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/Sahl Logo 9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 02
                  </span>
                </div>
                <h2 className="mb-4 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.cleaning.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 leading-tight">
                  {t('services.cleaning.body')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-4 h-4" />
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
                  title={t('services.cleaning.regular.title')}
                  description={t('services.cleaning.regular.desc')}
                  items={t('services.cleaning.regular.items')}
                  isOpen={openModule === 'cleaning-regular'}
                  onToggle={() => setOpenModule(openModule === 'cleaning-regular' ? null : 'cleaning-regular')}
                />
                <CollapsibleModule
                  icon={<Sparkles size={18} />}
                  title={t('services.cleaning.deep.title')}
                  description={t('services.cleaning.deep.desc')}
                  items={t('services.cleaning.deep.items')}
                  isOpen={openModule === 'cleaning-deep'}
                  onToggle={() => setOpenModule(openModule === 'cleaning-deep' ? null : 'cleaning-deep')}
                />
                <CollapsibleModule
                  icon={<Waves size={18} />}
                  title={t('services.cleaning.specialized.title')}
                  description={t('services.cleaning.specialized.desc')}
                  items={t('services.cleaning.specialized.items')}
                  isOpen={openModule === 'cleaning-specialized'}
                  onToggle={() => setOpenModule(openModule === 'cleaning-specialized' ? null : 'cleaning-specialized')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex shadow-xl shadow-primary/20"
                >
                  <MessageCircle size={18} className="fill-primary-foreground" />
                  {t('services.cleaning.cta')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 3: Moving Services - Compact */}
      <section id="moving" className="relative py-12 md:py-16 bg-background scroll-mt-32 overflow-hidden">
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
              <div className="sticky top-32 md:top-40 lg:top-44">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Truck size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/Sahl Logo 9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 03
                  </span>
                </div>
                <h2 className="mb-4 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.moving.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 leading-tight">
                  {t('services.moving.body')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-4 h-4" />
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
                  icon={<Truck size={18} />}
                  title={t('services.moving.house.title')}
                  description={t('services.moving.house.desc')}
                  items={t('services.moving.house.items')}
                  isOpen={openModule === 'moving-house'}
                  onToggle={() => setOpenModule(openModule === 'moving-house' ? null : 'moving-house')}
                />
                <CollapsibleModule
                  icon={<Box size={18} />}
                  title={t('services.moving.packing.title')}
                  description={t('services.moving.packing.desc')}
                  items={t('services.moving.packing.items')}
                  isOpen={openModule === 'moving-packing'}
                  onToggle={() => setOpenModule(openModule === 'moving-packing' ? null : 'moving-packing')}
                />
                <CollapsibleModule
                  icon={<HardHat size={18} />}
                  title={t('services.moving.dismantling.title')}
                  description={t('services.moving.dismantling.desc')}
                  items={t('services.moving.dismantling.items')}
                  isOpen={openModule === 'moving-dismantling'}
                  onToggle={() => setOpenModule(openModule === 'moving-dismantling' ? null : 'moving-dismantling')}
                />
                <CollapsibleModule
                  icon={<Truck size={18} />}
                  title={t('services.moving.storage.title')}
                  description={t('services.moving.storage.desc')}
                  items={t('services.moving.storage.items')}
                  isOpen={openModule === 'moving-storage'}
                  onToggle={() => setOpenModule(openModule === 'moving-storage' ? null : 'moving-storage')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex shadow-xl shadow-primary/20"
                >
                  <MessageCircle size={18} className="fill-primary-foreground" />
                  {t('services.moving.cta')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Roof 4: Outdoor & Specialized - Compact */}
      <section id="outdoor" className="relative py-12 md:py-16 scroll-mt-32 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Droplets size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/Sahl Logo 9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 04
                  </span>
                </div>
                <h2 className="mb-4 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.outdoor.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 leading-tight">
                  {t('services.outdoor.subtitle')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-4 h-4" />
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
                  icon={<Bug size={18} />}
                  title={t('services.outdoor.pest.title')}
                  description={t('services.outdoor.pest.desc')}
                  items={t('services.outdoor.pest.items')}
                  isOpen={openModule === 'pest'}
                  onToggle={() => setOpenModule(openModule === 'pest' ? null : 'pest')}
                />
                <CollapsibleModule
                  icon={<Sofa size={18} />}
                  title={t('services.outdoor.landscaping.title')}
                  description={t('services.outdoor.landscaping.desc')}
                  items={t('services.outdoor.landscaping.items')}
                  isOpen={openModule === 'landscaping'}
                  onToggle={() => setOpenModule(openModule === 'landscaping' ? null : 'landscaping')}
                />
                <CollapsibleModule
                  icon={<Waves size={18} />}
                  title={t('services.outdoor.pool.title')}
                  description={t('services.outdoor.pool.desc')}
                  items={t('services.outdoor.pool.items')}
                  isOpen={openModule === 'pool'}
                  onToggle={() => setOpenModule(openModule === 'pool' ? null : 'pool')}
                />
                <CollapsibleModule
                  icon={<Droplets size={18} />}
                  title={t('services.outdoor.waterproofing.title')}
                  description={t('services.outdoor.waterproofing.desc')}
                  items={t('services.outdoor.waterproofing.items')}
                  isOpen={openModule === 'waterproofing'}
                  onToggle={() => setOpenModule(openModule === 'waterproofing' ? null : 'waterproofing')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex shadow-xl shadow-primary/20"
                >
                  <MessageCircle size={18} className="fill-primary-foreground" />
                  {t('services.outdoor.cta')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 5: Care & Lifestyle - Compact */}
      <section id="care" className="relative py-12 md:py-16 bg-foreground/[0.01] scroll-mt-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Heart size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/Sahl Logo 9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.comingSoon')} — 05
                  </span>
                </div>
                <h2 className="mb-4 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.care.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 leading-tight">
                  {t('services.care.subtitle')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-4 h-4" />
                    </div>
                    <p className="text-[13px] font-bold text-foreground/80 leading-tight">
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
              className="bg-foreground/[0.02] rounded-2xl border border-border shadow-xl overflow-hidden opacity-60"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Baby size={18} />}
                  title={t('services.care.childcare.title')}
                  description={t('services.care.childcare.desc')}
                  items={t('services.care.childcare.items')}
                  isOpen={openModule === 'childcare'}
                  onToggle={() => setOpenModule(openModule === 'childcare' ? null : 'childcare')}
                />
                <CollapsibleModule
                  icon={<Stethoscope size={18} />}
                  title={t('services.care.healthcare.title')}
                  description={t('services.care.healthcare.desc')}
                  items={t('services.care.healthcare.items')}
                  isOpen={openModule === 'healthcare'}
                  onToggle={() => setOpenModule(openModule === 'healthcare' ? null : 'healthcare')}
                />
                <CollapsibleModule
                  icon={<Heart size={18} />}
                  title={t('services.care.pets.title')}
                  description={t('services.care.pets.desc')}
                  items={t('services.care.pets.items')}
                  isOpen={openModule === 'pets'}
                  onToggle={() => setOpenModule(openModule === 'pets' ? null : 'pets')}
                />
                <CollapsibleModule
                  icon={<Star size={18} />}
                  title={t('services.care.beauty.title')}
                  description={t('services.care.beauty.desc')}
                  items={t('services.care.beauty.items')}
                  isOpen={openModule === 'beauty'}
                  onToggle={() => setOpenModule(openModule === 'beauty' ? null : 'beauty')}
                />
                <CollapsibleModule
                  icon={<BookOpen size={18} />}
                  title={t('services.care.tutoring.title')}
                  description={t('services.care.tutoring.desc')}
                  items={t('services.care.tutoring.items')}
                  isOpen={openModule === 'tutoring'}
                  onToggle={() => setOpenModule(openModule === 'tutoring' ? null : 'tutoring')}
                />
                <CollapsibleModule
                  icon={<Dumbbell size={18} />}
                  title={t('services.care.trainer.title')}
                  description={t('services.care.trainer.desc')}
                  items={t('services.care.trainer.desc')}
                  isOpen={openModule === 'trainer'}
                  onToggle={() => setOpenModule(openModule === 'trainer' ? null : 'trainer')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest border border-primary/10">
                  {t('services.status.comingSoon')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 6: Electronics & Tech - Compact */}
      <section id="tech" className="relative py-12 md:py-16 bg-background scroll-mt-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Cog size={20} />
                  </motion.div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md">
                    <img src="/logos/Sahl Logo 9.png" alt="" className="w-3 h-3 object-contain" />
                    {t('services.status.live')} — 06
                  </span>
                </div>
                <h2 className="mb-4 text-foreground text-2xl md:text-3xl font-black tracking-tighter leading-none">{t('services.electronics.title')}</h2>
                <p className="text-sm md:text-base text-foreground/70 font-medium mb-6 leading-tight">
                  {t('services.electronics.subtitle')}
                </p>
                
                <motion.div 
                  className="p-4 rounded-2xl bg-foreground/[0.03] border border-border/50 relative overflow-hidden group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-4 h-4" />
                    </div>
                    <p className="text-[13px] font-bold text-foreground/80 leading-tight">
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
              className="bg-foreground/[0.02] rounded-2xl border border-border shadow-xl overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Tv size={18} />}
                  title={t('services.electronics.repair.title')}
                  description={t('services.electronics.repair.desc')}
                  items={t('services.electronics.repair.items')}
                  isOpen={openModule === 'electronics-repair'}
                  onToggle={() => setOpenModule(openModule === 'electronics-repair' ? null : 'electronics-repair')}
                />
                <CollapsibleModule
                  icon={<ShieldCheck size={18} />}
                  title={t('services.electronics.smart.title')}
                  description={t('services.electronics.smart.desc')}
                  items={t('services.electronics.smart.items')}
                  isOpen={openModule === 'electronics-smart'}
                  onToggle={() => setOpenModule(openModule === 'electronics-smart' ? null : 'electronics-smart')}
                />
                <CollapsibleModule
                  icon={<Smartphone size={18} />}
                  title={t('services.electronics.satellite.title')}
                  description={t('services.electronics.satellite.desc')}
                  items={t('services.electronics.satellite.items')}
                  isOpen={openModule === 'electronics-satellite'}
                  onToggle={() => setOpenModule(openModule === 'electronics-satellite' ? null : 'electronics-satellite')}
                />
              </div>

              <div className="py-6 border-t border-border text-center bg-foreground/[0.01]">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex shadow-xl shadow-primary/20"
                >
                  <MessageCircle size={18} className="fill-primary-foreground" />
                  {t('services.electronics.cta')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}