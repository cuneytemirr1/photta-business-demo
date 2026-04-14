import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import TrustBadges from '../components/TrustBadges'
import Newsletter from '../components/Newsletter'
import ScrollReveal from '../components/ScrollReveal'
import PageTransition from '../components/PageTransition'

const featured = products.filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 4)

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <img src="/img/hero.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] mb-6">{t('home.newSeason')}</h1>
          <p className="text-sm font-light tracking-wider mb-8 opacity-80">{t('home.seasonDesc')}</p>
          <Link
            to="/kadin"
            className="inline-block px-10 py-4 border border-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-white hover:text-brand-text transition-all"
          >
            {t('home.discoverCollection')}
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { to: '/kadin', labelKey: 'home.women', img: 'banner-kadin.png' },
              { to: '/erkek', labelKey: 'home.men', img: 'banner-erkek.png' },
            ].map(cat => (
              <Link key={cat.to} to={cat.to} className="group relative aspect-[3/4] overflow-hidden block">
                <img
                  src={`/img/${cat.img}`}
                  alt={t(cat.labelKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h2 className="text-white text-3xl font-light tracking-[0.3em]">{t(cat.labelKey)}</h2>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <ScrollReveal>
          <h2 className="text-center text-lg font-light tracking-[0.15em] uppercase mb-12">{t('home.featured')}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.1}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <TrustBadges />
      <Newsletter />
    </PageTransition>
  )
}
