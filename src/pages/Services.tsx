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
import { getWhatsAppLink } from '@/lib/constants';

interface CollapsibleModuleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string;
  isOpen: boolean;
  onToggle: () => void;
  locationLinks?: { label: string; path: string }[];
}

function CollapsibleModule({ icon, title, description, items, isOpen, onToggle, locationLinks }: CollapsibleModuleProps) {
  const { dir } = useLanguage();
  
  return (
    <div className={`border-b border-border last:border-0 transition-all duration-700 ${isOpen ? 'bg-foreground/[0.03] backdrop-blur-md' : 'hover:bg-foreground/[0.01]'}`}>
      <button
        onClick={onToggle}
        className="w-full py-2.5 md:py-3.5 flex items-center justify-between group transition-all px-3 md:px-5"
      >
        <div className="flex items-center gap-4 md:gap-5">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-500 shadow-md ${isOpen ? 'bg-primary text-primary-foreground scale-105' : 'bg-foreground/[0.03] text-primary group-hover:bg-primary/10'}`}
          >
            {React.cloneElement(icon as React.ReactElement, { size: 16 })}
          </motion.div>
          <div className="text-start">
            <h3 className={`text-xs md:text-sm font-black transition-all duration-500 ${isOpen ? 'text-foreground' : 'text-foreground/70 group-hover:text-foreground'}`}>
              {title}
            </h3>
            <p className={`text-start text-[0.7rem] md:text-[0.75rem] !text-foreground/80 transition-all duration-500 max-w-xl ${isOpen ? 'text-foreground/80' : 'text-foreground/50 group-hover:text-foreground/70'}`}>
              {description}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ 
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.05 : 1
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`transition-colors duration-500 shrink-0 ${isOpen ? 'text-primary' : 'text-foreground/20 group-hover:text-primary/50'}`}
        >
          <ChevronDown size={16} strokeWidth={3} />
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
            <div className={`pb-6 ps-3 md:ps-[72px] pe-3 md:pe-8 flex flex-col gap-4`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-4">
                {items.split('\n').map((item: string, idx: number) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.5 }}
                    className="flex items-start gap-3 text-foreground font-bold text-[0.75rem] md:text-[0.85rem] group/item py-0.5"
                  >
                    <div className="mt-1 shrink-0">
                      <img src="/logos/SahlLogo9.png" alt="" loading="lazy" className="w-2.5 h-2.5 object-contain opacity-100 transition-all duration-300 shadow-sm" />
                    </div>
                    <span className="group-hover/item:translate-x-1 transition-transform duration-300 leading-tight">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {locationLinks && locationLinks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="pt-4 border-t border-border/30"
                >
                  <p className="text-[0.65rem] font-black tracking-widest uppercase text-foreground/30 mb-3 flex items-center gap-2">
                    <Info size={10} />
                    Available Districts
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {locationLinks.map((loc, idx) => (
                      <Link
                        key={idx}
                        to={loc.path}
                        className="px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 border border-primary/10 text-[0.7rem] font-bold text-primary transition-all flex items-center gap-1.5 group/loc"
                      >
                        <img src="/logos/SahlLogo9.png" alt="" className="w-2.5 h-2.5 object-contain" />
                        {loc.label}
                        <ArrowRight size={10} className="opacity-0 -translate-x-1 group-hover/loc:opacity-100 group-hover/loc:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
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
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.2]), springConfig);
  const yText = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), springConfig);

  const roofs = React.useMemo(() => [
    { id: 'home-maintenance', label: t('services.homeMaintenance.title') },
    { id: 'cleaning', label: t('services.cleaning.title') },
    { id: 'moving', label: t('services.moving.title') },
    { id: 'outdoor', label: t('services.outdoor.title') },
    { id: 'care', label: t('services.care.title.roof5') },
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

  const locationLinks = [
    { label: t('location.doha.title'), path: t('location.doha.path') },
    { label: t('location.lusail.title'), path: t('location.lusail.path') },
    { label: t('location.thepearl.title'), path: t('location.thepearl.path') },
  ];

  return (
    <Layout>
      {/* Hero / Selector Area - Consistent with Homepage */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ 
              y: y,
              scale: scale
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1920&auto=format&fit=crop" 
              alt={t('nav.services')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>
          
          {/* Overlays removed as per user request */}
          <div className="absolute inset-0 bg-slate-950/10 z-0" />

          {/* Floating Background Blobs - Homepage Standard */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[60px] md:blur-[120px] animate-pulse-slow z-0`} />
          <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary/10 rounded-full blur-[50px] md:blur-[100px] animate-pulse-slow delay-1000 z-0`} />
        </div>

        <div className="container-sahli relative z-10 pt-32 pb-12 md:pb-24">
          <motion.div
            style={{ y: yText }}
            className="max-w-4xl mx-auto md:mx-0 text-center md:text-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-label mb-6 backdrop-blur-md mx-auto md:mx-0"
            >
              <img src="/logos/SahlLogo9.png" alt="" className="w-4 h-4 object-contain" />
              {t('nav.services')}
            </motion.div>

            <h1 className="mb-6 text-foreground text-display w-full text-center md:text-start">
              {t('services.title').split(' ').map((word: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block me-[0.1em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base !text-foreground/60 max-w-2xl mb-8 mx-auto md:mx-0 leading-relaxed w-full text-center md:text-start"
            >
              {t('services.intro')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Selector - Enhanced Visuals */}
      <div className="sticky top-[48px] md:top-[56px] z-40 w-full backdrop-blur-2xl bg-background/80 border-y border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
        <div className="container-sahli">
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-3 scroll-smooth items-center md:justify-center">
            {roofs.map((roof: { id: string; label: string; status?: string }, idx: number) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.05, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={roof.id}
                onClick={() => handleRoofClick(roof.id)}
                className={`relative px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${
                  activeRoof === roof.id
                    ? 'text-primary-foreground'
                    : 'text-foreground/50 hover:text-foreground hover:bg-white/5'
                }`}
              >
                {activeRoof === roof.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-xl shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-2">
                    <img 
                      src="/logos/SahlLogo9.png" 
                      alt="" 
                      loading="lazy" 
                      className={`w-3 h-3 object-contain transition-all duration-500 ${activeRoof === roof.id ? 'brightness-0 invert' : 'opacity-50'}`} 
                    />
                    {roof.label}
                  </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Roof 1: Home Maintenance - Compact */}
      <section id="home-maintenance" className="relative section-spacing scroll-mt-32 bg-background overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/[0.03] rounded-full blur-[60px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                  >
                    <Wrench size={16} />
                  </motion.div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[7px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-2.5 h-2.5 object-contain" />
                    {t('services.status.live')} — 01
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4 md:mb-6">
                  {t('services.homeMaintenance.title')}
                </h2>
                <p className="text-xs md:text-sm !text-foreground/60 mb-8 md:mb-10 leading-relaxed">
                  {t('services.homeMaintenance.body')}
                </p>
                
                <motion.div 
                  className="p-3.5 rounded-xl bg-foreground/[0.02] border border-border/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Box className="text-primary w-3.5 h-3.5" />
                  </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.homeMaintenance.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.01] rounded-2xl border border-border shadow-lg overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Wind size={18} />}
                  title={t('services.homeMaintenance.ac.title')}
                  description={t('services.homeMaintenance.ac.desc')}
                  items={t('services.homeMaintenance.ac.items')}
                  isOpen={openModule === 'ac'}
                  onToggle={() => setOpenModule(openModule === 'ac' ? null : 'ac')}
                  locationLinks={locationLinks}
                />
                <CollapsibleModule
                  icon={<Zap size={18} />}
                  title={t('services.homeMaintenance.electrical.title')}
                  description={t('services.homeMaintenance.electrical.desc')}
                  items={t('services.homeMaintenance.electrical.items')}
                  isOpen={openModule === 'electrical'}
                  onToggle={() => setOpenModule(openModule === 'electrical' ? null : 'electrical')}
                  locationLinks={locationLinks}
                />
                <CollapsibleModule
                  icon={<Droplets size={18} />}
                  title={t('services.homeMaintenance.plumbing.title')}
                  description={t('services.homeMaintenance.plumbing.desc')}
                  items={t('services.homeMaintenance.plumbing.items')}
                  isOpen={openModule === 'plumbing'}
                  onToggle={() => setOpenModule(openModule === 'plumbing' ? null : 'plumbing')}
                  locationLinks={locationLinks}
                />
                <CollapsibleModule
                  icon={<Hammer size={18} />}
                  title={t('services.homeMaintenance.handyman.title')}
                  description={t('services.homeMaintenance.handyman.desc')}
                  items={t('services.homeMaintenance.handyman.items')}
                  isOpen={openModule === 'handyman'}
                  onToggle={() => setOpenModule(openModule === 'handyman' ? null : 'handyman')}
                  locationLinks={locationLinks}
                />
              </div>

              <div className="py-5 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.homeMaintenance.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Home Maintenance')}
                  className="cta-primary btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.homeMaintenance.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 2: Cleaning & Coordination - Compact */}
      <section id="cleaning" className="relative section-spacing bg-foreground/[0.01] scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-700" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                  >
                    <Sparkles size={16} />
                  </motion.div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[7px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-2.5 h-2.5 object-contain" />
                    {t('services.status.live')} — 02
                  </span>
                </div>
                <h2 className="text-display mb-3">{t('services.cleaning.title')}</h2>
                <p className="text-[0.85rem] md:text-sm !text-foreground/50 mb-5 max-w-md">
                  {t('services.cleaning.body')}
                </p>
                
                <motion.div 
                  className="p-3.5 rounded-xl bg-foreground/[0.02] border border-border/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.cleaning.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.01] rounded-2xl border border-border shadow-lg overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Home size={18} />}
                  title={t('services.cleaning.regular.title')}
                  description={t('services.cleaning.regular.desc')}
                  items={t('services.cleaning.regular.items')}
                  isOpen={openModule === 'regular-cleaning'}
                  onToggle={() => setOpenModule(openModule === 'regular-cleaning' ? null : 'regular-cleaning')}
                  locationLinks={locationLinks}
                />
                <CollapsibleModule
                  icon={<Waves size={18} />}
                  title={t('services.cleaning.deep.title')}
                  description={t('services.cleaning.deep.desc')}
                  items={t('services.cleaning.deep.items')}
                  isOpen={openModule === 'deep-cleaning'}
                  onToggle={() => setOpenModule(openModule === 'deep-cleaning' ? null : 'deep-cleaning')}
                  locationLinks={locationLinks}
                />
                <CollapsibleModule
                  icon={<Sofa size={18} />}
                  title={t('services.cleaning.sofa.title')}
                  description={t('services.cleaning.sofa.desc')}
                  items={t('services.cleaning.sofa.items')}
                  isOpen={openModule === 'sofa-cleaning'}
                  onToggle={() => setOpenModule(openModule === 'sofa-cleaning' ? null : 'sofa-cleaning')}
                  locationLinks={locationLinks}
                />
                <CollapsibleModule
                  icon={<Bug size={18} />}
                  title={t('services.cleaning.pest.title')}
                  description={t('services.cleaning.pest.desc')}
                  items={t('services.cleaning.pest.items')}
                  isOpen={openModule === 'pest-control'}
                  onToggle={() => setOpenModule(openModule === 'pest-control' ? null : 'pest-control')}
                  locationLinks={locationLinks}
                />
              </div>

              <div className="py-5 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.cleaning.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Cleaning')}
                  className="cta-primary btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.cleaning.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 3: Moving & Relocation - Compact */}
      <section id="moving" className="relative section-spacing scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-500" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                  >
                    <Truck size={16} />
                  </motion.div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[7px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-2.5 h-2.5 object-contain" />
                    {t('services.status.live')} — 03
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4 md:mb-6">
                  {t('services.moving.title')}
                </h2>
                <p className="text-xs md:text-sm !text-foreground/60 mb-8 md:mb-10 leading-relaxed">
                  {t('services.moving.body')}
                </p>
                
                <motion.div 
                  className="p-3.5 rounded-xl bg-foreground/[0.02] border border-border/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="text-primary w-3.5 h-3.5" />
                  </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.moving.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.01] rounded-2xl border border-border shadow-lg overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Box size={18} />}
                  title={t('services.moving.local.title')}
                  description={t('services.moving.local.desc')}
                  items={t('services.moving.local.items')}
                  isOpen={openModule === 'local-moving'}
                  onToggle={() => setOpenModule(openModule === 'local-moving' ? null : 'local-moving')}
                />
                <CollapsibleModule
                  icon={<Truck size={18} />}
                  title={t('services.moving.international.title')}
                  description={t('services.moving.international.desc')}
                  items={t('services.moving.international.items')}
                  isOpen={openModule === 'international-moving'}
                  onToggle={() => setOpenModule(openModule === 'international-moving' ? null : 'international-moving')}
                />
                <CollapsibleModule
                  icon={<HardHat size={18} />}
                  title={t('services.moving.furniture.title')}
                  description={t('services.moving.furniture.desc')}
                  items={t('services.moving.furniture.items')}
                  isOpen={openModule === 'furniture-moving'}
                  onToggle={() => setOpenModule(openModule === 'furniture-moving' ? null : 'furniture-moving')}
                />
              </div>

              <div className="py-5 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.moving.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Moving')}
                  className="cta-primary btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.moving.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 4: Outdoor & Specialized - Compact */}
      <section id="outdoor" className="relative section-spacing bg-foreground/[0.01] scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-700" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                  >
                    <Droplets size={16} />
                  </motion.div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[7px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-2.5 h-2.5 object-contain" />
                    {t('services.status.live')} — 04
                  </span>
                </div>
                <h2 className="text-display mb-3">{t('services.outdoor.title')}</h2>
                <p className="text-[0.85rem] md:text-sm !text-foreground/50 mb-5 max-w-md">
                  {t('services.outdoor.body')}
                </p>
                
                <motion.div 
                  className="p-3.5 rounded-xl bg-foreground/[0.02] border border-border/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Smartphone className="text-primary w-3.5 h-3.5" />
                  </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.outdoor.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.01] rounded-2xl border border-border shadow-lg overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Droplets size={18} />}
                  title={t('services.outdoor.pool.title')}
                  description={t('services.outdoor.pool.desc')}
                  items={t('services.outdoor.pool.items')}
                  isOpen={openModule === 'pool'}
                  onToggle={() => setOpenModule(openModule === 'pool' ? null : 'pool')}
                />
                <CollapsibleModule
                  icon={<Waves size={18} />}
                  title={t('services.outdoor.landscaping.title')}
                  description={t('services.outdoor.landscaping.desc')}
                  items={t('services.outdoor.landscaping.items')}
                  isOpen={openModule === 'landscaping'}
                  onToggle={() => setOpenModule(openModule === 'landscaping' ? null : 'landscaping')}
                />
              </div>

              <div className="py-5 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.outdoor.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Outdoor')}
                  className="cta-primary btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.outdoor.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 5: Care & Lifestyle - Compact */}
      <section id="care" className="relative section-spacing scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-500" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                  >
                    <Heart size={16} />
                  </motion.div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[7px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-2.5 h-2.5 object-contain" />
                    {t('services.status.live')} — 05
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-foreground mb-4 md:mb-6">
                  {t('services.care.title.roof5')}
                </h2>
                <p className="text-xs md:text-sm !text-foreground/60 mb-8 md:mb-10 leading-relaxed">
                  {t('services.care.body.roof5')}
                </p>
                
                <motion.div 
                  className="p-3.5 rounded-xl bg-foreground/[0.02] border border-border/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.care.rule.roof5')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.01] rounded-2xl border border-border shadow-lg overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Baby size={18} />}
                  title={t('services.care.babysitting.title.roof5')}
                  description={t('services.care.babysitting.desc.roof5')}
                  items={t('services.care.babysitting.items.roof5')}
                  isOpen={openModule === 'babysitting'}
                  onToggle={() => setOpenModule(openModule === 'babysitting' ? null : 'babysitting')}
                />
                <CollapsibleModule
                  icon={<Stethoscope size={18} />}
                  title={t('services.care.nursing.title.roof5')}
                  description={t('services.care.nursing.desc.roof5')}
                  items={t('services.care.nursing.items.roof5')}
                  isOpen={openModule === 'nursing'}
                  onToggle={() => setOpenModule(openModule === 'nursing' ? null : 'nursing')}
                />
              </div>

              <div className="py-5 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.care.whatsapp.roof5'))}
                  onClick={() => trackRequestClick('Services - Care')}
                  className="cta-primary btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.care.cta.roof5')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roof 6: Electronics & Tech - Compact */}
      <section id="tech" className="relative section-spacing bg-foreground/[0.01] scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-700" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sticky top-32 md:top-40 lg:top-44 flex flex-col items-center lg:items-start text-center lg:text-start">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md"
                  >
                    <Tv size={16} />
                  </motion.div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[7px] font-black tracking-widest uppercase border border-primary/20 backdrop-blur-md">
                    <img src="/logos/SahlLogo9.png" alt="" className="w-2.5 h-2.5 object-contain" />
                    {t('services.status.live')} — 06
                  </span>
                </div>
                <h2 className="text-display mb-3">{t('services.electronics.title')}</h2>
                <p className="text-[0.85rem] md:text-sm !text-foreground/50 mb-5 max-w-md">
                  {t('services.electronics.body')}
                </p>
                
                <motion.div 
                  className="p-3.5 rounded-xl bg-foreground/[0.02] border border-border/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.electronics.rule')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground/[0.01] rounded-2xl border border-border shadow-lg overflow-hidden"
            >
              <div className="divide-y divide-border/50">
                <CollapsibleModule
                  icon={<Tv size={18} />}
                  title={t('services.electronics.home-appliances.title')}
                  description={t('services.electronics.home-appliances.desc')}
                  items={t('services.electronics.home-appliances.items')}
                  isOpen={openModule === 'appliances'}
                  onToggle={() => setOpenModule(openModule === 'appliances' ? null : 'appliances')}
                />
                <CollapsibleModule
                  icon={<Smartphone size={18} />}
                  title={t('services.electronics.it.title')}
                  description={t('services.electronics.it.desc')}
                  items={t('services.electronics.it.items')}
                  isOpen={openModule === 'it'}
                  onToggle={() => setOpenModule(openModule === 'it' ? null : 'it')}
                />
              </div>

              <div className="py-5 border-t border-border text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.electronics.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Electronics')}
                  className="cta-primary btn-shine"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.electronics.cta')}
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Banner / Bottom CTA */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[7px] font-black tracking-widest uppercase mb-5 shadow-md btn-shine">
              <img src="/logos/SahlLogo9.png" alt="" className="w-3 h-3 object-contain" />
              {t('about.position.title')}
            </div>
            
            <h2 className="text-display mb-4">
              {t('services.cta.title')}
            </h2>
            
            <p className="text-[0.85rem] md:text-sm !text-foreground/70 mb-6 max-w-2xl mx-auto">
              {t('services.cta.body')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a 
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                onClick={() => trackRequestClick('Services - Bottom CTA')}
                className="cta-primary btn-shine"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <MessageSquare size={14} className="fill-primary-foreground" />
                  {t('services.cta.button')}
                </div>
              </a>
              
              <Link 
                to="/about"
                className="group flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-foreground/40 hover:text-primary transition-all duration-500"
              >
                {t('nav.about')}
                <ArrowRight size={10} className="group-hover:translate-x-1.5 transition-transform duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

