import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { MessageSquare, ShieldCheck, Search, Heart, Zap, Shield, Repeat, ArrowRight, CheckCircle2, Headphones, ClipboardList, Star, Clock, UserCheck, ShieldAlert } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';

const HowItWorks = () => {
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

  return (
    <Layout>
      <div className="bg-slate-950 min-h-screen selection:bg-primary/30" onMouseMove={handleMouseMove}>
        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Hero Section - Architectural Design */}
        <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20">
          {/* Advanced Background Blobs */}
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
          <motion.div 
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 60, 0],
              scale: [1.2, 1, 1.2],
              rotate: [0, -30, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/4' : 'left-1/4'} w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen z-0`} 
          />

          <div className="container-sahli relative z-10 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md mb-8 group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary group-hover:tracking-[0.4em] transition-all duration-500">
                    {t('how.hero.label')}
                  </span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl mb-4 md:mb-6 leading-[1] tracking-tight text-white drop-shadow-2xl font-black w-full text-center md:text-start">
                  {t('how.hero.title').split(' ').map((word: string, i: number) => (
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
                  transition={{ delay: 0.8, duration: 1 }}
                  className="text-base md:text-lg lg:text-xl xl:text-2xl !text-white/90 mb-6 md:mb-10 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0"
                >
                  {t('how.hero.subtitle')}
                </motion.p>
              </div>

              <div className="lg:col-span-4 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1.2 }}
                  style={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
                  className="relative aspect-square"
                >
                  <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-6 blur-2xl" />
                  <div className="relative h-full w-full rounded-[4rem] border border-white/10 overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1920&auto=format&fit=crop" 
                      alt="Sahli Process"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Coordination Phases - Architectural Layout */}
        <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
          <div className="container-sahli relative z-10">
            <div className="max-w-4xl mb-20">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block"
              >
                {lang === 'ar' ? 'رحلة الخدمة' : 'SERVICE JOURNEY'}
              </motion.span>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                {t('how.flow.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { phase: 'phase1', icon: Headphones, delay: 0 },
                { phase: 'phase2', icon: ClipboardList, delay: 0.2 },
                { phase: 'phase3', icon: Star, delay: 0.4 }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: item.delay, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="group relative p-8 md:p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all duration-700 hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 rotate-12 group-hover:rotate-0">
                      <Icon size={120} />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.2)]">
                        <span className="font-black text-xl">0{idx + 1}</span>
                      </div>
                      
                      <h3 className="text-2xl font-black mb-8 text-white uppercase tracking-wider group-hover:text-primary transition-colors duration-500">
                        {t(`how.${item.phase}.title` as TranslationKey)}
                      </h3>
                      
                      <div className="space-y-6">
                        {[1, 2, 3].map((num) => (
                          <div key={num} className="flex gap-4 group/item">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary transition-colors">
                              <CheckCircle2 size={12} className="text-primary group-hover/item:text-white" />
                            </div>
                            <p className="text-slate-400 group-hover/item:text-slate-200 transition-colors leading-relaxed font-medium">
                              {t(`how.${item.phase}.item${num}` as TranslationKey)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Operational Principles - Premium Split Design */}
        <section className="relative py-24 md:py-32 bg-slate-900/50">
          <div className="container-sahli relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-10 bg-primary/20 blur-[100px] opacity-30" />
                <div className="relative space-y-8">
                  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-primary/30 transition-all duration-700">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                      <Zap size={32} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-wider">{t('how.execution.title')}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      {t('how.execution.body')}
                    </p>
                  </div>
                  
                  <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-primary/30 transition-all duration-700">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                      <Search size={32} />
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-wider">{t('how.network.title')}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                      {t('how.network.body')}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">
                    {lang === 'ar' ? 'فلسفتنا التشغيلية' : 'OPERATIONAL PHILOSOPHY'}
                  </span>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-8">
                {lang === 'ar' ? 'كيف نضمن التميز في كل خطوة' : 'Ensuring Excellence in Every Step'}
              </h2>
                  <div className="w-20 h-1 bg-primary rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: Clock, label: lang === 'ar' ? 'استجابة سريعة' : 'Rapid Response' },
                    { icon: UserCheck, label: lang === 'ar' ? 'خبراء معتمدون' : 'Verified Experts' },
                    { icon: ShieldCheck, label: lang === 'ar' ? 'ضمان الجودة' : 'Quality Assurance' },
                    { icon: ShieldAlert, label: lang === 'ar' ? 'إدارة المخاطر' : 'Risk Management' }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <stat.icon size={24} />
                      </div>
                      <span className="text-white font-bold tracking-tight">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Important to Know - Grid System */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container-sahli relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block"
              >
                {lang === 'ar' ? 'توضيحات هامة' : 'IMPORTANT CLARIFICATIONS'}
              </motion.span>
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-8">
                {t('home.clarity.title')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: item * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-primary/50 transition-all duration-700 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
                  <div className="relative z-10 flex gap-6 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Shield size={20} className="fill-primary/20" />
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                      {t(`home.clarity.item${item}` as TranslationKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Premium Interactive */}
        <section className="py-24 md:py-40 relative overflow-hidden border-t border-white/5 bg-slate-900/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0%,transparent_70%)]" />
          
          <div className="container-sahli text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary mx-auto mb-12 shadow-[inset_0_0_30px_rgba(var(--primary-rgb),0.2)]">
                <MessageSquare size={48} className="fill-primary/20" />
              </div>
              
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter mb-8">
                {t('cta.final.title')}
              </h2>
              
              <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                {t('cta.final.body')}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href={getWhatsAppLink(t('cta.whatsapp.general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('How It Works Page')}
                  className="group relative inline-flex items-center gap-8 py-5 px-5 bg-white/5 rounded-full border border-white/10 hover:border-primary/50 transition-all duration-500 hover:bg-white/10"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)]">
                      <MessageSquare className="w-10 h-10 text-white fill-white/20" />
                    </div>
                  </div>
                  <div className="flex flex-col text-start pr-12 pl-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">{lang === 'ar' ? 'ابدأ الآن' : 'START NOW'}</span>
                    <span className="text-xl font-black text-white uppercase tracking-wider">{t('cta.final.cta')}</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default HowItWorks;

