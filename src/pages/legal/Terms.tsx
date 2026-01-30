import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Gavel, Scale, AlertTriangle, ScrollText } from 'lucide-react';

export default function Terms() {
  const { t, dir } = useLanguage();

  return (
    <Layout>
      <section className="relative min-h-[85vh] flex flex-col pt-32 pb-20 overflow-hidden bg-background">
        {/* Floating Background Blobs */}
        <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[160px] mix-blend-screen animate-pulse-slow`} />
        <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[120px] mix-blend-screen animate-pulse-slow delay-1000`} />
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[60px] md:blur-[120px] animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.05),transparent_70%)]" />
        </div>

        <div className="container-sahli relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="mb-16 text-foreground text-4xl md:text-6xl lg:text-7xl font-black leading-[0.85] tracking-tighter flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2">
              {t('legal.terms.title').split(/\s+/).map((word: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, rotateX: -90, y: 50 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2 + (i * 0.1),
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className="inline-block origin-bottom pb-2"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-8">
                <div className="prose prose-lg prose-invert max-w-none space-y-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] glass-morphism border border-border shadow-2xl shadow-black/20"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8">
                      <Gavel className="w-6 h-6" />
                    </div>
                    <p className="text-xl md:text-xl font-bold text-foreground mb-6">
                      {t('legal.terms.main.title')}
                    </p>
                    <p className="text-foreground/70 leading-relaxed font-medium">
                      {t('legal.terms.main.body')}
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all duration-500 group"
                    >
                      <Scale className="text-primary mb-6 w-8 h-8 group-hover:scale-110 transition-transform" />
                      <h2 className="text-xl font-black text-foreground mb-4">{t('legal.terms.role.title')}</h2>
                      <p className="text-foreground/60 leading-relaxed font-medium">
                        {t('legal.terms.role.body')}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all duration-500 group"
                    >
                      <AlertTriangle className="text-primary mb-6 w-8 h-8 group-hover:scale-110 transition-transform" />
                      <h2 className="text-xl font-black text-foreground mb-4">{t('legal.terms.liability.title')}</h2>
                      <p className="text-foreground/60 leading-relaxed font-medium">
                        {t('legal.terms.liability.body')}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="sticky top-32 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] glass-morphism border border-border"
                >
                  <ScrollText className="text-primary mb-8 w-12 h-12" />
                  <h3 className="text-xl font-black text-foreground mb-6 uppercase tracking-wider">{t('legal.terms.framework.title')}</h3>
                  <p className="text-foreground/70 leading-relaxed font-medium mb-8">
                    {t('legal.terms.framework.body')}
                  </p>
                  <div className="h-px w-full bg-border mb-8" />
                  <p className="text-xs font-black text-primary tracking-[0.3em] uppercase">
                    {t('legal.coordination.title')}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
