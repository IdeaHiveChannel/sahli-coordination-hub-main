import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

import { WHATSAPP_LINK } from '@/lib/constants';

export default function About() {
  const { t, dir } = useLanguage();
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
      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-background">
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
              <source src="https://videos.pexels.com/video-files/3196615/3196615-uhd_2560_1440_25fps.mp4" type="video/mp4" />
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
                alt={t('about.hero.alt')} 
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-background via-background/80 to-transparent`} />
          
          {/* Floating Background Blobs */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[140px] mix-blend-screen animate-pulse-slow`} />
          <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary/5 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen animate-pulse-slow delay-1000`} />
        </div>

        <div className="container-sahli relative z-10 pt-32 md:pt-28 pb-16 md:pb-12 flex flex-col items-center md:items-start text-center md:text-start">
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
              className="inline-flex items-center gap-3 px-5 py-2 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] md:text-xs font-black tracking-[0.25em] uppercase mb-6 md:mb-8 mx-auto md:mx-0 shadow-lg shadow-primary/5"
            >
              <img src="/logos/Sahl Logo.png" alt="" className="w-4 h-4 object-contain" />
              {t('nav.about')}
            </motion.div>
            
            <h1 className="max-w-5xl mb-12 md:mb-10 text-foreground text-4xl sm:text-4xl md:text-4xl lg:text-4xl font-black leading-[0.9] md:leading-[0.85] tracking-tighter">
              {t('about.title').split(' ').map((word, i) => (
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

      {/* Why We Exist - Split Layout with Photo */}
      <section className="relative section-spacing bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute top-1/2 ${dir === 'rtl' ? 'left-0' : 'right-0'} -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-500`} />
        
        <div className="container-sahli relative z-10">
          <div className="absolute -top-24 -left-24 w-64 h-64 md:w-96 md:h-96 opacity-[0.03] pointer-events-none select-none overflow-hidden">
            <img 
              src="/logos/Sahl Logo 8.png" 
              alt="" 
              className="w-full h-full object-contain filter brightness-0 invert" 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-block px-4 py-1.5 bg-foreground/5 rounded-full border border-border text-foreground/50 text-[10px] font-bold tracking-widest uppercase mb-6 md:mb-8">
                {t('about.reason.title')}
              </div>
              <h2 className="mb-8 md:mb-10 text-2xl sm:text-3xl md:text-2xl font-black tracking-tighter leading-[0.9] text-foreground">
                {t('about.reason.title')}
              </h2>
              <p className="text-base md:text-base text-foreground/60 leading-relaxed font-medium tracking-tight">
                {t('about.reason.body')}
              </p>
            </motion.div>
            
            <motion.div
              className="relative aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden group shadow-2xl border border-border"
              initial={{ opacity: 0, scale: 0.9, rotate: dir === 'rtl' ? 2 : -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" 
                alt={t('about.reason.alt')} 
                crossOrigin="anonymous"
                className="w-full h-full object-cover transition-transform duration-extra-slow group-hover:scale-105 grayscale opacity-40 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What SAHLI Is Not - Critical Clarification */}
      <section className="relative section-spacing bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow delay-700`} />
        
        <div className="container-sahli relative z-10">
          <div className="flex flex-col items-center mb-10 md:mb-12">
            <div className="inline-block px-4 py-1.5 bg-foreground/5 rounded-full border border-border text-foreground/50 text-[10px] font-bold tracking-widest uppercase mb-6 md:mb-8">
              {t('about.not.title')}
            </div>
            <motion.h2 
              className="text-center text-2xl sm:text-3xl md:text-2xl font-black tracking-tighter text-foreground leading-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {t('about.not.title')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { title: t('about.not.marketplace') },
              { title: t('about.not.provider') },
              { title: t('about.not.employer') }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-foreground/[0.03] border border-border hover:border-primary/30 transition-all duration-700 group shadow-2xl text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-700" />
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-primary/5">
                  <span className="text-2xl md:text-3xl font-black">×</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-500 leading-tight">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision/Position - Architectural Focus */}
      <section className="relative section-spacing bg-background overflow-hidden">
        {/* Background Blobs */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] mix-blend-screen animate-pulse-slow delay-1000`} />
        
        <div className="container-sahli relative z-10">
          <motion.div 
            className="max-w-6xl mx-auto text-center p-6 md:p-12 rounded-xl md:rounded-2xl bg-foreground/5 border border-border relative overflow-hidden shadow-2xl group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-bold tracking-widest uppercase mb-8 md:mb-10">
                <img src="/logos/Sahl Logo 7.png" alt="" className="w-4 h-4 object-contain" />
                {t('about.position.title')}
              </div>
              <motion.p 
                className="text-lg md:text-xl lg:text-xl text-foreground/80 leading-tight font-black tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {t('about.position.body')}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Consistent with Index.tsx */}
      <section className="relative section-spacing-lg bg-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] mix-blend-screen animate-pulse-slow`} />
        </div>
        
        <div className="container-sahli relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tighter mb-8 text-foreground leading-[0.85]">
              {t('cta.final.title').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.8 }}
                  className="inline-block mr-[0.2em]"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            <p className="text-base md:text-lg text-foreground/60 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed font-medium tracking-tight">
              {t('cta.final.body')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary px-8 py-4 md:px-10 md:py-4 text-base md:text-base shadow-2xl shadow-primary/20 group flex items-center gap-3"
              >
                <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                {t('cta.whatsapp')}
              </motion.a>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 text-white/40 text-sm font-bold tracking-widest uppercase"
              >
                <div className="w-12 h-px bg-white/10" />
                {t('about.footer.hub')}
                <div className="w-12 h-px bg-white/10" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
