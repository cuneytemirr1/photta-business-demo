import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

let initialized = false

export default function usePhotta() {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (initialized) return
    initialized = true

    const js = document.createElement('script')
    js.async = true
    js.src = 'https://widget.photta.app/v1/embed.js'
    js.setAttribute('data-api-key', 'pk_live_fdae56ca548b7527551aa08bd57cd674')
    js.setAttribute('data-product-type', 'apparel')
    js.setAttribute('data-lang', i18n.language || 'en')
    document.head.appendChild(js)
  }, [i18n.language])
}
