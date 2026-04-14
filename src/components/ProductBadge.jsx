import { useTranslation } from 'react-i18next'

export default function ProductBadge({ type }) {
  const { t } = useTranslation()

  const styles = {
    new: 'bg-emerald-500 text-white',
    bestseller: 'bg-brand-text text-white',
    sale: 'bg-red-500 text-white',
  }

  if (!type || !styles[type]) return null

  return (
    <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-sm ${styles[type]}`}>
      {t(`badge.${type}`)}
    </span>
  )
}
