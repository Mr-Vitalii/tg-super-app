import React from 'react'
import styles from './CompanyBanner.module.scss'
import { MdPhoneAndroid } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { openExternalMaps } from '@/utils/openExternalMaps'

interface CompanyBannerProps {
  title: string
  description?: string
  image?: string
  phone?: string
  address?: string
  lat?: number
  lng?: number
  onOpenGallery?: () => void
}

const CompanyBanner: React.FC<CompanyBannerProps> = ({
  title,
  description,
  image,
  phone,
  address,
  lat,
  lng,
  onOpenGallery,
}) => {
  return (
    <div
      className={styles.banner}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
      onClick={onOpenGallery}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}

          <div className={styles.actions}>
            {phone && (
              <a href={`tel:${phone}`} className={styles.btn}>
                <MdPhoneAndroid size={18} />
                <span>Позвонить</span>
              </a>
            )}
            {address && (
              <button
                onClick={() => openExternalMaps({ lat, lng })}
                className={styles.btn}
                type='button'
              >
                <FaMapMarkerAlt size={18} />
                <span>Маршрут</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CompanyBanner)
