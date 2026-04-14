import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingBag, Menu } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useBrand } from '../context/BrandContext'
import { useCart } from '../context/CartContext'
import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'

export default function Header({ onSearchOpen }) {
  const { brandName } = useBrand()
  const { totalItems } = useCart()
  const [megaMenu, setMegaMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-40 border-b border-brand-border/50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/home" className="text-lg font-light tracking-[0.3em] text-brand-text">
            {brandName.toUpperCase()}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {['kadin', 'erkek'].map(cat => (
              <div key={cat} onMouseEnter={() => setMegaMenu(cat)} className="relative">
                <Link
                  to={`/${cat}`}
                  className="text-xs font-normal tracking-[0.15em] uppercase text-brand-muted hover:text-brand-text transition-colors py-5"
                >
                  {cat === 'kadin' ? 'KADIN' : 'ERKEK'}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button onClick={onSearchOpen} className="text-brand-text hover:text-emerald transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link to="/sepet" className="text-brand-text hover:text-emerald transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-emerald text-white text-[11px] font-medium rounded-full flex items-center justify-center animate-bounce-once">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-brand-text">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaMenu && <MegaMenu category={megaMenu} onClose={() => setMegaMenu(null)} />}
        </AnimatePresence>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
