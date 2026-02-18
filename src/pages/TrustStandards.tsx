import { useRef, useState } from 'react';
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
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center md:justify-end overflow-hidden bg-white"
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
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="container-sahli relative z-20 pt-24 pb-12 md:pb-20 flex flex-col items-center md:items-start text-center md:text-start">
          <div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start animate-in fade-in duration-1000"
          >
            <div 
              className="inline-flex items-center gap-3 px-5 py-2 bg-slate-50 backdrop-blur-md rounded-full border border-primary/20 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-900/70 mb-8 md:mb-10 mx-auto md:mx-0 shadow-2xl relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-both"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Shield size={14} className="text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
              {t('trust.hero.label')}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl mb-4 md:mb-6 leading-[1] tracking-tight text-slate-900 drop-shadow-sm font-black w-full text-center md:text-start">
              {t('trust.hero.title').split(' ').map((word, i) => (
                <div key={i} className="overflow-hidden inline-block mr-[0.3em]">
                  <span 
                    className="inline-block animate-in slide-in-from-bottom-full fade-in fill-mode-both"
                    style={{ animationDelay: `${0.3 + (i * 0.08)}s`, animationDuration: '1s' }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </h1>
            
            <p
              className="text-base md:text-lg lg:text-xl xl:text-2xl !text-slate-700 mb-6 md:mb-10 font-medium leading-relaxed drop-shadow-sm w-full text-center md:text-start max-w-2xl mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
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
          <div className="w-px h-16 bg-gradient-to-b from-primary via-primary/20 to-transparent relative">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-900 shadow-[0_0_10px_rgba(0,0,0,0.8)] animate-bounce" 
            />
          </div>
        </div>
      </section>

      {/* Standards Section - Enhanced Grid */}
      <section className="section-spacing bg-white relative overflow-hidden border-y border-slate-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((standard, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="flex flex-col h-full group"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-primary/40 font-black text-4xl md:text-5xl tracking-tighter transition-all duration-500 group-hover:text-primary group-hover:scale-110">
                    {standard.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl group-hover:rotate-12">
                    {standard.icon}
                  </div>
                </div>
                
                <div className="flex-1 p-8 rounded-[2.5rem] bg-white backdrop-blur-xl border border-primary/10 group-hover:border-primary/40 transition-all duration-700 flex flex-col group-hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)] group-hover:-translate-y-2 group-hover:bg-primary/[0.02]">
                  <div className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 group-hover:text-primary transition-colors">
                    {t('trust.standard')}
                  </div>
                  <h3 className="text-xl font-black mb-6 text-slate-900 tracking-tight leading-none uppercase group-hover:text-primary transition-colors">
                    {standard.title}
                  </h3>
                  
                  <ul className="space-y-4 mt-auto">
                    {standard.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group/item">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-all duration-300 shadow-[0_0_5px_rgba(var(--primary-rgb),0.5)]" />
                        <span className="text-sm md:text-base text-slate-600 leading-relaxed font-medium group-hover/item:text-slate-900 transition-colors">
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
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--primary)_0%,transparent_70%)] opacity-10" />
        </div>

        <div className="container-sahli relative z-10">
          <ScrollReveal
            className="max-w-5xl mx-auto p-8 md:p-16 rounded-[3rem] bg-slate-50 backdrop-blur-md md:backdrop-blur-2xl border border-slate-200 relative overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8">
                  <Sparkles size={14} />
                  {lang === 'ar' ? 'الاستقلالية' : 'Independence'}
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                  {t('trust.blackbox.title')}
                </h2>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  {t('trust.blackbox.body')}
                </p>
              </div>
              <div className="md:col-span-5 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-dashed border-slate-200 animate-spin-slow flex items-center justify-center">
                    <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-primary/20 blur-2xl animate-pulse" />
                  </div>
                  <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 text-slate-300 opacity-20" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* After Service - Audit & Witness */}
      <section className="section-spacing bg-white relative overflow-hidden border-t border-slate-200">
        <div className="container-sahli relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
            <ScrollReveal
              className="flex flex-col items-center gap-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                <FileSearch size={14} />
                {t('trust.audit.title')}
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                {lang === 'ar' ? 'المراقبة والتحقق' : 'Monitoring & Verification'}
              </h2>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: t('trust.audit.title'), body: t('trust.audit.body'), icon: <FileSearch size={32} /> },
              { title: t('trust.witness.title'), body: t('trust.witness.body'), icon: <Eye size={32} /> }
            ].map((item, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="p-10 md:p-12 rounded-[3rem] bg-slate-50 border border-primary/10 group hover:border-primary/40 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)] hover:-translate-y-2 hover:bg-primary/[0.01]"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:rotate-6 shadow-xl group-hover:shadow-primary/20">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-6 text-slate-900 uppercase tracking-tight leading-none group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed font-medium group-hover:text-slate-800 transition-colors">{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Implications - Premium Grid */}
      <section className="section-spacing bg-white relative overflow-hidden border-t border-slate-200">
        <div className="container-sahli relative z-10">
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              {t('trust.customer.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              t('trust.customer.point1'),
              t('trust.customer.point2'),
              t('trust.customer.point3'),
              t('trust.customer.point4')
            ].map((point, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200 hover:border-primary/40 transition-all duration-500 group hover:bg-primary/[0.02]"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg">
                  <CheckCircle2 size={16} />
                </div>
                <p className={`text-base text-slate-900/70 leading-relaxed font-medium group-hover:text-slate-900 transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{point}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="section-spacing bg-white relative overflow-hidden border-t border-slate-200">
        <div className="container-sahli relative z-10 text-center">
          <ScrollReveal
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-black mb-8 text-slate-900 tracking-tighter leading-tight">
              {t('trust.cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-12 md:mb-16 leading-relaxed font-medium max-w-2xl mx-auto">
              {t('trust.cta.body')}
            </p>
            
            <a
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Trust Standards Page')}
              className="group relative inline-flex items-center gap-8 py-4 px-4 bg-white rounded-full border border-slate-200 hover:border-primary/50 transition-all duration-500"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                  <MessageSquare className="w-8 h-8 text-white fill-white/20" />
                </div>
              </div>
              <div className="flex flex-col text-start pr-8 pl-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
                <span className="text-lg font-black text-slate-900 uppercase tracking-wider">{t('trust.cta.whatsapp')}</span>
              </div>
            </a>
            
            <div className="mt-20 pt-10 border-t border-slate-200">
              <p className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-[0.4em] max-w-3xl mx-auto leading-loose">
                {t('trust.micro.clarity')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
