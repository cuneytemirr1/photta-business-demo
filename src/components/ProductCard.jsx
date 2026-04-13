import { Link } from 'react-router-dom'
import ProductBadge from './ProductBadge'
import { formatPrice } from '../data/products'

export default function ProductCard({ product }) {
  const mainImage = product.colors[0].image
  const hoverImage = product.colors[1]?.image || null

  return (
    <Link to={`/urun/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-card mb-3">
        <img
          src={`/img/${mainImage}`}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-500 ${hoverImage ? 'group-hover:opacity-0' : ''}`}
        />
        {hoverImage && (
          <img
            src={`/img/${hoverImage}`}
            alt={`${product.name} alternatif`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        <ProductBadge type={product.badge} />
      </div>
      <p className="text-xs font-light tracking-wider text-brand-text mb-1">{product.name}</p>
      <div className="flex items-center gap-2">
        {product.originalPrice && (
          <span className="text-xs text-brand-muted line-through">{formatPrice(product.originalPrice)}</span>
        )}
        <span className={`text-sm font-medium ${product.originalPrice ? 'text-red-500' : 'text-brand-text'}`}>
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  )
}
