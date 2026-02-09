import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, Briefcase, Send, CheckCircle2, ShieldCheck, Globe, Users, Upload, File, X, Info } from 'lucide-react';
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
      <div className="container-sahli pt-32 pb-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-label !text-primary inline-flex items-center gap-3 px-6 py-2 bg-primary/20 rounded-full border border-primary/30 shadow-xl btn-shine"
            >
              Partner with SAHLI
            </motion.div>
            <h1 className="text-display mb-8">
              {t('provider.apply.title')}
            </h1>
            <p className="text-subtitle !text-foreground/60 max-w-3xl mx-auto">
              {t('provider.apply.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Benefits & Info */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-8">
                <h3 className="text-label !text-primary/80 border-b border-primary/10 pb-4">
                  {t('provider.apply.why.title')}
                </h3>
                
                {[
                  { icon: Globe, title: t('provider.apply.why.reach.title'), desc: t('provider.apply.why.reach.desc') },
                  { icon: ShieldCheck, title: t('provider.apply.why.clients.title'), desc: t('provider.apply.why.clients.desc') },
                  { icon: Users, title: t('provider.apply.why.support.title'), desc: t('provider.apply.why.support.desc') }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center text-foreground/40 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all duration-500 shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-body font-black mb-2">{item.title}</h4>
                      <p className="text-label !text-foreground/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[60px] -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-700" />
                <h3 className="text-subtitle !text-white mb-6 relative z-10">{t('provider.apply.process.title')}</h3>
                <div className="space-y-6 relative z-10">
                  <div className="flex gap-4 items-center">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-label !text-[10px] shrink-0">1</div>
                    <p className="text-body !text-white/80">{dir === 'rtl' ? 'طلب إلكتروني وتحميل الوثائق' : 'Online Application & Document Upload'}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-label !text-[10px] shrink-0">2</div>
                    <p className="text-body !text-white/80">{dir === 'rtl' ? 'مراجعة الوثائق القانونية والامتثال' : 'Compliance & Legal Document Review'}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-label !text-[10px] shrink-0">3</div>
                    <p className="text-body !text-white/80">{dir === 'rtl' ? 'موافقة الإدارة وتفعيل الحساب' : 'Manual Admin Approval & Hub Activation'}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                     <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-label !text-[10px] shrink-0">4</div>
                     <p className="text-body !text-white/80">{dir === 'rtl' ? 'المرحلة 4: متاح للتنسيق' : 'Phase 4: Eligible for Coordination'}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-12 bg-foreground/[0.02] p-8 md:p-12 rounded-[2.5rem] border border-border shadow-sm">
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-label !text-foreground/50 ml-1">{t('provider.apply.form.companyName')}</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                        <Input 
                          required 
                          className="pl-12 h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 transition-all text-label" 
                          placeholder="Legal entity name" 
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-label !text-foreground/50 ml-1">{t('provider.apply.form.crNumber')}</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                        <Input 
                          required 
                          className="pl-12 h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 transition-all text-label" 
                          placeholder="CR Number" 
                          value={formData.crNumber}
                          onChange={(e) => setFormData({ ...formData, crNumber: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-label !text-foreground/50 ml-1">{t('provider.apply.form.contactPerson')}</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                        <Input 
                          required 
                          className="pl-12 h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 transition-all text-label" 
                          placeholder="Full name" 
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-label !text-foreground/50 ml-1">{t('provider.apply.form.phone')}</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                        <Input 
                          required 
                          className="pl-12 h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 transition-all text-label" 
                          placeholder="+974 XXXX XXXX" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-label !text-foreground/50 ml-1">{t('provider.apply.form.email')}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                      <Input 
                        required 
                        type="email" 
                        className="pl-12 h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 transition-all text-label" 
                        placeholder="company@email.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-label !text-foreground/50 ml-1">{t('provider.apply.form.services')}</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                      <Input 
                        required 
                        className="pl-12 h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 transition-all text-label" 
                        placeholder="e.g. AC Maintenance, Deep Cleaning, etc." 
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-label !text-foreground/50 ml-1">Areas Served</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
                      <Input 
                        required 
                        className="pl-12 h-14 rounded-2xl bg-background border-border/50 focus:border-primary/50 transition-all text-label" 
                        placeholder="e.g. Doha, Lusail, Al Wakrah, etc." 
                        value={formData.areas}
                        onChange={(e) => setFormData({ ...formData, areas: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-label !text-foreground/50 ml-1">{t('provider.apply.form.profile')}</label>
                    <Textarea 
                      required 
                      className="min-h-[160px] rounded-2xl bg-background border-border/50 focus:border-primary/50 transition-all p-5 text-label leading-relaxed" 
                      placeholder="Tell us about your company, team size, and years of experience in Qatar..." 
                      value={formData.profile}
                      onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                    />
                  </div>

                  <div className="pt-4 px-2">
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                      <div className="pt-1">
                        <input 
                          type="checkbox" 
                          required 
                          id="responsibility-check"
                          className="w-5 h-5 rounded border-primary/30 text-primary focus:ring-primary/20"
                          checked={formData.responsibilityConfirmed}
                          onChange={(e) => setFormData({ ...formData, responsibilityConfirmed: e.target.checked })}
                        />
                      </div>
                      <label htmlFor="responsibility-check" className="text-sm font-bold leading-relaxed text-foreground/80 cursor-pointer">
                        <span className="text-label !text-primary block mb-1">Primary Responsibility Declaration</span>
                        I confirm that my company is directly responsible for execution, staff behavior, and compliance. We acknowledge that SAHLI coordinates requests but the provider remains the sole entity responsible for service delivery and outcome.
                      </label>
                    </div>
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="space-y-6 pt-8 border-t border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-black uppercase tracking-wider text-foreground">{t('provider.apply.form.upload.title')}</h3>
                    <Info size={14} className="text-primary/60" />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 'cr', label: t('provider.apply.form.upload.cr') },
                      { id: 'id', label: t('provider.apply.form.upload.id') },
                      { id: 'license', label: t('provider.apply.form.upload.license') }
                    ].map((doc) => (
                      <div key={doc.id} className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50 ml-1">{doc.label}</label>
                        <div className="relative group">
                          <input
                            type="file"
                            id={`file-${doc.id}`}
                            className="hidden"
                            onChange={(e) => handleFileChange(e, doc.id)}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                          {!files[doc.id] ? (
                            <label
                              htmlFor={`file-${doc.id}`}
                              className="flex flex-col items-center justify-center h-32 rounded-2xl border-2 border-dashed border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group-hover:scale-[0.98]"
                            >
                              <Upload size={24} className="text-foreground/20 mb-2 group-hover:text-primary/50 transition-colors" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40 text-center px-4">
                                {t('provider.apply.form.upload.placeholder')}
                              </span>
                            </label>
                          ) : (
                            <div className="h-32 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col items-center justify-center relative p-4 group">
                              <File size={24} className="text-primary mb-2" />
                              <span className="text-[10px] font-bold text-foreground/70 text-center truncate w-full">
                                {files[doc.id]?.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(doc.id)}
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-medium text-foreground/40 italic">
                    {t('provider.apply.form.upload.hint')}
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="cta-primary btn-shine w-full py-8 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('provider.apply.form.submit')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send size={20} />
                        {t('provider.apply.form.submit')}
                      </div>
                    )}
                  </Button>
                  <p className="text-[10px] text-center text-foreground/40 font-bold mt-6 uppercase tracking-widest">
                    {t('provider.apply.form.agreement')}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderApplication;

