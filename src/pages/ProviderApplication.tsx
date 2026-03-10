import React, { useState, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Mail, Phone, Briefcase, Send, CheckCircle2, ShieldCheck, Upload, File, X, Info, Zap, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { storageService } from '@/lib/storageService';
import { rateupService } from '@/lib/rateupService';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const ProviderApplication = () => {
  const { t, dir } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    yearsInOperation: '',
    crNumber: '',
    contactPerson: '',
    phone: '',
    email: '',
    services: '',
    areas: '',
    profile: '',
    responsibilityConfirmed: false
  });

  const companyTypes = [
    { value: 'llc', label: t('provider.apply.form.companyType.llc') },
    { value: 'sole', label: t('provider.apply.form.companyType.sole') },
    { value: 'branch', label: t('provider.apply.form.companyType.branch') },
    { value: 'other', label: t('provider.apply.form.companyType.other') }
  ];

  const operationalYears = [
    { value: '0_1', label: t('provider.apply.form.yearsInOperation.0_1') },
    { value: '1_3', label: t('provider.apply.form.yearsInOperation.1_3') },
    { value: '3_5', label: t('provider.apply.form.yearsInOperation.3_5') },
    { value: '5_plus', label: t('provider.apply.form.yearsInOperation.5_plus') }
  ];

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
        <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center" dir={dir}>
          <div className="container-sahli max-w-2xl px-6">
            <div 
              className="text-center space-y-12 py-20 animate-in fade-in zoom-in-95 duration-700 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
              
              <div className="relative mx-auto w-24 h-24 z-10">
                <div 
                  className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40 animate-in zoom-in duration-500 delay-200 fill-mode-backwards"
                >
                  <CheckCircle2 size={48} />
                </div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-emerald-500 animate-ping opacity-50"
                  style={{ animationDuration: '2s' }}
                />
              </div>

              <div className="space-y-6 relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">{t('provider.apply.form.success.title')}</h2>
                <p className="text-lg md:text-xl text-slate-400 max-w-md mx-auto font-medium italic">
                  {t('provider.apply.form.success.desc')}
                </p>
              </div>

              <div className="pt-8 relative z-10 px-10">
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-primary/20 hover:-translate-y-1.5 active:scale-95"
                >
                  {dir === 'rtl' ? 'العودة للرئيسية' : 'Return Home'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section - Consistent with Homepage */}
      <section ref={containerRef} className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center md:justify-end overflow-hidden bg-[#0a0a0b]">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 animate-in zoom-in-110 duration-[1.5s] ease-out"
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt={t('nav.providerApplication')}
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-center scale-110 opacity-40 brightness-50"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/40 via-[#0a0a0b]/80 to-[#0a0a0b] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.1),transparent_50%)] z-10" />
        </div>

        <div className="container-sahli relative z-10 pt-32 pb-12 md:pb-32 flex flex-col items-center md:items-start">
          <div
            className="w-full max-w-4xl text-center md:text-start"
          >
            <ScrollReveal
              direction="up"
              duration={0.6}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl mx-auto md:mx-0"
            >
              <Target size={16} className="animate-pulse" />
              {dir === 'rtl' ? 'انضم إلى شبكتنا' : 'Partner with SAHLI'}
            </ScrollReveal>
            
            <ScrollReveal 
              direction="up"
              duration={0.8}
              delay={0.2}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
            >
              <h1>{t('provider.apply.title')}</h1>
            </ScrollReveal>
            
            <ScrollReveal
              direction="up"
              duration={0.8}
              delay={0.3}
              className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed italic"
            >
              <p>{t('provider.apply.subtitle')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="section-spacing bg-[#0a0a0b] relative overflow-hidden" dir={dir}>
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-sahli relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 md:gap-24 lg:gap-32 items-start">
            {/* Benefits & Info */}
            <div className="lg:col-span-5 space-y-16">
              <ScrollReveal 
                direction={dir === 'rtl' ? 'right' : 'left'}
                className="space-y-12"
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black text-primary uppercase tracking-[0.3em] border border-white/10">
                  <ShieldCheck size={16} />
                  {t('provider.apply.why.title')}
                </div>
                
                <div className="space-y-10">
                  {[
                    { icon: Target, title: t('provider.apply.why.coordination.title'), desc: t('provider.apply.why.coordination.desc'), color: 'bg-primary/10 text-primary' },
                    { icon: ShieldCheck, title: t('provider.apply.why.intake.title'), desc: t('provider.apply.why.intake.desc'), color: 'bg-primary/10 text-primary' },
                    { icon: Building2, title: t('provider.apply.why.independent.title'), desc: t('provider.apply.why.independent.desc'), color: 'bg-primary/10 text-primary' }
                  ].map((item, i) => (
                    <ScrollReveal 
                      key={i} 
                      direction="up"
                      delay={i * 0.1}
                      className="flex gap-8 group"
                    >
                      <div className={`w-16 h-16 rounded-2xl ${item.color} border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-700 shrink-0 shadow-2xl shadow-primary/10`}>
                        <item.icon size={32} />
                      </div>
                      <div className="pt-1">
                        <h4 className="text-xl md:text-2xl font-black mb-3 text-white group-hover:text-primary transition-colors tracking-tight">{item.title}</h4>
                        <p className="text-base md:text-lg text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal 
                direction={dir === 'rtl' ? 'right' : 'left'}
                className="p-10 md:p-14 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl space-y-8"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-xl shadow-primary/10">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">{t('provider.apply.model.title')}</h3>
                </div>
                <p className="text-base md:text-lg text-slate-400 leading-relaxed font-medium italic">
                  {t('provider.apply.model.desc')}
                </p>
              </ScrollReveal>

              <ScrollReveal 
                className="p-10 md:p-14 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                <div className="flex items-center gap-5 mb-10 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-xl shadow-primary/20">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">{t('provider.apply.process.title')}</h3>
                </div>
                
                <div className="space-y-10 relative z-10">
                  {[
                    { step: 1, text: t('provider.apply.process.step1') },
                    { step: 2, text: t('provider.apply.process.step2') },
                    { step: 3, text: t('provider.apply.process.step3') },
                    { step: 4, text: t('provider.apply.process.step4') }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-sm font-black text-white shrink-0 shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      <p className="text-lg font-black text-slate-300 pt-1 leading-snug group-hover:text-white transition-colors">{item.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-7">
              <ScrollReveal
                direction="up"
                className="bg-white/5 backdrop-blur-3xl rounded-[4rem] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                
                <div className="mb-16 p-10 rounded-[2.5rem] bg-primary/10 border border-primary/20 space-y-6">
                  <div className="flex items-center gap-4 text-primary">
                    <Info size={28} />
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t('provider.apply.preapply.title')}</h4>
                  </div>
                  <p className="text-base text-slate-300 leading-relaxed font-medium italic">
                    {t('provider.apply.preapply.desc')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label htmlFor="companyName" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.companyName')}</label>
                        <div className="relative group">
                          <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                          <Input 
                            id="companyName"
                            name="companyName"
                            required
                            className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-16 pl-14 transition-all hover:bg-white/[0.08] text-white font-medium"
                            value={formData.companyName}
                            onChange={e => setFormData({...formData, companyName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label htmlFor="companyType" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.companyType')}</label>
                        <div className="relative group">
                          <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors z-10" size={20} />
                          <select 
                            id="companyType"
                            name="companyType"
                            required
                            className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-16 pl-14 pr-4 transition-all hover:bg-white/[0.08] appearance-none text-white font-medium text-sm"
                            value={formData.companyType}
                            onChange={e => setFormData({...formData, companyType: e.target.value})}
                          >
                            <option value="" className="bg-[#0a0a0b]">{dir === 'rtl' ? 'اختر النوع' : 'Select Type'}</option>
                            {companyTypes.map(type => (
                              <option key={type.value} value={type.value} className="bg-[#0a0a0b]">{type.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label htmlFor="yearsInOperation" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.yearsInOperation')}</label>
                        <div className="relative group">
                          <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors z-10" size={20} />
                          <select 
                            id="yearsInOperation"
                            name="yearsInOperation"
                            required
                            className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-16 pl-14 pr-4 transition-all hover:bg-white/[0.08] appearance-none text-white font-medium text-sm"
                            value={formData.yearsInOperation}
                            onChange={e => setFormData({...formData, yearsInOperation: e.target.value})}
                          >
                            <option value="" className="bg-[#0a0a0b]">{dir === 'rtl' ? 'اختر المدى' : 'Select Range'}</option>
                            {operationalYears.map(year => (
                              <option key={year.value} value={year.value} className="bg-[#0a0a0b]">{year.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label htmlFor="crNumber" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.crNumber')}</label>
                        <div className="relative group">
                          <File className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                          <Input 
                            id="crNumber"
                            name="crNumber"
                            required
                            className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-16 pl-14 transition-all hover:bg-white/[0.08] text-white font-medium"
                            value={formData.crNumber}
                            onChange={e => setFormData({...formData, crNumber: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label htmlFor="contactPerson" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.contactPerson')}</label>
                        <div className="relative group">
                          <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                          <Input 
                            id="contactPerson"
                            name="contactPerson"
                            required
                            className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-16 pl-14 transition-all hover:bg-white/[0.08] text-white font-medium"
                            value={formData.contactPerson}
                            onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.phone')}</label>
                        <div className="relative group">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                          <Input 
                            id="phone"
                            name="phone"
                            required
                            type="tel"
                            placeholder="+974"
                            className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-16 pl-14 transition-all hover:bg-white/[0.08] text-white font-medium"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.email')}</label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                        <Input 
                          id="email"
                          name="email"
                          required
                          type="email"
                          className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-2xl h-16 pl-14 transition-all hover:bg-white/[0.08] text-white font-medium"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label htmlFor="services" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.services')}</label>
                        <Textarea 
                          id="services"
                          name="services"
                          required
                          placeholder={dir === 'rtl' ? 'مثال: صيانة تكييف، كهرباء، سباكة' : 'e.g., AC maintenance, electrical, plumbing'}
                          className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-[2rem] min-h-[160px] p-6 transition-all resize-none hover:bg-white/[0.08] text-white font-medium"
                          value={formData.services}
                          onChange={e => setFormData({...formData, services: e.target.value})}
                        />
                      </div>
                      <div className="space-y-4">
                        <label htmlFor="areas" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">{t('provider.apply.form.areas')}</label>
                        <Textarea 
                          id="areas"
                          name="areas"
                          required
                          placeholder={dir === 'rtl' ? 'مثال: الدوحة، الوكرة، لوسيل' : 'e.g., Doha, Al Wakrah, Lusail'}
                          className="bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-[2rem] min-h-[160px] p-6 transition-all resize-none hover:bg-white/[0.08] text-white font-medium"
                          value={formData.areas}
                          onChange={e => setFormData({...formData, areas: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Document Upload Section */}
                    <div className="space-y-8 pt-10 border-t border-white/5">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-xl shadow-primary/10">
                          <Upload size={22} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-[0.4em] text-white/70">{t('provider.apply.form.upload.title')}</h4>
                      </div>
                      
                      <div className="grid sm:grid-cols-3 gap-8">
                        {[
                          { type: 'cr', label: t('provider.apply.form.upload.cr') },
                          { type: 'id', label: t('provider.apply.form.upload.id') },
                          { type: 'license', label: t('provider.apply.form.upload.license') }
                        ].map((doc) => (
                          <div key={doc.type} className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 block ml-1">{doc.label}</label>
                            <div className="relative group/file">
                              {files[doc.type] ? (
                                <div className="h-32 rounded-2xl bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center p-4 relative group transition-all shadow-2xl">
                                  <File className="text-primary mb-2" size={32} />
                                  <span className="text-[10px] font-black text-primary truncate w-full text-center px-2">{files[doc.type]?.name}</span>
                                  <button 
                                    type="button"
                                    onClick={() => removeFile(doc.type)}
                                    className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ) : (
                                <label className="h-32 rounded-2xl bg-white/5 border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-white/[0.08] flex flex-col items-center justify-center p-4 cursor-pointer transition-all group/label shadow-inner">
                                  <Upload className="text-white/10 group-hover/label:text-primary transition-colors mb-3" size={32} />
                                  <span className="text-[10px] font-black text-white/20 group-hover/label:text-primary transition-colors text-center uppercase tracking-[0.2em]">
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
                      <p className="text-[10px] text-slate-500 italic flex items-center gap-2 ml-1 font-medium">
                        <Info size={14} className="text-primary" />
                        {t('provider.apply.form.upload.hint')}
                      </p>
                    </div>

                    <div className="pt-10 border-t border-white/5">
                      <label className="flex items-start gap-6 cursor-pointer group">
                        <div className="relative flex items-center pt-1">
                          <input 
                            type="checkbox" 
                            required
                            checked={formData.responsibilityConfirmed}
                            onChange={e => setFormData({...formData, responsibilityConfirmed: e.target.checked})}
                            className="w-6 h-6 rounded-md border-2 border-white/10 bg-white/5 text-primary focus:ring-primary/20 transition-all checked:bg-primary"
                          />
                        </div>
                        <span className="text-base text-slate-400 leading-relaxed group-hover:text-white transition-colors whitespace-pre-line font-medium italic">
                          {t('provider.apply.form.agreement')}
                        </span>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-black shadow-2xl shadow-primary/20 transition-all active:scale-[0.98] group relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="uppercase tracking-[0.3em]">{dir === 'rtl' ? 'جاري الإرسال...' : 'SUBMITTING...'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-4">
                          <span className="uppercase tracking-[0.3em]">{t('provider.apply.form.submit')}</span>
                          <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderApplication;
