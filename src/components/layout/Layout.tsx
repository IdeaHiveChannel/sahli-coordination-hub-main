import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppTrigger } from './WhatsAppTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { dir } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background relative" dir={dir}>
      <Header />
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer />
      <WhatsAppTrigger />
    </div>
  );
}
