import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const subcats = [
  { slug: 'ust-giyim', key: 'category.topwear' },
  { slug: 'alt-giyim', key: 'category.bottomwear' },
  { slug: 'dis-giyim', key: 'category.outerwear' },
  { slug: 'aksesuar', key: 'category.accessories' },
]

export default function MegaMenu({ category, onClose }) {
  const { t } = useTranslation()

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
                {t(sub.key)}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
