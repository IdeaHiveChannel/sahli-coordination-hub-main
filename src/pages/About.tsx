import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { 
  XCircle, 
  ShieldCheck, 
  Zap, 
  Users, 
  Calculator, 
  FileText,
  Target,
  Eye,
  CheckCircle2,
  Search,
  Building2,
  RefreshCcw,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Shield,
  MousePointer2,
  Compass,
  Clock,
  UserCheck,
  Star
} from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export default function About() {
  const { t, dir, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40,
    });
  };

  const problemsList = [
    t('about.problems.item1'),
    t('about.problems.item2'),
    t('about.problems.item3'),
    t('about.problems.item4')
  ];

  const fragmentationList = [
    t('about.fragmentation.item1'),
    t('about.fragmentation.item2'),
    t('about.fragmentation.item3')
  ];

  const positionOutcomeList = [
    t('about.position.outcome.item1'),
    t('about.position.outcome.item2'),
    t('about.position.outcome.item3')
  ];

  const notList = [
    { title: t('about.not.marketplace'), icon: <Users className="w-4 h-4" /> },
    { title: t('about.not.provider'), icon: <ShieldCheck className="w-4 h-4" /> },
    { title: t('about.not.freelancer'), icon: <Zap className="w-4 h-4" /> },
    { title: t('about.not.execution'), icon: <Building2 className="w-4 h-4" /> },
    { title: t('about.not.contract'), icon: <FileText className="w-4 h-4" /> },
    { title: t('about.not.pricing'), icon: <Calculator className="w-4 h-4" /> }
  ];

  const doesSteps = [
    { title: t('about.does.step1'), icon: <Search className="w-6 h-6" />, desc: "" },
    { title: t('about.does.step2'), icon: <Building2 className="w-6 h-6" />, desc: "" },
    { title: t('about.does.step3'), icon: <RefreshCcw className="w-6 h-6" />, desc: "" }
  ];

  const homeownerBenefits = [
    t('about.benefits.homeowners.item1'),
    t('about.benefits.homeowners.item2'),
    t('about.benefits.homeowners.item3'),
    t('about.benefits.homeowners.item4'),
    t('about.benefits.homeowners.item5')
  ];

  const companyBenefits = [
    t('about.benefits.companies.item1'),
    t('about.benefits.companies.item2'),
    t('about.benefits.companies.item3'),
    t('about.benefits.companies.item4'),
    t('about.benefits.companies.item5')
  ];

  const coreStats = [
    {
      label: t('about.stats.experience.label'),
      value: t('about.stats.experience.value'),
      icon: <Clock className="w-5 h-5" />,
      desc: t('about.stats.experience.desc')
    },
    {
      label: t('about.stats.partners.label'),
      value: t('about.stats.partners.value'),
      icon: <UserCheck className="w-5 h-5" />,
      desc: t('about.stats.partners.desc')
    },
    {
      label: t('about.stats.satisfaction.label'),
      value: t('about.stats.satisfaction.value'),
      icon: <Star className="w-5 h-5" />,
      desc: t('about.stats.satisfaction.desc')
    }
  ];

  return (
    <Layout>
      {/* Advanced Hero Section */}
      <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center md:justify-end overflow-hidden bg-[#0a0a0b]"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 transition-transform duration-100 ease-out"
            style={{ 
              transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px) rotate(${mousePos.y * 0.02}deg)`
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt={t('nav.about')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover scale-110 opacity-40 brightness-50"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-[#0a0a0b]/80 to-[#0a0a0b] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.1),transparent_50%)] z-10" />
        </div>

        <div className="container-sahli relative z-20 pt-24 pb-12 md:pb-32 flex flex-col items-center md:items-start">
          <div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start animate-in fade-in duration-1000"
          >
            <div 
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl relative overflow-hidden group animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-200 fill-mode-both mx-auto md:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <img src="/logos/SahlLogo5.png" alt="" className="w-5 h-5 object-contain scale-[2.5]" />
              {t('nav.about')}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-10 md:mb-12 leading-[0.9] tracking-tighter text-white font-black w-full text-center md:text-start">
              {t('about.title').split(' ').map((word, i) => (
                <div key={i} className="overflow-hidden inline-block mr-[0.3em]">
                  <span 
                    className={`inline-block animate-in slide-in-from-bottom-full fade-in duration-1000 fill-mode-both ${i === 1 ? 'text-primary' : ''}`}
                    style={{ animationDelay: `${300 + (i * 80)}ms` }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </h1>
            
            <div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both"
            >
              <p className="text-base md:text-xl text-slate-400 mb-12 md:mb-20 font-medium leading-relaxed w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('about.subtitle')}
              </p>

              <div
                className="flex flex-wrap items-center gap-10 justify-center md:justify-start animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-both"
              >
                <a
                  href="#reason"
                  className="group relative flex items-center gap-8"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-500">
                      <ArrowRight className={`w-6 h-6 text-white transition-transform duration-500 group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </div>
                    <div 
                      className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1.5">{lang === 'ar' ? 'اكتشف' : 'Discover'}</span>
                    <span className="text-sm font-black text-white uppercase tracking-widest">{lang === 'ar' ? 'رحلتنا' : 'Our Story'}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Advanced Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-1000 fill-mode-both"
        >
          <div className="w-px h-20 bg-gradient-to-b from-primary via-primary/20 to-transparent relative">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(241,41,89,0.8)] animate-bounce" 
            />
          </div>
        </div>
      </section>

      {/* Why SAHLI Exists - Architectural Layout */}
      <section id="reason" className="section-spacing bg-[#0a0a0b] relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal
                direction="up"
                duration={1.2}
              >
                <div className="flex flex-col items-center lg:items-start text-center lg:text-start gap-6 md:gap-10 mb-12 md:mb-20">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary shadow-2xl">
                    <ShieldCheck size={16} />
                    {lang === 'ar' ? 'الفلسفة' : 'The Philosophy'}
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.95]">
                    {t('about.reason.title')}
                  </h2>
                </div>
                
                <div className="relative">
                  <div className="absolute top-0 left-0 w-20 h-1 bg-primary/40 rounded-full mb-10" />
                  <div className="space-y-10 pt-16">
                    <p className="text-lg md:text-2xl text-slate-300 leading-tight font-medium italic max-w-2xl whitespace-pre-line">
                      {t('about.reason.body')}
                    </p>

                    <div className="space-y-8">
                      <p className="text-base md:text-lg text-slate-400 font-medium">
                        {t('about.fragmentation.body')}
                      </p>
                      
                      <div className="space-y-6">
                        <p className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-primary">
                          {t('about.fragmentation.forced')}
                        </p>
                        <div className="grid gap-4">
                          {fragmentationList.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-2 h-2 rounded-full bg-primary/40" />
                              <span className="text-lg font-black text-slate-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-lg md:text-2xl text-white font-black leading-relaxed border-l-4 border-primary/40 pl-8 py-4 italic">
                        {t('about.fragmentation.footer')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-16 md:mt-24 flex items-center gap-8">
                    <div className="w-20 h-px bg-white/10" />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/30">{lang === 'ar' ? 'تأسست للتميز' : 'Founded for Excellence'}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 relative">
              <ScrollReveal
                className="relative z-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 shadow-2xl overflow-hidden group border border-white/10"
              >
                {/* Advanced Background Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,var(--primary)_0%,transparent_50%)] opacity-10" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-8 mb-14">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">{t('about.problems.title')}</h3>
                  </div>

                  <p className="text-base md:text-lg text-slate-400 mb-12 font-medium">
                    {t('about.problems.intro')}
                  </p>

                  <div className="space-y-8 md:space-y-10 mb-14">
                    {problemsList.map((problem, i) => (
                      <ScrollReveal 
                        key={i}
                        direction="right"
                        delay={i * 0.1}
                        duration={0.8}
                        className="flex items-start gap-6 group/item"
                      >
                        <div className="mt-2.5 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:border-primary/50 group-hover/item:bg-primary/10 transition-all duration-500">
                          <div className="w-2 h-2 rounded-full bg-primary scale-0 group-hover/item:scale-100 transition-transform duration-500" />
                        </div>
                        <span className="text-base md:text-lg font-bold text-slate-300 group-hover/item:text-white transition-colors duration-500 leading-tight">{problem}</span>
                      </ScrollReveal>
                    ))}
                  </div>

                  <p className="text-sm md:text-base font-black text-primary uppercase tracking-[0.2em] text-center py-8 border-t border-white/5">
                    {t('about.problems.outro')}
                  </p>
                </div>
              </ScrollReveal>
              
              {/* Decorative Floating Elements */}
              <div 
                className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 blur-[100px] z-0 animate-pulse" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* What SAHLI Does - Interactive Cards */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(241,41,89,0.1)_0%,transparent_70%)] opacity-50" />
        </div>

        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
            <ScrollReveal
              direction="up"
              className="flex flex-col items-center gap-8 md:gap-12"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary shadow-2xl">
                <Sparkles size={16} />
                {lang === 'ar' ? 'المنهجية' : 'The Methodology'}
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                {t('about.does.title')}
              </h2>
              
              <div className="space-y-8">
                <p className="text-base md:text-xl lg:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                  {t('about.does.body')}
                </p>
                <p className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-primary">
                  {t('about.does.contact')}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {doesSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.2}
                className="group relative"
              >
                <div className="relative z-10 h-full bg-white/5 border border-white/10 p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] backdrop-blur-3xl hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-1000 hover:-translate-y-6 flex flex-col shadow-2xl">
                  <div className="absolute top-12 right-14 text-7xl md:text-9xl font-black text-white/[0.03] group-hover:text-primary/10 transition-all duration-1000 select-none">
                    0{i + 1}
                  </div>
                  
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-12 md:mb-16 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors duration-700">
                    {step.title}
                  </h3>
                  
                  <div className="mt-12 w-16 h-1.5 bg-white/10 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-1000" />
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal 
            direction="up"
            className="text-center mt-24 md:mt-40"
          >
            <div className="inline-flex items-center gap-8 px-12 py-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <p className="text-xs md:text-sm font-black text-slate-300 uppercase tracking-[0.4em]">{t('about.does.footer')}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What SAHLI Is Not - Clean Grid */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
            <ScrollReveal
              direction="up"
              className="flex flex-col items-center gap-8 md:gap-12"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-red-500 shadow-2xl">
                <XCircle size={16} />
                {lang === 'ar' ? 'ما لسنا عليه' : 'Clarification'}
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-4">
                {t('about.not.title')}
              </h2>
              <p className="text-base md:text-xl font-black uppercase tracking-[0.3em] text-white/40">
                {t('about.not.intro')}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto mb-20 md:mb-32">
            {notList.map((item, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.05}
                className="group relative flex flex-col items-center text-center p-10 md:p-14 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/[0.08] hover:border-red-500/30 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/40 transition-all duration-700" />
                
                <div className="mb-8 md:mb-12 w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-700 shadow-2xl">
                  <XCircle className="w-8 h-8 text-red-500 group-hover:text-white transition-colors duration-700" />
                </div>
                <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-white transition-colors duration-700 leading-relaxed">
                  {item.title}
                </h4>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal 
            direction="up"
            className="max-w-4xl mx-auto p-12 md:p-20 bg-white/5 backdrop-blur-3xl rounded-[3rem] text-center shadow-2xl relative overflow-hidden group border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <p className="relative z-10 text-xl md:text-3xl lg:text-4xl text-white leading-[0.95] font-black italic tracking-tighter whitespace-pre-line">
              " {t('about.not.footer')} "
            </p>
            
            <div className="mt-16 flex justify-center gap-5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/10" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Position - Split Hero Style */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-0 w-[1000px] h-[1000px] bg-primary/[0.05] rounded-full blur-[200px] -translate-x-1/2 opacity-50" />
        </div>
        
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 md:gap-32 items-center">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="flex flex-col items-center lg:items-start text-center lg:text-start"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary mb-12 shadow-2xl">
                <Shield size={16} />
                {t('about.position.title')}
              </div>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-12 tracking-tighter leading-[0.9]">
                {lang === 'ar' ? 'الموقع الاستراتيجي' : 'Strategic Position'}
              </h2>
              
              <p className="text-lg md:text-2xl font-medium leading-relaxed text-slate-400 mb-14 max-w-2xl whitespace-pre-line">
                {t('about.position.body')}
              </p>

              <div className="space-y-8 mb-20 w-full">
                <p className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-primary">
                  {t('about.position.outcome')}
                </p>
                <div className="grid gap-6">
                  {positionOutcomeList.map((item, i) => (
                    <div key={i} className="flex items-center gap-5">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-base md:text-lg font-black text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-12 justify-center lg:justify-start">
                <div className="flex -space-x-6 md:-space-x-8">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-[#0a0a0b] bg-white/5 flex items-center justify-center overflow-hidden shadow-2xl">
                      <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl md:text-4xl font-black text-white">500+</span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/30">{lang === 'ar' ? 'شريك موثوق' : 'Trusted Partners'}</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="relative group">
              <ScrollReveal
                direction="up"
                duration={1.5}
                className="relative z-10 rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square"
              >
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Architecture" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms] ease-out group-hover:brightness-75 brightness-50"
                />
                
                {/* Floating Info Card */}
                <div 
                  className="absolute bottom-10 left-10 right-10 p-8 md:p-12 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-1000 fill-mode-both"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40">
                      <Compass size={40} />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-3xl font-black text-white mb-2 uppercase tracking-tighter">Global Hub</h4>
                      <p className="text-slate-400 text-xs md:text-sm font-black tracking-widest uppercase opacity-60">Connecting Excellence with Ambition</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              {/* Decorative Back Elements */}
              <div className="absolute -top-12 -right-12 w-full h-full border-2 border-white/10 rounded-[5rem] -z-10 translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Sections - Dual Panes */}
      <section className="py-24 md:py-40 bg-[#0a0a0b] relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
            {/* For Homeowners */}
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="group relative h-full"
            >
              <div className="relative z-10 p-10 md:p-16 lg:p-20 rounded-[3rem] md:rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-1000 h-full flex flex-col shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2.5 bg-primary/20 group-hover:bg-primary transition-colors duration-1000" />
                
                <div className="mb-12 md:mb-16 w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                  <MousePointer2 size={40} />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black mb-8 text-white tracking-tighter leading-[0.95] uppercase">{t('about.benefits.homeowners.title')}</h3>
                
                <p className="text-base md:text-lg text-white/40 font-black mb-14 leading-relaxed italic uppercase tracking-widest">
                  {t('about.benefits.homeowners.intro')}
                </p>

                <ul className="space-y-8 md:space-y-10 mb-16 md:mb-20 flex-grow">
                  {homeownerBenefits.map((benefit, i) => (
                    <ScrollReveal 
                      key={i} 
                      direction="up"
                      delay={i * 0.1}
                      className="flex items-start gap-8 group/item"
                    >
                      <div className="mt-1.5 w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-2xl">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-base md:text-xl text-slate-400 font-black group-hover/item:text-white transition-colors duration-500 leading-tight">{benefit}</span>
                    </ScrollReveal>
                  ))}
                </ul>
                
                <div className="pt-12 border-t border-white/10">
                  <p className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-primary italic">
                    {t('about.benefits.homeowners.outro')}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* For Service Companies */}
            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              className="group relative h-full"
            >
              <div className="relative z-10 p-10 md:p-16 lg:p-20 rounded-[3rem] md:rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-1000 h-full flex flex-col shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2.5 bg-primary/20 group-hover:bg-primary transition-colors duration-1000" />
                
                <div className="mb-12 md:mb-16 w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                  <Building2 size={40} />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black mb-8 text-white tracking-tighter leading-[0.95] uppercase">{t('about.benefits.companies.title')}</h3>
                
                <p className="text-base md:text-lg text-white/40 font-black mb-14 leading-relaxed italic uppercase tracking-widest">
                  {t('about.benefits.companies.intro')}
                </p>

                <ul className="space-y-8 md:space-y-10 mb-16 md:mb-20 flex-grow">
                  {companyBenefits.map((benefit, i) => (
                    <ScrollReveal 
                      key={i} 
                      direction="up"
                      delay={i * 0.1}
                      className="flex items-start gap-8 group/item"
                    >
                      <div className="mt-1.5 w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-2xl">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-base md:text-xl text-slate-400 font-black group-hover/item:text-white transition-colors duration-500 leading-tight">{benefit}</span>
                    </ScrollReveal>
                  ))}
                </ul>
                
                <div className="pt-12 border-t border-white/10">
                  <p className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-primary italic">
                    {t('about.benefits.companies.outro')}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Split Design */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal
              direction="up"
              className="relative p-12 md:p-16 lg:p-20 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-primary transition-transform duration-1000 group-hover:scale-150 group-hover:-rotate-12 pointer-events-none">
                <Compass size={150} />
              </div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                  <Target size={40} />
                </div>
                <h3 className="text-2xl md:text-4xl font-black mb-8 tracking-tighter uppercase leading-none text-white">{t('about.mission.title')}</h3>
                <p className="text-lg md:text-2xl text-slate-400 leading-relaxed font-black uppercase tracking-widest opacity-60">{t('about.mission.body')}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal
              direction="up"
              delay={0.2}
              className="relative p-12 md:p-16 lg:p-20 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] text-primary transition-transform duration-1000 group-hover:scale-150 group-hover:-rotate-12 pointer-events-none">
                <Eye size={150} />
              </div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-12 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                  <Eye size={40} />
                </div>
                <h3 className="text-2xl md:text-4xl font-black mb-8 tracking-tighter uppercase leading-none text-white">{t('about.vision.title')}</h3>
                <p className="text-lg md:text-2xl text-slate-400 leading-relaxed font-black uppercase tracking-widest opacity-60">{t('about.vision.body')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 relative overflow-hidden bg-[#0a0a0b]">
        <div className="container-sahli relative z-10">
          <ScrollReveal
            direction="up"
            className="relative bg-white/5 backdrop-blur-3xl rounded-[4rem] md:rounded-[6rem] p-12 md:p-24 lg:p-32 overflow-hidden group shadow-2xl border border-white/10"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] group-hover:bg-primary/20 transition-all duration-1000" />
            
            <div className="relative z-10 max-w-5xl mx-auto text-center">
              <ScrollReveal
                direction="up"
                delay={0.2}
                className="inline-block px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-12 md:mb-16"
              >
                {t('cta.ready')}
              </ScrollReveal>
              
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-10 md:mb-16 tracking-tighter leading-[0.9]">
                {t('about.getStarted.title')}
              </h2>
              
              <p className="text-lg md:text-2xl text-slate-400 mb-16 md:mb-24 font-black uppercase tracking-[0.2em] max-w-3xl mx-auto opacity-60">
                {t('about.getStarted.body')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <a
                  href={getWhatsAppLink(t('cta.whatsapp.general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('About Page CTA')}
                >
                  <button
                    className="px-12 md:px-16 py-6 md:py-8 bg-primary text-white rounded-[2rem] md:rounded-[2.5rem] font-black text-base md:text-lg uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95"
                  >
                    {t('about.getStarted.whatsapp')}
                  </button>
                </a>
                <div className="flex items-center gap-6 px-10 py-6 md:py-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                  <span className="text-white text-sm md:text-base font-black uppercase tracking-widest">{t('contact.hours.title')}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Architectural Footer Note */}
        <div className="mt-40 md:mt-60 border-t border-white/5 pt-24 md:pt-32 text-center">
          <div className="container-sahli">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-white/10 px-6 max-w-6xl mx-auto leading-[3]">
              {t('about.footer.note')}
            </p>
          </div>
        </div>
        
        {/* Background Text Decor */}
        <div className="absolute -bottom-20 md:-bottom-40 left-1/2 -translate-x-1/2 text-[25vw] font-black text-white/[0.01] select-none pointer-events-none whitespace-nowrap leading-none tracking-tighter">
          SAHLI HUB
        </div>
      </section>
    </Layout>
  );
}
