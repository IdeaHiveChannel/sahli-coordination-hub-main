import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, Briefcase, Send, CheckCircle2, ShieldCheck, Globe, Users, Upload, File, X, Info, Shield, Zap, Sparkles, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { CONTACT_EMAIL } from '@/lib/constants';
import { storageService } from '@/lib/storageService';
import { rateupService } from '@/lib/rateupService';

const ProviderApplication = () => {
  const { t, dir } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects matching Index.tsx
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y1Spring = useSpring(y1, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const yHero = useTransform(scrollY, [0, 500], [0, -100]);
  
  const [formData, setFormData] = useState({
    companyName: '',
    crNumber: '',
    contactPerson: '',
    phone: '',
    email: '',
    services: '',
    areas: '',
    profile: '',
    responsibilityConfirmed: false
  });
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    cr: null,
    id: null,
    license: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t('provider.apply.form.upload.hint'));
        return;
      }
      setFiles(prev => ({ ...prev, [type]: file }));
      toast.success(`${file.name} selected`);
    }
  };

  const removeFile = (type: string) => {
    setFiles(prev => ({ ...prev, [type]: null }));
  };

  const checkDuplicates = async (cr: string, phone: string) => {
    const apps = storageService.getApplications();
    const providers = storageService.getProviders();
    
    if (apps.some(a => a.crNumber === cr) || providers.some(p => p.crNumber === cr)) return 'CR_EXISTS';
    if (apps.some(a => a.phone === phone) || providers.some(p => p.whatsapp === phone)) return 'PHONE_EXISTS';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 1. Duplicate Entity Detection
    const duplicateError = await checkDuplicates(formData.crNumber, formData.phone);
    if (duplicateError) {
      setIsSubmitting(false);
      if (duplicateError === 'CR_EXISTS') {
        toast.error('A company with this CR number is already registered or pending.');
      } else {
        toast.error('This WhatsApp number is already associated with an onboarded provider.');
      }
      return;
    }

      // 2. Save Application
      try {
        const newApp = storageService.saveApplication({
          name: formData.companyName,
          crNumber: formData.crNumber,
          contactPerson: formData.contactPerson,
          phone: formData.phone,
          email: formData.email,
          services: formData.services,
          areas: formData.areas,
          profile: formData.profile,
          responsibility_confirmed: formData.responsibilityConfirmed,
          documents: {
            cr: files.cr?.name,
            id: files.id?.name,
            license: files.license?.name
          }
        });

        // 3. Sync to RateUp (Provider Lead Data)
        const orgId = import.meta.env.VITE_RATEUP_ORG_ID;
        if (orgId) {
          try {
            await rateupService.upsertContact({
              orgId,
              phoneNumber: formData.phone,
              name: formData.companyName,
              email: formData.email,
              customFields: {
                contact_person: formData.contactPerson,
                cr_number: formData.crNumber,
                services: formData.services,
                areas: formData.areas,
                application_id: newApp.id,
                status: 'pending_review',
                source: 'provider_application'
              }
            });
          } catch (syncError) {
            // RateUp Sync Warning (Non-blocking)
          }
        }

        // 4. Provider Acknowledgement Hash
        const acknowledgement = {
          timestamp: new Date().toISOString(),
          ip: '127.0.0.1', 
          termsVersionId: 'TERMS-2024-V1',
          userAgent: navigator.userAgent,
          applicationId: newApp.id
        };
      
      // Simulate slight delay for effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success(t('provider.apply.form.success.title'));
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-[85vh] bg-background pt-12 pb-24" dir={dir}>
          <div className="container-sahli max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-12"
            >
              <div className="relative mx-auto w-24 h-24">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                  className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-emerald-500"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-display">{t('provider.apply.form.success.title')}</h2>
                <p className="text-subtitle !text-foreground/60 max-w-md mx-auto">
                  {t('provider.apply.form.success.desc')}
                </p>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="cta-primary btn-shine w-full sm:w-auto"
                >
                  {dir === 'rtl' ? 'العودة للرئيسية' : 'Return Home'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section - Consistent with Homepage */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] max-h-[1000px] flex flex-col justify-center md:justify-end overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              y: y1Spring,
              scale: scaleSpring,
              opacity: opacity
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt={t('nav.providerApplication')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>
          
          {/* Overlays matching Index.tsx */}
          <div className="absolute inset-0 bg-slate-950/40 z-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-background z-10" />
          <div className={`absolute inset-0 bg-gradient-to-${dir === 'rtl' ? 'l' : 'r'} from-slate-950/60 via-transparent to-transparent z-10`} />
          
          {/* Floating Background Blobs - Homepage Standard */}
          <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[60px] md:blur-[120px] animate-pulse-slow z-0`} />
          <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary/10 rounded-full blur-[50px] md:blur-[100px] animate-pulse-slow delay-1000 z-0`} />
        </div>

        <div className="container-sahli relative z-10 pt-32 pb-12 md:pb-24 flex flex-col items-center md:items-start">
          <motion.div
            style={{ y: yHero }}
            className="w-full max-w-4xl text-center md:text-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/20 rounded-full border border-primary/30 text-[0.6rem] md:text-[0.65rem] font-black tracking-[0.25em] uppercase text-primary mb-6 shadow-lg shadow-primary/10 relative overflow-hidden btn-shine"
            >
              <Target size={14} className="animate-pulse" />
              {dir === 'rtl' ? 'انضم إلى شبكتنا' : 'Partner with SAHLI'}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl"
            >
              {t('provider.apply.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl lg:text-2xl !text-white/80 max-w-3xl font-medium leading-relaxed drop-shadow-lg"
            >
              {t('provider.apply.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="section-spacing bg-background relative overflow-hidden" dir={dir}>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Benefits & Info */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-foreground/5 rounded-full text-[0.65rem] font-black text-foreground/60 uppercase tracking-widest border border-border">
                  <ShieldCheck size={14} className="text-primary" />
                  {t('provider.apply.why.title')}
                </div>
                
                <div className="space-y-8">
                  {[
                    { icon: Globe, title: t('provider.apply.why.reach.title'), desc: t('provider.apply.why.reach.desc'), color: 'bg-blue-500/10 text-blue-500' },
                    { icon: ShieldCheck, title: t('provider.apply.why.clients.title'), desc: t('provider.apply.why.clients.desc'), color: 'bg-emerald-500/10 text-emerald-500' },
                    { icon: Users, title: t('provider.apply.why.support.title'), desc: t('provider.apply.why.support.desc'), color: 'bg-primary/10 text-primary' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${item.color} border border-border/50 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shrink-0 shadow-lg shadow-foreground/[0.02]`}>
                        <item.icon size={28} />
                      </div>
                      <div className="pt-1">
                        <h4 className="text-xl font-black mb-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-base text-foreground/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2.5rem] bg-slate-950 text-white shadow-2xl shadow-primary/10 relative overflow-hidden group border border-white/5"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -mr-32 -mt-32 group-hover:bg-primary/30 transition-all duration-700" />
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-black text-white">{t('provider.apply.process.title')}</h3>
                </div>
                
                <div className="space-y-8 relative z-10">
                  {[
                    { step: 1, text: dir === 'rtl' ? 'طلب إلكتروني وتحميل الوثائق' : 'Online Application & Document Upload' },
                    { step: 2, text: dir === 'rtl' ? 'مراجعة الوثائق القانونية والامتثال' : 'Compliance & Legal Document Review' },
                    { step: 3, text: dir === 'rtl' ? 'موافقة الإدارة وتفعيل الحساب' : 'Manual Admin Approval & Hub Activation' },
                    { step: 4, text: dir === 'rtl' ? 'بدء استقبال طلبات التنسيق' : 'Start Receiving Coordination Requests' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 items-start group">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-black shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      <p className="text-base font-bold text-white/80 pt-1 leading-snug group-hover:text-white transition-colors">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-[3rem] p-8 md:p-12 border border-border/50 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[0.7rem] font-black uppercase tracking-widest text-foreground/50 ml-1">{t('provider.apply.form.companyName')}</label>
                        <div className="relative group">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={18} />
                          <Input 
                            required
                            className="bg-foreground/[0.03] border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-14 pl-12 transition-all hover:border-primary/30"
                            value={formData.companyName}
                            onChange={e => setFormData({...formData, companyName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[0.7rem] font-black uppercase tracking-widest text-foreground/50 ml-1">{t('provider.apply.form.crNumber')}</label>
                        <div className="relative group">
                          <File className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={18} />
                          <Input 
                            required
                            className="bg-foreground/[0.03] border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-14 pl-12 transition-all hover:border-primary/30"
                            value={formData.crNumber}
                            onChange={e => setFormData({...formData, crNumber: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[0.7rem] font-black uppercase tracking-widest text-foreground/50 ml-1">{t('provider.apply.form.contactPerson')}</label>
                        <div className="relative group">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={18} />
                          <Input 
                            required
                            className="bg-foreground/[0.03] border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-14 pl-12 transition-all hover:border-primary/30"
                            value={formData.contactPerson}
                            onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[0.7rem] font-black uppercase tracking-widest text-foreground/50 ml-1">{t('provider.apply.form.phone')}</label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={18} />
                          <Input 
                            required
                            type="tel"
                            placeholder="+974"
                            className="bg-foreground/[0.03] border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-14 pl-12 transition-all hover:border-primary/30"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[0.7rem] font-black uppercase tracking-widest text-foreground/50 ml-1">{t('provider.apply.form.email')}</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors" size={18} />
                        <Input 
                          required
                          type="email"
                          className="bg-foreground/[0.03] border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-14 pl-12 transition-all hover:border-primary/30"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[0.7rem] font-black uppercase tracking-widest text-foreground/50 ml-1">{t('provider.apply.form.services')}</label>
                        <Textarea 
                          required
                          placeholder={dir === 'rtl' ? 'مثال: صيانة تكييف، كهرباء، سباكة' : 'e.g., AC maintenance, electrical, plumbing'}
                          className="bg-foreground/[0.03] border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl min-h-[120px] p-4 transition-all resize-none hover:border-primary/30"
                          value={formData.services}
                          onChange={e => setFormData({...formData, services: e.target.value})}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[0.7rem] font-black uppercase tracking-widest text-foreground/50 ml-1">{t('provider.apply.form.areas')}</label>
                        <Textarea 
                          required
                          placeholder={dir === 'rtl' ? 'مثال: الدوحة، الوكرة، لوسيل' : 'e.g., Doha, Al Wakrah, Lusail'}
                          className="bg-foreground/[0.03] border-border/50 focus:border-primary/50 focus:ring-primary/20 rounded-2xl min-h-[120px] p-4 transition-all resize-none hover:border-primary/30"
                          value={formData.areas}
                          onChange={e => setFormData({...formData, areas: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Document Upload Section */}
                    <div className="space-y-6 pt-6 border-t border-border/50">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <Upload size={18} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-foreground/70">{t('provider.apply.form.upload.title')}</h4>
                      </div>
                      
                      <div className="grid sm:grid-cols-3 gap-6">
                        {[
                          { type: 'cr', label: t('provider.apply.form.upload.cr') },
                          { type: 'id', label: t('provider.apply.form.upload.id') },
                          { type: 'license', label: t('provider.apply.form.upload.license') }
                        ].map((doc) => (
                          <div key={doc.type} className="space-y-3">
                            <label className="text-[0.65rem] font-black uppercase tracking-widest text-foreground/40 block ml-1">{doc.label}</label>
                            <div className="relative group/file">
                              {files[doc.type] ? (
                                <div className="h-28 rounded-2xl bg-primary/5 border-2 border-primary/20 flex flex-col items-center justify-center p-3 relative group transition-all">
                                  <File className="text-primary mb-1" size={24} />
                                  <span className="text-[0.6rem] font-bold text-primary truncate w-full text-center">{files[doc.type]?.name}</span>
                                  <button 
                                    type="button"
                                    onClick={() => removeFile(doc.type)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <label className="h-28 rounded-2xl bg-foreground/[0.03] border-2 border-dashed border-border/50 hover:border-primary/30 hover:bg-primary/[0.02] flex flex-col items-center justify-center p-3 cursor-pointer transition-all group/label">
                                  <Upload className="text-foreground/20 group-hover/label:text-primary transition-colors mb-2" size={24} />
                                  <span className="text-[0.6rem] font-black text-foreground/30 group-hover/label:text-primary/60 transition-colors text-center uppercase tracking-tighter">
                                    {dir === 'rtl' ? 'اضغط للرفع' : 'Click to Upload'}
                                  </span>
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileChange(e, doc.type)}
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[0.65rem] text-foreground/40 italic flex items-center gap-1.5 ml-1">
                        <Info size={12} />
                        {t('provider.apply.form.upload.hint')}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-border/30">
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <div className="relative flex items-center pt-1">
                          <input 
                            type="checkbox" 
                            required
                            checked={formData.responsibilityConfirmed}
                            onChange={e => setFormData({...formData, responsibilityConfirmed: e.target.checked})}
                            className="w-5 h-5 rounded-md border-2 border-border/50 text-primary focus:ring-primary/20 transition-all checked:bg-primary"
                          />
                        </div>
                        <span className="text-sm text-foreground/60 leading-relaxed group-hover:text-foreground/80 transition-colors">
                          {t('provider.apply.form.agreement')}
                        </span>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-black shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group relative overflow-hidden btn-shine"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="uppercase tracking-widest">{dir === 'rtl' ? 'جاري الإرسال...' : 'SUBMITTING...'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <span className="uppercase tracking-[0.2em]">{t('provider.apply.form.submit')}</span>
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderApplication;

