import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Scale, MessageSquare, Globe, Mail, Gavel, FileText } from 'lucide-react';

export default function Privacy() {
  const { t, dir } = useLanguage();

  const privacySections = [
    { title: t('legal.privacy.section1.title'), content: t('legal.privacy.section1.content') },
    { title: t('legal.privacy.section2.title'), content: t('legal.privacy.section2.content') },
    { title: t('legal.privacy.section3.title'), content: t('legal.privacy.section3.content') },
    { title: t('legal.privacy.section4.title'), content: t('legal.privacy.section4.content') },
    { title: t('legal.privacy.section5.title'), content: t('legal.privacy.section5.content') },
    { title: t('legal.privacy.section6.title'), content: t('legal.privacy.section6.content') },
    { title: t('legal.privacy.section7.title'), content: t('legal.privacy.section7.content') },
    { title: t('legal.privacy.section8.title'), content: t('legal.privacy.section8.content') },
    { title: t('legal.privacy.section9.title'), content: t('legal.privacy.section9.content') },
    { title: t('legal.privacy.section10.title'), content: t('legal.privacy.section10.content') },
    { title: t('legal.privacy.section11.title'), content: t('legal.privacy.section11.content') },
    { title: t('legal.privacy.section12.title'), content: t('legal.privacy.section12.content') },
    { title: t('legal.privacy.section13.title'), content: t('legal.privacy.section13.content') },
  ];

  const icons = [Shield, Lock, Eye, Scale, MessageSquare, Globe, Mail, Gavel, FileText, Shield, Lock, Eye, Scale];

  return (
    <Layout>
      <section className="relative min-h-screen flex flex-col pt-36 pb-20 overflow-hidden bg-background">
        {/* Floating Background Blobs */}
        <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[160px] mix-blend-screen animate-pulse-slow`} />
        
        <div className="container-sahli relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-primary/50" />
              <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">
                {t('legal.breadcrumb')}
              </span>
            </div>

            <h1 className="mb-6 text-foreground text-display uppercase">
              {t('legal.privacy.title')}
            </h1>
            <p className="text-primary font-bold mb-16 tracking-wider uppercase text-xs">
              {t('legal.terms.lastUpdated')}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-8 space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 md:p-12 rounded-[2.5rem] glass-morphism border border-border"
                >
                  <div className="space-y-8">
                    <p className="text-subtitle text-foreground/80 font-medium leading-relaxed">
                      {t('legal.privacy.intro')}
                    </p>
                    <p className="text-subtitle text-foreground font-bold leading-relaxed">
                      {t('legal.privacy.agreement')}
                    </p>
                  </div>
                  
                  <div className="mt-16 space-y-16">
                    {privacySections.map((section, idx) => {
                      const Icon = icons[idx % icons.length];
                      return (
                        <div key={idx} className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <Icon size={20} />
                            </div>
                            <h2 className="text-subtitle text-foreground tracking-tight uppercase">
                              {section.title}
                            </h2>
                          </div>
                          <div className="text-body text-foreground/70 whitespace-pre-line space-y-4 pl-14">
                            {section.content}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-16 pt-12 border-t border-border">
                    <p className="text-subtitle text-primary leading-tight uppercase italic">
                      {t('legal.privacy.final')}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="sticky top-32 p-8 rounded-[2rem] glass-morphism border border-border"
                >
                  <Shield className="text-primary mb-8 w-12 h-12" />
                  <h3 className="text-subtitle text-foreground mb-6 uppercase tracking-wider">{t('legal.coordination.title')}</h3>
                  <p className="text-body !text-sm text-foreground/70 mb-8">
                    {t('legal.coordination.body')}
                  </p>
                  <div className="h-px w-full bg-border mb-8" />
                  <p className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">
                    {t('legal.qatar.standard')}
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

