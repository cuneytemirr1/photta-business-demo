import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const subcats = [
  { slug: 'ust-giyim', label: 'Ust Giyim' },
  { slug: 'alt-giyim', label: 'Alt Giyim' },
  { slug: 'dis-giyim', label: 'Dis Giyim' },
  { slug: 'aksesuar', label: 'Aksesuar' },
]

export default function MegaMenu({ category, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-brand-border z-50"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-12">
          {subcats.map((sub, i) => (
            <motion.div
              key={sub.slug}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <Link
                to={`/${category}?filter=${sub.slug}`}
                onClick={onClose}
                className="text-sm font-light tracking-wider text-brand-muted hover:text-brand-text transition-colors"
              >
                {sub.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
