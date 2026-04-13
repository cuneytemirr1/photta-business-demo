import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

function loadCart() {
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addItem(product, color, size) {
    setItems(prev => {
      const existing = prev.find(
        i => i.slug === product.slug && i.color === color && i.size === size
      )
      if (existing) {
        return prev.map(i =>
          i === existing ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.colors.find(c => c.name === color)?.image || product.colors[0].image,
        color,
        size,
        qty: 1,
      }]
    })
  }

  function removeItem(slug, color, size) {
    setItems(prev => prev.filter(
      i => !(i.slug === slug && i.color === color && i.size === size)
    ))
  }

  function updateQty(slug, color, size, qty) {
    if (qty < 1) return removeItem(slug, color, size)
    setItems(prev => prev.map(i =>
      i.slug === slug && i.color === color && i.size === size
        ? { ...i, qty }
        : i
    ))
  }

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
