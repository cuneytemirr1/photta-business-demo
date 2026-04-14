import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const badges = [
  { icon: Truck, text: 'Ucretsiz Kargo', sub: '500 TL uzeri' },
  { icon: Shield, text: 'Guvenli Odeme', sub: '256-bit SSL' },
  { icon: RotateCcw, text: 'Ucretsiz Iade', sub: '14 gun icinde' },
  { icon: Headphones, text: '7/24 Destek', sub: 'Her zaman yaninda' },
]

export default function TrustBadges() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {badges.map((badge, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="text-center">
              <badge.icon size={28} strokeWidth={1} className="mx-auto mb-3 text-emerald-500" />
              <p className="text-xs font-medium tracking-wider uppercase">{badge.text}</p>
              <p className="text-[11px] text-brand-muted mt-1">{badge.sub}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
