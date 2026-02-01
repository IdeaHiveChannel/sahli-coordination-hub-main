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
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Services from "./pages/Services";
import HomeRepair from "./pages/services/HomeRepair";
import CleaningMoving from "./pages/services/CleaningMoving";
import CareChildcare from "./pages/services/CareChildcare";
import LessonsLifestyle from "./pages/services/LessonsLifestyle";
import ACRepair from "./pages/services/ACRepair";
import Cleaning from "./pages/services/Cleaning";
import Plumbing from "./pages/services/Plumbing";
import Electrical from "./pages/services/Electrical";
import HouseShifting from "./pages/services/HouseShifting";
import Babysitting from "./pages/services/Babysitting";
import TrustStandards from "./pages/TrustStandards";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import NotFound from "./pages/NotFound";

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
              <Route path="/services/home-repair" element={<HomeRepair />} />
              <Route path="/services/cleaning-moving" element={<CleaningMoving />} />
              <Route path="/services/care-childcare" element={<CareChildcare />} />
              <Route path="/services/lessons-lifestyle" element={<LessonsLifestyle />} />
              
              {/* Service Pages V1 */}
              <Route path="/ac-repair-qatar" element={<ACRepair />} />
              <Route path="/cleaning-services-qatar" element={<Cleaning />} />
              <Route path="/plumbing-services-qatar" element={<Plumbing />} />
              <Route path="/electrical-services-qatar" element={<Electrical />} />
              <Route path="/house-shifting-qatar" element={<HouseShifting />} />
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
