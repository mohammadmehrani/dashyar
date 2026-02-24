import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const staticJsonBackend = {
  type: 'backend' as const,
  init: () => {},
  read: async (language: string, _namespace: string, callback: (error: unknown, data: unknown) => void) => {
    try {
      const response = await fetch(`/locales/${language}/translation.json`, {
        cache: 'no-cache',
      });
      if (!response.ok) {
        callback(new Error(`Failed to load locale ${language}`), false);
        return;
      }
      const data = await response.json();
      callback(null, data);
    } catch (error) {
      callback(error, false);
    }
  },
};

i18n
  .use(staticJsonBackend as any)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['translation'],
    defaultNS: 'translation',
    fallbackLng: 'fa',
    supportedLngs: ['fa', 'en'],
    load: 'languageOnly',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

// Language direction helper
export const getLanguageDirection = (lng: string) => {
  return lng === 'fa' ? 'rtl' : 'ltr';
};

export const isRTL = (lng: string) => {
  return lng === 'fa';
};
