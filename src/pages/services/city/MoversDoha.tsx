import React from 'react';
import { ServiceLandingPage } from '../ServiceLandingPage';
import { Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TranslationKey } from '@/lib/i18n';

export default function MoversDoha() {
  const { t } = useLanguage();

  const scopeItems = [
    t('services.moving.furniture.items').split('\n')[0] || 'Disassembly',
    t('services.moving.furniture.items').split('\n')[1] || 'Reassembly',
    t('services.moving.furniture.items').split('\n')[2] || 'Protection',
    t('services.moving.furniture.items').split('\n')[3] || 'Heavy Lifting',
  ];

  const faqs = [
    { question: t('home.faq.q4'), answer: t('home.faq.a4') },
    { question: t('home.faq.q5'), answer: t('home.faq.a5') },
  ];

  const relatedServices = [
    { titleKey: 'home.solutions.cleaning.title' as TranslationKey, path: '/deep-cleaning-doha' },
    { titleKey: 'home.solutions.handyman.title' as TranslationKey, path: '/services#handyman' },
    { titleKey: 'home.areas.title' as TranslationKey, path: '/home-services-doha' },
  ];

  return (
    <ServiceLandingPage
      serviceKey="moving"
      icon={<Truck size={24} />}
      heroImage="/Services/Moving & Relocation.jpg"
      whatsappKey="services.moving.whatsapp"
      scopeItems={scopeItems}
      faqs={faqs}
      relatedServices={relatedServices}
    />
  );
}
