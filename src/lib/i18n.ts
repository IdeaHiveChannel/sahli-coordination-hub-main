import { en } from './locales/en';
import { ar } from './locales/ar';

export type Language = 'en' | 'ar';

export const translations = {
  en,
  ar,
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, lang: Language): string {
  const dict = translations[lang] as Record<TranslationKey, string>;
  const fallback = translations['en'] as Record<TranslationKey, string>;
  return dict[key] || fallback[key] || key;
}
