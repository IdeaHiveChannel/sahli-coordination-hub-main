import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Dynamic imports for performance
const ServiceRoof = lazy(() => import('@/components/motion/ServiceRoof').then(module => ({ default: module.ServiceRoof })));
const Marquee = lazy(() => import('@/components/motion/Marquee').then(module => ({ default: module.Marquee })));

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { 
  ArrowRight, Wrench, Sparkles, Truck, Heart, Snowflake, Lightbulb, Droplets, Cog, Baby, 
  Search, ShieldCheck, ClipboardList, Leaf, Cpu, Bug, Send, Wallet, MapPin, ChevronDown 
} from 'lucide-react';

import { trackRequestClick } from '@/lib/gtag';
import { getWhatsAppLink } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TranslationKey } from '@/lib/i18n';

interface ServiceItem {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  path: string;
  number: string;
  subcategories: string[];
  whatsappKey?: TranslationKey;
  status?: string;
}

export default function Index() {
  const { t, dir, lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 40,
      y: (clientY / innerHeight - 0.5) * 40,
    });
  };

  const [emblaRefGlance] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 2500, stopOnInteraction: false })]);
  const [emblaRefHow] = useEmblaCarousel({ loop: true, direction: dir === 'rtl' ? 'rtl' : 'ltr' }, [Autoplay({ delay: 3500, stopOnInteraction: false })]);

  const formatNumber = (num: number | string) => {
    if (lang === 'ar') {
      return num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
    }
    return num.toString();
  };

  const glanceItems = [
    { title: t('home.glance.item1.title'), desc: t('home.glance.item1.desc'), icon: <Wallet size={24} /> },
    { title: t('home.glance.item2.title'), desc: t('home.glance.item2.desc'), icon: <Search size={24} /> },
    { title: t('home.glance.item3.title'), desc: t('home.glance.item3.desc'), icon: <ClipboardList size={24} /> },
    { title: t('home.glance.item4.title'), desc: t('home.glance.item4.desc'), icon: <ShieldCheck size={24} /> },
  ];

  const solutions = [
    { 
      title: t('home.solutions.ac.title'), 
      desc: t('home.solutions.ac.desc'), 
      icon: <Snowflake size={32} />, 
      whatsappKey: 'services.homeMaintenance.ac.whatsapp',
      links: [
        { label: 'AC Maintenance Qatar', path: '/ac-maintenance-qatar' },
        { label: 'AC Repair in Al Wakrah', path: '/ac-repair-al-wakrah' }
      ]
    },
    { 
      title: t('home.solutions.electrical.title'), 
      desc: t('home.solutions.electrical.desc'), 
      icon: <Lightbulb size={32} />, 
      whatsappKey: 'services.homeMaintenance.electrical.whatsapp',
      links: [
        { label: 'Electrician Qatar', path: '/electrical-services-qatar' },
        { label: 'Emergency Electrician Doha', path: '/electrician-doha' }
      ]
    },
    { 
      title: t('home.solutions.plumbing.title'), 
      desc: t('home.solutions.plumbing.desc'), 
      icon: <Droplets size={32} />, 
      whatsappKey: 'services.homeMaintenance.plumbing.whatsapp',
      links: [
        { label: 'Plumbing Services Qatar', path: '/plumbing-services-qatar' },
        { label: '24/7 Plumber Doha', path: '/plumber-doha' }
      ]
    },
    { 
      title: t('home.solutions.appliances.title'), 
      desc: t('home.solutions.appliances.desc'), 
      icon: <Cog size={32} />, 
      whatsappKey: 'services.homeMaintenance.appliances.whatsapp',
      links: [
        { label: 'Appliance Repair Qatar', path: '/appliance-repair-qatar' },
        { label: 'Fridge Repair Doha', path: '/fridge-repair-doha' }
      ]
    },
    { 
      title: t('home.solutions.moving.title'), 
      desc: t('home.solutions.moving.desc'), 
      icon: <Truck size={32} />, 
      whatsappKey: 'services.moving.local.whatsapp',
      links: [
        { label: 'Movers in Qatar', path: '/moving-services-qatar' },
        { label: 'House Moving Doha', path: '/movers-doha' }
      ]
    },
    { 
      title: t('home.solutions.cleaning.title'), 
      desc: t('home.solutions.cleaning.desc'), 
      icon: <Sparkles size={32} />, 
      whatsappKey: 'services.cleaning.deep.whatsapp',
      links: [
        { label: 'Deep Cleaning Qatar', path: '/cleaning-services-qatar' },
        { label: 'Cleaning Company Doha', path: '/deep-cleaning-doha' }
      ]
    },
    { 
      title: t('home.solutions.pest.title'), 
      desc: t('home.solutions.pest.desc'), 
      icon: <Bug size={32} />, 
      whatsappKey: 'services.cleaning.pest.whatsapp',
      links: [
        { label: 'Pest Control Qatar', path: '/pest-control-qatar' },
        { label: 'Pest Control Doha', path: '/pest-control-doha' }
      ]
    },
    { 
      title: t('home.solutions.childcare.title'), 
      desc: t('home.solutions.childcare.desc'), 
      icon: <Baby size={32} />, 
      whatsappKey: 'services.care.childcare.whatsapp',
      links: [
        { label: 'Nanny Services Qatar', path: '/childcare-qatar' },
        { label: 'Babysitting Doha', path: '/babysitting-doha' }
      ]
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('home.faq.q1'),
        "acceptedAnswer": { "@type": "Answer", "text": t('home.faq.a1') }
      },
      {
        "@type": "Question",
        "name": t('home.faq.q2'),
        "acceptedAnswer": { "@type": "Answer", "text": t('home.faq.a2') }
      },
      {
        "@type": "Question",
        "name": t('home.faq.q3'),
        "acceptedAnswer": { "@type": "Answer", "text": t('home.faq.a3') }
      },
      {
        "@type": "Question",
        "name": t('home.faq.q4'),
        "acceptedAnswer": { "@type": "Answer", "text": t('home.faq.a4') }
      }
    ]
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const services: ServiceItem[] = [
    { 
      title: t('services.homeMaintenance.tax.title'), 
      description: t('services.homeMaintenance.tax.items'),
      imageUrl: "/Services/AC Maintenance.jpg",
      icon: <Wrench size={32} />,
      path: t('services.homeMaintenance.path'),
      whatsappKey: 'services.homeMaintenance.whatsapp' as TranslationKey,
      subcategories: [t('services.ac.install'), t('services.ac.repair'), t('services.ac.gas')],
      number: '01',
      status: 'comingSoon'
    },
    { 
      title: t('services.cleaning.tax.title'), 
      description: t('services.cleaning.tax.items'),
      imageUrl: "/Services/Cleaning service.jpg",
      icon: <Sparkles size={32} />,
      path: t('services.cleaning.path'),
      whatsappKey: 'services.cleaning.whatsapp' as TranslationKey,
      subcategories: [t('services.cleaning.deep'), t('services.cleaning.sofa'), t('services.cleaning.carpet')],
      number: '02'
    },
    { 
      title: t('services.moving.tax.title'), 
      description: t('services.moving.tax.items'),
      imageUrl: "/Services/Moving & Relocation.jpg",
      icon: <Truck size={32} />,
      path: t('services.moving.path'),
      whatsappKey: 'services.moving.whatsapp' as TranslationKey,
      subcategories: [t('services.moving.house'), t('services.moving.office'), t('services.moving.packing')],
      number: '03'
    },
    { 
      title: t('services.outdoor.tax.title'), 
      description: t('services.outdoor.tax.items'),
      imageUrl: "/Services/Pest Control.jpg",
      icon: <Leaf size={32} />,
      path: t('services.outdoor.path'),
      whatsappKey: 'services.outdoor.whatsapp' as TranslationKey,
      subcategories: [t('services.pest.insects'), t('services.pest.termites'), t('services.pest.rodents')],
      number: '04'
    },
    { 
      title: t('services.care.tax.title'), 
      description: t('services.care.tax.items'),
      imageUrl: "/Services/Nanny Care Service.jpg",
      icon: <Heart size={32} />,
      path: t('services.care.path'),
      whatsappKey: 'services.care.whatsapp' as TranslationKey,
      subcategories: [t('services.care.babysitting'), t('services.care.newborn'), t('services.care.elderly')],
      number: '05',
      status: 'comingSoon'
    },
    { 
      title: t('services.electronics.tax.title'), 
      description: t('services.electronics.tax.items'),
      imageUrl: "/Services/Electronics repair.jpg",
      icon: <Cpu size={32} />,
      path: t('services.electronics.path'),
      whatsappKey: 'services.electronics.whatsapp' as TranslationKey,
      subcategories: [t('services.electronics.tv'), t('services.electronics.microwave'), t('services.electronics.washing')],
      number: '06',
      status: 'comingSoon'
    }
  ];

  const marqueeItems = [
    t('nav.services'),
    t('home.microTrust.vetted'),
    t('home.microTrust.recorded'),
    t('home.microTrust.coordination'),
    t('home.coordinate.disclaimer'),
  ];

  return (
    <Layout>
      <MetaTags 
        title={t('home.meta.title')} 
        description={t('home.meta.description')} 
        canonical="https://sahliservice.com/"
        schema={schema}
      />

      {/* Hero Section */}
      <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-background"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
            style={{ 
              transform: `scale(1.05) translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`
            }}
          >
            <img 
              src="/Services/Home Maintenance - Hero.jpg" 
              alt={t('home.hero.imgAlt')}
              crossOrigin="anonymous"
              // @ts-expect-error - fetchpriority is a valid attribute
              fetchpriority="high"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center opacity-30"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        </div>
        
        <div className="container-sahli relative z-20 pt-24 pb-16 flex flex-col items-center md:items-start text-center md:text-left">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-md rounded-full border border-primary/20 text-xs font-black tracking-widest uppercase text-primary mb-8 shadow-lg shadow-primary/5 animate-reveal"
          >
            <img 
              src="/logos/SahlLogo5.png" 
              alt={t('home.hero.logoAlt')} 
              className="w-4 h-4 object-contain animate-pulse" 
            />
            {t('home.hero.label')}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight max-w-4xl animate-reveal" style={{ animationDelay: '0.1s' }}>
            {t('home.hero.title')}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-10 font-medium leading-relaxed max-w-2xl animate-reveal text-balance" style={{ animationDelay: '0.2s' }}>
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '0.3s' }}>
            <a 
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRequestClick('Hero Section')}
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-xl font-bold text-base hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2 group"
            >
              <Send size={18} className="group-hover:rotate-12 transition-transform" />
              {t('home.hero.cta')}
            </a>
            <Link 
              to="/services"
              className="w-full sm:w-auto px-6 py-3 bg-secondary text-foreground border border-border rounded-xl font-bold text-base hover:bg-secondary/80 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              {t('nav.services')}
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 backdrop-blur-sm border border-border rounded-full text-sm text-muted-foreground font-medium animate-reveal hover:bg-secondary/80 transition-colors" style={{ animationDelay: '0.4s' }}>
            <MapPin size={16} className="text-primary" />
            <span>Serving Doha, Al Rayyan, Al Wakrah & More</span>
          </div>
        </div>

        <div
          className={`hidden lg:block absolute inset-y-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-1/2 z-20 pointer-events-none`}
        >
          <div
            className="h-full flex items-center justify-center"
            style={{
              transform: `translate(${mousePos.x * 0.12}px, ${mousePos.y * -0.06}px)`,
              transition: 'transform 600ms ease-out',
            }}
          >
            <div className="relative w-[320px] xl:w-[360px] aspect-[4/5] rounded-[2rem] bg-background border border-primary/20 shadow-[0_25px_80px_rgba(15,23,42,0.6)] overflow-hidden">
              <img
                src="/Services/AC Maintenance.jpg"
                alt="Technician performing home maintenance service"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-x-6 bottom-6 bg-background/95 border border-primary/20 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    SAHLI COORDINATION
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    24/7 AC • Plumbing • Electrical
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Doha • Al Rayyan • Al Wakrah
                  </span>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/40">
                  <Send size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="section-spacing bg-secondary/5 relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="max-w-3xl mb-12 mx-auto md:mx-0 text-center md:text-start">
            <ScrollReveal>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">
                {t('home.solutions.microHook')}
              </span>
              <h2 className="text-2xl md:text-4xl text-foreground mb-4">
                {t('home.solutions.title')}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-balance">
                {t('home.solutions.subtitle')}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {solutions.map((solution, i) => (
              <ScrollReveal key={i} delay={i * 0.05} className="h-full">
                <div
                  onClick={() => {
                    trackRequestClick(`Solution: ${solution.title}`);
                    window.open(getWhatsAppLink(t(solution.whatsappKey as TranslationKey)), '_blank');
                  }}
                  className="card-premium h-full p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer group relative overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                    {React.cloneElement(solution.icon as React.ReactElement, { size: 24 })}
                  </div>
                  
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 font-medium">
                    {solution.desc}
                  </p>
                  
                  <div className="mt-auto pt-4 w-full border-t border-border flex flex-wrap gap-2">
                    {solution.links.map((link, idx) => (
                      <Link 
                        key={idx}
                        to={link.path}
                        onClick={(e) => {
                          e.stopPropagation();
                          trackRequestClick(`SEO Link: ${link.label}`);
                        }}
                        className="text-[10px] sm:text-xs text-muted-foreground bg-secondary/20 px-2 py-1 rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <div className="border-y border-border bg-secondary/5 py-8 overflow-hidden">
        <Suspense fallback={<div className="h-10" />}>
          <Marquee gap={80} className="flex items-center">
            {marqueeItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-4 group">
                <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                <span className="text-sm md:text-base font-bold tracking-[0.15em] text-muted-foreground uppercase group-hover:text-primary transition-colors cursor-default">
                  {item}
                </span>
              </div>
            ))}
          </Marquee>
        </Suspense>
      </div>

      {/* Differentiation Section */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction={dir === 'rtl' ? 'left' : 'right'}>
              <h2 className="text-2xl md:text-4xl text-slate-900 mb-6 leading-tight">
                {t('home.differentiation.title')}
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-secondary/10 border border-border hover:border-primary/20 hover:bg-primary/5 transition-colors group">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Search size={20} />
                    </div>
                    <p className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {t(`home.differentiation.problem${i}` as TranslationKey)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction={dir === 'rtl' ? 'right' : 'left'}>
              <div className="p-8 md:p-10 rounded-[2.5rem] bg-foreground text-background relative overflow-hidden shadow-2xl shadow-foreground/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-16 -mt-16" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-black tracking-widest uppercase mb-8 border border-primary/20">
                    <ShieldCheck size={14} />
                    {t('home.differentiation.statement')}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-8 text-background">
                    {t('home.differentiation.list.title')}
                  </h3>
                  
                  <ul className="space-y-6">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-primary/25">
                          <ArrowRight size={14} className="text-white" />
                        </div>
                        <span className="text-base font-medium text-background/80">
                          {t(`home.differentiation.list.item${item}` as TranslationKey)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Major Categories */}
      <section id="categories" className="section-spacing bg-secondary/5 relative overflow-hidden border-t border-border">
        <div className="container-sahli relative z-10">
          <div className="max-w-3xl mb-12 mx-auto md:mx-0 text-center md:text-start">
            <ScrollReveal>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">
                {t('services.microHook')}
              </span>
              <h2 className="text-2xl md:text-4xl text-foreground mb-4">
                {t('services.title')}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-balance">
                {t('services.subtitle')}
              </p>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            <Suspense fallback={<div className="min-h-[300px] bg-card rounded-2xl animate-pulse" />}>
              {services.map((service, i) => (
                <ServiceRoof
                  key={i}
                  index={i}
                  showNumber={false}
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                  icon={React.cloneElement(service.icon as React.ReactElement, { size: 24 })}
                  path={service.path}
                  subcategories={service.subcategories}
                  whatsappKey={service.whatsappKey}
                />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* Why People Choose SAHLI */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="container-sahli relative z-10">
          <ScrollReveal className="mb-12 md:mb-20 text-center md:text-left">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">
              {t('home.glance.subtitle') || 'Why Choose Us'}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-foreground font-black tracking-tight">
              {t('home.glance.title')}
            </h2>
          </ScrollReveal>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden -mx-5 px-5 pb-8" ref={emblaRefGlance}>
            <div className="flex gap-4">
              {glanceItems.map((item, i) => (
                <div key={i} className="flex-[0_0_85%] min-w-0">
                  <div className="h-full p-6 rounded-3xl bg-secondary/30 border border-border flex flex-col">
                    <div className="w-12 h-12 rounded-2xl bg-card text-primary shadow-sm flex items-center justify-center mb-5 border border-border">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {glanceItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                <div className="group h-full p-8 rounded-3xl bg-secondary/30 border border-border hover:border-primary/20 hover:bg-card hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-card text-primary shadow-sm flex items-center justify-center mb-8 border border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-500">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors font-medium">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-spacing bg-secondary/30 border-y border-border">
        <div className="container-sahli">
          <ScrollReveal className="mb-12 md:mb-20 text-center">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">
              {t('home.how.subtitle') || 'Process'}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl text-foreground font-black tracking-tight">
              {t('home.how.title')}
            </h2>
          </ScrollReveal>

          <div className="hidden lg:grid grid-cols-4 gap-8 relative">
            <div className="absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent z-0 opacity-30" />
            
            {[1, 2, 3, 4].map((step) => (
              <ScrollReveal key={step} delay={step * 0.1} className="relative z-10 group h-full">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-3xl font-black mb-8 shadow-lg shadow-slate-900/20 group-hover:scale-110 group-hover:bg-primary group-hover:shadow-primary/30 transition-all duration-500 relative">
                    {formatNumber(step)}
                    <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">
                    {t(`home.how.step${step}.title` as TranslationKey)}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {t(`home.how.step${step}.desc` as TranslationKey)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Mobile View */}
          <div className="lg:hidden -mx-5 px-5 pb-8 overflow-hidden" ref={emblaRefHow}>
             <div className="flex gap-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-[0_0_85%] min-w-0">
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm h-full flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl font-black mb-6 shadow-lg shadow-slate-900/20">
                      {formatNumber(step)}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      {t(`home.how.step${step}.title` as TranslationKey)}
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {t(`home.how.step${step}.desc` as TranslationKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(241,41,89,0.03),transparent_50%)]" />
        <div className="container-sahli max-w-4xl relative z-10">
          <ScrollReveal className="text-center mb-16 md:mb-24">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block">
              {t('home.faq.subtitle') || 'Common Questions'}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground mb-6">{t('home.faq.title')}</h2>
          </ScrollReveal>
          
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div 
                  className={`bg-card rounded-3xl border transition-all duration-500 overflow-hidden group ${
                    openFaq === i 
                      ? 'border-primary/30 shadow-xl shadow-primary/5' 
                      : 'border-border hover:border-border hover:shadow-lg hover:shadow-border/40'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                    aria-expanded={openFaq === i}
                  >
                    <h3 className={`font-bold text-base md:text-lg transition-colors duration-300 ${
                      openFaq === i ? 'text-primary' : 'text-foreground group-hover:text-primary/80'
                    }`}>
                      {t(`home.faq.q${i}` as TranslationKey)}
                    </h3>
                    <div className={`flex-shrink-0 ml-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openFaq === i 
                        ? 'bg-primary text-white rotate-180 shadow-lg shadow-primary/30' 
                        : 'bg-secondary/20 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  
                  <div 
                    className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${
                      openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 md:p-8 pt-0 text-muted-foreground leading-relaxed text-sm md:text-base font-medium">
                        {t(`home.faq.a${i}` as TranslationKey)}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-foreground relative overflow-hidden text-center isolate">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,41,89,0.15),transparent_70%)] animate-pulse duration-[5000ms]" />
        
        <div className="container-sahli relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-background mb-8 tracking-tight leading-tight">
              {t('home.emotional.title')}
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-12 text-background/80 font-medium text-base md:text-lg tracking-wide">
              <span>{t('home.emotional.line1')}</span>
              <span className="hidden md:block w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(241,41,89,0.5)]" />
              <span>{t('home.emotional.line2')}</span>
              <span className="hidden md:block w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(241,41,89,0.5)]" />
              <span>{t('home.emotional.line3')}</span>
            </div>
            
            <a 
              href={getWhatsAppLink(t('cta.whatsapp.general'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-background text-foreground px-8 py-4 rounded-full font-black text-base md:text-lg hover:bg-background/90 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)] group"
            >
              <Send size={20} className="text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              {t('home.final.cta')}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
