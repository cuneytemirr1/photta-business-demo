import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

const STORAGE_KEY = 'photta_highlight_seen'

export default function TryOnHighlight() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), 2000)
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
          {/* Pulse ring around bottom-right where widget button sits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-5 right-5 z-[9998] pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full border-2 border-emerald-400 animate-ping" />
          </motion.div>

          {/* Tooltip card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
            className="fixed z-[9999] bottom-24 right-4 sm:right-5 max-w-[280px] sm:max-w-xs"
          >
            <div className="relative rounded-xl bg-white shadow-2xl border border-zinc-200 p-4">
              {/* Arrow */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45 bg-white border-r border-b border-zinc-200" />

              <button
                onClick={dismiss}
                className="absolute top-2.5 right-2.5 p-1 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                <X size={14} />
              </button>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Sparkles size={18} className="text-emerald-600" />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 leading-tight mb-1">
                    {t('highlight.title')}
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {t('highlight.description')}
                  </p>
                </div>
              </div>

              <button
                onClick={dismiss}
                className="mt-3 w-full py-2 bg-emerald-500 text-white text-xs font-medium tracking-wider uppercase rounded-lg hover:bg-emerald-600 transition-colors"
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
