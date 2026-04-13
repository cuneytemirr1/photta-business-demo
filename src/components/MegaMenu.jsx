import { Link } from 'react-router-dom'

const subcats = [
  { slug: 'ust-giyim', label: 'Ust Giyim' },
  { slug: 'alt-giyim', label: 'Alt Giyim' },
  { slug: 'dis-giyim', label: 'Dis Giyim' },
  { slug: 'aksesuar', label: 'Aksesuar' },
]

export default function MegaMenu({ category, onClose }) {
  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-brand-border z-50"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-12">
          {subcats.map(sub => (
            <Link
              key={sub.slug}
              to={`/${category}?filter=${sub.slug}`}
              onClick={onClose}
              className="text-sm font-light tracking-wider text-brand-muted hover:text-brand-text transition-colors"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
