import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function MobileMenu({ isOpen, onClose }) {
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
              { to: '/kadin', label: 'KADIN' },
              { to: '/erkek', label: 'ERKEK' },
              { to: '/sepet', label: 'SEPET' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="text-xl font-light tracking-[0.3em] text-brand-text"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
