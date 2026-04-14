import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBrand } from '../context/BrandContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomePage() {
  const { brandName } = useBrand()
  const navigate = useNavigate()
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!brandName) { navigate('/'); return }
    const t1 = setTimeout(() => setPhase(1), 5000)
    const t2 = setTimeout(() => setPhase(2), 8500)
    const t3 = setTimeout(() => navigate('/home'), 9500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [brandName, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg relative">
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="line1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center px-8"
          >
            <HandwrittenText
              brandName={brandName}
              suffix=" deneyimine hazir misin?"
            />
          </motion.div>
        )}
        {phase === 1 && (
          <motion.div
            key="line2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center px-8"
          >
            <p className="text-2xl md:text-4xl font-light tracking-wider text-brand-text">
              Once dene, sonra karar ver.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => navigate('/home')}
        className="absolute bottom-8 right-8 text-xs text-brand-muted hover:text-brand-text transition-colors tracking-wider"
      >
        Gec →
      </button>
    </div>
  )
}

function HandwrittenText({ brandName, suffix }) {
  const fullText = brandName + suffix
  const [displayedChars, setDisplayedChars] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedChars(prev => {
        if (prev >= fullText.length) { clearInterval(interval); return prev }
        return prev + 1
      })
    }, 100)
    return () => clearInterval(interval)
  }, [fullText])

  const brandEnd = brandName.length
  const shown = fullText.slice(0, displayedChars)
  const brandPart = shown.slice(0, Math.min(displayedChars, brandEnd))
  const suffixPart = displayedChars > brandEnd ? shown.slice(brandEnd) : ''

  return (
    <p className="text-2xl md:text-4xl tracking-wider text-brand-text" style={{ fontStyle: 'italic' }}>
      <span className="font-semibold">{brandPart}</span>
      <span className="font-light">{suffixPart}</span>
      {displayedChars < fullText.length && <span className="animate-pulse font-light">|</span>}
    </p>
  )
}
