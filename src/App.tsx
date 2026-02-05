import React, { Suspense, useEffect, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/layout/ScrollToTop";
import { trackPageView } from "./lib/gtag";

// Lazy-loaded Pages
const Index = lazy(() => import("@/pages/Index"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Services = lazy(() => import("@/pages/Services"));
const HomeMaintenance = lazy(() => import("@/pages/services/HomeMaintenance"));
const CleaningServices = lazy(() => import("@/pages/services/CleaningServices"));
const MovingServices = lazy(() => import("@/pages/services/MovingServices"));
const OutdoorSpecialized = lazy(() => import("@/pages/services/OutdoorSpecialized"));
const CareLifestyle = lazy(() => import("@/pages/services/CareLifestyle"));
const ElectronicsTech = lazy(() => import("@/pages/services/ElectronicsTech"));
const ACRepair = lazy(() => import("@/pages/services/ACRepair"));
const Plumbing = lazy(() => import("@/pages/services/Plumbing"));
const Electrical = lazy(() => import("@/pages/services/Electrical"));
const Babysitting = lazy(() => import("@/pages/services/Babysitting"));
const TrustStandards = lazy(() => import("@/pages/TrustStandards"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const RequestService = lazy(() => import("@/pages/RequestService"));
const ProviderApplication = lazy(() => import("@/pages/ProviderApplication"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AdminLogin = lazy(() => import("@/pages/admin/Login"));
const AdminPasswordReset = lazy(() => import("@/pages/admin/PasswordReset"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminRequests = lazy(() => import("@/pages/admin/RequestsList"));
const AdminProviders = lazy(() => import("@/pages/admin/ActiveProviders"));
const AdminBroadcastQueue = lazy(() => import("@/pages/admin/BroadcastQueue"));
const AdminProviderResponses = lazy(() => import("@/pages/admin/ProviderResponses"));
const AdminCommunicationHistory = lazy(() => import("@/pages/admin/CommunicationHistory"));
const AdminFeedbackAudits = lazy(() => import("@/pages/admin/FeedbackAudits"));
const AdminProviderApplications = lazy(() => import("@/pages/admin/ProviderApplications"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const AdminServices = lazy(() => import("@/pages/admin/ServicesManagement"));
const AdminAreas = lazy(() => import("@/pages/admin/AreasManagement"));
const AdminManualAssignment = lazy(() => import("@/pages/admin/Dashboard")); // Keep as dashboard for now
const AdminMessageTemplates = lazy(() => import("@/pages/admin/MessageTemplates"));
const AdminProtectedRoute = lazy(() => import("@/components/admin/AdminProtectedRoute"));

const queryClient = new QueryClient();

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTracker />
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
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
                <Route path="/request" element={<RequestService />} />
                <Route path="/request-service" element={<RequestService />} />
                <Route path="/provider-application" element={<ProviderApplication />} />
                <Route path="/legal/terms" element={<Terms />} />
                <Route path="/legal/privacy" element={<Privacy />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/password-reset" element={<AdminPasswordReset />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  } 
                  />
                  <Route 
                    path="/admin/providers" 
                    element={
                      <AdminProtectedRoute requiredRole="Super Admin">
                        <AdminProviders />
                      </AdminProtectedRoute>
                    } 
                   />
                   <Route 
                     path="/admin/settings" 
                     element={
                       <AdminProtectedRoute requiredRole="Super Admin">
                         <AdminSettings />
                       </AdminProtectedRoute>
                     } 
                   />
                   <Route 
                     path="/admin/requests" 
                   element={
                     <AdminProtectedRoute>
                       <AdminRequests />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/broadcast-queue" 
                   element={
                     <AdminProtectedRoute>
                       <AdminBroadcastQueue />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/provider-responses" 
                   element={
                     <AdminProtectedRoute>
                       <AdminProviderResponses />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/communication-history" 
                   element={
                     <AdminProtectedRoute>
                       <AdminCommunicationHistory />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/feedback-audits" 
                   element={
                     <AdminProtectedRoute>
                       <AdminFeedbackAudits />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/provider-applications" 
                   element={
                     <AdminProtectedRoute>
                       <AdminProviderApplications />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/services" 
                   element={
                     <AdminProtectedRoute requiredRole="Super Admin">
                       <AdminServices />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/areas" 
                   element={
                     <AdminProtectedRoute requiredRole="Super Admin">
                       <AdminAreas />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/manual-assignment" 
                   element={
                     <AdminProtectedRoute>
                       <AdminManualAssignment />
                     </AdminProtectedRoute>
                   } 
                 />
                 <Route 
                   path="/admin/message-templates" 
                   element={
                     <AdminProtectedRoute>
                       <AdminMessageTemplates />
                     </AdminProtectedRoute>
                   } 
                 />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
