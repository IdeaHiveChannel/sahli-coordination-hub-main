import { en } from './locales/en';
import { ar } from './locales/ar';

export type Language = 'en' | 'ar';

export const translations = {
  en,
  ar,
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, lang: Language): string {
  return (translations[lang] as any)[key] || (translations['en'] as any)[key] || key;
}
