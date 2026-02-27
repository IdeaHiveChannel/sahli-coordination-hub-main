import React from 'react';
import { ServiceLandingPage } from '../ServiceLandingPage';
import { Snowflake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';

export default function ACRepairDoha() {
  const { t } = useLanguage();

  const scopeItems = [
    t('services.homeMaintenance.ac.items').split('\n')[0] || 'Filter Cleaning',
    t('services.homeMaintenance.ac.items').split('\n')[1] || 'Gas Pressure Check',
    t('services.homeMaintenance.ac.items').split('\n')[2] || 'Electrical Component Check',
    t('services.homeMaintenance.ac.items').split('\n')[3] || 'Drain Line Cleaning',
  ];

  const faqs = [
    { question: t('home.faq.q2'), answer: t('home.faq.a2') },
    { question: t('home.faq.q4'), answer: t('home.faq.a4') },
    { question: t('home.faq.q5'), answer: t('home.faq.a5') },
  ];

  const relatedServices = [
    { titleKey: 'home.solutions.electrical.title' as TranslationKey, path: '/services#electrical' },
    { titleKey: 'home.solutions.plumbing.title' as TranslationKey, path: '/plumber-doha' },
    { titleKey: 'home.areas.title' as TranslationKey, path: '/home-services-doha' },
  ];

  return (
    <ServiceLandingPage
      serviceKey="ac"
      icon={<Snowflake size={24} />}
      heroImage="/Services/AC Maintenance.jpg"
      whatsappKey="services.homeMaintenance.ac.whatsapp"
      scopeItems={scopeItems}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
