import { useState } from 'react'
import { Link } from 'react-router-dom'
import { X, Search } from 'lucide-react'
import { products } from '../data/products'
import { motion } from 'framer-motion'

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')

  const results = query.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm font-medium tracking-[0.15em] uppercase">Ara</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="relative mb-8">
          <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Blazer, Etek, Gomlek..."
            className="w-full pl-8 py-3 border-0 border-b-2 border-brand-border bg-transparent focus:border-emerald focus:outline-none text-lg font-light"
            autoFocus
          />
        </div>

        <div className="space-y-4">
          {results.map(p => (
            <Link
              key={p.slug}
              to={`/urun/${p.slug}`}
              onClick={onClose}
              className="flex items-center gap-4 p-3 hover:bg-brand-card rounded transition-colors"
            >
              <img src={`/img/${p.colors[0].image}`} alt={p.name} className="w-16 h-20 object-cover" />
              <div>
                <p className="text-sm font-light tracking-wider">{p.name}</p>
                <p className="text-sm font-medium">{p.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL</p>
              </div>
            </Link>
          ))}
          {query.length > 1 && results.length === 0 && (
            <p className="text-center text-brand-muted text-sm py-8">Sonuc bulunamadi</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
