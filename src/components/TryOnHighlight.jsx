import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const STORAGE_KEY = 'photta_highlight_seen'

export default function TryOnHighlight() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    setVisible(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Pulse ring — positioned over the widget floating button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-[18px] right-[18px] z-[9998] pointer-events-none"
          >
            <div className="w-[52px] h-[52px] rounded-full border-2 border-emerald-400/60 animate-ping" />
          </motion.div>

          {/* Tooltip card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
            className="fixed z-[9999] bottom-[76px] right-3 sm:right-4 w-[calc(100vw-24px)] max-w-[300px]"
          >
            <div className="relative rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-5">
              {/* Arrow pointing down-right to the button */}
              <div className="absolute -bottom-[6px] right-5 w-3 h-3 rotate-45 bg-white ring-1 ring-black/5 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />

              <button
                onClick={dismiss}
                className="absolute top-3 right-3 p-1 rounded-full text-zinc-300 hover:text-zinc-500 transition-colors"
              >
                <X size={14} />
              </button>

              <p className="text-[15px] font-semibold text-zinc-900 leading-snug pr-6">
                {t('highlight.title')}
              </p>
              <p className="mt-1.5 text-[13px] text-zinc-500 leading-relaxed">
                {t('highlight.description')}
              </p>

              <button
                onClick={dismiss}
                className="mt-4 w-full py-2.5 bg-zinc-900 text-white text-xs font-medium tracking-wider uppercase rounded-xl hover:bg-black transition-colors"
              >
                {t('highlight.dismiss')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
