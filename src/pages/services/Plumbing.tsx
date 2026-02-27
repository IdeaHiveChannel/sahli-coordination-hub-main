import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Marquee } from '@/components/motion/Marquee';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MessageSquare, CheckCircle2, ShieldCheck, Clock, MapPin, AlertCircle, ArrowUp, HelpCircle, Wallet, Search } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';
import { MetaTags } from '@/components/seo/MetaTags';

export default function Plumbing() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Plumbing Services Qatar",
    "description": t('services.homeMaintenance.subtitle'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('services.plumbing.problem'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.plumbing.problem.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.plumbing.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.plumbing.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.plumbing.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.plumbing.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.plumbing.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.plumbing.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.plumbing.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.plumbing.availability.desc')
          }
        }
      ]
    }
  };
  
  const relatedServices = [
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.electrical.title'), path: t('services.homeMaintenance.electrical.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const includes = [
    t('services.homeMaintenance.plumbing.items').split('\n')[0] || 'Leak Detection',
    t('services.homeMaintenance.plumbing.items').split('\n')[1] || 'Pipe Repair',
    t('services.homeMaintenance.plumbing.items').split('\n')[2] || 'Fixture Installation',
    t('services.homeMaintenance.plumbing.items').split('\n')[3] || 'Drain Unblocking'
  ];

  const areas = [
    'Doha', 'Lusail', 'Al Wakrah', 'Al Rayyan', 'Al Daayen', 'Umm Salal', 'Al Khor'
  ];

  return (
    <Layout>
      <MetaTags
        title={t('services.homeMaintenance.plumbing.title')}
        description={t('services.homeMaintenance.subtitle')}
        schema={schema}
      />
      
      {/* 1️⃣ Hero Section - Standardized */}
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <img 
              src="/Services/Home Maintenance - Hero.jpg" 
              alt={t('services.homeMaintenance.plumbing.title')}
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-background/40 md:bg-background/20 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-0" />
        </div>

        <div className="container-sahli relative z-20 pt-20">
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold tracking-wider uppercase text-primary mb-6">
                <ShieldCheck size={14} className="animate-pulse" />
                <span>{t('services.homeMaintenance.plumbing.title')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight">
                {t('services.homeMaintenance.plumbing.title')}
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl text-balance">
                {t('services.homeMaintenance.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.plumbing.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Plumbing Hero CTA')}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-3 group"
                >
                  <MessageSquare size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  {t('cta.request')}
                </a>
                
                <div className="w-full sm:w-auto px-8 py-4 bg-background/10 backdrop-blur-md text-foreground rounded-xl font-bold border border-foreground/10 flex items-center justify-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <span>24/7 Emergency Service</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-background border-y border-border">
        <div className="container-sahli">
          <ScrollReveal 
            className="bg-card border border-border rounded-xl p-6 md:p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-8 md:mb-10 text-center text-foreground">
              {t('services.homeMaintenance.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-4 items-center group shrink-0 w-[280px] md:w-auto p-5 md:p-0 rounded-xl bg-background md:bg-transparent border border-border md:border-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-sm text-muted-foreground leading-snug group-hover:text-foreground transition-colors duration-500 font-bold">{rule}</span>
                </div>
              ))}
            </Marquee>
          </ScrollReveal>
        </div>
      </section>

      {/* 2.5️⃣ Problems & Diagnostics */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-12 opacity-50 z-0" />
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Problem Card */}
            <ScrollReveal delay={0.1} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-red-500/30 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.plumbing.problem')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t('services.plumbing.problem.desc')}</p>
              
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <HelpCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-foreground mb-1">{t('services.plumbing.why')}</span>
                  <p className="text-xs text-muted-foreground">{t('services.plumbing.why.desc')}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Inspection/Diagnosis Card */}
            <ScrollReveal delay={0.2} className="p-6 md:p-8 rounded-2xl bg-secondary text-secondary-foreground shadow-xl transform md:-translate-y-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center text-primary mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('services.plumbing.inspection')}</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">{t('services.plumbing.inspection.desc')}</p>
            </ScrollReveal>

            {/* Availability/Solution Card */}
            <ScrollReveal delay={0.3} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.plumbing.pricing')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t('services.plumbing.pricing.desc')}</p>
              
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-foreground mb-1">{t('services.plumbing.availability')}</span>
                  <p className="text-xs text-muted-foreground">{t('services.plumbing.availability.desc')}</p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3️⃣ Visual Service Features */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground mb-4 md:mb-6">
              {t('service.v1.includes.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('services.homeMaintenance.plumbing.title')} {t('nav.cleaningServices')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4">
            {includes.map((item, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 shrink-0 w-[280px] md:w-auto shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors uppercase tracking-wider text-foreground">{item}</h3>
                <div className="w-10 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4️⃣ How It Works - Visual Timeline */}
      <section className="section-spacing bg-secondary/5 border-y border-border relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground mb-4 md:mb-6">
              {t('how.flow.title')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('how.flow.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-card border border-border flex items-center justify-center text-primary mb-5 shadow-sm group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500">
                  <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 16 })}
                  </div>
                </div>
                <p className="text-xs px-2 font-medium text-muted-foreground group-hover:text-primary transition-colors duration-500 leading-tight">{step.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ Boundary Block */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="p-6 md:p-8 rounded-xl bg-primary/5 border border-primary/10 shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs !text-primary mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-xs text-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-primary transition-colors duration-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              className="p-6 md:p-8 rounded-xl bg-card border border-border shadow-xl shadow-primary/5"
            >
              <h3 className="text-xs text-muted-foreground mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-xs text-muted-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-foreground transition-colors duration-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served */}
      <section className="section-spacing bg-background border-t border-border">
        <div className="container-sahli">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground mb-5 md:mb-7">
                {t('home.areas.title')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areas.map((area, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-sm hover:border-primary/30 transition-all group">
                    <MapPin className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={16} />
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" 
                alt="Qatar Areas Served" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-background border-t border-border overflow-hidden relative">
        <div className="container-sahli relative z-10 text-center max-w-2xl mx-auto">
          <ScrollReveal
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 md:mb-8">
              <MessageSquare size={16} />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl mb-6 text-foreground">
              {t('cta.final.title')}
            </h2>
            <p className="text-xs text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('cta.final.body')}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.homeMaintenance.plumbing.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Plumbing Bottom CTA')}
                className="cta-primary px-8 py-4 text-xs btn-shine shadow-xl shadow-primary/30 group"
              >
                <div
                  className="flex items-center gap-3 group-hover:scale-105 group-active:scale-95 transition-transform"
                >
                  <MessageSquare size={16} className="fill-primary-foreground" />
                  {t('cta.request')}
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8️⃣ Related Services Marquee */}
      <section className="py-12 md:py-16 bg-foreground/[0.02] border-t border-border overflow-hidden">
        <div className="container-sahli mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-center text-foreground">
            {t('services.related.title')}
          </h2>
        </div>
        <Marquee speed={0.3} pauseOnHover={true} gap={20}>
          {relatedServices.map((service, i) => (
            <Link
              key={i}
              to={service.path}
              className="px-6 py-3 rounded-xl bg-background border border-border hover:border-primary/30 hover:text-primary transition-all duration-300 text-xs font-bold whitespace-nowrap shrink-0 shadow-sm text-foreground"
            >
              {service.title}
            </Link>
          ))}
        </Marquee>
      </section>

      {/* 9️⃣ Back to Home */}
      <section className="py-8 md:py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-widest">{t('nav.home')}</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
