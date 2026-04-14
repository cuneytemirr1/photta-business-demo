import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function usePhotta(productImageUrl) {
  const scriptRef = useRef(null)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (scriptRef.current) {
      scriptRef.current.remove()
      scriptRef.current = null
    }

    if (!productImageUrl) return

    const js = document.createElement('script')
    js.async = true
    js.src = 'https://widget.photta.app/v1/embed.js'
    js.setAttribute('data-api-key', 'pk_live_fdae56ca548b7527551aa08bd57cd674')
    js.setAttribute('data-product-image', productImageUrl)
    js.setAttribute('data-product-type', 'apparel')
    js.setAttribute('data-lang', i18n.language || 'en')
    document.head.appendChild(js)
    scriptRef.current = js

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove()
        scriptRef.current = null
      }
    }
  }, [productImageUrl, i18n.language])
}
