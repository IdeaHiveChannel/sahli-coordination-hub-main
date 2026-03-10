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
    <div className={`border-b border-white/5 last:border-0 transition-all duration-500 ${isOpen ? 'bg-primary/5' : 'hover:bg-white/[0.02]'}`}>
      <button
        onClick={onToggle}
        className="w-full py-4 md:py-6 flex items-center justify-between group transition-all px-4 md:px-8 gap-4"
      >
        <div className="flex items-start gap-4 md:gap-6 flex-1 min-w-0">
          <div 
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-2xl shrink-0 ${isOpen ? 'bg-primary text-white shadow-primary/40' : 'bg-white/5 border border-white/10 text-white/70 group-hover:border-primary/50 group-hover:text-primary'}`}
          >
            {React.cloneElement(icon as React.ReactElement, { size: 20 })}
          </div>
          <div className="text-start flex-1 min-w-0 pt-0.5">
            <h3 className={`text-base md:text-lg font-black transition-colors duration-300 break-words leading-tight mb-1.5 ${isOpen ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
              {title}
            </h3>
            <p className={`text-xs md:text-sm text-slate-400 transition-all duration-300 line-clamp-2 leading-relaxed ${isOpen ? 'text-slate-300' : ''}`}>
              {description}
            </p>
          </div>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 shrink-0 ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'border-white/10 text-white/30 group-hover:border-primary/50 group-hover:text-primary'}`}
        >
          <ChevronDown size={16} strokeWidth={2.5} />
        </div>
      </button>

      <div 
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className={`pb-8 ps-[72px] md:ps-[104px] pe-4 md:pe-12 flex flex-col gap-6`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {items.split('\n').map((item: string, idx: number) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-3 text-slate-300 text-xs md:text-sm py-1.5 transition-all duration-500 group/item`}
                  style={{ 
                    transitionDelay: `${50 + idx * 30}ms`,
                    transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors duration-300" />
                  <span className="leading-relaxed break-words w-full group-hover/item:text-white transition-colors duration-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {locationLinks && locationLinks.length > 0 && (
              <div
                className={`pt-6 mt-2 border-t border-dashed border-white/10 transition-all duration-500 delay-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              >
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-4 flex items-center gap-2">
                  <Info size={12} className="text-primary" />
                  Available Districts
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {locationLinks.map((loc, idx) => (
                    <Link
                      key={idx}
                      to={loc.path}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/5 hover:border-primary/30 text-[11px] font-bold text-slate-400 hover:text-white transition-all flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary" />
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
      <section ref={containerRef} className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-[#0a0a0b]">
        {/* Background Parallax and Gradients */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 animate-in fade-in zoom-in-105 duration-[2000ms]"
          >
            <img 
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1920&auto=format&fit=crop" 
              alt={t('nav.services')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-center opacity-40 scale-110"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-[#0a0a0b]/80 to-[#0a0a0b] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.1),transparent_50%)] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(241,41,89,0.05),transparent_50%)] z-10" />
        </div>

        <div className="container-sahli relative z-20 pt-32 pb-12 md:pt-40 md:pb-32">
          <div
            className="max-w-4xl mx-auto md:mx-0 text-center md:text-start"
          >
            <div
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl mx-auto md:mx-0 animate-in fade-in zoom-in-95 duration-1000"
          >
              <img src="/logos/SahlLogo5.png" alt="" className="w-5 h-5 object-contain scale-[2.5]" />
              {t('nav.services')}
            </div>

            <h1 className="mb-6 md:mb-10 text-white text-4xl md:text-6xl lg:text-8xl font-black w-full text-center md:text-start break-words md:max-w-[90%] leading-[0.9] tracking-tighter">
              {t('services.title').split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "text-primary block md:inline" : "block md:inline"}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p 
              className="text-base md:text-xl text-slate-400 max-w-xl md:max-w-2xl mb-12 mx-auto md:mx-0 leading-relaxed w-full text-center md:text-start animate-in fade-in slide-in-from-bottom-5 fill-mode-both break-words font-medium"
              style={{ animationDelay: '0.6s', animationDuration: '1s' }}
            >
              {t('services.intro')}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
               <a 
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center gap-3"
              >
                <MessageSquare size={18} />
                {t('services.cta.button')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Selector - Enhanced Visuals */}
      <div className="sticky top-[70px] z-50 w-full backdrop-blur-2xl bg-[#0a0a0b]/80 border-y border-white/5 shadow-2xl">
        <div className="container-sahli">
          <div className="flex overflow-x-auto no-scrollbar gap-3 sm:gap-6 py-4 scroll-smooth items-center md:justify-start px-1">
            {roofs.map((roof: { id: string; label: string; status?: string }, idx: number) => (
              <button
                key={roof.id}
                onClick={() => handleRoofClick(roof.id)}
                className={`relative px-4 md:px-6 py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap shrink-0 group ${
                  activeRoof === roof.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {activeRoof === roof.id && (
                  <div 
                    className="absolute inset-0 bg-primary rounded-xl shadow-2xl shadow-primary/30 animate-in fade-in zoom-in-95 duration-300"
                  />
                )}
                
                <span className="relative z-10 flex items-center gap-3">
                    {activeRoof === roof.id && (
                      <img 
                        src="/logos/SahlLogo5.png" 
                        alt="" 
                        className="w-4 h-4 object-contain brightness-0 invert scale-[2.5]" 
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
      <section id="home-maintenance" className="relative section-spacing scroll-mt-32 bg-[#0a0a0b] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] -z-10" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-48 h-fit"
            >
              <div className="flex flex-col items-start text-start">
                <div className="flex items-center gap-5 mb-8 w-full">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 shrink-0"
                  >
                    <Wrench size={28} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-3 h-3 object-contain scale-[2.5]" />
                      {t('services.status.live')} — 01
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mt-3 leading-tight break-words w-full">
                      {t('services.homeMaintenance.title')}
                    </h2>
                  </div>
                </div>
                
                <p className="text-base md:text-lg text-slate-400 mb-10 md:mb-12 leading-relaxed break-words w-full font-medium">
                  {t('services.homeMaintenance.body')}
                </p>
                
                <div 
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden group w-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Box className="text-primary w-5 h-5" />
                    </div>
                    <p className="text-xs md:text-sm font-bold text-slate-300 leading-relaxed italic">
                      {t('services.homeMaintenance.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="divide-y divide-white/5">
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

              <div className="py-8 border-t border-white/5 text-center bg-white/[0.02]">
                <a 
                  href={getWhatsAppLink(t('services.homeMaintenance.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Home Maintenance')}
                  className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 inline-flex items-center gap-3"
                >
                  <MessageSquare size={18} />
                  {t('services.homeMaintenance.cta')}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roof 2: Cleaning & Coordination - Compact */}
      <section id="cleaning" className="relative section-spacing bg-[#0a0a0b] scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px] -z-10" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-48 h-fit"
            >
              <div className="flex flex-col items-start text-start">
                <div className="flex items-center gap-5 mb-8 w-full">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 shrink-0"
                  >
                    <Sparkles size={28} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-3 h-3 object-contain scale-[2.5]" />
                      {t('services.status.live')} — 02
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mt-3 leading-tight break-words w-full">
                      {t('services.cleaning.title')}
                    </h2>
                  </div>
                </div>

                <p className="text-base md:text-lg text-slate-400 mb-10 md:mb-12 leading-relaxed break-words w-full font-medium">
                  {t('services.cleaning.body')}
                </p>
                
                <div 
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden group w-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="text-primary w-5 h-5" />
                    </div>
                    <p className="text-xs md:text-sm font-bold text-slate-300 leading-relaxed italic">
                      {t('services.cleaning.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="divide-y divide-white/5">
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

              <div className="py-8 border-t border-white/5 text-center bg-white/[0.02]">
                <a 
                  href={getWhatsAppLink(t('services.cleaning.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Cleaning')}
                  className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 inline-flex items-center gap-3"
                >
                  <MessageSquare size={18} />
                  {t('services.cleaning.cta')}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roof 3: Moving & Relocation - Compact */}
      <section id="moving" className="relative section-spacing bg-[#0a0a0b] scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] -z-10" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-48 h-fit"
            >
              <div className="flex flex-col items-start text-start">
                <div className="flex items-center gap-5 mb-8 w-full">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 shrink-0"
                  >
                    <Truck size={28} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-3 h-3 object-contain scale-[2.5]" />
                      {t('services.status.live')} — 03
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mt-3 leading-tight break-words w-full">
                      {t('services.moving.title')}
                    </h2>
                  </div>
                </div>

                <p className="text-base md:text-lg text-slate-400 mb-10 md:mb-12 leading-relaxed break-words w-full font-medium">
                  {t('services.moving.body')}
                </p>
                
                <div 
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden group w-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Heart className="text-primary w-5 h-5" />
                    </div>
                    <p className="text-xs md:text-sm font-bold text-slate-300 leading-relaxed italic">
                      {t('services.moving.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="divide-y divide-white/5">
                <CollapsibleModule
                  icon={<Box size={18} />}
                  title={t('services.moving.local.title')}
                  description={t('services.moving.local.desc')}
                  items={t('services.moving.local.items')}
                  isOpen={openModule === 'local-moving'}
                  onToggle={() => setOpenModule(openModule === 'local-moving' ? null : 'local-moving')}
                />
              </div>

              <div className="py-8 border-t border-white/5 text-center bg-white/[0.02]">
                <a 
                  href={getWhatsAppLink(t('services.moving.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Moving')}
                  className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 inline-flex items-center gap-3"
                >
                  <MessageSquare size={18} />
                  {t('services.moving.cta')}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Roof 4: Electronics & Tech - Compact */}
      <section id="tech" className="relative section-spacing bg-[#0a0a0b] scroll-mt-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px] -z-10" />
        
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="relative lg:sticky top-0 lg:top-48 h-fit"
            >
              <div className="flex flex-col items-start text-start">
                <div className="flex items-center gap-5 mb-8 w-full">
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 shrink-0"
                  >
                    <Tv size={28} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase border border-primary/20">
                      <img src="/logos/SahlLogo5.png" alt="" className="w-3 h-3 object-contain scale-[2.5]" />
                      {t('services.status.live')} — 04
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mt-3 leading-tight break-words w-full">
                      {t('services.electronics.title')}
                    </h2>
                  </div>
                </div>

                <p className="text-base md:text-lg text-slate-400 mb-10 md:mb-12 leading-relaxed break-words w-full font-medium">
                  {t('services.electronics.body')}
                </p>
                
                <div 
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden group w-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-primary w-5 h-5" />
                    </div>
                    <p className="text-xs md:text-sm font-bold text-slate-300 leading-relaxed italic">
                      {t('services.electronics.rule')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal 
              direction="up"
              delay={0.2}
              className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="divide-y divide-white/5">
                <CollapsibleModule
                  icon={<Tv size={18} />}
                  title={t('services.electronics.home-appliances.title')}
                  description={t('services.electronics.home-appliances.desc')}
                  items={t('services.electronics.home-appliances.items')}
                  isOpen={openModule === 'appliances'}
                  onToggle={() => setOpenModule(openModule === 'appliances' ? null : 'appliances')}
                />
              </div>

              <div className="py-8 border-t border-white/5 text-center bg-white/[0.02]">
                <a 
                  href={getWhatsAppLink(t('services.electronics.whatsapp'))}
                  onClick={() => trackRequestClick('Services - Electronics')}
                  className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 inline-flex items-center gap-3"
                >
                  <MessageSquare size={18} />
                  {t('services.electronics.cta')}
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Banner / Bottom CTA */}
      <section className="section-spacing relative overflow-hidden bg-[#0a0a0b]">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        
        <div className="container-sahli text-center">
          <ScrollReveal
            direction="up"
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl mx-auto">
              <img src="/logos/SahlLogo5.png" alt="" className="w-5 h-5 object-contain scale-[2.5]" />
              {t('about.position.title')}
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 break-words w-full tracking-tighter">
              {t('services.cta.title')}
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto break-words w-full font-medium leading-relaxed">
              {t('services.cta.body')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={getWhatsAppLink(t('cta.whatsapp.general'))}
                onClick={() => trackRequestClick('Services - Bottom CTA')}
                className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 flex items-center gap-3"
              >
                <MessageSquare size={18} />
                {t('services.cta.button')}
              </a>
              
              <Link 
                to="/about"
                className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-all duration-500"
              >
                {t('nav.about')}
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="container-sahli py-12 md:py-20 border-t border-white/5 bg-[#0a0a0b]">
        <div className="flex items-center justify-center gap-4 opacity-40">
          <img src="/logos/SahlLogo5.png" alt="" className="w-4 h-4 object-contain scale-[2.5]" />
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/60">
            {t('services.end')}
          </span>
        </div>
      </div>
    </Layout>
  );
}
