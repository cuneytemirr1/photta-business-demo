import { useEffect, useRef } from 'react'

export default function usePhotta(productImageUrl) {
  const scriptRef = useRef(null)

  useEffect(() => {
    if (scriptRef.current) {
      scriptRef.current.remove()
      scriptRef.current = null
    }

    if (!productImageUrl) return

    const js = document.createElement('script')
    js.src = 'https://widget.photta.app/v1/embed.js'
    js.setAttribute('data-key', 'pk_live_6adedc792623f00335298815f871608d')
    js.setAttribute('data-product-image', productImageUrl)
    js.setAttribute('data-product-type', 'apparel')
    document.body.appendChild(js)
    scriptRef.current = js

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove()
        scriptRef.current = null
      }
    }
  }, [productImageUrl])
}
