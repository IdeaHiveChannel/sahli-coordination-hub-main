import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, MapPin, ShieldCheck, Clock, Shield, Star, Zap, Snowflake, Droplets, Wrench, Bug } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';
import { Link } from 'react-router-dom';

export default function Doha() {
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
    'West Bay', 'Al Waab', 'Msheireb', 'Bin Mahmoud', 'Al Sadd', 'Abu Hamour', 'Al Dafna', 'Madinat Khalifa'
  ];

  return (
    <Layout>
      {/* 1️⃣ Hero Section */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-in zoom-in-105 duration-[1.5s]">
            <img 
              src="https://images.unsplash.com/photo-1577147443647-818ece99348b?q=80&w=2070&auto=format&fit=crop" 
              alt="Doha Qatar Skyline"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          
          <div className="absolute inset-0 bg-white/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-0" />
        </div>
        
        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-20 flex flex-col items-center md:items-start">
          <div className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start">
            <ScrollReveal 
              direction="none"
              delay={0.1}
              duration={0.8}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30 text-[0.6rem] md:text-[0.65rem] font-black tracking-[0.25em] uppercase text-primary mb-4 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <MapPin size={14} className="animate-pulse" />
              Doha & West Bay
            </ScrollReveal>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 leading-[1] tracking-tight text-slate-900 drop-shadow-2xl font-black w-full text-center md:text-start animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300 fill-mode-both">
              Home Services <br className="hidden md:block" /> in Doha
            </h1>

            <ScrollReveal
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              direction="up"
              delay={0.6}
              duration={1}
            >
              <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-white/80 mb-6 md:mb-10 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                Coordinating verified home maintenance, cleaning, and specialized services across Doha's premier neighborhoods. One hub for all your requirements.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink('Hi SAHLI, I need home services in Doha. Can you coordinate a provider for me?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Doha Hero CTA')}
                  className="cta-primary px-5 py-2.5 text-[10px] sm:text-[11px] btn-shine shadow-xl shadow-primary/30 group"
                >
                  <div className="flex items-center gap-2 group-hover:scale-105 group-active:scale-95 transition-transform">
                    <MessageSquare size={24} className="fill-primary-foreground" />
                    {t('cta.request')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2️⃣ Districts/Neighborhoods Marquee */}
      <section className="py-8 bg-foreground/[0.02] border-y border-border overflow-hidden">
        <Marquee speed={0.3} className="px-4">
          {neighborhoods.map((name, i) => (
            <div key={i} className="flex items-center gap-2 px-8 py-2 rounded-full bg-background border border-border mx-4">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm font-bold uppercase tracking-widest text-foreground/60">{name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* 3️⃣ Services Grid */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-lg md:text-xl mb-4 md:mb-6 font-black">
              Services We Coordinate in Doha
            </h2>
            <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-foreground/60">
              From the towers of West Bay to the villas of Al Waab, we connect you with licensed professionals for every home need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtServices.map((service, i) => (
              <Link key={i} to={service.path}>
                <ScrollReveal
                  direction="up"
                  delay={i * 0.1}
                  duration={0.5}
                  className="group p-6 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <h3 className="text-base font-black mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <div className="mt-auto flex items-center gap-2 text-primary text-xs font-bold">
                    Learn More <CheckCircle2 size={14} />
                  </div>
                </ScrollReveal>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Why SAHLI in Doha */}
      <section className="section-spacing bg-foreground/5 relative overflow-hidden">
        <div className="container-sahli">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
            <h2 className="text-lg md:text-xl mb-8 font-black">
                The Coordination Standard <br /> for the Capital
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Local Expertise', body: 'We understand the specific infrastructure and requirements of Doha neighborhoods.' },
                  { title: 'Verified Providers', body: 'Only licensed and municipality-approved companies are coordinated through our hub.' },
                  { title: 'Rapid Response', body: 'Our central coordination ensures faster connection with ready service providers.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Star size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold mb-1">{item.title}</h4>
                      <p className="text-xs text-foreground/60">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-border shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1707310/pexels-photo-1707310.jpeg" 
                alt="West Bay Doha" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Coordination Process */}
      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-lg md:text-xl mb-6 font-black">
              {t('home.how.title')}
            </h2>
            <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-foreground/60">
              {t('home.how.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 relative">
            {coordinationSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                direction="up"
                delay={i * 0.1}
                duration={0.5}
                className="relative group p-6 rounded-[2rem] bg-foreground/[0.02] border border-border hover:border-primary/50 transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                  {React.cloneElement(step.icon as React.ReactElement, { size: 18 })}
                </div>
                <div className="text-3xl font-black text-primary/10 mb-2">{step.title}</div>
                <p className="text-xs font-medium leading-relaxed text-foreground/70 group-hover:text-foreground transition-colors duration-500">
                  {step.body}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ Final CTA */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="container-sahli relative z-10 text-center">
          <ScrollReveal
            direction="up"
            delay={0}
            duration={0.8}
            className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-8 relative z-10">Ready to coordinate in Doha?</h2>
            <p className="text-xs md:text-sm mb-12 opacity-90 relative z-10">Message SAHLI on WhatsApp for verified home services.</p>
            <a
              href={getWhatsAppLink('Hi SAHLI, I need home services in Doha. Can you coordinate a provider for me?')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Doha Footer CTA')}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white text-primary rounded-xl font-black text-[10px] sm:text-[11px] hover:scale-105 transition-transform relative z-10"
            >
              <MessageSquare size={20} className="fill-current" />
              {t('cta.request')}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
