import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Scale, MapPin, Mail, MessageCircle, Globe, Gavel } from 'lucide-react';

export default function Privacy() {
  const { t, dir } = useLanguage();

  const privacySections = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: t('legal.privacy.sections.collect.title'),
      content: t('legal.privacy.sections.collect.content')
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: t('legal.privacy.sections.use.title'),
      content: t('legal.privacy.sections.use.content')
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('legal.privacy.sections.sharing.title'),
      content: t('legal.privacy.sections.sharing.content')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('legal.privacy.sections.storage.title'),
      content: t('legal.privacy.sections.storage.content')
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: t('legal.privacy.sections.thirdparty.title'),
      content: t('legal.privacy.sections.thirdparty.content')
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: t('legal.privacy.sections.rights.title'),
      content: t('legal.privacy.sections.rights.content')
    }
  ];

  return (
    <Layout>
      <section className="relative min-h-screen flex flex-col pt-36 pb-20 overflow-hidden bg-background">
        {/* Floating Background Blobs */}
        <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[160px] mix-blend-screen animate-pulse-slow`} />
        <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[120px] mix-blend-screen animate-pulse-slow delay-1000`} />
        
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

            <h1 className="mb-6 text-foreground text-4xl sm:text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter">
              {t('legal.privacy.title')}
            </h1>
            <p className="text-primary font-bold mb-16 tracking-wider uppercase text-xs">
              Last updated: 24/01/2026
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-8 space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 md:p-12 rounded-[2.5rem] glass-morphism border border-border"
                >
                  <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
                    {t('legal.privacy.intro')}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {privacySections.map((section, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          {section.icon}
                        </div>
                        <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{section.title}</h3>
                        <p className="text-foreground/60 leading-relaxed text-sm whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-12 border-t border-border space-y-6">
                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight">{t('legal.contact.title')}</h3>
                    <p className="text-foreground/60 text-sm">{t('legal.contact.questions')}</p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">{t('legal.contact.email')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">{t('legal.contact.website')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Impressum Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 md:p-12 rounded-[2.5rem] bg-foreground/[0.02] border border-border"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <Gavel className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tighter uppercase">
                      {t('legal.notice.title')}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <p className="text-foreground/70 leading-relaxed font-medium">
                        {t('legal.notice.operatedBy')}
                      </p>
                      <div className="space-y-4">
                        <div className="flex flex-col">
                          <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">{t('legal.notice.entity.label')}</span>
                          <span className="text-foreground font-bold">{t('legal.notice.entity.value')}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">{t('legal.notice.tradeName.label')}</span>
                          <span className="text-foreground font-bold">{t('legal.notice.tradeName.value')}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">{t('legal.notice.registeredIn.label')}</span>
                          <span className="text-foreground font-bold">{t('legal.notice.registeredIn.value')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-foreground font-black uppercase text-sm tracking-wider">{t('legal.notice.context.title')}</h4>
                        <p className="text-foreground/60 text-sm leading-relaxed">
                          {t('legal.notice.context.body')}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-foreground font-black uppercase text-sm tracking-wider">{t('legal.notice.liability.title')}</h4>
                        <p className="text-foreground/60 text-sm leading-relaxed">
                          {t('legal.notice.liability.body')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-12 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-foreground font-black uppercase text-sm tracking-wider">{t('legal.notice.external.title')}</h4>
                      <p className="text-foreground/60 text-sm leading-relaxed">
                        {t('legal.notice.external.body')}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-foreground font-black uppercase text-sm tracking-wider">{t('legal.contact.title')}</h4>
                      <div className="space-y-2">
                        <p className="text-foreground font-bold text-sm flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" /> {t('legal.contact.website')}
                        </p>
                        <p className="text-foreground font-bold text-sm flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-primary" /> {t('legal.notice.contact.whatsapp')}
                        </p>
                      </div>
                    </div>
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
                  <FileText className="text-primary mb-8 w-12 h-12" />
                  <h3 className="text-xl font-black text-foreground mb-6 uppercase tracking-wider">{t('legal.coordination.title')}</h3>
                  <p className="text-foreground/70 leading-relaxed font-medium mb-8 text-sm">
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
