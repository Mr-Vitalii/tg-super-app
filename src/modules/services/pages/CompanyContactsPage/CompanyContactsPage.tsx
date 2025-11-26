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
    //banner
    ...(company.image ? [company.image] : []),
    // gallery
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
        lat={company.coords?.lat}
        lng={company.coords?.lng}
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
          <CompanyMap company={company} nearby={company.nearby} />
        </div>
      </div>
    </div>
  )
}

export default CompanyContactsPage
