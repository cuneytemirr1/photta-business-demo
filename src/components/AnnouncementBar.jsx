import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { getShippingThreshold } from '../data/products'

export default function AnnouncementBar() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(true)
  const [current, setCurrent] = useState(0)

  const threshold = getShippingThreshold(t)
  const messages = [
    t('announcement.freeShipping', { threshold }),
    t('announcement.newSeason'),
    t('announcement.freeReturn'),
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % messages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [messages.length])

  if (!visible) return null

  return (
    <div className="bg-emerald-500 text-white text-xs tracking-[0.1em] py-2.5 relative">
      <div className="text-center font-light overflow-hidden h-4">
        <p key={current} className="animate-fade-in">{messages[current]}</p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  )
}
