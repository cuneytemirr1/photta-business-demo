import { useParams, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { getProduct, getRecommendations, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import ScrollReveal from '../components/ScrollReveal'
import PageTransition from '../components/PageTransition'
import usePhotta from '../hooks/usePhotta'

export default function ProductPage() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const recommendations = product ? getRecommendations(product) : []
  const { addItem } = useCart()

  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [imageKey, setImageKey] = useState(0)
  const [accordion, setAccordion] = useState(null)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const currentImage = product ? product.colors[selectedColor]?.image : null
  const fullImageUrl = currentImage ? `${window.location.origin}/img/${currentImage}` : null

  usePhotta(fullImageUrl)

  if (!product) {
    return (
      <PageTransition>
        <div className="text-center py-20">
          <p className="text-lg font-light text-brand-muted">Urun bulunamadi</p>
          <Link to="/home" className="text-emerald text-sm mt-4 inline-block">Ana Sayfaya Don</Link>
        </div>
      </PageTransition>
    )
  }

  function handleColorChange(index) {
    setSelectedColor(index)
    setImageKey(prev => prev + 1)
  }

  function handleAddToCart() {
    if (selectedSize === null) return
    addItem(product, product.colors[selectedColor].name, product.sizes[selectedSize])
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-brand-muted mb-8 tracking-wider">
          <Link to="/home" className="hover:text-brand-text">Ana Sayfa</Link>
          {' > '}
          <Link to={`/${product.category}`} className="hover:text-brand-text capitalize">
            {product.category === 'kadin' ? 'Kadin' : 'Erkek'}
          </Link>
          {' > '}
          <span className="text-brand-text">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <motion.div
              key={imageKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-[3/4] bg-brand-card overflow-hidden mb-3"
            >
              <img src={`/img/${currentImage}`} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="grid grid-cols-4 gap-2">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => handleColorChange(i)}
                  className={`aspect-square bg-brand-card overflow-hidden border-2 transition-colors ${
                    selectedColor === i ? 'border-brand-text' : 'border-transparent hover:border-brand-border'
                  }`}
                >
                  <img src={`/img/${color.image}`} alt={color.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl font-light tracking-wider mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-8">
              {product.originalPrice && (
                <span className="text-sm text-brand-muted line-through">{formatPrice(product.originalPrice)}</span>
              )}
              <span className={`text-lg font-medium ${product.originalPrice ? 'text-red-500' : ''}`}>
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-xs font-medium tracking-[0.1em] uppercase text-brand-muted mb-3">Renk</p>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => handleColorChange(i)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === i ? 'border-brand-text scale-110' : 'border-transparent'
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: color.border ? 'inset 0 0 0 1px #E5E5E0' : 'none'
                    }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <p className="text-xs font-medium tracking-[0.1em] uppercase text-brand-muted mb-3">Beden</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(i)}
                    className={`min-w-[48px] h-12 px-3 border text-xs font-normal tracking-wider transition-all ${
                      selectedSize === i
                        ? 'border-brand-text bg-brand-text text-white'
                        : 'border-brand-border hover:border-brand-text'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Photta Try-On */}
            <button
              data-photta-trigger
              className="w-full py-4 mb-3 border border-emerald text-emerald text-xs font-medium tracking-[0.15em] uppercase hover:bg-emerald hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              UZERINDE DENE
            </button>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={selectedSize === null && !addedFeedback}
              className={`w-full py-4 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
                addedFeedback
                  ? 'bg-emerald text-white'
                  : 'bg-brand-text text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed'
              }`}
            >
              {addedFeedback ? 'SEPETE EKLENDI ✓' : 'SEPETE EKLE'}
            </button>

            {/* Accordions */}
            <div className="mt-8 border-t border-brand-border">
              {[
                { key: 'details', label: 'Urun Detaylari', content: product.description },
                { key: 'shipping', label: 'Teslimat Bilgisi', content: 'Standart teslimat: 2-4 is gunu. Ucretsiz kargo 500 TL ve uzeri siparislerde gecerlidir. Iade ve degisim 14 gun icinde ucretsizdir.' },
              ].map(item => (
                <div key={item.key} className="border-b border-brand-border">
                  <button
                    onClick={() => setAccordion(accordion === item.key ? null : item.key)}
                    className="w-full flex justify-between items-center py-4 text-xs font-medium tracking-[0.1em] uppercase hover:text-emerald transition-colors"
                  >
                    {item.label}
                    <span className={`text-lg font-light transition-transform duration-300 ${accordion === item.key ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: accordion === item.key ? 'auto' : 0, opacity: accordion === item.key ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-sm font-light text-brand-muted leading-relaxed">{item.content}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-20">
            <ScrollReveal>
              <h2 className="text-center text-lg font-light tracking-[0.15em] uppercase mb-12">Bunlari da Begenebilirsiniz</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 0.1}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  )
}
