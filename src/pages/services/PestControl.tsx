import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Bug, ShieldCheck, Clock, MapPin, Shield, ArrowLeft, Phone, Waves, Hammer, Home, Store, Rat, Bed, Leaf, ArrowRight } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';

export default function PestControl() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <Layout>
      {/* 1️⃣ Modern Immersive Hero Section */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 animate-in zoom-out-105 duration-[1500ms] ease-out"
          >
            <img 
              src="/Services/Pest Control.jpg" 
              alt="Pest Control Services Qatar"
              className="w-full h-full object-cover object-center scale-105"
            />
          </div>
          
          <div className="absolute inset-0 bg-white/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-0" />
        </div>
        
        <div className="container-sahli relative z-20 pt-16 pb-12 md:pb-20 flex flex-col items-center md:items-start">
          <div 
            className="w-full max-w-[1400px] flex flex-col items-center md:items-start text-center md:text-start"
          >
            <ScrollReveal 
              direction="up"
              delay={0.1}
              duration={0.8}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 rounded-full border border-primary/30 text-xs font-black tracking-[0.2em] uppercase text-primary mb-4 md:mb-6 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <Bug size={16} className="animate-pulse" />
              {t('services.outdoor.pest.title')}
            </ScrollReveal>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 leading-[1.1] tracking-tight text-slate-900 drop-shadow-2xl font-black w-full text-center md:text-start animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
              {t('services.outdoor.pest.title')}
            </h1>

            <ScrollReveal
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start"
              direction="up"
              delay={0.6}
              duration={1}
            >
              <p className="text-xs text-slate-700 mb-6 md:mb-8 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-2xl mx-auto md:mx-0">
                {t('services.outdoor.pest.desc')}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href={getWhatsAppLink(t('services.outdoor.pest.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('Pest Control Hero CTA')}
                  className="cta-primary px-6 py-3 text-xs btn-shine shadow-xl shadow-primary/30 group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div
                    className="flex items-center gap-2 transition-transform duration-200 group-hover:-translate-y-0.5"
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('cta.request')}
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2️⃣ Service Rules Block */}
      <section className="section-spacing bg-white border-y border-slate-200 overflow-hidden">
        <div className="container-sahli">
          <ScrollReveal 
            direction="up"
            className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6 shadow-xl shadow-primary/5"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 text-center">
              {t('services.outdoor.rules.title')}
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={12}>
              {[
                t('services.rules.inspection'),
                t('services.rules.independent'),
                t('services.rules.payment'),
                t('trust.conduct.rule3.title')
              ].map((rule: string, i: number) => (
                <div key={i} className="flex gap-3 items-start group shrink-0 w-[260px] md:w-auto p-4 md:p-0 rounded-xl bg-white md:bg-transparent border border-slate-200 md:border-0 shadow-sm md:shadow-none">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg shadow-primary/5">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs text-slate-600 leading-snug group-hover:text-slate-900 transition-colors duration-500 font-bold">{rule}</span>
                </div>
              ))}
            </Marquee>
          </ScrollReveal>
        </div>
      </section>

      {/* Coordination Process */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our systematic approach ensures complete pest elimination and prevention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal
                key={index}
                direction="up"
                delay={index * 0.1}
                duration={0.5}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-primary/20">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-primary/50 to-transparent -z-10 transform translate-x-1/2" />
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5">
          <div className="container relative z-10 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal
                direction="up"
                duration={0.5}
                className="bg-background rounded-[2.5rem] p-12 border border-primary/10 shadow-2xl shadow-primary/10"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Ready to be <span className="text-primary">Pest Free?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Schedule your free inspection today. Our experts are ready to protect your property.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="min-w-[200px] text-lg h-14" asChild>
                    <Link to="/contact">
                      Schedule Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="min-w-[200px] text-lg h-14" asChild>
                    <Link to="/contact">
                      <Phone className="mr-2 w-5 h-5" /> Contact Support
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 border-t border-slate-200">
        <div className="container-sahli">
          <h2 className="text-2xl font-bold mb-10">{t('services.related')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Waves, 
                title: t('services.cleaning.title'), 
                desc: t('services.cleaning.description'),
                href: '/services/cleaning' 
              },
              { 
                icon: Hammer, 
                title: t('services.maintenance.title'), 
                desc: t('services.maintenance.description'),
                href: '/services/home-maintenance' 
              },
              { 
                icon: Home, 
                title: t('services.moving.title'), 
                desc: t('services.moving.description'),
                href: '/services/moving' 
              }
            ].map((service, i) => (
              <Link 
                key={i} 
                to={service.href}
                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/20 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <service.icon size={24} />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-500">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ Back to Home */}
      <section className="py-8 md:py-10 bg-background border-t border-border">
        <div className="container-sahli relative z-10 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-900/80 hover:bg-slate-50 hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t('common.backToHome')}</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
