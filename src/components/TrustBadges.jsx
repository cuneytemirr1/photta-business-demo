import { useTranslation } from 'react-i18next'
import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react'
import { getShippingThreshold } from '../data/products'
import ScrollReveal from './ScrollReveal'

export default function TrustBadges() {
  const { t } = useTranslation()
  const threshold = getShippingThreshold(t)

  const badges = [
    { icon: Truck, textKey: 'trust.freeShipping', subKey: 'trust.freeShippingSub' },
    { icon: Shield, textKey: 'trust.securePayment', subKey: 'trust.securePaymentSub' },
    { icon: RotateCcw, textKey: 'trust.freeReturn', subKey: 'trust.freeReturnSub' },
    { icon: Headphones, textKey: 'trust.support', subKey: 'trust.supportSub' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {badges.map((badge, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="text-center">
              <badge.icon size={28} strokeWidth={1} className="mx-auto mb-3 text-emerald-500" />
              <p className="text-xs font-medium tracking-wider uppercase">{t(badge.textKey)}</p>
              <p className="text-[11px] text-brand-muted mt-1">{t(badge.subKey, { threshold })}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
