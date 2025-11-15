import React, { Suspense } from 'react'
import styles from './GalleryLightbox.module.scss'

interface GalleryLightboxProps {
  images: string[]
  open: boolean
  startIndex?: number
  onClose: () => void
}

// 🔥 Динамический импорт, чтобы не грузить библиотеку при первой загрузке
const LazyLightbox = React.lazy(async () => {
  const mod = await import('yet-another-react-lightbox')
  await import('yet-another-react-lightbox/styles.css')
  return { default: mod.default }
})

console.log('GalleryLightbox')

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  open,
  startIndex = 0,
  onClose,
}) => {
  if (!open || images.length === 0) return null

  return (
    <div className={styles.overlay}>
      <Suspense
        fallback={<div className={styles.loading}>Загрузка фото...</div>}
      >
        <LazyLightbox
          open={open}
          close={onClose}
          index={startIndex}
          slides={images.map((src) => ({ src }))}
          carousel={{ finite: false }}
        />
      </Suspense>
    </div>
  )
}

export default React.memo(GalleryLightbox)
