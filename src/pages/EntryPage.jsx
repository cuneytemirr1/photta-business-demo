import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBrand } from '../context/BrandContext'

export default function EntryPage() {
  const [input, setInput] = useState('')
  const { updateBrandName } = useBrand()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (input.trim()) {
      updateBrandName(input.trim())
      navigate('/welcome')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <form onSubmit={handleSubmit} className="text-center max-w-md w-full px-8">
        <div className="mb-14">
          <h1 className="text-3xl font-light tracking-[0.25em] text-brand-text mb-3">VITRIN</h1>
          <div className="w-8 h-px bg-emerald-500 mx-auto mb-4"></div>
          <p className="text-sm text-brand-muted font-light tracking-wider">Sanal deneme deneyimini kesfet</p>
        </div>

        <div className="mb-10">
          <label className="block text-xs font-medium tracking-[0.15em] uppercase text-brand-muted mb-4">
            Marka Adiniz
          </label>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Marka adini girin..."
            className="w-full px-0 py-3 text-center text-lg font-light tracking-wider border-0 border-b-2 border-brand-border bg-transparent focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-brand-border"
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim()}
          className="w-full py-4 bg-brand-text text-white text-sm font-medium tracking-[0.15em] uppercase hover:bg-black transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Baslat
        </button>
      </form>
    </div>
  )
}
