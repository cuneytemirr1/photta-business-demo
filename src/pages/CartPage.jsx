import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, getShippingThreshold, getProductName, getColorName, products } from '../data/products'
import PageTransition from '../components/PageTransition'

export default function CartPage() {
  const { t } = useTranslation()
  const { items, removeItem, updateQty, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-light tracking-[0.15em] uppercase mb-6">{t('cart.emptyTitle')}</h1>
          <p className="text-sm text-brand-muted mb-8">{t('cart.emptySubtitle')}</p>
          <Link
            to="/home"
            className="inline-block px-10 py-4 bg-emerald-500 text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-emerald-600 transition-colors"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-center text-2xl font-light tracking-[0.15em] uppercase mb-12">
          {t('cart.title')} <span className="text-brand-muted">({items.reduce((s, i) => s + i.qty, 0)})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Items */}
          <div>
            {items.map(item => {
              const product = products.find(p => p.slug === item.slug)
              const name = product ? getProductName(product, t) : item.name
              const color = getColorName(item.color, t)
              return (
                <div key={`${item.slug}-${item.color}-${item.size}`} className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_auto] gap-4 md:gap-8 py-6 border-b border-brand-border items-start">
                  <img src={`/img/${item.image}`} alt={name} className="w-full aspect-[3/4] object-cover" />
                  <div>
                    <p className="text-sm font-normal tracking-wider mb-1">{name}</p>
                    <p className="text-xs text-brand-muted mb-4">{item.size} / {color}</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQty(item.slug, item.color, item.size, item.qty - 1)}
                        className="w-8 h-8 border border-brand-border flex items-center justify-center hover:border-brand-text transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.slug, item.color, item.size, item.qty + 1)}
                        className="w-8 h-8 border border-brand-border flex items-center justify-center hover:border-brand-text transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-sm font-medium">{formatPrice(item.price * item.qty, t)}</p>
                    <button
                      onClick={() => removeItem(item.slug, item.color, item.size)}
                      className="text-brand-muted hover:text-brand-text transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          <div className="bg-brand-card p-6 h-fit">
            <div className="flex justify-between py-2 text-sm">
              <span>{t('cart.subtotal')}</span>
              <span>{formatPrice(totalPrice, t)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span>{t('cart.shipping')}</span>
              <span className="text-emerald-500">{totalPrice >= 500 ? t('cart.free') : formatPrice(29.90, t)}</span>
            </div>
            <div className="h-px bg-brand-border my-3" />
            <div className="flex justify-between py-2 text-sm font-semibold tracking-wider">
              <span>{t('cart.total')}</span>
              <span>{formatPrice(totalPrice >= 500 ? totalPrice : totalPrice + 29.90, t)}</span>
            </div>
            <button className="w-full mt-6 py-4 bg-brand-text text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-black transition-colors">
              {t('cart.checkout')}
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
