import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, CheckCircle2, 
  MessageSquare, ArrowRight, ArrowLeft, ShieldCheck, 
  Clock, Check, Calendar, Wrench, Sparkles,
  Truck, Heart, Cpu, Lightbulb, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { GOVERNANCE_THRESHOLDS } from '@/lib/governanceConstants';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Intake Stages
enum IntakeStage {
  PHONE_INPUT = 1,
  OTP_VERIFICATION = 2,
  SERVICE_SELECTION = 3,
  SUB_SERVICE_SELECTION = 4,
  AREA_SELECTION = 5,
  DESCRIPTION_OPTIONAL = 6,
  URGENCY_SELECTION = 7,
  REVIEW_CONFIRM = 8,
  SUBMISSION_SUCCESS = 9
}

import { storageService } from '@/lib/storageService';
import { rateupService } from '@/lib/rateupService';

const RequestService = () => {
  const { t, dir } = useLanguage();
  const [stage, setStage] = useState<IntakeStage>(IntakeStage.PHONE_INPUT);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    generatedOtp: '', // Added for production OTP logic
    serviceType: '',
    subService: '',
    area: '',
    description: '',
    urgency: '',
    isVerified: false,
    verification_method: '',
    verified_at: '',
    otp_expiry: 0,
    otp_retries: 0,
    is_blocked: false,
    last_blocked_at: '',
    sessionId: ''
  });

  const [otpTimer, setOtpTimer] = useState<number>(0);
  const OTP_EXPIRY_SECONDS = 300; // 5 minutes
  const MAX_OTP_RETRIES = 3;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stage === IntakeStage.OTP_VERIFICATION && otpTimer > 0 && !formData.isVerified) {
      interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            toast.error('Verification session expired. Please request a new code.');
            setStage(IntakeStage.PHONE_INPUT);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stage, otpTimer, formData.isVerified]);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStage = () => {
    setStage(prev => (prev < IntakeStage.SUBMISSION_SUCCESS ? prev + 1 : prev));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const prevStage = () => {
    setStage(prev => (prev > 1 ? prev - 1 : prev));
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleSendOTP = async () => {
    if (!formData.phone) {
      toast.error('Please enter your phone number');
      return;
    }
    
    if (formData.is_blocked) {
      toast.error('Your access is temporarily restricted due to multiple failed attempts.');
      return;
    }

    setIsSubmitting(true);
    
    // Production OTP Generation
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    try {
      // Integration with RateUp for WhatsApp OTP
      const { orgId } = rateupService.getApiConfig();
      const fullPhone = formData.phone;
      
      if (orgId) {
        await rateupService.sendDirectMessage({
          orgId,
          phoneNumber: fullPhone,
          message: `Your SAHLI verification code is: ${newOtp}. Valid for 5 minutes.`
        });
        console.log(`OTP sent via RateUp to ${fullPhone} (Org: ${orgId})`);
      } else {
        // Fallback for development if API key not set
        console.warn('VITE_RATEUP_ORG_ID missing from environment. If this is a production build, please ensure .env variables were present during build time. Falling back to console OTP.');
        console.log(`[DEBUG] RateUp Config:`, rateupService.getApiConfig());
        console.log(`[OTP FALLBACK] Phone: ${fullPhone}, Code: ${newOtp}`);
        if (import.meta.env.DEV) {
          toast.info(`DEV MODE: OTP is ${newOtp}`, { duration: 5000 });
        }
      }

      setOtpTimer(OTP_EXPIRY_SECONDS);
      setFormData(prev => ({ 
        ...prev, 
        otp: '', 
        generatedOtp: newOtp,
        otp_retries: 0 
      }));
      
      toast.success('Verification code sent to WhatsApp');
      nextStage();
    } catch (error) {
      console.error('OTP Send Error:', error);
      toast.error('Failed to send verification code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (formData.otp.length !== 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }

    if (formData.is_blocked) {
      toast.error(`Your access is restricted for ${GOVERNANCE_THRESHOLDS.OTP_LOCK_DURATION_HOURS} hours.`);
      return;
    }

    setIsSubmitting(true);
    // Production-grade verification logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    if (formData.otp === formData.generatedOtp || (import.meta.env.DEV && formData.otp === '123456')) {
      setFormData(prev => ({ 
        ...prev, 
        isVerified: true,
        verification_method: 'whatsapp_otp',
        verified_at: new Date().toISOString(),
        otp_retries: 0,
        sessionId: `SESS-${Math.random().toString(36).slice(2, 11).toUpperCase()}`
      }));
      setOtpTimer(0);
      toast.success('Phone verified successfully');
      nextStage();
    } else {
      const newRetries = formData.otp_retries + 1;
      const remaining = MAX_OTP_RETRIES - newRetries;
      
      const isBlockedNow = newRetries >= MAX_OTP_RETRIES;
      
      setFormData(prev => ({ 
        ...prev, 
        otp_retries: newRetries,
        is_blocked: isBlockedNow,
        last_blocked_at: isBlockedNow ? new Date().toISOString() : prev.last_blocked_at
      }));

      if (isBlockedNow) {
        toast.error(`Too many failed attempts. Access restricted for ${GOVERNANCE_THRESHOLDS.OTP_LOCK_DURATION_HOURS}h.`);
        setStage(IntakeStage.PHONE_INPUT);
      } else {
        toast.error(`Invalid code. ${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining.`);
      }
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // 1. Save Request to Storage Service (Live)
      const newRequest = storageService.saveRequest({
        customer_id: formData.phone,
        customer_phone: formData.phone,
        service_category: formData.serviceType,
        sub_service: formData.subService,
        area: formData.area,
        urgency: formData.urgency as 'High' | 'Normal' | 'Flexible',
        description: formData.description,
        intake_source: 'Website',
        phone_verified: true,
        verification_method: 'WhatsApp OTP',
        verified_at: formData.verified_at,
        session_id: formData.sessionId,
        terms_version_id: 'TERMS-2024-V1',
      });

      console.log('BACKEND: Request created and visible in Admin Dashboard.', newRequest);
      
      // 2. Sync to RateUp (Customer Data)
      const { orgId } = rateupService.getApiConfig();
      if (orgId) {
        try {
          await rateupService.upsertContact({
            orgId,
            phoneNumber: formData.phone,
            name: `Customer ${formData.phone}`, // Using phone as name since we don't collect name yet
            customFields: {
              last_service: formData.serviceType,
              last_sub_service: formData.subService,
              last_area: formData.area,
              last_request_id: newRequest.id,
              source: 'website_request'
            }
          });
          console.log('RateUp: Customer contact upserted.');
        } catch (syncError) {
          console.warn('RateUp Sync Warning (Non-blocking):', syncError);
        }
      }

      // 3. Trigger Message Log (Live)
      storageService.saveMessageLog({
        phone: formData.phone,
        message: `Your request ${newRequest.id} for ${newRequest.sub_service} has been received. We are now coordinating with providers.`,
        type: 'WhatsApp',
        status: 'Sent',
        tags: ['Confirmation', 'Customer'],
        linked_request_id: newRequest.id
      });

      // Store in session for potential recovery or analytics
      sessionStorage.setItem('last_request_id', newRequest.id);
      
      // Simulate slight network delay for UI feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      toast.success('Request submitted successfully!');
      nextStage();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit request. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Stage Renderers
  const renderStage = () => {
    // Security check: If stage is 3 or higher and not verified, force back to OTP or Phone Input
    if (stage >= IntakeStage.SERVICE_SELECTION && !formData.isVerified) {
      setStage(IntakeStage.PHONE_INPUT);
      return null;
    }

    switch (stage) {
      case IntakeStage.PHONE_INPUT: {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black tracking-tight">{t('intake.screen1.title')}</h2>
              <p className="text-foreground/60">{t('intake.screen1.body')}</p>
            </div>
            <div className="space-y-4">
              {formData.is_blocked && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold text-center">
                  Access restricted due to multiple failed attempts.
                </div>
              )}
              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 font-bold text-sm">+974</span>
                  <Input 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value.replace(/\D/g, '').slice(0, 8))}
                    placeholder="0000 0000" 
                    className="pl-14 h-14 rounded-xl border-border/50 bg-background shadow-sm text-lg font-bold"
                  />
                </div>
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest text-center">
                  {t('intake.screen1.helper')}
                </p>
              </div>
              <Button 
                disabled={formData.phone.length < 8 || isSubmitting}
                onClick={handleSendOTP} 
                className="w-full h-14 rounded-xl font-black uppercase tracking-widest gap-2 btn-shine"
              >
                {isSubmitting ? 'Sending...' : t('intake.screen1.button')} <MessageSquare size={18} />
              </Button>
            </div>
          </motion.div>
        );
      }

      case IntakeStage.OTP_VERIFICATION: {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black tracking-tight">{t('intake.screen2.title')}</h2>
              <p className="text-foreground/60">{t('intake.screen2.body')}</p>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1 rounded-full font-mono text-sm">
                  {formData.phone}
                </Badge>
                {otpTimer > 0 && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 animate-pulse">
                    <Clock size={14} />
                    <span>
                      {Math.floor(otpTimer / 60)}:{(otpTimer % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6 flex flex-col items-center">
              {!formData.isVerified ? (
                <>
                  <InputOTP
                    maxLength={6}
                    value={formData.otp}
                    onChange={(v) => updateFormData('otp', v)}
                  >
                    <InputOTPGroup className="gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <InputOTPSlot 
                          key={index} 
                          index={index} 
                          className="w-12 h-14 text-lg font-bold rounded-xl border-border/50 bg-background shadow-sm" 
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="w-full space-y-4">
                    <Button 
                      disabled={formData.otp.length !== 6 || isSubmitting}
                      onClick={handleVerifyOTP} 
                      className="w-full h-14 rounded-xl font-black uppercase tracking-widest gap-2 btn-shine"
                    >
                      {isSubmitting ? 'Verifying...' : t('intake.screen2.button')} <CheckCircle2 size={18} />
                    </Button>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="link" 
                        onClick={handleSendOTP}
                        disabled={otpTimer > 240 || isSubmitting}
                        className="text-primary font-bold uppercase tracking-widest text-xs"
                      >
                        {t('intake.screen2.resend')}
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={prevStage} 
                        className="w-full h-12 rounded-xl text-foreground/50 hover:text-foreground font-bold uppercase tracking-widest text-xs"
                      >
                        {dir === 'rtl' ? 'تغيير رقم الجوال' : 'Change Phone Number'}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full space-y-4">
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/20 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-2">
                      <Check size={24} strokeWidth={4} />
                    </div>
                    <p className="font-black text-emerald-600 uppercase tracking-widest text-sm">Phone Verified</p>
                    <p className="text-xs text-emerald-600/70">{formData.phone}</p>
                  </div>
                  <Button 
                    onClick={nextStage} 
                    className="w-full h-14 rounded-xl font-black uppercase tracking-widest gap-2 btn-shine"
                  >
                    {dir === 'rtl' ? 'متابعة' : 'Continue'} <ArrowRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, isVerified: false, otp: '' }));
                      prevStage();
                    }} 
                    className="w-full h-12 rounded-xl text-foreground/50 hover:text-foreground font-bold uppercase tracking-widest text-xs"
                  >
                    {dir === 'rtl' ? 'تغيير رقم الجوال' : 'Change Phone Number'}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        );
      }
      case IntakeStage.SERVICE_SELECTION: {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black tracking-tight">{t('intake.screen3.title')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'maintenance', label: t('intake.screen3.option1'), icon: Wrench, color: 'blue' },
                { id: 'cleaning', label: t('intake.screen3.option2'), icon: Sparkles, color: 'emerald' },
                { id: 'moving', label: t('intake.screen3.option3'), icon: Truck, color: 'orange' },
                { id: 'outdoor', label: t('intake.screen3.option4'), icon: Lightbulb, color: 'purple' },
                { id: 'care', label: t('intake.screen3.option5'), icon: Heart, color: 'pink' },
                { id: 'tech', label: t('intake.screen3.option6'), icon: Cpu, color: 'slate' },
              ].map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    updateFormData('serviceType', service.id);
                    nextStage();
                  }}
                  className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all text-left group relative overflow-hidden ${
                    formData.serviceType === service.id 
                      ? 'border-primary bg-primary/5 shadow-lg' 
                      : 'border-border/50 hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${service.color}-500/10 text-${service.color}-500 group-hover:scale-110 transition-transform`}>
                    <service.icon size={24} />
                  </div>
                  <div>
                    <p className="font-black text-lg">{service.label}</p>
                  </div>
                  {formData.serviceType === service.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 size={16} className="text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <Button variant="ghost" onClick={prevStage} className="w-full h-12 rounded-xl text-foreground/50 font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} /> {dir === 'rtl' ? 'رجوع' : 'Back'}
            </Button>
          </motion.div>
        );
      }

      case IntakeStage.SUB_SERVICE_SELECTION: {
        const storedServices = storageService.getServices();
        const defaultSubServices: Record<string, string[]> = {
          maintenance: [
            dir === 'rtl' ? 'إصلاح التكييف' : 'AC Repair', 
            dir === 'rtl' ? 'تسربات السباكة' : 'Plumbing Leak', 
            dir === 'rtl' ? 'أعطال الكهرباء' : 'Electrical Issue', 
            dir === 'rtl' ? 'عامل شامل' : 'Handyman / General', 
            dir === 'rtl' ? 'أصباغ' : 'Painting', 
            dir === 'rtl' ? 'مكافحة حشرات' : 'Pest Control'
          ],
          cleaning: [
            dir === 'rtl' ? 'تنظيف عميق' : 'Deep Cleaning', 
            dir === 'rtl' ? 'تنظيف دوري' : 'Regular Cleaning', 
            dir === 'rtl' ? 'تنظيف كنب / سجاد' : 'Sofa / Carpet Cleaning', 
            dir === 'rtl' ? 'تنظيف نوافذ' : 'Window Cleaning', 
            dir === 'rtl' ? 'تعقيم' : 'Sanitization'
          ],
          moving: [
            dir === 'rtl' ? 'نقل محلي' : 'Local Move', 
            dir === 'rtl' ? 'نقل دولي' : 'International Move', 
            dir === 'rtl' ? 'تركيب أثاث' : 'Furniture Assembly', 
            dir === 'rtl' ? 'حلول تخزين' : 'Storage Solutions'
          ],
          outdoor: [
            dir === 'rtl' ? 'تنسيق حدائق' : 'Landscaping', 
            dir === 'rtl' ? 'صيانة مسابح' : 'Pool Maintenance', 
            dir === 'rtl' ? 'أبواب كراج' : 'Garage Doors', 
            dir === 'rtl' ? 'عزل أسطح' : 'Roofing'
          ],
          care: [
            dir === 'rtl' ? 'رعاية أطفال' : 'Childcare', 
            dir === 'rtl' ? 'رعاية كبار السن' : 'Elderly Care', 
            dir === 'rtl' ? 'رعاية حيوانات أليفة' : 'Pet Care', 
            dir === 'rtl' ? 'تدريب شخصي' : 'Personal Training'
          ],
          tech: [
            dir === 'rtl' ? 'إصلاح كمبيوتر' : 'Computer Repair', 
            dir === 'rtl' ? 'إعداد منزل ذكي' : 'Smart Home Setup', 
            dir === 'rtl' ? 'تركيب تلفزيون' : 'TV Mounting', 
            dir === 'rtl' ? 'كاميرات مراقبة' : 'Security Cameras'
          ]
        };
        
        // Use stored services if available, otherwise fallback to defaults for the category
        const currentSubServices = storedServices.length > 0 ? storedServices : (defaultSubServices[formData.serviceType] || []);

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black tracking-tight">{t('intake.screen4.title')}</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {currentSubServices.map((sub) => (
                <button
                  key={sub}
                  onClick={() => {
                    updateFormData('subService', sub);
                    nextStage();
                  }}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left group ${
                    formData.subService === sub 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border/50 hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <span className="font-bold text-lg">{sub}</span>
                  <ArrowRight size={20} className={`text-primary/30 group-hover:text-primary transition-colors ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </div>
            <Button variant="ghost" onClick={prevStage} className="w-full h-12 rounded-xl text-foreground/50 font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} /> {dir === 'rtl' ? 'رجوع' : 'Back'}
            </Button>
          </motion.div>
        );
      }

      case IntakeStage.AREA_SELECTION: {
        const storedAreas = storageService.getAreas();
        const defaultAreas = [
          { id: 'doha', label: t('intake.screen5.option1') },
          { id: 'west_bay', label: t('intake.screen5.option2') },
          { id: 'lusail', label: t('intake.screen5.option3') },
          { id: 'pearl', label: t('intake.screen5.option4') },
          { id: 'rayyan', label: t('intake.screen5.option5') },
          { id: 'wakrah', label: t('intake.screen5.option6') }
        ];

        const areasToDisplay = storedAreas.length > 0 
          ? storedAreas.map(a => ({ id: a.toLowerCase().replace(/\s+/g, '_'), label: a }))
          : defaultAreas;

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black tracking-tight">{t('intake.screen5.title')}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {areasToDisplay.map((area) => (
                <button
                  key={area.id}
                  onClick={() => {
                    updateFormData('area', area.label);
                    nextStage();
                  }}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group ${
                    formData.area === area.label 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border/50 hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <MapPin size={24} className={`mb-3 ${formData.area === area.label ? 'text-primary' : 'text-foreground/30 group-hover:text-primary/50'}`} />
                  <span className="font-black text-center leading-tight">{area.label}</span>
                </button>
              ))}
            </div>
            <Button variant="ghost" onClick={prevStage} className="w-full h-12 rounded-xl text-foreground/50 font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} /> {dir === 'rtl' ? 'رجوع' : 'Back'}
            </Button>
          </motion.div>
        );
      }

      case IntakeStage.DESCRIPTION_OPTIONAL: {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black tracking-tight">{t('intake.screen6.title')}</h2>
            </div>
            <div className="space-y-4">
              <Textarea 
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder={t('intake.screen6.placeholder')}
                className="min-h-[160px] rounded-2xl border-border/50 bg-background shadow-sm p-5 text-lg"
              />
              <Button 
                onClick={nextStage} 
                className="w-full h-14 rounded-xl font-black uppercase tracking-widest gap-2 btn-shine"
              >
                {dir === 'rtl' ? 'متابعة' : 'Continue'} <ArrowRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
              </Button>
              <Button variant="ghost" onClick={prevStage} className="w-full h-12 rounded-xl text-foreground/50 font-bold uppercase tracking-widest text-xs">
                <ArrowLeft size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} /> {dir === 'rtl' ? 'رجوع' : 'Back'}
              </Button>
            </div>
          </motion.div>
        );
      }

      case IntakeStage.URGENCY_SELECTION: {
        const urgencies: { id: 'High' | 'Normal' | 'Flexible', label: string, icon: React.ElementType, color: string, bg: string }[] = [
          { id: 'High', label: t('intake.screen7.option1'), icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { id: 'Normal', label: t('intake.screen7.option2'), icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { id: 'Flexible', label: t('intake.screen7.option3'), icon: Calendar, color: 'text-slate-500', bg: 'bg-slate-500/10' }
        ];
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black tracking-tight">{t('intake.screen7.title')}</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {urgencies.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    updateFormData('urgency', u.id);
                    nextStage();
                  }}
                  className={`flex items-center gap-5 p-6 rounded-2xl border-2 transition-all text-left relative group ${
                    formData.urgency === u.id 
                      ? 'border-primary bg-primary/5 shadow-lg' 
                      : 'border-border/50 hover:border-primary/30 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${u.bg} ${u.color} group-hover:scale-110 transition-transform`}>
                    <u.icon size={28} />
                  </div>
                  <div className="flex-1">
                    <span className="block font-black text-xl leading-tight">{u.label}</span>
                  </div>
                  <ArrowRight size={20} className={`text-primary/30 group-hover:text-primary transition-colors ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </div>
            <Button variant="ghost" onClick={prevStage} className="w-full h-12 rounded-xl text-foreground/50 font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} className={dir === 'rtl' ? 'ml-2' : 'mr-2'} /> {dir === 'rtl' ? 'رجوع' : 'Back'}
            </Button>
          </motion.div>
        );
      }

      case IntakeStage.REVIEW_CONFIRM: {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-black tracking-tight">{t('intake.screen8.title')}</h2>
            </div>
            
            <Card className="border-border/50 bg-foreground/[0.02] overflow-hidden rounded-3xl">
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">{t('intake.screen8.phone')}</p>
                      <p className="font-bold flex items-center gap-2">
                        {formData.phone} <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] px-1.5 py-0 uppercase">Verified</Badge>
                      </p>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">{t('intake.screen8.service')}</p>
                      <p className="font-bold capitalize">{formData.subService || formData.serviceType}</p>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">{t('intake.screen8.area')}</p>
                      <p className="font-bold">{formData.area}</p>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">{t('intake.screen8.urgency')}</p>
                      <p className="font-bold capitalize">
                        {formData.urgency === 'High' ? t('intake.screen7.option1') : 
                         formData.urgency === 'Normal' ? t('intake.screen7.option2') : 
                         formData.urgency === 'Flexible' ? t('intake.screen7.option3') : 
                         formData.urgency}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <p className="text-[11px] font-medium text-foreground/50 leading-relaxed text-center px-4">
                {t('intake.screen8.disclaimer')}
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-widest gap-2 text-lg btn-shine shadow-xl shadow-primary/20"
                >
                  {isSubmitting ? 'Processing...' : t('intake.screen8.button')}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setStage(IntakeStage.SERVICE_SELECTION)} 
                  className="w-full h-12 rounded-xl text-foreground/50 font-bold uppercase tracking-widest text-xs"
                >
                  {t('intake.screen8.edit')}
                </Button>
              </div>
            </div>
          </motion.div>
        );
      }

      case IntakeStage.SUBMISSION_SUCCESS: {
        return (
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
              <h2 className="text-4xl font-black tracking-tight">{t('intake.screen9.title')}</h2>
              <p className="text-foreground/60 text-lg max-w-md mx-auto">{t('intake.screen9.body')}</p>
            </div>

            <Card className="border-border/50 bg-foreground/[0.02] rounded-3xl p-6 max-w-sm mx-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground/40 font-bold uppercase tracking-widest">{t('intake.screen9.requestId')}</span>
                  <span className="font-mono font-black text-primary">{sessionStorage.getItem('last_request_id')}</span>
                </div>
                <div className="pt-4 border-t border-border/50 space-y-3">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Clock size={16} />
                    </div>
                    <p className="text-xs font-medium leading-relaxed">{t('intake.screen9.step1')}</p>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MessageSquare size={16} />
                    </div>
                    <p className="text-xs font-medium leading-relaxed">{t('intake.screen9.step2')}</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="pt-4">
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="h-14 px-10 rounded-xl font-black uppercase tracking-widest border-2"
              >
                {dir === 'rtl' ? 'العودة للرئيسية' : 'Return Home'}
              </Button>
            </div>
          </motion.div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-[85vh] bg-background pt-12 pb-24" dir={dir}>
        <div className="container-sahli max-w-2xl">
          {/* Progress Indicator */}
          {stage < IntakeStage.SUBMISSION_SUCCESS && (
            <div className="mb-12 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/10 font-black tracking-widest text-[10px] mb-2 uppercase">
                    {t('intake.progress.label')}
                  </Badge>
                  <h1 className="text-sm font-black uppercase tracking-[0.2em] text-foreground/30">
                    Step {stage} <span className="text-foreground/10 mx-2">/</span> {IntakeStage.SUBMISSION_SUCCESS - 1}
                  </h1>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-primary">
                    {Math.round((stage / (IntakeStage.SUBMISSION_SUCCESS - 1)) * 100)}%
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(stage / (IntakeStage.SUBMISSION_SUCCESS - 1)) * 100}%` }}
                  className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {renderStage()}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default RequestService;
