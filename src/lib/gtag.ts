declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const initGA = () => {
  // Initialized via GTM in index.html
  window.dataLayer = window.dataLayer || [];
};

export const trackPageView = (path: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    page_path: path
  });
};

export const trackEvent = (category: string, action: string, label?: string) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: action,
    event_category: category,
    event_label: label
  });
};

export const trackWhatsAppClick = (location: string) => {
  trackEvent('CTA', 'WhatsApp Click', location);
};

export const trackRequestClick = (location: string) => {
  trackEvent('CTA', 'Request Click', location);
};
