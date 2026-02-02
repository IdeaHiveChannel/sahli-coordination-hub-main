import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/layout/ScrollToTop";
import { useEffect } from 'react';
import { trackPageView } from "./lib/gtag";

// Pages
import Index from "@/pages/Index";
import HowItWorks from "@/pages/HowItWorks";
import Services from "@/pages/Services";
import HomeMaintenance from "@/pages/services/HomeMaintenance";
import CleaningServices from "@/pages/services/CleaningServices";
import MovingServices from "@/pages/services/MovingServices";
import OutdoorSpecialized from "@/pages/services/OutdoorSpecialized";
import CareLifestyle from "@/pages/services/CareLifestyle";
import ElectronicsTech from "@/pages/services/ElectronicsTech";
import ACRepair from "@/pages/services/ACRepair";
import Plumbing from "@/pages/services/Plumbing";
import Electrical from "@/pages/services/Electrical";
import Babysitting from "@/pages/services/Babysitting";
import TrustStandards from "@/pages/TrustStandards";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Terms from "@/pages/legal/Terms";
import Privacy from "@/pages/legal/Privacy";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <PageTracker />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/services" element={<Services />} />
              
              {/* 6 Pillar Pages */}
              <Route path="/home-maintenance-qatar" element={<HomeMaintenance />} />
              <Route path="/cleaning-services-qatar" element={<CleaningServices />} />
              <Route path="/house-shifting-qatar" element={<MovingServices />} />
              <Route path="/outdoor-specialized-qatar" element={<OutdoorSpecialized />} />
              <Route path="/care-lifestyle-qatar" element={<CareLifestyle />} />
              <Route path="/electronics-tech-qatar" element={<ElectronicsTech />} />
              
              {/* SEO Long-tail Pages */}
              <Route path="/ac-repair-qatar" element={<ACRepair />} />
              <Route path="/plumbing-services-qatar" element={<Plumbing />} />
              <Route path="/electrical-services-qatar" element={<Electrical />} />
              <Route path="/babysitting-services-qatar" element={<Babysitting />} />

              <Route path="/trust-standards" element={<TrustStandards />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
