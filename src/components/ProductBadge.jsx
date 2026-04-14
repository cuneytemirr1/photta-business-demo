export default function ProductBadge({ type }) {
  const styles = {
    new: 'bg-emerald-500 text-white',
    bestseller: 'bg-brand-text text-white',
    sale: 'bg-red-500 text-white',
  }
  const labels = {
    new: 'Yeni',
    bestseller: 'Cok Satan',
    sale: '%20 Indirim',
  }

  if (!type || !styles[type]) return null

  return (
    <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-sm ${styles[type]}`}>
      {labels[type]}
    </span>
  )
}
