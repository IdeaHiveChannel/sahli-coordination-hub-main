import React from 'react';
import { ServiceLandingPage } from '../ServiceLandingPage';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';

export default function DeepCleaningDoha() {
  const { t } = useLanguage();

  const scopeItems = [
    t('services.cleaning.deep.items').split('\n')[0] || 'House Deep Cleaning',
    t('services.cleaning.deep.items').split('\n')[1] || 'Sofa & Carpet Cleaning',
    t('services.cleaning.deep.items').split('\n')[2] || 'Window Cleaning',
    t('services.cleaning.deep.items').split('\n')[3] || 'Move-in/out Cleaning',
  ];

  const faqs = [
    { question: t('home.faq.q3'), answer: t('home.faq.a3') },
    { question: t('home.faq.q4'), answer: t('home.faq.a4') },
    { question: t('home.faq.q5'), answer: t('home.faq.a5') },
  ];

  const relatedServices = [
    { titleKey: 'home.solutions.pest.title' as TranslationKey, path: '/pest-control-qatar' },
    { titleKey: 'home.solutions.moving.title' as TranslationKey, path: '/movers-doha' },
    { titleKey: 'home.areas.title' as TranslationKey, path: '/home-services-doha' },
  ];

  return (
    <ServiceLandingPage
      serviceKey="cleaning"
      icon={<Sparkles size={24} />}
      heroImage="/Services/Cleaning service.jpg"
      whatsappKey="services.cleaning.deep.whatsapp"
      scopeItems={scopeItems}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
