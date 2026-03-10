import { useEffect } from 'react';
import { getWhatsAppLink } from '@/lib/constants';
import { trackRequestClick } from '@/lib/gtag';
import { useLanguage } from '@/contexts/LanguageContext';

const RequestService = () => {
  const { t, dir } = useLanguage();
  useEffect(() => {
    // Track the hit before redirecting
    trackRequestClick('Direct Request Route Hit');
    
    // Perform the redirect to WhatsApp
    window.location.href = getWhatsAppLink(t('cta.whatsapp.general'));
  }, [t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b]">
      <div className="flex flex-col items-center gap-10 text-center px-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-2xl shadow-primary/20" />
          <img 
            src="/logos/SahlLogo5.png" 
            alt="" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 object-contain scale-[2.5]" 
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">{dir === 'rtl' ? 'جاري التحويل إلى واتساب' : 'Redirecting to WhatsApp'}</h2>
          <p className="text-lg md:text-xl text-slate-400 font-medium italic">{dir === 'rtl' ? 'يرجى الانتظار بينما نقوم بتوصيلك بفريق التنسيق لدينا...' : 'Please wait while we connect you with our coordination team...'}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestService;
