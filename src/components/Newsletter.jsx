import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollReveal from './ScrollReveal'

export default function Newsletter() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section className="bg-brand-card py-16 mt-16">
      <ScrollReveal>
        <div className="max-w-xl mx-auto px-6 text-center">
          <h3 className="text-lg font-light tracking-[0.15em] uppercase mb-3">{t('newsletter.title')}</h3>
          <p className="text-xs text-brand-muted mb-8">{t('newsletter.subtitle')}</p>

          {submitted ? (
            <div className="py-4">
              <p className="text-sm text-emerald-500 font-medium">{t('newsletter.thanks')}</p>
              <p className="text-xs text-brand-muted mt-2">{t('newsletter.couponText')} <strong>WELCOME10</strong></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('newsletter.emailPlaceholder')}
                className="flex-1 px-4 py-3 text-sm font-light border border-brand-border border-r-0 bg-white focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-500 text-white text-xs font-medium tracking-[0.1em] uppercase hover:bg-emerald-600 transition-colors"
              >
                {t('newsletter.subscribe')}
              </button>
            </form>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}
