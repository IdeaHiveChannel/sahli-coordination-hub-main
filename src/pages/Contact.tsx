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
      <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video Background with Parallax Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10" />
          
          <div 
            className="absolute inset-0 w-full h-full transform scale-105 transition-transform duration-700 ease-out"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-[75%_center] md:object-center"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-customer-service-representative-working-at-a-computer-4540-large.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="container relative z-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" duration={0.8}>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t('contact.hero.badge')}
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" duration={0.8} delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight mb-6 leading-[1.1]">
                {t('contact.hero.title')}
                <span className="text-primary block mt-2">{t('contact.hero.subtitle')}</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" duration={0.8} delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('contact.hero.description')}
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce duration-2000"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-20 md:py-32 relative z-20 -mt-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-10 order-2 lg:order-1">
            <ScrollReveal direction="right" duration={0.8}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.info.title')}</h2>
                <p className="text-muted-foreground text-lg">
                  {t('contact.info.subtitle')}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-6">
              {[
                {
                  icon: Phone,
                  title: t('contact.info.phone.title'),
                  value: "+974 7020 8690",
                  link: "tel:+97470208690",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10"
                },
                {
                  icon: Mail,
                  title: t('contact.info.email.title'),
                  value: "info@sahli-hub.com",
                  link: "mailto:info@sahli-hub.com",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10"
                },
                {
                  icon: MapPin,
                  title: t('contact.info.address.title'),
                  value: "Lusail, Qatar",
                  link: "https://maps.google.com",
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10"
                }
              ].map((item, index) => (
                <ScrollReveal key={index} direction="up" duration={0.6} delay={index * 0.1}>
                  <a
                    href={item.link}
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <div className={`ml-auto self-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isRTL ? 'rotate-180' : ''}`}>
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>

            {/* Support Hours */}
            <ScrollReveal direction="up" duration={0.8} delay={0.3}>
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Clock size={20} />
                    </div>
                    <h3 className="font-semibold text-lg">{t('contact.hours.title')}</h3>
                  </div>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                      <span>{t('contact.hours.weekdays')}</span>
                      <span className="font-medium text-foreground">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('contact.hours.weekends')}</span>
                      <span className="font-medium text-foreground">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <ScrollReveal direction="left" duration={0.8}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-xl opacity-50" />
                
                <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{t('contact.form.title')}</h3>
                      <p className="text-sm text-muted-foreground">{t('contact.form.subtitle')}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">
                          {t('contact.form.firstName')}
                        </label>
                        <Input 
                          placeholder={t('contact.form.firstNamePlaceholder')}
                          required 
                          className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">
                          {t('contact.form.lastName')}
                        </label>
                        <Input 
                          placeholder={t('contact.form.lastNamePlaceholder')}
                          required 
                          className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium ml-1">
                        {t('contact.form.email')}
                      </label>
                      <Input 
                        type="email" 
                        placeholder={t('contact.form.emailPlaceholder')}
                        required 
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium ml-1">
                        {t('contact.form.message')}
                      </label>
                      <Textarea 
                        placeholder={t('contact.form.messagePlaceholder')}
                        required 
                        className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                      <ShieldCheck size={12} />
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


