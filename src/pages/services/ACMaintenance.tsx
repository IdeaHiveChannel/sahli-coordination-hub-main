import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Marquee } from '@/components/motion/Marquee';
import { MessageSquare, CheckCircle2, Snowflake, ArrowUp } from 'lucide-react';
import { trackRequestClick } from '@/lib/gtag';
import { Link } from 'react-router-dom';
import { getWhatsAppLink } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function ACMaintenance() {
  const { t } = useLanguage();
  
  const relatedServices = [
    { title: t('services.homeMaintenance.title'), path: '/services#home-maintenance' },
    { title: t('services.homeMaintenance.ac.title'), path: t('services.homeMaintenance.ac.path') },
    { title: t('services.homeMaintenance.plumbing.title'), path: t('services.homeMaintenance.plumbing.path') },
    { title: t('services.homeMaintenance.handyman.title'), path: t('services.homeMaintenance.handyman.path') },
    { title: t('services.cleaning.deep.title'), path: t('services.cleaning.deep.path') },
    { title: t('services.outdoor.pest.title'), path: t('services.outdoor.pest.path') },
  ];

  const includes = [
    'Complete Filter Cleaning',
    'Evaporator Coil Check',
    'Condenser Coil Cleaning',
    'Gas Pressure Verification',
    'Drain Line Clearing',
    'Electrical Component Test'
  ];

  return (
    <Layout>
      <section className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 animate-in zoom-in-110 duration-[1.5s] ease-out"
          >
            <img 
              src="/Services/AC Maintenance.jpg" 
              alt="Professional AC Maintenance Services Qatar"
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
            <div 
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/20 rounded-full border border-primary/30 text-xs font-black tracking-[0.2em] uppercase text-primary mb-3 md:mb-4 mx-auto md:mx-0 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100 fill-mode-backwards"
            >
              <Snowflake size={16} className="animate-pulse" />
              AC Maintenance Qatar
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-[1.1] tracking-tight text-slate-900 drop-shadow-2xl font-black w-full text-center md:text-start animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200 fill-mode-backwards">
              Preventive AC Maintenance
            </h1>

            <div
              className="w-full max-w-3xl flex flex-col items-center md:items-start text-center md:text-start animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-backwards"
            >
              <p className="text-base md:text-lg text-slate-700 mb-8 md:mb-12 font-medium leading-relaxed drop-shadow-lg w-full text-center md:text-start max-w-xl mx-auto md:mx-0">
                Protect your cooling system with scheduled maintenance. We coordinate certified technicians for thorough inspections and cleaning across Doha.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={getWhatsAppLink(t('services.homeMaintenance.ac.whatsapp'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRequestClick('AC Maintenance Hero')}
                  className="cta-primary px-8 py-4 text-xs btn-shine shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-transform"
                >
                  <div
                    className="flex items-center gap-3"
                  >
                    <MessageSquare size={16} className="fill-primary-foreground" />
                    {t('cta.request')}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Rules */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-200">
        <div className="container-sahli">
          <ScrollReveal 
            direction="up"
            className="bg-slate-50 border border-slate-200 rounded-xl p-5 md:p-6"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-center font-bold">
              Maintenance Standards
            </h2>
            <Marquee speed={0.5} className="-mx-4 px-4" gap={16}>
              {[
                t('services.rules.inspection'),
                'Specialized Equipment Used',
                'Performance Report Provided',
                t('services.rules.payment')
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

      {/* Includes */}
      <section className="section-spacing bg-white relative overflow-hidden">
        <div className="container-sahli">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-6 md:mb-8 text-center md:text-start">
            What Maintenance Includes
          </h2>
          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {includes.map((item, i) => (
              <div
                key={i}
                className="group p-5 md:p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/40 hover:bg-slate-100 transition-all duration-500 shrink-0 w-[260px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                  <CheckCircle2 size={16} />
                </div>
                <h3 className="text-xs font-bold mb-2">{item}</h3>
                <div className="w-8 h-0.5 bg-primary/20 rounded-full group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-spacing bg-white border-t border-slate-200">
        <div className="container-sahli">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-center md:text-start font-black">
            {t('services.related.title')}
          </h2>
          <Marquee speed={0.4} className="-mx-4 px-4" gap={12}>
            {relatedServices.map((service, i) => (
              <Link
                key={i}
                to={service.path}
                className="group p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 shrink-0 w-[260px] md:w-auto shadow-xl shadow-primary/5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-wider">
                    {service.title}
                  </span>
                  <ArrowUp className="w-4 h-4 rotate-45 text-slate-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </div>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="container-sahli flex justify-center">
          <Link 
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white border border-slate-200 hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ArrowUp size={16} className="rotate-[-90deg] rtl:rotate-[90deg]" />
            </div>
            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-widest">
              {t('nav.home')}
            </span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
