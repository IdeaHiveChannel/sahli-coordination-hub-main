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
  ArrowRight,
  CheckCircle2
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
              {items.split('\n').map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
                  className="flex items-center gap-3 text-foreground font-semibold text-sm group/item py-1"
                >
                  <img src="/logos/Sahl Logo 7.png" alt="" loading="lazy" className="w-3 h-3 object-contain opacity-40 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300 shadow-sm shadow-primary/20" />
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

  const roofs = [
    { id: 'home-repair', label: t('services.homeRepair.title'), status: 'live' },
    { id: 'cleaning', label: t('services.cleaning.title'), status: 'live' },
    { id: 'moving', label: t('services.moving.title'), status: 'live' },
    { id: 'care-childcare', label: t('services.care.title'), status: 'soon' },
    { id: 'lessons-lifestyle', label: t('services.lessons.title'), status: 'soon' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = roofs.map(roof => document.getElementById(roof.id));
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
      {/* Hero / Selector Area */}
      <section ref={containerRef} className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-background">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y, scale, opacity }}
            className="absolute inset-0"
          >
            <video
          autoPlay
          loop
          muted
          playsInline
          crossOrigin="anonymous"
          className="w-full h-full object-cover grayscale opacity-[0.1]"
        >
          <source src="https://videos.pexels.com/video-files/4492147/4492147-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop" 
            alt="Services Infrastructure" 
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          />
        </video>
            <div className={`absolute inset-0 bg-gradient-to-r ${lang === 'ar' ? 'from-primary/20 via-transparent to-transparent' : 'from-transparent via-transparent to-primary/20'} mix-blend-overlay opacity-40`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.15),transparent_70%)]" />
            
            {/* Floating Background Blobs */}
            <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[160px] mix-blend-screen animate-pulse-slow`} />
            <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary/10 rounded-full blur-[60px] md:blur-[120px] mix-blend-screen animate-pulse-slow delay-1000`} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        </div>

        <div className="container-sahli relative z-10 pt-32 md:pt-28 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div
            style={{ y: yText }}
            className="max-w-4xl mb-6 md:mb-10 flex flex-col items-center md:items-start"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-8 btn-shine"
            >
              <img src="/logos/Sahl Logo.png" alt="" className="w-4 h-4 object-contain" />
              {t('services.label')}
            </motion.div>
            
            <h1 className="mb-12 md:mb-8 text-foreground text-4xl sm:text-4xl md:text-4xl lg:text-4xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter">
              {t('services.title').split(' ').map((word: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-[0.25em] origin-top hover:text-primary transition-colors duration-500"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-base sm:text-lg md:text-lg text-foreground/90 font-semibold leading-relaxed max-w-3xl mb-6"
            >
              {t('services.intro')}
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xs md:text-sm text-primary font-black uppercase tracking-[0.2em] max-w-3xl"
            >
              {t('services.disclaimer')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Selector - Enhanced Visuals */}
      <div className="sticky top-[56px] md:top-[64px] z-40 w-full glass-morphism border-y border-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="container-sahli relative">
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-3 scroll-smooth items-center">
            {roofs.map((roof, idx) => (
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
                    <img src="/logos/Sahl Logo 7.png" alt="" loading="lazy" className="w-4 h-4 object-contain brightness-0 invert" />
                  ) : (
                    <img src="/logos/Sahl Logo 7.png" alt="" loading="lazy" className="w-4 h-4 object-contain opacity-20 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500" />
                  )}
                  {roof.label}
                </span>

                {roof.status === 'soon' && (
                  <span className={`text-[9px] px-3 py-1 rounded-full border transition-colors duration-500 ${
                    activeRoof === roof.id 
                      ? 'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground' 
                      : 'border-foreground/10 bg-foreground/5 text-foreground/30 group-hover:border-primary/30 group-hover:text-primary/60'
                  }`}>
                    {t('services.status.soon')}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Scroll Indicator (Mobile) */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden" />
        </div>
      </div>

      {/* Roof 1: Home Maintenance */}
      <section id="home-maintenance" className="relative section-spacing scroll-mt-48 bg-background overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[80px] -z-10" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-48">
                <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40"
                  >
                    <Wrench size={20} className="md:w-6 md:h-6" />
                  </motion.div>
                  <div className="flex flex-col gap-1 md:gap-1.5">
                    <span className="inline-flex items-center gap-2 px-3 py-1 md:px-3.5 md:py-1 rounded-full bg-primary/15 text-primary text-[9px] md:text-[10px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md w-fit">
                      <img src="/logos/Sahl Logo 7.png" alt="" className="w-3 h-3 object-contain" />
                      {t('services.status.live')} — {t('services.roof.label')} 01
                    </span>
                  </div>
                </div>
                <h2 className="mb-4 md:mb-5 text-foreground text-xl sm:text-2xl md:text-2xl lg:text-2xl font-black tracking-tighter leading-[0.85]">{t('services.homeRepair.title')}</h2>
                <p className="text-base md:text-lg text-foreground/80 font-semibold mb-5 md:mb-8 leading-relaxed">
                  {t('services.homeRepair.body')}
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-foreground/[0.03] border border-border backdrop-blur-2xl shadow-3xl relative overflow-hidden group btn-shine"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                      <CheckCircle2 className="text-primary w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-bold text-foreground/80 leading-relaxed">
                        {t('services.homeRepair.rule')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.02] rounded-xl md:rounded-2xl border border-border shadow-[0_48px_96px_-24px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <div className="divide-y divide-border">
                <CollapsibleModule
                  icon={<Wrench size={18} />}
                  title={t('services.homeRepair.ac.title')}
                  description={t('services.homeRepair.ac.desc')}
                  items={t('services.homeRepair.ac.items')}
                  isOpen={openModule === 'ac'}
                  onToggle={() => setOpenModule(openModule === 'ac' ? null : 'ac')}
                />
                <CollapsibleModule
                  icon={<Wrench size={18} />}
                  title={t('services.homeRepair.electrical.title')}
                  description={t('services.homeRepair.electrical.desc')}
                  items={t('services.homeRepair.electrical.items')}
                  isOpen={openModule === 'electrical'}
                  onToggle={() => setOpenModule(openModule === 'electrical' ? null : 'electrical')}
                />
                <CollapsibleModule
                  icon={<Wrench size={18} />}
                  title={t('services.homeRepair.plumbing.title')}
                  description={t('services.homeRepair.plumbing.desc')}
                  items={t('services.homeRepair.plumbing.items')}
                  isOpen={openModule === 'plumbing'}
                  onToggle={() => setOpenModule(openModule === 'plumbing' ? null : 'plumbing')}
                />
                <CollapsibleModule
                  icon={<Wrench size={18} />}
                  title={t('services.homeRepair.appliances.title')}
                  description={t('services.homeRepair.appliances.desc')}
                  items={t('services.homeRepair.appliances.items')}
                  isOpen={openModule === 'appliances'}
                  onToggle={() => setOpenModule(openModule === 'appliances' ? null : 'appliances')}
                />
                <CollapsibleModule
                  icon={<Wrench size={18} />}
                  title={t('services.homeRepair.handyman.title')}
                  description={t('services.homeRepair.handyman.desc')}
                  items={t('services.homeRepair.handyman.items')}
                  isOpen={openModule === 'handyman'}
                  onToggle={() => setOpenModule(openModule === 'handyman' ? null : 'handyman')}
                />
                <CollapsibleModule
                  icon={<Wrench size={18} />}
                  title={t('services.homeRepair.pest.title')}
                  description={t('services.homeRepair.pest.desc')}
                  items={t('services.homeRepair.pest.items')}
                  isOpen={openModule === 'pest'}
                  onToggle={() => setOpenModule(openModule === 'pest' ? null : 'pest')}
                />
              </div>

              <div className="py-8 md:py-10 border-t border-border text-center bg-foreground/[0.01]">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex scale-100 md:scale-105 shadow-2xl shadow-primary/20"
                >
                  <MessageCircle size={18} className="fill-primary-foreground" />
                  {t('services.homeRepair.cta')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 2: Cleaning & Logistics */}
      <section id="cleaning-logistics" className="relative section-spacing bg-foreground/[0.01] scroll-mt-48 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-48">
                <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40"
                  >
                    <Sparkles size={20} className="md:w-6 md:h-6" />
                  </motion.div>
                  <div className="flex flex-col gap-1 md:gap-1.5">
                    <span className="inline-flex items-center gap-2 px-3 py-1 md:px-3.5 md:py-1 rounded-full bg-primary/15 text-primary text-[9px] md:text-[10px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md w-fit">
                      <img src="/logos/Sahl Logo 7.png" alt="" className="w-3 h-3 object-contain" />
                      {t('services.status.live')} — {t('services.roof.label')} 02
                    </span>
                  </div>
                </div>
                <h2 className="mb-4 md:mb-5 text-foreground text-xl sm:text-2xl md:text-2xl lg:text-2xl font-black tracking-tighter leading-[0.85]">{t('services.cleaning.title')}</h2>
                <p className="text-base md:text-lg text-foreground/80 font-semibold mb-5 md:mb-8 leading-relaxed">
                  {t('services.cleaning.body')}
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-foreground/[0.03] border border-border backdrop-blur-2xl shadow-3xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                      <CheckCircle2 className="text-primary w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-bold text-foreground/80 leading-relaxed">
                        {t('services.cleaning.rule')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.02] rounded-xl md:rounded-2xl border border-border shadow-[0_48px_96px_-24px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <div className="divide-y divide-border">
                <CollapsibleModule
                  icon={<Sparkles size={18} />}
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
                  icon={<Sparkles size={18} />}
                  title={t('services.cleaning.sofa.title')}
                  description={t('services.cleaning.sofa.desc')}
                  items={t('services.cleaning.sofa.items')}
                  isOpen={openModule === 'cleaning-sofa'}
                  onToggle={() => setOpenModule(openModule === 'cleaning-sofa' ? null : 'cleaning-sofa')}
                />
                <CollapsibleModule
                  icon={<Sparkles size={18} />}
                  title={t('services.cleaning.carpet.title')}
                  description={t('services.cleaning.carpet.desc')}
                  items={t('services.cleaning.carpet.items')}
                  isOpen={openModule === 'cleaning-carpet'}
                  onToggle={() => setOpenModule(openModule === 'cleaning-carpet' ? null : 'cleaning-carpet')}
                />
                <CollapsibleModule
                  icon={<Sparkles size={18} />}
                  title={t('services.cleaning.mattress.title')}
                  description={t('services.cleaning.mattress.desc')}
                  items={t('services.cleaning.mattress.items')}
                  isOpen={openModule === 'cleaning-mattress'}
                  onToggle={() => setOpenModule(openModule === 'cleaning-mattress' ? null : 'cleaning-mattress')}
                />
                <CollapsibleModule
                  icon={<Sparkles size={18} />}
                  title={t('services.cleaning.watertank.title')}
                  description={t('services.cleaning.watertank.desc')}
                  items={t('services.cleaning.watertank.items')}
                  isOpen={openModule === 'cleaning-watertank'}
                  onToggle={() => setOpenModule(openModule === 'cleaning-watertank' ? null : 'cleaning-watertank')}
                />
              </div>

              <div className="py-8 md:py-10 border-t border-border text-center bg-foreground/[0.01]">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex scale-100 md:scale-105 shadow-2xl shadow-primary/20"
                >
                  <MessageCircle size={18} className="fill-primary-foreground" />
                  {t('services.cleaning.cta')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 3: Moving Services */}
      <section id="moving-services" className="relative section-spacing bg-background scroll-mt-48 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[80px] -z-10" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-48">
                <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40"
                  >
                    <Truck size={20} className="md:w-6 md:h-6" />
                  </motion.div>
                  <div className="flex flex-col gap-1 md:gap-1.5">
                    <span className="inline-flex items-center gap-2 px-3 py-1 md:px-3.5 md:py-1 rounded-full bg-primary/15 text-primary text-[9px] md:text-[10px] font-black tracking-widest uppercase border border-primary/25 backdrop-blur-md w-fit">
                      <img src="/logos/Sahl Logo 7.png" alt="" className="w-3 h-3 object-contain" />
                      {t('services.status.live')} — {t('services.roof.label')} 03
                    </span>
                  </div>
                </div>
                <h2 className="mb-4 md:mb-5 text-foreground text-xl sm:text-2xl md:text-2xl lg:text-2xl font-black tracking-tighter leading-[0.85]">{t('services.moving.title')}</h2>
                <p className="text-base md:text-lg text-foreground/80 font-semibold mb-5 md:mb-8 leading-relaxed">
                  {t('services.moving.body')}
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-foreground/[0.03] border border-border backdrop-blur-2xl shadow-3xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 shadow-inner">
                      <CheckCircle2 className="text-primary w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <p className="text-sm md:text-base font-bold text-foreground/80 leading-relaxed">
                        {t('services.moving.rule')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.02] rounded-xl md:rounded-2xl border border-border shadow-[0_48px_96px_-24px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <div className="divide-y divide-border">
                <CollapsibleModule
                  icon={<Truck size={18} />}
                  title={t('services.moving.local.title')}
                  description={t('services.moving.local.desc')}
                  items={t('services.moving.local.items')}
                  isOpen={openModule === 'moving-local'}
                  onToggle={() => setOpenModule(openModule === 'moving-local' ? null : 'moving-local')}
                />
                <CollapsibleModule
                  icon={<Truck size={18} />}
                  title={t('services.moving.packing.title')}
                  description={t('services.moving.packing.desc')}
                  items={t('services.moving.packing.items')}
                  isOpen={openModule === 'moving-packing'}
                  onToggle={() => setOpenModule(openModule === 'moving-packing' ? null : 'moving-packing')}
                />
                <CollapsibleModule
                  icon={<Truck size={18} />}
                  title={t('services.moving.dismantling.title')}
                  description={t('services.moving.dismantling.desc')}
                  items={t('services.moving.dismantling.items')}
                  isOpen={openModule === 'moving-dismantling'}
                  onToggle={() => setOpenModule(openModule === 'moving-dismantling' ? null : 'moving-dismantling')}
                />
              </div>

              <div className="py-8 md:py-10 border-t border-border text-center bg-foreground/[0.01]">
                <motion.a 
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary inline-flex scale-100 md:scale-105 shadow-2xl shadow-primary/20"
                >
                  <MessageCircle size={18} className="fill-primary-foreground" />
                  {t('services.moving.cta')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 4: Care & Childcare - COMING SOON GATED */}
      <section id="care-childcare" className="relative section-spacing bg-background scroll-mt-48 overflow-hidden pb-32">
        {/* Glass Overlay for Coming Soon */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[12px] z-10 pointer-events-none" />
        
        <div className="container-sahli relative z-0">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16 md:mb-24"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em]">{t('services.status.soon')}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 md:mb-8 tracking-tight uppercase">
                {t('services.care.title')}
              </h2>
              <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-medium">
                {t('services.care.body')}
              </p>
            </motion.div>

            <div className="bg-foreground/[0.02] rounded-xl md:rounded-2xl border border-border/50 opacity-40 grayscale pointer-events-none">
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Heart size={18} />}
                  title={t('services.care.doctor.title')}
                  description={t('services.care.doctor.desc')}
                  items="Consultations\nCheckups\nFollow-ups"
                  isOpen={false}
                  onToggle={() => {}}
                />
                <CollapsibleModule
                  icon={<Heart size={18} />}
                  title={t('services.care.nursing.title')}
                  description={t('services.care.nursing.desc')}
                  items="Medical Support\nIn-home Nursing\nElderly Support"
                  isOpen={false}
                  onToggle={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roof 5: Lessons & Lifestyle - COMING SOON GATED */}
      <section id="lessons-lifestyle" className="relative section-spacing bg-background scroll-mt-48 overflow-hidden pb-32">
        {/* Glass Overlay for Coming Soon */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[12px] z-10 pointer-events-none" />
        
        <div className="container-sahli relative z-0">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16 md:mb-24"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em]">{t('services.status.soon')}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 md:mb-8 tracking-tight uppercase">
                {t('services.lessons.title')}
              </h2>
              <p className="text-lg md:text-xl text-foreground/60 leading-relaxed font-medium">
                {t('services.lessons.body')}
              </p>
            </motion.div>

            <div className="bg-foreground/[0.02] rounded-xl md:rounded-2xl border border-border/50 opacity-40 grayscale pointer-events-none">
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<BookOpen size={18} />}
                  title={t('services.lessons.tutoring.title')}
                  description={t('services.lessons.tutoring.desc')}
                  items="Academic Support\nAll Levels\nVerified Tutors"
                  isOpen={false}
                  onToggle={() => {}}
                />
                <CollapsibleModule
                  icon={<BookOpen size={18} />}
                  title={t('services.lessons.lifestyle.title')}
                  description={t('services.lessons.lifestyle.desc')}
                  items="Personal Logistics\nLifestyle Management\nCoordination Support"
                  isOpen={false}
                  onToggle={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Disclaimer */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container-sahli text-center">
          <p className="text-xs text-foreground/30 font-medium uppercase tracking-[0.2em] max-w-4xl mx-auto">
            {t('services.footer.micro')}
          </p>
        </div>
      </section>
    </Layout>
  );
}