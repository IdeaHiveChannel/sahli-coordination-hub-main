import React, { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
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
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function TrustStandards() {
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
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center md:justify-end overflow-hidden bg-[#0a0a0b]"
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 transition-transform duration-1000 ease-out"
            style={{ 
              transform: `scale(1.1) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px) rotate(${mousePos.y * 0.02}deg)`
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=1920&fm=webp&fit=crop" 
              alt={t('trust.hero.alt')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover opacity-40 grayscale brightness-50"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-[#0a0a0b]/80 to-[#0a0a0b] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.1),transparent_50%)] z-10" />
        </div>

        <div className="container-sahli relative z-20 pt-24 pb-12 md:pb-32 flex flex-col items-center md:items-start text-center md:text-start">
          <div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start animate-in fade-in duration-1000"
          >
            <div 
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-primary mb-10 mx-auto md:mx-0 shadow-2xl relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-both"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Shield size={16} className="text-primary" />
              {t('trust.hero.label')}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter w-full text-center md:text-start">
              {t('trust.hero.title').split(' ').map((word, i) => (
                <div key={i} className="overflow-hidden inline-block mr-[0.3em]">
                  <span 
                    className={`inline-block animate-in slide-in-from-bottom-full fade-in fill-mode-both ${i === 1 ? 'text-primary' : ''}`}
                    style={{ animationDelay: `${0.3 + (i * 0.08)}s`, animationDuration: '1s' }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </h1>
            
            <p
              className="text-lg md:text-2xl text-slate-400 mb-12 md:mb-20 font-medium leading-relaxed w-full text-center md:text-start max-w-2xl mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              style={{ animationDelay: '0.8s', animationDuration: '1.2s' }}
            >
              {t('trust.hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Advanced Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-in fade-in fill-mode-both"
          style={{ animationDelay: '2s' }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-primary via-primary/20 to-transparent relative">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(241,41,89,0.8)] animate-bounce" 
            />
          </div>
        </div>
      </section>

      {/* Standards Section - Enhanced Grid */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden border-y border-white/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((standard, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="flex flex-col h-full group"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-white/10 font-black text-5xl md:text-6xl tracking-tighter transition-all duration-500 group-hover:text-primary group-hover:scale-110">
                    {standard.number}
                  </span>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-2xl group-hover:rotate-12">
                    {React.cloneElement(standard.icon as React.ReactElement, { size: 32 })}
                  </div>
                </div>
                
                <div className="flex-1 p-10 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-primary/40 transition-all duration-700 flex flex-col group-hover:shadow-2xl group-hover:-translate-y-3 hover:bg-white/[0.08]">
                  <div className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary transition-colors">
                    {t('trust.standard')}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-8 text-white tracking-tight leading-tight uppercase group-hover:text-primary transition-colors">
                    {standard.title}
                  </h3>
                  
                  <ul className="space-y-6 mt-auto">
                    {standard.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 group/item">
                        <div className="mt-2 w-2 h-2 rounded-full bg-primary/40 group-hover/item:bg-primary transition-all duration-300" />
                        <span className="text-base text-slate-400 leading-relaxed font-medium group-hover/item:text-white transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* During Service - Independent Execution - Architectural */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(241,41,89,0.1)_0%,transparent_70%)] opacity-20" />
        </div>

        <div className="container-sahli relative z-10">
          <ScrollReveal
            className="max-w-6xl mx-auto p-12 md:p-24 rounded-[4rem] bg-white/5 backdrop-blur-3xl border border-white/10 relative overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="grid md:grid-cols-12 gap-16 items-center relative z-10">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">
                  <Sparkles size={16} />
                  {lang === 'ar' ? 'الاستقلالية' : 'Independence'}
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-10 tracking-tighter leading-[0.95]">
                  {t('trust.blackbox.title')}
                </h2>
                <p className="text-lg md:text-2xl text-slate-400 leading-relaxed font-medium italic">
                  {t('trust.blackbox.body')}
                </p>
              </div>
              <div className="md:col-span-5 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-dashed border-white/10 animate-spin-slow flex items-center justify-center">
                    <div className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-primary/20 blur-[80px] animate-pulse" />
                  </div>
                  <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 text-primary opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* After Service - Audit & Witness */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden border-t border-white/5">
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
            <ScrollReveal
              className="flex flex-col items-center gap-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-primary shadow-2xl">
                <FileSearch size={18} />
                {t('trust.audit.title')}
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                {lang === 'ar' ? 'المراقبة والتحقق' : 'Monitoring & Verification'}
              </h2>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: t('trust.audit.title'), body: t('trust.audit.body'), icon: <FileSearch size={40} /> },
              { title: t('trust.witness.title'), body: t('trust.witness.body'), icon: <Eye size={40} /> }
            ].map((item, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="p-12 md:p-16 rounded-[4rem] bg-white/5 border border-white/10 group hover:border-primary/40 transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 hover:bg-white/[0.08]"
              >
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 text-primary mb-12 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:rotate-6 shadow-2xl group-hover:shadow-primary/40">
                  {item.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-8 text-white uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium group-hover:text-white transition-colors">{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Implications - Premium Grid */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden border-t border-white/5">
        <div className="container-sahli relative z-10">
          <div className="mb-24 md:mb-32 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              {t('trust.customer.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              t('trust.customer.point1'),
              t('trust.customer.point2'),
              t('trust.customer.point3'),
              t('trust.customer.point4')
            ].map((point, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-primary/40 transition-all duration-500 group hover:bg-white/[0.08] shadow-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl">
                  <CheckCircle2 size={20} />
                </div>
                <p className={`text-base md:text-lg text-slate-400 leading-relaxed font-medium group-hover:text-white transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{point}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden border-t border-white/5">
        <div className="container-sahli relative z-10 text-center">
          <ScrollReveal
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-12 text-white tracking-tighter leading-[0.9]">
              {t('trust.cta.title')}
            </h2>
            <p className="text-lg md:text-2xl text-slate-400 mb-16 md:mb-24 leading-relaxed font-medium max-w-3xl mx-auto italic">
              {t('trust.cta.body')}
            </p>
            
            <a
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Trust Standards Page')}
              className="group relative inline-flex items-center gap-12 py-6 px-8 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 hover:border-primary/50 transition-all duration-700 hover:bg-white/[0.08] shadow-2xl"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-700 shadow-2xl shadow-primary/40">
                  <MessageSquare size={32} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col text-start pr-12 pl-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-2">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
                <span className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">{t('trust.cta.whatsapp')}</span>
              </div>
            </a>
            
            <div className="mt-32 md:mt-48 pt-16 border-t border-white/5">
              <p className="text-[10px] md:text-xs text-white/10 font-black uppercase tracking-[0.6em] max-w-4xl mx-auto leading-[3]">
                {t('trust.micro.clarity')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
