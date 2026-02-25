import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, MapPin, ShieldCheck, Clock, Star, Zap, Snowflake, Droplets, Wrench, Bug, ArrowUp, AlertCircle, Search } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';
import { Link } from 'react-router-dom';
import { MetaTags } from '@/components/seo/MetaTags';
import { TranslationKey } from '@/lib/i18n';

export default function ThePearl() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const districtServices = [
    { title: t('services.homeMaintenance.ac.title'), path: t('services.homeMaintenance.ac.path'), icon: <Snowflake size={24} /> },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path'), icon: <Zap size={24} /> },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path'), icon: <Bug size={24} /> },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path'), icon: <Droplets size={24} /> },
    { title: t('services.homeMaintenance.electrical.title'), path: t('services.homeMaintenance.electrical.path'), icon: <Zap size={24} /> },
    { title: t('nav.movingServices'), path: t('services.moving.path'), icon: <Wrench size={24} /> },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={20} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={20} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={20} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={20} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={20} /> }
  ];

  const neighborhoods = [
    'Porto Arabia', 'Viva Bahriya', 'Qanat Quartier', 'Abraj Quartier', 'Medina Centrale', 'Giardino Village', 'Floresta Gardens'
  ];

  return (
    <Layout>
      <MetaTags 
        title="Home Services in The Pearl | SAHLI Coordination Hub"
        description="Verified home maintenance, cleaning, and specialized services across The Pearl-Qatar. One hub for all your requirements."
      />

      {/* 1️⃣ Hero Section - Standardized */}
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-in zoom-in-105 duration-[1.5s]">
            <img 
              src="https://images.unsplash.com/photo-1578895101408-1a3ee986794e?q=80&w=2070&auto=format&fit=crop" 
              alt="The Pearl Qatar"
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
                <MapPin size={14} className="animate-pulse" />
                <span>The Pearl-Qatar</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight">
                Home Services <br className="hidden md:block" /> in The Pearl
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl text-balance">
                Luxury coordination for The Pearl's island living. We manage high-standard maintenance, cleaning, and specialized services for your waterfront home.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink('Hi SAHLI, I need home services in The Pearl. Can you coordinate a provider for me?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('The Pearl Hero CTA')}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-3 group"
                >
                  <MessageSquare size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  {t('cta.request')}
                </a>
                
                <div className="w-full sm:w-auto px-8 py-4 bg-background/10 backdrop-blur-md text-foreground rounded-xl font-bold border border-foreground/10 flex items-center justify-center gap-2">
                  <Clock size={20} className="text-primary" />
                  <span>Rapid Coordination</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2️⃣ Service Rules/Trust Block */}
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
                'Waterfront Experts',
                'Premium Vetting',
                'Convenience First',
                'Verified Providers',
                'Rapid Response',
                'Quality Assurance'
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

      {/* 3️⃣ Services Grid (Standardized) */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 text-foreground">
              Services We Coordinate in The Pearl
            </h2>
            <p className="text-muted-foreground text-lg">
              Catering to the unique requirements of island living with professional service coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtServices.map((service, i) => (
              <Link key={i} to={service.path}>
                <ScrollReveal
                  direction="up"
                  delay={i * 0.1}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors text-foreground">{service.title}</h3>
                  <div className="mt-auto flex items-center gap-2 text-primary font-bold text-sm">
                    View Service <CheckCircle2 size={16} />
                  </div>
                </ScrollReveal>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Local Context Block (Why SAHLI) */}
      <section className="section-spacing bg-secondary/5 relative overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction={dir === 'rtl' ? 'left' : 'right'}>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-8 text-foreground">
                Island Standard <br /> Service Coordination
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Waterfront Experts', body: 'Our providers are experienced in the specific maintenance needs of waterfront and marine-adjacent properties.' },
                  { title: 'Premium Vetting', body: 'Only the highest-rated service providers are selected for The Pearl’s luxury residential standard.' },
                  { title: 'Convenience First', body: 'We manage the logistics of coordinating with tower management and security for seamless service delivery.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-background border border-border">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Star size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-1 text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal direction={dir === 'rtl' ? 'right' : 'left'} className="relative aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/14840714/pexels-photo-14840714.jpeg" 
                alt="The Pearl-Qatar" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5️⃣ Coordination Process (Timeline) */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 text-foreground">
              {t('home.how.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('home.how.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {coordinationSteps.map((step, i) => (
                <ScrollReveal
                  key={i}
                  direction="up"
                  delay={i * 0.1}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-background border-4 border-border flex items-center justify-center text-muted-foreground mb-6 group-hover:border-primary group-hover:text-primary transition-all duration-500 shadow-lg relative z-10">
                    {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-black py-1 px-3 rounded-full -mt-2 -mr-2 shadow-md">
                    {step.title}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">
                    {t(`home.what.step${i + 1}.title` as TranslationKey) || `Step ${i + 1}`}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ Areas Served - Map Style */}
      <section className="section-spacing bg-background overflow-hidden border-t border-border">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 md:mb-8 text-center md:text-start text-foreground">
                {t('home.areas.title')}
              </h2>
              <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
                {neighborhoods.map((area, i) => (
                  <ScrollReveal
                    key={i}
                    direction={dir === 'rtl' ? 'left' : 'right'}
                    delay={i * 0.1}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-card md:bg-secondary/20 border border-border hover:border-primary/30 transition-all group shrink-0 w-[180px] md:w-auto shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                      <MapPin size={16} />
                    </div>
                    <span className="text-sm font-bold group-hover:text-primary transition-colors duration-500 text-foreground">{area}</span>
                  </ScrollReveal>
                ))}
              </Marquee>
            </div>
            <div className="relative aspect-video md:aspect-[2/1] rounded-xl overflow-hidden border border-border bg-card flex items-center justify-center shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              </div>
              <div className="relative text-center p-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-3 animate-bounce shadow-xl shadow-primary/20">
                  <MapPin size={16} />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl mb-2 font-bold">{t('services.areas.qatarNationwide')}</h2>
                <p className="text-xs text-muted-foreground">{t('services.areas.rapidResponse')}</p>
              </div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 text-foreground">
              Ready to coordinate in The Pearl?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Message SAHLI on WhatsApp for verified home services in The Pearl-Qatar.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={getWhatsAppLink('Hi SAHLI, I need home services in The Pearl. Can you coordinate a provider for me?')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('The Pearl Footer CTA')}
                className="cta-primary px-8 py-4 text-sm btn-shine shadow-xl shadow-primary/30 group"
              >
                <div
                  className="flex items-center gap-3 group-hover:scale-105 group-active:scale-95 transition-transform"
                >
                  <MessageSquare size={20} className="fill-primary-foreground" />
                  {t('cta.request')}
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8️⃣ Back to Home */}
      <section className="py-8 md:py-12 bg-background border-t border-border">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-foreground/[0.03] border border-border hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-xs font-bold !text-foreground/60 group-hover:text-foreground transition-colors uppercase tracking-widest">{t('nav.home')}</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
