import { Link } from 'react-router-dom'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import PageTransition from '../components/PageTransition'

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-light tracking-[0.15em] uppercase mb-6">Sepetiniz Bos</h1>
          <p className="text-sm text-brand-muted mb-8">Henuz sepetinize urun eklemediniz.</p>
          <Link
            to="/home"
            className="inline-block px-10 py-4 bg-emerald-500 text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-emerald-600 transition-colors"
          >
            Alisverise Devam Et
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-center text-2xl font-light tracking-[0.15em] uppercase mb-12">
          Alisveris Sepeti <span className="text-brand-muted">({items.reduce((s, i) => s + i.qty, 0)})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Items */}
          <div>
            {items.map(item => (
              <div key={`${item.slug}-${item.color}-${item.size}`} className="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_auto] gap-4 md:gap-8 py-6 border-b border-brand-border items-start">
                <img src={`/img/${item.image}`} alt={item.name} className="w-full aspect-[3/4] object-cover" />
                <div>
                  <p className="text-sm font-normal tracking-wider mb-1">{item.name}</p>
                  <p className="text-xs text-brand-muted mb-4">{item.size} / {item.color}</p>
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
                  <p className="text-sm font-medium">{formatPrice(item.price * item.qty)}</p>
                  <button
                    onClick={() => removeItem(item.slug, item.color, item.size)}
                    className="text-brand-muted hover:text-brand-text transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-brand-card p-6 h-fit">
            <div className="flex justify-between py-2 text-sm">
              <span>Ara Toplam</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span>Kargo</span>
              <span className="text-emerald-500">{totalPrice >= 500 ? 'Ucretsiz' : '29,90 TL'}</span>
            </div>
            <div className="h-px bg-brand-border my-3" />
            <div className="flex justify-between py-2 text-sm font-semibold tracking-wider">
              <span>TOPLAM</span>
              <span>{formatPrice(totalPrice >= 500 ? totalPrice : totalPrice + 29.90)}</span>
            </div>
            <button className="w-full mt-6 py-4 bg-brand-text text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-black transition-colors">
              Siparisi Tamamla
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
