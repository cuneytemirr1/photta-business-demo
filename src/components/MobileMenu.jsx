import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function MobileMenu({ isOpen, onClose }) {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
        >
          <button onClick={onClose} className="absolute top-6 right-6">
            <X size={24} />
          </button>
          <nav className="flex flex-col items-center gap-12">
            {[
              { to: '/kadin', labelKey: 'nav.women' },
              { to: '/erkek', labelKey: 'nav.men' },
              { to: '/sepet', labelKey: 'nav.cart' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="text-xl font-light tracking-[0.3em] text-brand-text"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
