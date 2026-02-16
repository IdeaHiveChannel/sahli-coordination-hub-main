import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
  Compass
} from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

export default function About() {
  const { t, dir, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Advanced Parallax & Scroll Effects
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
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt={t('nav.about')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover scale-110 grayscale"
            />
          </motion.div>
          
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="absolute inset-0 bg-slate-950/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-0" />
        </div>

        <div className="container-sahli relative z-20 pt-24 pb-12 md:pb-20 flex flex-col items-center md:items-start">
          <motion.div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/70 mb-8 md:mb-10 mx-auto md:mx-0 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <img src="/logos/SahlLogo9.png" alt="" className="w-4 h-4 object-contain brightness-0 invert opacity-50" />
              {t('nav.about')}
            </motion.div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-8 md:mb-10 leading-[1.1] tracking-[-0.04em] text-white font-black w-full text-center md:text-start">
              {t('about.title').split(' ').map((word, i) => (
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
            
            <motion.div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs md:text-sm lg:text-base text-white/60 mb-10 md:mb-16 font-medium leading-relaxed w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('about.subtitle')}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap items-center gap-8 justify-center md:justify-start"
              >
                <a
                  href="#reason"
                  className="group relative flex items-center gap-6"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-500">
                      <ArrowRight className={`w-6 h-6 text-white transition-transform duration-500 group-hover:translate-x-1 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">{lang === 'ar' ? 'اكتشف' : 'Discover'}</span>
                    <span className="text-sm font-black text-white uppercase tracking-widest">{lang === 'ar' ? 'رحلتنا' : 'Our Story'}</span>
                  </div>
                </a>
              </motion.div>
            </motion.div>
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

      {/* Why SAHLI Exists - Architectural Layout */}
      <section id="reason" className="section-spacing bg-background relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-20 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col items-center lg:items-start text-center lg:text-start gap-4 md:gap-8 mb-10 md:mb-16">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary shadow-sm">
                    <ShieldCheck size={14} />
                    {lang === 'ar' ? 'الفلسفة' : 'The Philosophy'}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-[-0.03em] leading-[1.1]">
                    {t('about.reason.title')}
                  </h2>
                </div>
                
                <div className="relative">
                  <div className="absolute top-0 left-0 w-12 h-1 bg-primary/30 rounded-full mb-8" />
                  <div className="space-y-8 pt-12">
                    <p className="text-base md:text-lg text-foreground/80 leading-snug font-medium italic max-w-xl whitespace-pre-line">
                      {t('about.reason.body')}
                    </p>

                    <div className="space-y-6">
                      <p className="text-sm md:text-base text-foreground/60 font-medium">
                        {t('about.fragmentation.body')}
                      </p>
                      
                      <div className="space-y-4">
                        <p className="text-sm md:text-base font-black uppercase tracking-wider text-primary">
                          {t('about.fragmentation.forced')}
                        </p>
                        <div className="grid gap-3">
                          {fragmentationList.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                              <span className="text-base font-bold text-foreground/70">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-base md:text-lg text-foreground/80 font-bold leading-relaxed border-l-2 border-primary/20 pl-6 py-2 italic">
                        {t('about.fragmentation.footer')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-12 md:mt-16 flex items-center gap-6">
                    <div className="w-16 h-px bg-border" />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-foreground/40">{lang === 'ar' ? 'تأسست للتميز' : 'Founded for Excellence'}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 bg-slate-950 rounded-[2.5rem] p-8 md:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group border border-white/5"
              >
                {/* Advanced Background Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,var(--primary)_0%,transparent_50%)] opacity-30" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter leading-none">{t('about.problems.title')}</h3>
                  </div>

                  <p className="text-sm md:text-base text-white/40 mb-10 font-medium">
                    {t('about.problems.intro')}
                  </p>

                  <div className="space-y-6 md:space-y-8 mb-12">
                    {problemsList.map((problem, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="flex items-start gap-5 group/item"
                      >
                        <div className="mt-2 w-5 h-5 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:border-primary/50 group-hover/item:bg-primary/10 transition-all duration-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover/item:scale-100 transition-transform duration-500" />
                        </div>
                        <span className="text-sm md:text-base font-bold text-white/50 group-hover/item:text-white transition-colors duration-500 leading-tight">{problem}</span>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-sm md:text-base font-black text-primary uppercase tracking-widest text-center py-6 border-t border-white/5">
                    {t('about.problems.outro')}
                  </p>
                </div>
              </motion.div>
              
              {/* Decorative Floating Elements */}
              <motion.div 
                animate={{ y: [0, 30, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl z-0" 
              />
              <motion.div 
                animate={{ y: [0, -40, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-20 -left-10 w-60 h-60 bg-blue-500/10 blur-[100px] z-0" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* What SAHLI Does - Interactive Cards */}
      <section className="section-spacing bg-slate-950 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,transparent_70%)] opacity-10" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-6 md:gap-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/70 shadow-2xl">
                <Sparkles size={14} className="text-primary" />
                {lang === 'ar' ? 'المنهجية' : 'The Methodology'}
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-[-0.03em] leading-tight">
                {t('about.does.title')}
              </h2>
              
              <div className="space-y-6">
                <p className="text-sm md:text-base lg:text-lg text-white/40 font-medium max-w-3xl mx-auto leading-relaxed">
                  {t('about.does.body')}
                </p>
                <p className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-primary">
                  {t('about.does.contact')}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {doesSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="relative z-10 h-full bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-1000 hover:-translate-y-4 flex flex-col">
                  <div className="absolute top-10 right-12 text-5xl md:text-7xl font-black text-white/[0.03] group-hover:text-primary/10 transition-all duration-1000 select-none">
                    0{i + 1}
                  </div>
                  
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-10 md:mb-12 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-black text-white mb-4 tracking-tight leading-relaxed group-hover:text-primary transition-colors duration-700">
                    {step.title}
                  </h3>
                  
                  <div className="mt-10 w-12 h-1 bg-white/10 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-20 md:mt-32"
          >
            <div className="inline-flex items-center gap-6 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <p className="text-xs md:text-sm font-black text-white/70 uppercase tracking-[0.3em]">{t('about.does.footer')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What SAHLI Is Not - Clean Grid */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-6 md:gap-8"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-500/5 border border-red-500/10 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-red-500 shadow-sm">
                <XCircle size={14} />
                {lang === 'ar' ? 'ما لسنا عليه' : 'Clarification'}
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground tracking-[-0.03em] leading-tight mb-4">
                {t('about.not.title')}
              </h2>
              <p className="text-sm md:text-base text-foreground/40 font-bold uppercase tracking-widest">
                {t('about.not.intro')}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-16 md:mb-24">
            {notList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col items-center text-center p-8 md:p-10 rounded-[2rem] bg-white border border-border/50 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:border-red-500/10 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/20 transition-all duration-700" />
                
                <div className="mb-6 md:mb-8 w-14 h-14 rounded-xl bg-red-500/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-700 shadow-inner">
                  <XCircle className="w-6 h-6 text-red-500 group-hover:text-white transition-colors duration-700" />
                </div>
                <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-foreground/40 group-hover:text-foreground transition-colors duration-700 leading-relaxed">
                  {item.title}
                </h4>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto p-10 md:p-14 bg-slate-950 rounded-[2.5rem] text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            
            <p className="relative z-10 text-lg md:text-xl lg:text-2xl text-white/90 leading-tight font-black italic tracking-tight whitespace-pre-line">
              " {t('about.not.footer')} "
            </p>
            
            <div className="mt-12 flex justify-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Position - Split Hero Style */}
      <section className="section-spacing bg-slate-950 text-white relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px] -translate-x-1/2 opacity-50" />
          <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] translate-x-1/2 opacity-30" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        </div>
        
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center lg:items-start text-center lg:text-start"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary mb-12 shadow-2xl">
                <Shield size={14} />
                {t('about.position.title')}
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-10 tracking-[-0.04em] leading-[0.95]">
                {lang === 'ar' ? 'الموقع الاستراتيجي' : 'Strategic Position'}
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl font-medium leading-relaxed text-white/50 mb-12 max-w-2xl whitespace-pre-line">
                {t('about.position.body')}
              </p>

              <div className="space-y-6 mb-16 w-full">
                <p className="text-sm md:text-base font-black uppercase tracking-widest text-primary">
                  {t('about.position.outcome')}
                </p>
                <div className="grid gap-4">
                  {positionOutcomeList.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm md:text-base font-bold text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-10 justify-center lg:justify-start">
                <div className="flex -space-x-5 md:-space-x-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-slate-950 bg-slate-900 flex items-center justify-center overflow-hidden shadow-2xl">
                      <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xl md:text-2xl font-black text-white">500+</span>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/30">{lang === 'ar' ? 'شريك موثوق' : 'Trusted Partners'}</span>
                </div>
              </div>
            </motion.div>

            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] aspect-[4/5] lg:aspect-square"
              >
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Architecture" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms] ease-out grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-slate-950/5" />
                
                {/* Floating Info Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 p-6 md:p-8 bg-white/5 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      <Compass className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white mb-1 uppercase tracking-tighter">Global Hub</h4>
                      <p className="text-white/40 text-xs md:text-sm font-medium">Connecting Excellence with Ambition</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Decorative Back Elements */}
              <div className="absolute -top-10 -right-10 w-full h-full border-2 border-white/5 rounded-[4rem] -z-10 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Sections - Dual Panes */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {/* For Homeowners */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative z-10 p-8 md:p-12 lg:p-14 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_100px_80px_-50px_rgba(0,0,0,0.05)] transition-all duration-1000 h-full flex flex-col">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary/10 group-hover:bg-primary transition-colors duration-1000" />
                
                <div className="mb-10 md:mb-12 w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                  <MousePointer2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black mb-6 text-slate-950 tracking-tighter leading-none uppercase">{t('about.benefits.homeowners.title')}</h3>
                
                <p className="text-sm md:text-base text-slate-950/40 font-bold mb-10 leading-relaxed italic">
                  {t('about.benefits.homeowners.intro')}
                </p>

                <ul className="space-y-6 md:space-y-8 mb-12 md:mb-14 flex-grow">
                  {homeownerBenefits.map((benefit, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-6 group/item"
                    >
                      <div className="mt-1.5 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm md:text-base text-slate-950/40 font-bold group-hover/item:text-slate-950 transition-colors duration-500 leading-tight">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="pt-10 border-t border-slate-200">
                  <p className="text-sm md:text-base font-black uppercase tracking-widest text-primary italic">
                    {t('about.benefits.homeowners.outro')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* For Service Companies */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative z-10 p-8 md:p-12 lg:p-14 rounded-[2.5rem] bg-slate-950 border border-white/5 hover:shadow-[0_100px_80px_-50px_rgba(0,0,0,0.4)] transition-all duration-1000 h-full flex flex-col text-white">
                <div className="absolute top-0 left-0 w-full h-2 bg-white/5 group-hover:bg-primary transition-colors duration-1000" />
                
                <div className="mb-10 md:mb-12 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                  <Building2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tighter leading-none uppercase">{t('about.benefits.companies.title')}</h3>
                
                <p className="text-sm md:text-base text-white/30 font-bold mb-10 leading-relaxed italic">
                  {t('about.benefits.companies.intro')}
                </p>

                <ul className="space-y-6 md:space-y-8 mb-12 md:mb-14 flex-grow">
                  {companyBenefits.map((benefit, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-6 group/item"
                    >
                      <div className="mt-1.5 w-6 h-6 rounded-full bg-white/5 border border-white/10 text-primary flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm md:text-base text-white/30 font-bold group-hover/item:text-white transition-colors duration-500 leading-tight">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="pt-10 border-t border-white/10">
                  <p className="text-sm md:text-base font-black uppercase tracking-widest text-primary italic">
                    {t('about.benefits.companies.outro')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Split Design */}
      <section className="section-spacing bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-12 lg:p-14 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-primary transition-transform duration-1000 group-hover:scale-150 group-hover:-rotate-12 pointer-events-none">
                <Compass className="w-32 h-32" />
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-6 tracking-tighter uppercase leading-none text-slate-950">{t('about.mission.title')}</h3>
                <p className="text-sm md:text-base text-slate-950/50 leading-relaxed font-bold">{t('about.mission.body')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-8 md:p-12 lg:p-14 rounded-[2.5rem] bg-slate-950 border border-white/5 shadow-2xl group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-primary transition-transform duration-1000 group-hover:scale-150 group-hover:-rotate-12 pointer-events-none">
                <Eye className="w-32 h-32" />
              </div>
              
              <div className="relative z-10 text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-6 tracking-tighter uppercase leading-none">{t('about.vision.title')}</h3>
                <p className="text-sm md:text-base text-white/40 leading-relaxed font-bold">{t('about.vision.body')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-white">
        <div className="container-sahli relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-slate-950 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-16 lg:p-24 overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all duration-1000" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-8 md:mb-12"
              >
                {t('cta.ready')}
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 md:mb-10 tracking-[-0.04em] leading-[0.95]">
                {t('about.getStarted.title')}
              </h2>
              
              <p className="text-base md:text-lg text-white/40 mb-12 md:mb-16 font-medium leading-relaxed max-w-2xl mx-auto">
                {t('about.getStarted.body')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href={getWhatsAppLink(t('cta.whatsapp.general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('About Page CTA')}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 md:px-12 py-4 md:py-5 bg-primary text-white rounded-2xl md:rounded-3xl font-black text-sm md:text-base uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl shadow-primary/20"
                  >
                    {t('about.getStarted.whatsapp')}
                  </motion.button>
                </a>
                <div className="flex items-center gap-4 px-8 py-5 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl backdrop-blur-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white/60 text-sm md:text-base font-bold">{lang === 'ar' ? 'متاح الآن' : 'Available Now'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Architectural Footer Note */}
        <div className="mt-32 md:mt-48 border-t border-slate-100 pt-16 md:pt-24 text-center">
          <div className="container-sahli">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-slate-950/20 px-4 max-w-5xl mx-auto leading-loose">
              {t('about.footer.note')}
            </p>
          </div>
        </div>
        
        {/* Background Text Decor */}
        <div className="absolute -bottom-10 md:-bottom-20 left-1/2 -translate-x-1/2 text-[20vw] font-black text-slate-950/[0.01] select-none pointer-events-none whitespace-nowrap leading-none">
          SAHLI HUB
        </div>
      </section>
    </Layout>
  );
}

