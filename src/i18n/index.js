import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import tr from './locales/tr.json'
import en from './locales/en.json'

const supportedLngs = [
  'en', 'tr', 'de', 'es', 'fr', 'it', 'pt-BR', 'pt-PT', 'nl', 'pl', 'ru',
  'ja', 'ko', 'zh', 'vi', 'id', 'sv', 'no', 'fi', 'da',
  'ar', 'th', 'hi', 'uk', 'cs', 'ro', 'el', 'ms', 'he',
]

const rtlLocales = ['ar', 'he']

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { tr: { translation: tr }, en: { translation: en } },
    supportedLngs,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
  })

export async function loadLanguage(lang) {
  if (i18n.hasResourceBundle(lang, 'translation')) {
    await i18n.changeLanguage(lang)
    applyDirection(lang)
    return
  }
  try {
    const module = await import(`./locales/${lang}.json`)
    i18n.addResourceBundle(lang, 'translation', module.default)
    await i18n.changeLanguage(lang)
    applyDirection(lang)
  } catch {
    await i18n.changeLanguage('en')
    applyDirection('en')
  }
}

function applyDirection(lang) {
  document.documentElement.dir = rtlLocales.includes(lang) ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
}

applyDirection(i18n.language)

export { supportedLngs, rtlLocales }
export default i18n
