import { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, Search, ShieldCheck, CheckCircle2, Zap, Shield, Repeat, Heart } from 'lucide-react';

import { WHATSAPP_LINK } from '@/lib/constants';

export default function HowItWorks() {
  const { t, dir } = useLanguage();

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you provide the home services directly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. SAHLI is a coordination hub. We vet independent provider companies and manage the access point. The provider company delivers the service and handles your payment directly."
          }
        },
        {
          "@type": "Question",
          "name": "How does SAHLI select the provider for my request?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SAHLI matches your specific requirement with a verified provider company based on their documented competency, availability in your area, and past performance within our network."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if I am not satisfied with the service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SAHLI follows up after every service. If coordination standards or service quality are not met, we intervene to facilitate a resolution or assign a replacement provider as per our procedural rules."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  return (
    <Layout>
      {/* Hero Section - Compact for laptop */}
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              opacity: opacity
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover opacity-[0.15] grayscale"
            >
              <source src="https://videos.pexels.com/video-files/3196611/3196611-uhd_2560_1440_25fps.mp4" type="video/mp4" />
              <img 
                src="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=2070&auto=format&fit=crop" 
                alt={t('how.hero.alt')} 
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-background via-background/80 to-transparent`} />
          
          {/* Floating Background Blobs */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[500px] h-[500px] bg-primary/10 rounded-full blur-[160px] mix-blend-screen animate-pulse-slow`} />
          <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000`} />
        </div>

        <div className="container-sahli relative z-10 pt-36 md:pt-36 pb-20 md:pb-16 flex flex-col items-center md:items-start text-center md:text-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start"
            style={{ y: y2Spring }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-5 py-2 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-8 mx-auto md:mx-0 shadow-lg shadow-primary/5"
            >
              <img src="/logos/Sahl Logo.png" alt="" className="w-4 h-4 object-contain" />
              {t('nav.howItWorks')}
            </motion.div>
            
            <h1 className="max-w-5xl mb-12 text-foreground text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter">
              {t('how.title').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.3 + i * 0.1, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block mr-[0.2em] origin-bottom"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Entry Model - Highlighted Card */}
      <section className="relative section-spacing bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute top-1/2 ${dir === 'rtl' ? 'right-0' : 'left-0'} -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow`} />
        
        <div className="container-sahli relative z-10">
          <motion.div 
            className="relative p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] glass-morphism overflow-hidden border border-border shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/3 h-full bg-gradient-to-${dir === 'rtl' ? 'r' : 'l'} from-primary/10 to-transparent pointer-events-none opacity-50`} />
            <div className="relative z-10 max-w-5xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-8"
              >
                <img src="/logos/Sahl Logo 7.png" alt="" className="w-4 h-4 object-contain" />
                {t('how.entry.title')}
              </motion.div>
              <h2 className="mb-8 text-3xl sm:text-4xl lg:text-4xl font-black tracking-tighter leading-[0.9] text-foreground">
                {t('how.entry.body')}
              </h2>
              <p className="text-lg md:text-lg text-foreground/70 leading-relaxed font-medium tracking-tight max-w-4xl">
                {t('how.entry.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coordination Flow - Visual Timeline */}
      <section className="relative section-spacing bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute bottom-0 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] mix-blend-screen animate-pulse-slow delay-700`} />
        
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-block px-4 py-1.5 bg-foreground/5 rounded-full border border-border text-foreground/50 text-[10px] font-bold tracking-widest uppercase mb-8">
                {t('how.flow.title')}
              </div>
              <h2 className="mb-10 text-3xl sm:text-4xl md:text-3xl font-black tracking-tighter text-foreground leading-none">
                {t('how.flow.title')}
              </h2>
              <div className="space-y-4 md:space-y-4">
                {[
                  { title: t('how.flow.step1.title'), text: t('how.flow.step1.body'), icon: <MessageCircle size={24} />, imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2070&auto=format&fit=crop' },
                  { title: t('how.flow.step2.title'), text: t('how.flow.step2.body'), icon: <Search size={24} />, imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop' },
                  { title: t('how.flow.step3.title'), text: t('how.flow.step3.body'), icon: <ShieldCheck size={24} />, imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop' },
                  { title: t('how.flow.step4.title'), text: t('how.flow.step4.body'), icon: <CheckCircle2 size={24} />, imageUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=2070&auto=format&fit=crop' }
                ].map((step, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-6 md:gap-6 group p-6 rounded-3xl transition-all duration-500 hover:bg-foreground/5 border border-transparent hover:border-border relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                  >
                    {/* Background Image for Step */}
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700">
                      <img 
                        src={step.imageUrl} 
                        alt="" 
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-xl">
                      {step.icon}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-black mb-1 text-foreground tracking-tight">{step.title}</h3>
                      <p className="text-foreground/60 leading-relaxed text-sm font-medium">{step.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5 border border-border"
              initial={{ opacity: 0, scale: 0.9, rotate: dir === 'rtl' ? -2 : 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt={t('how.flow.alt')} 
                crossOrigin="anonymous"
                className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-extra-slow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Rules - Two Columns with Icons/Images */}
      <section className="relative section-spacing bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute top-1/4 ${dir === 'rtl' ? 'right-1/4' : 'left-1/4'} w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] mix-blend-screen animate-pulse-slow`} />
        
        <div className="container-sahli relative z-10">
          <div className="flex flex-col items-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-foreground/5 rounded-full border border-border text-foreground/50 text-[10px] font-bold tracking-widest uppercase mb-8">
              {t('how.rules.title')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-3xl font-black tracking-tighter text-foreground leading-none text-center">
              {t('how.rules.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {[
              { title: t('how.rules.inspection.title'), text: t('how.rules.inspection.body'), img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop', icon: <Zap size={28} /> },
              { title: t('how.rules.replacement.title'), text: t('how.rules.replacement.body'), img: 'https://images.unsplash.com/photo-1521791136064-7986c2959213?q=80&w=2070&auto=format&fit=crop', icon: <Shield size={28} /> }
            ].map((box, i) => (
              <motion.div 
                key={i}
                className="glass-morphism rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group border border-border shadow-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="h-64 md:h-72 overflow-hidden relative">
                  <img 
                    src={box.img} 
                    alt={box.title} 
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-slow ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-foreground/10 backdrop-blur-xl border border-border flex items-center justify-center text-primary shadow-2xl group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                    {box.icon}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-black mb-4 tracking-tighter text-foreground leading-none group-hover:text-primary transition-colors duration-500">{box.title}</h3>
                  <p className="text-foreground/70 leading-relaxed font-medium text-sm md:text-base">{box.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boundaries - Minimalist Text Focus */}
      <section className="relative section-spacing bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-500`} />
        
        <div className="container-sahli relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-foreground/5 rounded-full border border-border text-foreground/50 text-[10px] font-bold tracking-widest uppercase mb-8">
                <img src="/logos/Sahl Logo 7.png" alt="" className="w-4 h-4 object-contain opacity-50 grayscale" />
                {t('how.boundaries.title')}
              </div>
              <motion.h2 
                className="text-center text-3xl sm:text-4xl md:text-4xl font-black tracking-tighter text-foreground leading-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {t('how.boundaries.title')}
              </motion.h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-16">
              <motion.div
                initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-[2rem] bg-foreground/5 border border-border hover:border-primary/30 transition-all duration-700 group shadow-2xl"
              >
                <div className="text-primary font-black mb-6 flex items-center gap-4 text-[10px] tracking-[0.3em]">
                  <span className="w-8 h-px bg-primary group-hover:w-16 transition-all duration-700" /> {t('how.boundaries.do.title')}
                </div>
                <div className="relative">
                  <span className="absolute -top-8 -left-4 text-8xl font-serif text-primary/10 select-none">"</span>
                  <p className="text-xl md:text-xl text-foreground/90 leading-tight font-black italic relative z-10">
                    {t('how.boundaries.do.body')}
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: dir === 'rtl' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-foreground/20 transition-all duration-700 group shadow-2xl"
              >
                <div className="text-foreground/20 font-black mb-6 flex items-center gap-4 text-[10px] tracking-[0.3em]">
                  <span className="w-8 h-px bg-foreground/10 group-hover:w-16 transition-all duration-700" /> {t('how.boundaries.dont.title')}
                </div>
                <div className="relative">
                  <span className="absolute -top-8 -left-4 text-8xl font-serif text-foreground/5 select-none">"</span>
                  <div className="relative">
                    <p className="text-xl md:text-xl text-foreground/40 leading-tight font-black tracking-tight">
                      {t('how.boundaries.dont.body')}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-foreground/50 text-sm font-medium italic">
                {t('how.boundaries.independent')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* After Service Section */}
      <section className="relative section-spacing bg-background overflow-hidden">
        <div className="container-sahli relative z-10">
          <motion.div 
            className="glass-morphism rounded-[2.5rem] p-10 md:p-16 border border-border shadow-2xl text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-700">
              <Zap size={40} />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-8 text-foreground leading-none">
              {t('how.after.title')}
            </h2>
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed font-medium tracking-tight mb-12">
              {t('how.after.body')}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 text-start max-w-3xl mx-auto">
              {[
                { title: t('how.after.rule1.title'), body: t('how.after.rule1.body'), icon: <Shield size={20} /> },
                { title: t('how.after.rule2.title'), body: t('how.after.rule2.body'), icon: <Repeat size={20} /> }
              ].map((rule, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-foreground/5 border border-border">
                  <div className="text-primary mt-1">{rule.icon}</div>
                  <div>
                    <h4 className="font-black text-foreground mb-1">{rule.title}</h4>
                    <p className="text-sm text-foreground/60 font-medium">{rule.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Contextual */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05] grayscale">
          <video
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container-sahli text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-10 text-foreground">
              {t('how.final.title')}
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 mb-12 font-medium">
              {t('how.final.body')}
            </p>
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground rounded-3xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-transform"
              whileHover={{ y: -5 }}
            >
              <MessageCircle size={24} />
              {t('home.hero.cta')}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
