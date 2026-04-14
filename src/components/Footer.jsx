import { Link } from 'react-router-dom'
import { useBrand } from '../context/BrandContext'

export default function Footer() {
  const { brandName } = useBrand()

  return (
    <footer className="bg-brand-card border-t border-brand-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <Link to="/home" className="text-lg font-light tracking-[0.3em] text-brand-text">
            {brandName.toUpperCase()}
          </Link>
          <p className="text-xs text-brand-muted font-light tracking-wider mt-3">
            Once dene, sonra karar ver.
          </p>

          <nav className="flex justify-center gap-8 mt-8">
            {[
              { to: '/kadin', label: 'Kadin' },
              { to: '/erkek', label: 'Erkek' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-light tracking-wider text-brand-muted hover:text-brand-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-6 mt-8">
            {['Instagram', 'X', 'Pinterest', 'TikTok'].map(name => (
              <a key={name} href="#" className="text-brand-muted hover:text-emerald-500 transition-colors">
                <span className="text-xs tracking-wider">{name}</span>
              </a>
            ))}
          </div>

          <div className="w-12 h-px bg-brand-border mx-auto my-8" />
          <p className="text-[11px] text-brand-muted/60 tracking-wider">
            &copy; 2026 {brandName}. Tum haklari saklidir.
          </p>
        </div>
      </div>
    </footer>
  )
}
