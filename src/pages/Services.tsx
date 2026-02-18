import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
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
    <div className={`border-b border-border/50 last:border-0 transition-all duration-500 ${isOpen ? 'bg-primary/[0.02]' : 'hover:bg-foreground/[0.01]'}`}>
      <button
        onClick={onToggle}
        className="w-full py-3 md:py-4 flex items-center justify-between group transition-all px-4 md:px-6 gap-4"
      >
        <div className="flex items-start gap-3 md:gap-5 flex-1 min-w-0">
          <div 
            className={`w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm shrink-0 ${isOpen ? 'bg-primary text-primary-foreground shadow-primary/20' : 'bg-white border border-border/50 text-foreground/70 group-hover:border-primary/30 group-hover:text-primary'}`}
          >
            {React.cloneElement(icon as React.ReactElement, { size: 18 })}
          </div>
          <div className="text-start flex-1 min-w-0 pt-0.5">
            <h3 className={`text-sm md:text-base font-bold transition-colors duration-300 break-words leading-tight mb-1 ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-foreground'}`}>
              {title}
            </h3>
            <p className={`text-xs md:text-sm text-foreground/60 transition-all duration-300 line-clamp-2 leading-relaxed ${isOpen ? 'text-foreground/80' : ''}`}>
              {description}
            </p>
          </div>
        </div>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-500 shrink-0 ${isOpen ? 'bg-primary border-primary text-primary-foreground rotate-180' : 'border-border/50 text-foreground/30 group-hover:border-primary/30 group-hover:text-primary'}`}
        >
          <ChevronDown size={14} strokeWidth={2.5} />
        </div>
      </button>

      <div 
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className={`pb-6 ps-[52px] md:ps-[84px] pe-4 md:pe-8 flex flex-col gap-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {items.split('\n').map((item: string, idx: number) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-2.5 text-foreground/80 text-xs md:text-sm py-1 transition-all duration-500 group/item`}
                  style={{ 
                    transitionDelay: `${50 + idx * 30}ms`,
                    transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/20 group-hover/item:bg-primary transition-colors duration-300" />
                  <span className="leading-relaxed break-words w-full group-hover/item:text-primary transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {locationLinks && locationLinks.length > 0 && (
              <div
                className={`pt-4 mt-2 border-t border-dashed border-border/40 transition-all duration-500 delay-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              >
                <p className="text-[0.65rem] font-bold tracking-wider uppercase text-foreground/40 mb-3 flex items-center gap-1.5">
                  <Info size={10} />
                  Available Districts
                </p>
                <div className="flex flex-wrap gap-2">
                  {locationLinks.map((loc, idx) => (
                    <Link
                      key={idx}
                      to={loc.path}
                      className="px-2.5 py-1 rounded-md bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border/10 text-[0.7rem] font-medium text-foreground/70 hover:text-foreground transition-all flex items-center gap-1.5"
                    >
                      {loc.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { t, dir, lang } = useLanguage();
  const location = useLocation();
  const [activeRoof, setActiveRoof] = useState('home-maintenance');
  const [openModule, setOpenModule] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
      <section ref={containerRef} className="relative min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden bg-background">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 animate-in fade-in zoom-in-105 duration-[1500ms]"
          >
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1920&auto=format&fit=crop" 
              alt={t('nav.services')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="absolute inset-0 bg-white/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-0" />
        </div>

        <div className="container-sahli relative z-10 pt-28 pb-8 md:pt-32 md:pb-24">
          <div
            className="max-w-4xl mx-auto md:mx-0 text-center md:text-start"
          >
            <div
            className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/10 rounded-full border border-primary/20 text-label mb-6 backdrop-blur-md mx-auto md:mx-0 animate-in fade-in zoom-in-95 duration-1000"
          >
              <img src="/logos/SahlLogo5.png" alt="" className="w-4 h-4 object-contain scale-[3]" />
              {t('nav.services')}
            </div>

            <h1 className="mb-4 md:mb-6 text-primary text-3xl md:text-5xl lg:text-6xl font-black w-full text-center md:text-start break-words md:max-w-[80%] leading-tight">
              {t('services.title')}
            </h1>
            
            <p 
              className="text-sm md:text-lg text-slate-900 max-w-xl md:max-w-2xl mb-8 mx-auto md:mx-0 leading-relaxed w-full text-center md:text-start animate-in fade-in slide-in-from-bottom-5 fill-mode-both break-words"
              style={{ animationDelay: '0.6s', animationDuration: '1s' }}
            >
              {t('services.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Selector - Enhanced Visuals */}
      <div className="sticky top-[60px] z-40 w-full backdrop-blur-xl bg-background/80 border-y border-border/50 shadow-sm">
        <div className="container-sahli">
          <div className="flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-3 scroll-smooth items-center md:justify-start px-1">
            {roofs.map((roof: { id: string; label: string; status?: string }, idx: number) => (
              <button
                key={roof.id}
                onClick={() => handleRoofClick(roof.id)}
                className={`relative px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 ${
                  activeRoof === roof.id
                    ? 'text-primary-foreground shadow-md shadow-primary/20 scale-105'
                    : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {activeRoof === roof.id && (
                  <div 
                    className="absolute inset-0 bg-primary rounded-full -z-10 animate-in fade-in zoom-in-95 duration-200"
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-2">
                    {activeRoof === roof.id && (
                      <img 
                        src="/logos/SahlLogo5.png" 
                        alt="" 
                        className="w-3 h-3 object-contain brightness-0 invert scale-[3]" 
                      />
                    )}
                    {roof.label}
                  </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Roof 1: Home Maintenance - Compact */}
      <section id="home-maintenance" className="relative section-spacing scroll-mt-24 md:scroll-mt-32 bg-background overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/[0.03] rounded-full blur-[60px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-44 h-fit"
            >
              <div className="flex flex-col items-start text-start bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-border/40 md:border-0 shadow-sm md:shadow-none">
                <div className="flex items-center gap-3 md:gap-2 mb-4 w-full md:w-auto border-b border-border/40 pb-4 md:border-0 md:pb-0">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20 shrink-0"
                  >
                    <Wrench size={20} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black tracking-widest uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-2.5 h-2.5 object-contain scale-[3]" />
                      {t('services.status.live')} — 01
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-primary mt-1 leading-none break-words w-full">
                      {t('services.homeMaintenance.title')}
                    </h2>
                  </div>
                </div>
                
                <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-10 leading-relaxed break-words w-full">
                  {t('services.homeMaintenance.body')}
                </p>
                
                <div 
                  className="p-3.5 rounded-xl bg-secondary/30 border border-secondary/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Box className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.homeMaintenance.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden"
            >
              <div className="divide-y divide-border/40">
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

              <div className="py-5 border-t border-border/40 text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.homeMaintenance.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Home Maintenance')}
                  className="cta-primary btn-shine inline-block group"
                >
                  <div
                    className="flex items-center gap-2 group-hover:scale-105 group-hover:-translate-y-0.5 group-active:scale-95 transition-transform duration-300"
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.homeMaintenance.cta')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roof 2: Cleaning & Coordination - Compact */}
      <section id="cleaning" className="relative section-spacing bg-foreground/[0.01] scroll-mt-24 md:scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[50px] md:blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[60px] md:blur-[100px] -z-10 animate-pulse-slow delay-700" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-44 h-fit"
            >
              <div className="flex flex-col items-start text-start bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-border/40 md:border-0 shadow-sm md:shadow-none">
                <div className="flex items-center gap-3 md:gap-2 mb-4 w-full md:w-auto border-b border-border/40 pb-4 md:border-0 md:pb-0">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20 shrink-0"
                  >
                    <Sparkles size={20} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-2.5 h-2.5 object-contain scale-[3]" />
                      {t('services.status.live')} — 02
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-primary mt-1 leading-none break-words w-full">
                      {t('services.cleaning.title')}
                    </h2>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-10 leading-relaxed break-words w-full">
                  {t('services.cleaning.body')}
                </p>
                
                <div 
                  className="p-3.5 rounded-xl bg-secondary/30 border border-secondary/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.cleaning.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden"
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
                  className="cta-primary btn-shine inline-block group"
                >
                  <div
                    className="flex items-center gap-2 group-hover:scale-105 group-hover:-translate-y-0.5 group-active:scale-95 transition-transform duration-300"
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.cleaning.cta')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roof 3: Moving & Relocation - Compact */}
      <section id="moving" className="relative section-spacing scroll-mt-24 md:scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-500" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-44 h-fit"
            >
              <div className="flex flex-col items-start text-start bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-border/40 md:border-0 shadow-sm md:shadow-none">
                <div className="flex items-center gap-3 md:gap-2 mb-4 w-full md:w-auto border-b border-border/40 pb-4 md:border-0 md:pb-0">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20 shrink-0"
                  >
                    <Truck size={20} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-2.5 h-2.5 object-contain scale-[3]" />
                      {t('services.status.live')} — 03
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-primary mt-1 leading-none break-words w-full">
                      {t('services.moving.title')}
                    </h2>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-10 leading-relaxed break-words w-full">
                  {t('services.moving.body')}
                </p>
                
                <div 
                  className="p-3.5 rounded-xl bg-secondary/30 border border-secondary/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.moving.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden"
            >
              <div className="divide-y divide-border/40">
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

              <div className="py-5 border-t border-border/40 text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.moving.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Moving')}
                  className="cta-primary btn-shine inline-block group"
                >
                  <div
                    className="flex items-center gap-2 group-hover:scale-105 group-hover:-translate-y-0.5 group-active:scale-95 transition-transform duration-300"
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.moving.cta')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roof 4: Outdoor & Specialized - Compact */}
      <section id="outdoor" className="relative section-spacing bg-foreground/[0.01] scroll-mt-24 md:scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-700" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-44 h-fit"
            >
              <div className="flex flex-col items-start text-start bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-border/40 md:border-0 shadow-sm md:shadow-none">
                <div className="flex items-center gap-3 md:gap-2 mb-4 w-full md:w-auto border-b border-border/40 pb-4 md:border-0 md:pb-0">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20 shrink-0"
                  >
                    <Droplets size={20} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-2.5 h-2.5 object-contain scale-[3]" />
                      {t('services.status.live')} — 04
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-primary mt-1 leading-none break-words w-full">
                      {t('services.outdoor.title')}
                    </h2>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-10 leading-relaxed break-words w-full">
                  {t('services.outdoor.body')}
                </p>
                
                <div 
                  className="p-3.5 rounded-xl bg-secondary/30 border border-secondary/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Smartphone className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.outdoor.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden"
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
                  className="cta-primary btn-shine inline-block group"
                >
                  <div
                    className="flex items-center gap-2 group-hover:scale-105 group-hover:-translate-y-0.5 group-active:scale-95 transition-transform duration-300"
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.outdoor.cta')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roof 5: Care & Lifestyle - Compact */}
      <section id="care" className="relative section-spacing scroll-mt-24 md:scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-500" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-44 h-fit"
            >
              <div className="flex flex-col items-start text-start bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-border/40 md:border-0 shadow-sm md:shadow-none">
                <div className="flex items-center gap-3 md:gap-2 mb-4 w-full md:w-auto border-b border-border/40 pb-4 md:border-0 md:pb-0">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20 shrink-0"
                  >
                    <Heart size={20} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-2.5 h-2.5 object-contain scale-[3]" />
                      {t('services.status.live')} — 05
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-primary mt-1 leading-none break-words w-full">
                      {t('services.care.title.roof5')}
                    </h2>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-10 leading-relaxed break-words w-full">
                  {t('services.care.body.roof5')}
                </p>
                
                <div 
                  className="p-3.5 rounded-xl bg-secondary/30 border border-secondary/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.care.rule.roof5')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden"
            >
              <div className="divide-y divide-border/40">
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

              <div className="py-5 border-t border-border/40 text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.care.whatsapp.roof5'))}
                  onClick={() => trackRequestClick('Services - Care')}
                  className="cta-primary btn-shine inline-block group"
                >
                  <div
                    className="flex items-center gap-2 group-hover:scale-105 group-hover:-translate-y-0.5 group-active:scale-95 transition-transform duration-300"
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.care.cta.roof5')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roof 6: Electronics & Tech - Compact */}
      <section id="tech" className="relative section-spacing bg-foreground/[0.01] scroll-mt-24 md:scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-primary/[0.05] rounded-full blur-[80px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] -z-10 animate-pulse-slow delay-700" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 md:gap-8">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-44 h-fit"
            >
              <div className="flex flex-col items-start text-start bg-white md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-border/40 md:border-0 shadow-sm md:shadow-none">
                <div className="flex items-center gap-3 md:gap-2 mb-4 w-full md:w-auto border-b border-border/40 pb-4 md:border-0 md:pb-0">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20 shrink-0"
                  >
                    <Tv size={20} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-2.5 h-2.5 object-contain scale-[3]" />
                      {t('services.status.live')} — 06
                    </span>
                    <h2 className="text-xl md:text-3xl font-black text-primary mt-1 leading-none break-words w-full">
                      {t('services.electronics.title')}
                    </h2>
                  </div>
                </div>

                <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-10 leading-relaxed break-words w-full">
                  {t('services.electronics.body')}
                </p>
                
                <div 
                  className="p-3.5 rounded-xl bg-secondary/30 border border-secondary/50 relative overflow-hidden group w-full max-w-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-3.5 h-3.5" />
                    </div>
                    <p className="text-[0.7rem] font-bold text-foreground/70 leading-relaxed italic">
                      {t('services.electronics.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white rounded-2xl border border-border/40 shadow-sm overflow-hidden"
            >
              <div className="divide-y divide-border/40">
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

              <div className="py-5 border-t border-border/40 text-center bg-foreground/[0.01]">
                <a 
                  href={getWhatsAppLink(t('services.electronics.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Electronics')}
                  className="cta-primary btn-shine inline-block group"
                >
                  <div
                    className="flex items-center gap-2 group-hover:scale-105 group-hover:-translate-y-0.5 group-active:scale-95 transition-transform duration-300"
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('services.electronics.cta')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Banner / Bottom CTA */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli text-center">
          <ScrollReveal
            direction="up"
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[7px] font-black tracking-widest uppercase mb-5 shadow-md btn-shine">
              <img src="/logos/SahlLogo5.png" alt="" className="w-3 h-3 object-contain scale-[3]" />
              {t('about.position.title')}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-primary mb-4 break-words w-full">
              {t('services.cta.title')}
            </h2>
            
            <p className="text-sm md:text-base text-slate-600 mb-6 max-w-2xl mx-auto break-words w-full">
              {t('services.cta.body')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a 
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                onClick={() => trackRequestClick('Services - Bottom CTA')}
                className="cta-primary btn-shine inline-block"
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
          </ScrollReveal>
        </div>
      </section>

      <div className="container-sahli py-8 md:py-12 border-t border-border/40">
        <div className="flex items-center justify-center gap-2 md:gap-3 opacity-60">
          <img src="/logos/SahlLogo5.png" alt="" className="w-3 h-3 object-contain scale-[3]" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/60">
            {t('services.end')}
          </span>
        </div>
      </div>
    </Layout>
  );
}
