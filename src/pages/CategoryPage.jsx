import { useLocation, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getProductsByCategory, subcategoryKeys } from '../data/products'
import ProductCard from '../components/ProductCard'
import ScrollReveal from '../components/ScrollReveal'
import PageTransition from '../components/PageTransition'

export default function CategoryPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const category = location.pathname.replace('/', '')
  const [searchParams] = useSearchParams()
  const initialFilter = searchParams.get('filter') || 'tumu'
  const [activeFilter, setActiveFilter] = useState(initialFilter)

  const allProducts = getProductsByCategory(category)
  const filtered = activeFilter === 'tumu'
    ? allProducts
    : allProducts.filter(p => p.subcategory === activeFilter)

  useEffect(() => {
    setActiveFilter(searchParams.get('filter') || 'tumu')
  }, [searchParams])

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-center text-3xl font-light tracking-[0.2em] uppercase mb-8">
          {category === 'kadin' ? t('home.women') : t('home.men')}
        </h1>

        <div className="flex justify-center gap-6 md:gap-10 mb-12 flex-wrap">
          {subcategoryKeys.map(sub => (
            <button
              key={sub.slug}
              onClick={() => setActiveFilter(sub.slug)}
              className={`text-xs font-normal tracking-[0.1em] uppercase pb-1 border-b-2 transition-all ${
                activeFilter === sub.slug
                  ? 'border-emerald-500 text-brand-text'
                  : 'border-transparent text-brand-muted hover:text-brand-text'
              }`}
            >
              {t(sub.key)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filtered.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.05}>
              <ProductCard product={p} />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length > 6 && (
          <div className="text-center mt-16">
            <button className="px-10 py-3 border border-emerald-500 text-emerald-500 text-xs font-medium tracking-[0.15em] uppercase hover:bg-emerald-600 hover:text-white transition-all">
              {t('category.showMore')}
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
