/* import React, { useState, Suspense } from 'react'
import styles from './GallerySlider.module.scss'

//
// Свойства галереи
//
interface GallerySliderProps {
  images: string[]
}

//
// 🔥 Ленивый импорт тяжёлых зависимостей
// Swiper + Lightbox подгружаются только при открытии страницы
//
const LazySwiper = React.lazy(async () => {
  const mod = await import('swiper/react')
  await import('swiper/css')
  return { default: mod.Swiper }
})

const LazySwiperSlide = React.lazy(async () => {
  const mod = await import('swiper/react')
  return { default: mod.SwiperSlide }
})

const LazyLightbox = React.lazy(async () => {
  const mod = await import('yet-another-react-lightbox')
  await import('yet-another-react-lightbox/styles.css')
  return { default: mod.default }
})

const GallerySlider: React.FC<GallerySliderProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className={styles.wrapper}>
      <Suspense
        fallback={<div className={styles.loading}>Загрузка галереи...</div>}
      >
        <LazySwiper
          slidesPerView={1.3}
          spaceBetween={12}
          onClick={() => setIsOpen(true)}
        >
          {images.map((img, idx) => (
            <LazySwiperSlide key={img}>
              <img
                src={img}
                alt={`photo-${idx}`}
                className={styles.image}
                onClick={() => {
                  setStartIndex(idx)
                  setIsOpen(true)
                }}
              />
            </LazySwiperSlide>
          ))}
        </LazySwiper>

        {isOpen && (
          <LazyLightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            index={startIndex}
            slides={images.map((i) => ({ src: i }))}
          />
        )}
      </Suspense>
    </div>
  )
}

export default React.memo(GallerySlider)
 */
