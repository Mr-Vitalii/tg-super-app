import React from 'react'
import styles from './CompanyBanner.module.scss'
/* import { Phone, MapPin } from 'lucide-react' */
import { MdPhoneAndroid } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'

interface CompanyBannerProps {
  title: string
  description?: string
  image?: string
  phone?: string
  address?: string
  onOpenGallery?: () => void
}

const CompanyBanner: React.FC<CompanyBannerProps> = ({
  title,
  description,
  image,
  phone,
  address,
  onOpenGallery,
}) => {
  const handleMapClick = () => {
    if (!address) return
    const encoded = encodeURIComponent(address)
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encoded}`,
      '_blank'
    )
  }

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
                onClick={handleMapClick}
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
