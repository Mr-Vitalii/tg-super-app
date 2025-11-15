import React, { useState, Suspense } from 'react'
import styles from './GallerySlider.module.scss'
import LightboxLazy from '@/modules/services/components/LightboxLazy/LightboxLazy'

interface GallerySliderProps {
  images: string[]
}

const LazySwiperBundle = React.lazy(async () => {
  // импорт реактовых компонентов Swiper
  const { Swiper, SwiperSlide } = await import('swiper/react')

  // импорт модулей из модульных путей

  const { Navigation } = await import('swiper/modules')
  const { Pagination } = await import('swiper/modules')

  // CSS
  await import('swiper/css')
  await import('swiper/css/navigation')
  await import('swiper/css/pagination')

  return {
    default: (props: any) => {
      const { images, onImageClick } = props
      return (
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={3}
          spaceBetween={16}
          navigation
          pagination={{ clickable: true }}
          loop
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 8 },
            640: { slidesPerView: 2, spaceBetween: 12 },
            1024: { slidesPerView: 3, spaceBetween: 16 },
          }}
          className={styles.swiper}
        >
          {images.map((img: string, idx: number) => (
            <SwiperSlide key={img}>
              <img
                src={img}
                alt={`photo-${idx}`}
                className={styles.image}
                onClick={() => onImageClick(idx)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )
    },
  }
})

const GallerySlider: React.FC<GallerySliderProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  if (!images?.length) return null

  return (
    <div className={styles.wrapper}>
      {
        <Suspense
          fallback={<div className={styles.loading}>Загрузка галереи...</div>}
        >
          <LazySwiperBundle
            images={images}
            onImageClick={(idx: number) => {
              setStartIndex(idx)
              setIsOpen(true)
            }}
          />

          <LightboxLazy
            open={isOpen}
            index={startIndex}
            slides={images.map((src) => ({ src }))}
            onClose={() => setIsOpen(false)}
          />
        </Suspense>
      }
    </div>
  )
}

export default React.memo(GallerySlider)
