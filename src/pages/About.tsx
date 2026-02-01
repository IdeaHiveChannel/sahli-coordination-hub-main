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
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  return (
    <Layout>
      {/* Hero Section - Compact and Advanced */}
      <section ref={containerRef} className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              opacity: opacity
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover opacity-20 grayscale scale-110"
            >
              <source src="https://videos.pexels.com/video-files/3196615/3196615-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-background via-background/80 to-transparent`} />
        </div>

        <div className="container-sahli relative z-10 pt-24 md:pt-32 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-black tracking-widest uppercase mb-6 shadow-lg btn-shine"
          >
            <img src="/logos/Sahl Logo 9.png" alt="" className="w-4 h-4 object-contain" />
            {t('nav.about')}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9] max-w-4xl mb-6">
            {t('about.title').split(' ').map((word: string, i: number) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>
      </section>

      {/* Why We Exist - Compact Split Layout */}
      <section className="relative py-12 md:py-16 bg-background overflow-hidden border-y border-border/50">
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6 text-foreground leading-none">
                {t('about.reason.title')}
              </h2>
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed font-medium tracking-tight">
                {t('about.reason.body')}
              </p>
            </motion.div>
            
            <motion.div
              className="relative aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden border border-border/50"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" 
                alt={t('about.reason.alt')} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What SAHLI Is Not - Compact Grid */}
      <section className="relative py-12 md:py-16 bg-background overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-center text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-none">
              {t('about.not.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
            {[
              { title: t('about.not.marketplace') },
              { title: t('about.not.provider') },
              { title: t('about.not.execution') },
              { title: t('about.not.pricing') },
              { title: t('about.not.contract') }
            ].map((item: { title: string }, i: number) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-foreground/[0.03] border border-border hover:border-primary/30 transition-all duration-500 group text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-black">×</span>
                </div>
                <h3 className="text-lg md:text-xl font-black tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision/Position - Architectural Focus - Compact */}
      <section className="relative py-12 md:py-16 bg-background/50 overflow-hidden border-y border-border/50">
        <div className="container-sahli relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-foreground/5 border border-border relative overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-primary text-[10px] font-bold tracking-widest uppercase mb-6 btn-shine">
                <img src="/logos/Sahl Logo 9.png" alt="" className="w-4 h-4 object-contain" />
                {t('about.position.title')}
              </div>
              <p className="text-xl md:text-2xl text-foreground/80 leading-tight font-black tracking-tighter italic">
                {t('about.position.body')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Consistent and Compact */}
      <section className="py-12 md:py-16 bg-background relative overflow-hidden">
        <div className="container-sahli text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6 text-foreground leading-none">
              {t('cta.final.title')}
            </h2>
            <p className="text-base text-foreground/60 mb-8 font-medium">
              {t('cta.final.body')}
            </p>
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black text-base shadow-xl shadow-primary/20 hover:scale-105 transition-transform btn-shine"
              whileHover={{ y: -3 }}
            >
              <MessageCircle size={20} />
              {t('cta.final.cta')}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
