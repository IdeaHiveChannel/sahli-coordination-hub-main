import ReactGA from 'react-ga4';
import { GA_MEASUREMENT_ID } from './constants';

export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const trackPageView = (path: string) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (category: string, action: string, label?: string) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};

export const trackWhatsAppClick = (location: string) => {
  trackEvent('CTA', 'WhatsApp Click', location);
};

export const trackRequestClick = (location: string) => {
  trackEvent('CTA', 'Request Click', location);
};
