import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Bug, ShieldCheck, Clock, MapPin, Shield, ArrowLeft, Phone, Waves, Hammer, Home, Store, Rat, Bed, Leaf, ArrowRight, AlertCircle, HelpCircle, Search, Wallet, ArrowUp } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';
import { MetaTags } from '@/components/seo/MetaTags';

export default function PestControl() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pest Control Services Qatar",
    "description": t('services.outdoor.pest.desc'),
    "provider": {
      "@type": "LocalBusiness",
      "name": "SAHLI Coordination Hub"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('services.pest.problem'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.pest.problem.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.pest.why'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.pest.why.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.pest.inspection'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.pest.inspection.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.pest.pricing'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.pest.pricing.desc')
          }
        },
        {
          "@type": "Question",
          "name": t('services.pest.availability'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('services.pest.availability.desc')
          }
        }
      ]
    }
  };

  const services = [
    {
      title: "Residential Pest Control",
      description: "Complete protection for your home against all common household pests including ants, cockroaches, and spiders.",
      icon: <Home className="w-6 h-6" />,
      features: ["Safe for pets & children", "Odorless treatments", "Guaranteed results"]
    },
    {
      title: "Commercial Pest Management",
      description: "Customized solutions for businesses to maintain a pest-free environment and comply with health regulations.",
      icon: <Store className="w-6 h-6" />,
      features: ["Discrete service", "Documentation provided", "After-hours service"]
    },
    {
      title: "Termite Control",
      description: "Advanced termite detection and elimination systems to protect your property's structural integrity.",
      icon: <Bug className="w-6 h-6" />,
      features: ["Pre-construction treatment", "Post-construction treatment", "Annual inspections"]
    },
    {
      title: "Rodent Control",
      description: "Effective strategies to eliminate rats and mice and prevent them from returning to your property.",
      icon: <Rat className="w-6 h-6" />,
      features: ["Trapping & removal", "Entry point sealing", "Sanitation advice"]
    },
    {
      title: "Bed Bug Treatment",
      description: "Specialized heat and chemical treatments to completely eradicate bed bug infestations.",
      icon: <Bed className="w-6 h-6" />,
      features: ["Whole room treatment", "Mattress encasements", "Follow-up inspection"]
    },
    {
      title: "Mosquito Control",
      description: "Reduction of mosquito populations in your outdoor areas to prevent bites and diseases.",
      icon: <Leaf className="w-6 h-6" />,
      features: ["Larvicide treatment", "Adulticide misting", "Breeding site removal"]
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Inspection",
      description: "We conduct a thorough inspection of your property to identify pest activity and potential entry points."
    },
    {
      step: "02",
      title: "Treatment Plan",
      description: "We develop a customized treatment plan tailored to your specific pest problem and property needs."
    },
    {
      step: "03",
      title: "Application",
      description: "Our certified technicians apply safe and effective treatments to eliminate pests and prevent future infestations."
    },
    {
      step: "04",
      title: "Monitoring",
      description: "We provide ongoing monitoring and follow-up visits to ensure the treatment is effective and your property remains pest-free."
    }
  ];

  const relatedServices = [
    { title: t('services.outdoor.title'), path: '/services#outdoor' },
    { title: t('services.homeMaintenance.ac.maintenance.title'), path: t('services.homeMaintenance.ac.maintenance.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.moving.title'), path: t('services.moving.path') },
  ];

  const coordinationSteps = [
    { title: '01', body: t('home.what.step1.body'), icon: <MessageSquare size={16} /> },
    { title: '02', body: t('home.what.step2.body'), icon: <ShieldCheck size={16} /> },
    { title: '03', body: t('home.what.step3.body'), icon: <Clock size={16} /> },
    { title: '04', body: t('home.what.step4.body'), icon: <CheckCircle2 size={16} /> },
    { title: '05', body: t('home.what.step5.body'), icon: <CheckCircle2 size={16} /> }
  ];

  const areas = [
    'Doha', 'Lusail', 'Al Wakrah', 'Al Rayyan', 'Al Daayen', 'Umm Salal', 'Al Khor'
  ];

  return (
    <Layout>
      <MetaTags 
        title={t('services.outdoor.pest.title')} 
        description={t('services.outdoor.pest.desc')} 
        schema={schema} 
      />
      
      {/* 1️⃣ Modern Immersive Hero Section - Standardized */}
      <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            <img 
              src="/Services/Pest Control.jpg" 
              alt="Pest Control Services Qatar"
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
                <Bug size={14} className="animate-pulse" />
                <span>{t('services.outdoor.pest.title')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight">
                {t('services.outdoor.pest.title')}
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl text-balance">
                {t('services.outdoor.pest.desc')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={getWhatsAppLink(t('services.outdoor.pest.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Pest Control Hero CTA')}
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
              {t('services.outdoor.rules.title')}
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
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.pest.problem')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t('services.pest.problem.desc')}</p>
              
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <HelpCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-foreground mb-1">{t('services.pest.why')}</span>
                  <p className="text-xs text-muted-foreground">{t('services.pest.why.desc')}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Inspection/Diagnosis Card */}
            <ScrollReveal delay={0.2} className="p-6 md:p-8 rounded-2xl bg-secondary text-secondary-foreground shadow-xl transform md:-translate-y-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center text-primary mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('services.pest.inspection')}</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">{t('services.pest.inspection.desc')}</p>
            </ScrollReveal>

            {/* Availability/Solution Card */}
            <ScrollReveal delay={0.3} className="p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{t('services.pest.pricing')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t('services.pest.pricing.desc')}</p>
              
              <div className="flex items-start gap-3 pt-6 border-t border-border">
                <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold text-foreground mb-1">{t('services.pest.availability')}</span>
                  <p className="text-xs text-muted-foreground">{t('services.pest.availability.desc')}</p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 3️⃣ Visual Service Features (Services List) */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground mb-4 md:mb-6">
              Our Pest Control Solutions
            </h2>
            <p className="text-sm text-muted-foreground">Comprehensive protection for every type of pest problem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
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
                href={getWhatsAppLink(t('services.outdoor.pest.whatsapp'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRequestClick('Pest Control Bottom CTA')}
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
