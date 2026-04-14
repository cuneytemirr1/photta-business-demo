import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom'
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

function ShellLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { brandName } = useBrand()
  usePhotta()

  if (!brandName) return <Navigate to="/" replace />

  return (
    <>
      <AnnouncementBar />
      <Header onSearchOpen={() => setSearchOpen(true)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <TryOnHighlight />
    </>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<EntryPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route element={<ShellLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/kadin" element={<CategoryPage />} />
          <Route path="/erkek" element={<CategoryPage />} />
          <Route path="/urun/:slug" element={<ProductPage />} />
          <Route path="/sepet" element={<CartPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
