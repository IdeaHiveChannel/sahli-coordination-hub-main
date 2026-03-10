import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, MessageSquare, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const Contact = () => {
  const { t, dir } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRTL = dir === 'rtl';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(t('contact.form.success.title'), {
      description: t('contact.form.success.description'),
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0b] overflow-hidden selection:bg-primary/20">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-[#0a0a0b]">
        {/* Video Background with Parallax Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-[#0a0a0b]/80 to-[#0a0a0b] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.1),transparent_50%)] z-10" />
          
          <div 
            className="absolute inset-0 w-full h-full transform scale-105 transition-transform duration-700 ease-out"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-[75%_center] md:object-center opacity-40 grayscale brightness-50"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-customer-service-representative-working-at-a-computer-4540-large.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <ScrollReveal direction="up" duration={0.8}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-primary text-[10px] font-black tracking-[0.2em] uppercase mb-10 shadow-2xl mx-auto">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t('contact.hero.badge')}
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" duration={0.8} delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.9]">
                {t('contact.hero.title')}
                <span className="text-primary block mt-4">{t('contact.hero.subtitle')}</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" duration={0.8} delay={0.2}>
              <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                {t('contact.hero.description')}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-px h-20 bg-gradient-to-b from-primary via-primary/20 to-transparent relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(241,41,89,0.8)] animate-bounce" />
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-24 md:py-40 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 lg:gap-32">
          {/* Contact Information */}
          <div className="space-y-16 order-2 lg:order-1">
            <ScrollReveal direction="right" duration={0.8}>
              <div className="flex flex-col items-start gap-6">
                <div className="w-12 h-1.5 bg-primary/40 rounded-full" />
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">{t('contact.info.title')}</h2>
                <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                  {t('contact.info.subtitle')}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-8">
              {[
                {
                  icon: Phone,
                  title: t('contact.info.phone.title'),
                  value: "+974 7020 8690",
                  link: "tel:+97470208690",
                  color: "text-primary",
                  bg: "bg-primary/10"
                },
                {
                  icon: Mail,
                  title: t('contact.info.email.title'),
                  value: "info@sahli-hub.com",
                  link: "mailto:info@sahli-hub.com",
                  color: "text-primary",
                  bg: "bg-primary/10"
                },
                {
                  icon: MapPin,
                  title: t('contact.info.address.title'),
                  value: "Lusail, Qatar",
                  link: "https://maps.google.com",
                  color: "text-primary",
                  bg: "bg-primary/10"
                }
              ].map((item, index) => (
                <ScrollReveal key={index} direction="up" duration={0.6} delay={index * 0.1}>
                  <a
                    href={item.link}
                    className="group flex items-start gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:bg-white/[0.08]"
                  >
                    <div className={`p-4 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-primary/10`}>
                      <item.icon size={28} />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-primary transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl font-black text-white group-hover:text-white transition-colors break-words">
                        {item.value}
                      </p>
                    </div>
                    <div className={`ml-auto self-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${isRTL ? 'rotate-180' : ''}`}>
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>

            {/* Support Hours */}
            <ScrollReveal direction="up" duration={0.8} delay={0.3}>
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-xl shadow-primary/10">
                      <Clock size={28} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">{t('contact.hours.title')}</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1 border-b border-white/5 pb-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Operation Hours</span>
                      <span className="text-lg md:text-xl font-black text-white leading-relaxed">
                        {t('contact.hours.weekdays')}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 pt-2">
                      <span className="text-lg md:text-xl font-black text-slate-400 leading-relaxed italic">
                        {t('contact.hours.weekends')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <ScrollReveal direction="left" duration={0.8}>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-b from-primary/20 to-transparent rounded-[3.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative bg-[#0a0a0b]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-2xl">
                  <div className="flex items-center gap-6 mb-12 md:mb-16">
                    <div className="p-5 rounded-2xl bg-primary/10 text-primary shadow-2xl shadow-primary/20">
                      <MessageSquare size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter mb-2">{t('contact.form.title')}</h3>
                      <p className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-slate-500 opacity-60">{t('contact.form.subtitle')}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                      <div className="space-y-4">
                        <label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                          {t('contact.form.firstName')}
                        </label>
                        <Input 
                          id="firstName"
                          name="firstName"
                          placeholder={t('contact.form.firstNamePlaceholder')}
                          required 
                          className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all h-16 rounded-2xl text-white font-medium placeholder:text-white/20 px-6"
                        />
                      </div>
                      <div className="space-y-4">
                        <label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                          {t('contact.form.lastName')}
                        </label>
                        <Input 
                          id="lastName"
                          name="lastName"
                          placeholder={t('contact.form.lastNamePlaceholder')}
                          required 
                          className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all h-16 rounded-2xl text-white font-medium placeholder:text-white/20 px-6"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                        {t('contact.form.email')}
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email" 
                        placeholder={t('contact.form.emailPlaceholder')}
                        required 
                        className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all h-16 rounded-2xl text-white font-medium placeholder:text-white/20 px-6"
                      />
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                        {t('contact.form.message')}
                      </label>
                      <Textarea 
                        id="message"
                        name="message"
                        placeholder={t('contact.form.messagePlaceholder')}
                        required 
                        className="min-h-[200px] bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-3xl text-white font-medium placeholder:text-white/20 p-6 resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-16 md:h-20 text-base md:text-lg font-black uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 transition-all duration-500 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1.5 rounded-2xl md:rounded-3xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send className={`ml-3 h-6 w-6 ${isRTL ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-center text-slate-600 mt-8 flex items-center justify-center gap-3">
                      <ShieldCheck size={14} className="text-primary" />
                      {t('contact.form.privacy')}
                    </p>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Contact;


