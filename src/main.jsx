import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { BrandProvider } from './context/BrandContext'
import { CartProvider } from './context/CartContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BrandProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </BrandProvider>
    </BrowserRouter>
  </React.StrictMode>
)
