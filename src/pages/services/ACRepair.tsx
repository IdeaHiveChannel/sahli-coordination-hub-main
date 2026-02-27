import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, ShieldCheck, Clock, MapPin, ArrowUp, AlertCircle, HelpCircle, Search, Wallet, Snowflake } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MetaTags } from '@/components/seo/MetaTags';

export default function ACRepair() {
  const { t, dir } = useLanguage();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AC Repair Services Qatar",
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
          "name": t('services.ac.problem'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.ac.problem.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.ac.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.ac.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.ac.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.ac.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.ac.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.ac.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.ac.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.ac.availability.desc')
          }
        }
      ]
    }
  };

  const relatedServices = [
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const includes = [
    t('services.homeMaintenance.ac.items').split('\n')[0] || 'Filter Cleaning',
    t('services.homeMaintenance.ac.items').split('\n')[1] || 'Gas Pressure Check',
    t('services.homeMaintenance.ac.items').split('\n')[2] || 'Electrical Component Check',
    t('services.homeMaintenance.ac.items').split('\n')[3] || 'Drain Line Cleaning'
  ];

  const areas = [
    'Doha', 'Lusail', 'Al Wakrah', 'Al Rayyan', 'Al Daayen', 'Umm Salal', 'Al Khor'
  ];

  return (
    <Layout>
      <MetaTags
        title={t('services.homeMaintenance.ac.title')}
        description={t('services.homeMaintenance.subtitle')}
        schema={schema}
      />
      {/* 1️⃣ Hero Section - Standardized */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <img 
              src="/Services/AC Maintenance.jpg" 
              alt="Professional AC Repair Services Qatar"
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
                <Snowflake size={14} className="animate-pulse" />
                <span>AC Repair Services Qatar</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight">
                {t('services.homeMaintenance.ac.title')}
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl text-balance">
                {t('services.homeMaintenance.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.ac.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('AC Repair Hero')}
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

      {/* 3️⃣ Problems & Diagnostics */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-12 opacity-50 z-0" />
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1} className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">{t('services.ac.problem')}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t('services.ac.problem.desc')}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="p-6 md:p-8 rounded-2xl bg-secondary text-secondary-foreground shadow-xl transform md:-translate-y-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center text-primary mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('services.ac.inspection')}</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">{t('services.ac.inspection.desc')}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.ac.availability')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('services.ac.availability.desc')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4️⃣ Visual Service Features */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 text-foreground">
              {t('service.v1.includes.title')}
            </h2>
            <p className="text-lg text-muted-foreground">{t('services.homeMaintenance.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4">
            {includes.map((item, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.1}
                className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:bg-secondary/5 transition-all duration-500 shrink-0 w-[280px] md:w-auto shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">
                  {item}
                </h3>
                <div className="w-10 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5️⃣ How it works (Visual Timeline) */}
      <section className="section-spacing bg-secondary/5 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 text-foreground">
              {t('how.flow.title')}
            </h2>
            <p className="text-lg text-muted-foreground">{t('how.flow.subtitle')}</p>
          </div>

          <Marquee speed={0.4} className="-mx-4 px-4">
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.1}
                className="relative z-10 flex flex-col items-center text-center group shrink-0 w-[200px] md:w-auto"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-primary mb-6 shadow-xl shadow-primary/5 group-hover:border-primary/50 group-hover:shadow-primary/10 transition-all duration-500 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-lg">
                    {step.title}
                  </span>
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 20 })}
                  </div>
                </div>
                <p className="text-sm text-foreground leading-tight px-4 font-bold">{step.body}</p>
              </ScrollReveal>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 6️⃣ Boundary Block */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal
              direction={dir === 'rtl' ? 'left' : 'right'}
              className="p-6 md:p-8 rounded-2xl bg-primary/5 border border-primary/10 shadow-xl shadow-primary/5"
            >
              <h3 className="text-sm !text-primary mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.is')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.is.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm text-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-primary transition-colors duration-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              direction={dir === 'rtl' ? 'right' : 'left'}
              className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-xl shadow-primary/5"
            >
              <h3 className="text-sm text-muted-foreground mb-6 font-black uppercase tracking-wider">
                {t('services.boundaries.title.isNot')}
              </h3>
              <ul className="space-y-4">
                {t('services.boundaries.isNot.body').split('\n').map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 items-center text-sm text-muted-foreground group">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    <span className="group-hover:text-foreground transition-colors duration-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 7️⃣ Areas Served (Map View Style) */}
      <section className="section-spacing bg-background overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-8 md:mb-12 text-foreground">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4">
                {areas.map((area, i) => (
                  <ScrollReveal
                    key={i}
                    direction={dir === 'rtl' ? 'left' : 'right'}
                    delay={i * 0.1}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group shrink-0 w-[200px] md:w-auto shadow-sm hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                      <MapPin size={18} />
                    </div>
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-500">{area}</span>
                  </ScrollReveal>
                ))}
              </Marquee>
            </div>
            
            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-border bg-card flex items-center justify-center shadow-2xl shadow-primary/5 group">
              <img 
                src="https://images.pexels.com/photos/5466806/pexels-photo-5466806.jpeg" 
                alt="AC Repair Technician Doha"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-8 py-4 bg-background/90 backdrop-blur-xl rounded-xl border border-border shadow-lg text-sm text-primary font-bold">
                  {t('services.areas.qatarNationwide')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ Final CTA - High Impact */}
      <section className="section-spacing bg-background border-t border-border overflow-hidden relative">
        <div className="container-sahli relative z-10 text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 shadow-lg shadow-primary/5">
              <Clock size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-8 text-foreground">
              {t('service.v1.cta.title')}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink(t('services.homeMaintenance.ac.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('AC Repair Final CTA')}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-3 group"
              >
                <MessageSquare size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                {t('cta.request')}
              </a>
              
              <Link 
                to="/services"
                className="w-full sm:w-auto px-8 py-4 bg-background text-foreground rounded-xl font-bold text-lg border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>{t('services.title')}</span>
                <ArrowUp size={20} className="rotate-90 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9️⃣ Service Areas - SEO High Intent */}
      <section className="section-spacing bg-secondary/5 border-y border-border">
        <div className="container-sahli">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 text-foreground">
              {t('service.v1.locations.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('service.v1.locations.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* High Intent - Al Wakrah */}
            <Link 
              to="/services/city/ac-repair-al-wakrah"
              className="p-6 rounded-2xl bg-card border border-primary/20 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-all group flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Al Wakrah</span>
              <span className="text-xs text-primary font-bold mt-2 uppercase tracking-wider">High Demand</span>
            </Link>

            {/* Other Areas */}
            {['Doha', 'Lusail', 'Al Rayyan'].map((area) => (
              <div key={area} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all flex flex-col items-center text-center opacity-75 hover:opacity-100 group">
                <MapPin size={24} className="text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
                <span className="font-bold text-lg text-foreground">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔟 Related Services - Quick Links */}
      <section className="py-12 md:py-20 bg-background border-t border-border overflow-hidden">
        <div className="container-sahli">
          <div className="mb-10 md:mb-16 text-center md:text-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 text-foreground">
              {t('services.related.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('services.related.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {relatedServices.map((service, i) => (
              <Link 
                key={i}
                to={service.path}
                className="p-4 md:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between h-full"
              >
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-wider">{service.title}</span>
                <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUp size={20} className="text-primary rotate-45" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 1️⃣1️⃣ Back to Home Link */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-secondary/50 border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={18} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-widest">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
