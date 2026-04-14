import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown } from 'lucide-react'
import { loadLanguage, supportedLngs } from '../i18n'

const languageNames = {
  en: 'English',
  tr: 'Türkçe',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  'pt-BR': 'Português (BR)',
  'pt-PT': 'Português (PT)',
  nl: 'Nederlands',
  pl: 'Polski',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  sv: 'Svenska',
  no: 'Norsk',
  fi: 'Suomi',
  da: 'Dansk',
  ar: 'العربية',
  th: 'ไทย',
  hi: 'हिन्दी',
  uk: 'Українська',
  cs: 'Čeština',
  ro: 'Română',
  el: 'Ελληνικά',
  ms: 'Bahasa Melayu',
  he: 'עברית',
}

export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleChange(lang) {
    setLoading(true)
    await loadLanguage(lang)
    setLoading(false)
    setOpen(false)
  }

  const currentLang = i18n.language || 'en'

  if (compact) {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-brand-muted hover:text-brand-text transition-colors"
        >
          <Globe size={16} strokeWidth={1.5} />
          <span className="text-[11px] font-medium uppercase tracking-wider">{currentLang}</span>
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-brand-border rounded-lg shadow-lg py-1 z-50 min-w-[160px] max-h-[320px] overflow-y-auto">
            {supportedLngs.map(lang => (
              <button
                key={lang}
                onClick={() => handleChange(lang)}
                disabled={loading}
                className={`w-full text-left px-4 py-2 text-xs tracking-wider transition-colors ${
                  currentLang === lang
                    ? 'text-emerald-500 font-medium bg-emerald-50'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-card'
                }`}
              >
                {languageNames[lang] || lang}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border border-brand-border rounded-lg text-brand-muted hover:text-brand-text hover:border-brand-text transition-colors"
      >
        <Globe size={16} strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wider">{languageNames[currentLang] || currentLang}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-brand-border rounded-lg shadow-lg py-1 z-50 min-w-[180px] max-h-[320px] overflow-y-auto">
          {supportedLngs.map(lang => (
            <button
              key={lang}
              onClick={() => handleChange(lang)}
              disabled={loading}
              className={`w-full text-left px-4 py-2.5 text-xs tracking-wider transition-colors ${
                currentLang === lang
                  ? 'text-emerald-500 font-medium bg-emerald-50'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-card'
              }`}
            >
              {languageNames[lang] || lang}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
