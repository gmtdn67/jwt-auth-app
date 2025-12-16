import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ruTranslation from './locales/ru/translation.json'
import enTranslation from './locales/en/translation.json'

const resources = {
    ru: { translation: ruTranslation },
    en: { translation: enTranslation },
}
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false,
    }
  });


export default i18n;