import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useBrand } from './context/BrandContext'
import EntryPage from './pages/EntryPage'
import WelcomePage from './pages/WelcomePage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import TryOnHighlight from './components/TryOnHighlight'
import usePhotta from './hooks/usePhotta'

function Layout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false)
  usePhotta()

  return (
    <>
      <AnnouncementBar />
      <Header onSearchOpen={() => setSearchOpen(true)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <main className="min-h-screen">{children}</main>
      <Footer />
      <TryOnHighlight />
    </>
  )
}

function ProtectedRoute({ children }) {
  const { brandName } = useBrand()
  if (!brandName) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<EntryPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/home" element={<ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>} />
        <Route path="/kadin" element={<ProtectedRoute><Layout><CategoryPage /></Layout></ProtectedRoute>} />
        <Route path="/erkek" element={<ProtectedRoute><Layout><CategoryPage /></Layout></ProtectedRoute>} />
        <Route path="/urun/:slug" element={<ProtectedRoute><Layout><ProductPage /></Layout></ProtectedRoute>} />
        <Route path="/sepet" element={<ProtectedRoute><Layout><CartPage /></Layout></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  )
}
