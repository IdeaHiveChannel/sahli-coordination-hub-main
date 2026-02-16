import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { RequestTrigger } from './RequestTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  hideTrigger?: boolean;
}

export function Layout({ children, hideFooter = false, hideTrigger = false }: LayoutProps) {
  const { dir } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background relative" dir={dir}>
      <Header />
      <main className="flex-1 relative">
        {children}
      </main>
      {!hideFooter && <Footer />}
      {!hideTrigger && <RequestTrigger />}
    </div>
  );
}
