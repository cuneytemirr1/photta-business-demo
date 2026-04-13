import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useBrand } from './context/BrandContext'
import EntryPage from './pages/EntryPage'
import WelcomePage from './pages/WelcomePage'

function Placeholder({ name }) {
  return <div className="flex items-center justify-center h-screen text-2xl font-light tracking-widest">{name}</div>
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
        <Route path="/home" element={<ProtectedRoute><Placeholder name="ANA SAYFA" /></ProtectedRoute>} />
        <Route path="/kadin" element={<ProtectedRoute><Placeholder name="KADIN" /></ProtectedRoute>} />
        <Route path="/erkek" element={<ProtectedRoute><Placeholder name="ERKEK" /></ProtectedRoute>} />
        <Route path="/urun/:slug" element={<ProtectedRoute><Placeholder name="URUN" /></ProtectedRoute>} />
        <Route path="/sepet" element={<ProtectedRoute><Placeholder name="SEPET" /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  )
}
