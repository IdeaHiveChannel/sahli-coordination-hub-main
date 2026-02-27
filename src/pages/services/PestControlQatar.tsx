import React from 'react';
import { ServiceLandingPage } from './ServiceLandingPage';
import { Bug } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';

export default function PestControlQatar() {
  const { t } = useLanguage();

  const scopeItems = [
    t('services.cleaning.pest.items').split('\n')[0] || 'Insects',
    t('services.cleaning.pest.items').split('\n')[1] || 'Rodents',
    t('services.cleaning.pest.items').split('\n')[2] || 'Termites',
    t('services.cleaning.pest.items').split('\n')[3] || 'Bed Bugs',
  ];

  const faqs = [
    { question: t('home.faq.q1'), answer: t('home.faq.a1') },
    { question: t('home.faq.q2'), answer: t('home.faq.a2') },
    { question: t('home.faq.q3'), answer: t('home.faq.a3') },
  ];

  const relatedServices = [
    { titleKey: 'home.solutions.cleaning.title' as TranslationKey, path: '/deep-cleaning-doha' },
    { titleKey: 'home.solutions.ac.title' as TranslationKey, path: '/ac-repair-doha' },
    { titleKey: 'home.areas.title' as TranslationKey, path: '/home-services-doha' },
  ];

  return (
    <ServiceLandingPage
      serviceKey="pest"
      icon={<Bug size={24} />}
      heroImage="/Services/Pest Control.jpg"
      whatsappKey="services.outdoor.pest.whatsapp"
      scopeItems={scopeItems}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
