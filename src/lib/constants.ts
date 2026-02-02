const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '97470346652';
const WHATSAPP_DISPLAY = '+974 7034 6652';
const WHATSAPP_MESSAGE = import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hi, I need help with a home service.';

export const CONTACT_NUMBER = WHATSAPP_DISPLAY;
export const CONTACT_EMAIL = 'hello@sahliservice.com';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const INSTAGRAM_LINK = 'https://www.instagram.com/sahliqatar/';
export const FACEBOOK_LINK = 'https://www.facebook.com/Sahliqatar';
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
