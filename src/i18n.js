import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment'; // Add this
import 'moment/locale/ja'; // Add this

const availableLanguages = ['en', 'ja'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true, // Change to true temporarily to see errors
    supportedLngs: availableLanguages,
    
    ns: [
      'common',      // Add this - IMPORTANT!
      'navbar',
      'login',
      'dashboard',
      'document',
      'analytics',
      'admin',
      'settings',
      'user',
      'upload',
      'project'
    ],
    defaultNS: 'common', // Changed from 'navbar'
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false,
    },
  });

// Set moment locale when i18n language changes
i18n.on('languageChanged', (lng) => {
  moment.locale(lng);
});

i18n.on('initialized', () => {
  // Get ENV values for English
  const appTitleEN = import.meta.env.VITE_APP_TITLE;
  const appDescEN = import.meta.env.VITE_APP_DESCRIPTION;
  
  // Get ENV values for Japanese
  const appTitleJA = import.meta.env.VITE_APP_TITLE_JA;
  const appDescJA = import.meta.env.VITE_APP_DESCRIPTION_JA;

  // Override English translations in 'login' namespace
  if (appTitleEN) {
    i18n.addResource('en', 'login', 'app_title', appTitleEN);
  }
  if (appDescEN) {
    i18n.addResource('en', 'login', 'app_description', appDescEN);
  }

  // Override Japanese translations in 'login' namespace
  if (appTitleJA) {
    i18n.addResource('ja', 'login', 'app_title', appTitleJA);
  }
  if (appDescJA) {
    i18n.addResource('ja', 'login', 'app_description', appDescJA);
  }

  console.log('ENV overrides applied to login namespace');
});

export default i18n;
