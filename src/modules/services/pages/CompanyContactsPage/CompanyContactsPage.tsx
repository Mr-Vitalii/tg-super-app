import React, { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetCompanyQuery } from '@/services/companiesApi'
import styles from './CompanyContactsPage.module.scss'
import GallerySlider from '@/modules/services/components/GallerySlider/GallerySlider'
import CompanyBanner from '@/modules/services/components/CompanyBanner/CompanyBanner'
import CompanyInfo from '@/modules/services/components/CompanyInfo/CompanyInfo'
import CompanyMap from '@/modules/services/components/CompanyMap/CompanyMap'

const CompanyContactsPage: React.FC = () => {
  const { companyId } = useParams<{ companyId?: string }>()

  const {
    data: company,
    isLoading,
    isError,
  } = useGetCompanyQuery(companyId ?? '', { skip: !companyId })

  if (!companyId) return <div className={styles.root}>Компания не выбрана</div>

  if (isLoading)
    return <div className={styles.root}>Загрузка информации о компании...</div>

  if (isError || !company)
    return (
      <div className={styles.root}>
        <p>Не удалось загрузить информацию о компании.</p>
        <Link to='/services'>Вернуться к услугам</Link>
      </div>
    )

  // Собираем список изображений для галереи (banner + gallery)
  const images = [
    ...(company.image ? [company.image] : []),
    // gallery поле может появиться позже — если нет, оставим только баннер
    ...(company.gallery ?? []),
  ]

  return (
    <div className={styles.root}>
      {/* ---------- Banner ---------- */}
      <CompanyBanner
        title={company.title}
        description={company.info ?? company.description}
        image={company.image}
        phone={company.phone?.[0]}
        address={company.address}
      />

      {/* ---------- Gallery  ---------- */}
      <div className={styles.gallerySection}>
        <Suspense fallback={<div>Загрузка галереи...</div>}>
          <GallerySlider images={images} />
        </Suspense>
      </div>

      {/* ---------- Two-column content ---------- */}
      <div className={styles.content}>
        <div className={styles.left}>
          <CompanyInfo company={company} />
        </div>

        <div className={styles.right}>
          <CompanyMap company={company} />
          {/*           //* CompanyMap placeholder — позже заменим на полноценный CompanyMap(react-leaflet)
          <section className={styles.mapCard}>
            <h2>Где мы</h2>
            {company.coords ? (
              <div className={styles.mapPlaceholder}>
                //* Вставляем ссылку на внешнюю карту по координатам в качестве
                временного решения
                <a
                  href={`https://www.openstreetmap.org/?mlat=${company.coords.lat}&mlon=${company.coords.lng}#map=18/${company.coords.lat}/${company.coords.lng}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.mapLink}
                >
                  Открыть карту — {company.coords.lat.toFixed(5)},{' '}
                  {company.coords.lng.toFixed(5)}
                </a>
                <div className={styles.mapHint}>
                  Здесь будет интерактивная карта (Leaflet). Позже добавим zoom,
                  fullscreen и nearby-данные.
                </div>
              </div>
            ) : (
              <div>Координаты не указаны</div>
            )}
          </section> */}
        </div>
      </div>
    </div>
  )
}

export default CompanyContactsPage
