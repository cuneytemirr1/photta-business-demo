import { createContext, useContext, useState } from 'react'

const BrandContext = createContext()

export function BrandProvider({ children }) {
  const [brandName, setBrandName] = useState(
    localStorage.getItem('brandName') || ''
  )

  function updateBrandName(name) {
    setBrandName(name)
    localStorage.setItem('brandName', name)
  }

  return (
    <BrandContext.Provider value={{ brandName, updateBrandName }}>
      {children}
    </BrandContext.Provider>
  )
}

export function useBrand() {
  return useContext(BrandContext)
}
