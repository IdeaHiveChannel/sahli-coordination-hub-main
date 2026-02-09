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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="space-y-4">
          <h2 className="text-display">{dir === 'rtl' ? 'جاري التحويل إلى واتساب' : 'Redirecting to WhatsApp'}</h2>
          <p className="text-subtitle !text-foreground/60">{dir === 'rtl' ? 'يرجى الانتظار بينما نقوم بتوصيلك بفريق التنسيق لدينا...' : 'Please wait while we connect you with our coordination team...'}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestService;
