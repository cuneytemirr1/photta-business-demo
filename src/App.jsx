import { Routes, Route } from 'react-router-dom'

function Placeholder({ name }) {
  return <div className="flex items-center justify-center h-screen text-2xl font-light tracking-widest">{name}</div>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Placeholder name="GIRIS" />} />
      <Route path="/welcome" element={<Placeholder name="HOSGELDIN" />} />
      <Route path="/home" element={<Placeholder name="ANA SAYFA" />} />
      <Route path="/kadin" element={<Placeholder name="KADIN" />} />
      <Route path="/erkek" element={<Placeholder name="ERKEK" />} />
      <Route path="/urun/:slug" element={<Placeholder name="URUN" />} />
      <Route path="/sepet" element={<Placeholder name="SEPET" />} />
    </Routes>
  )
}
