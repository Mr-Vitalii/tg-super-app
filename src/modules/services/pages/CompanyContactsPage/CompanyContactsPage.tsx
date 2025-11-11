import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetCompanyQuery } from '@/services/companiesApi'
import styles from './CompanyContactsPage.module.scss'

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
      <div
        className={styles.banner}
        style={
          company.image
            ? { backgroundImage: `url(${company.image})` }
            : undefined
        }
        role='img'
        aria-label={company.title}
      >
        <div className={styles.bannerOverlay}>
          <h1 className={styles.title}>{company.title}</h1>
          {company.address && (
            <div className={styles.address}>{company.address}</div>
          )}
        </div>
      </div>

      {/* ---------- Gallery (placeholder) ---------- */}
      <div className={styles.gallerySection}>
        {/* Здесь позже подключим GallerySlider */}
        <div className={styles.galleryPlaceholder}>
          {images.length > 0 ? (
            <img src={images[0]} alt={`${company.title} — фото`} />
          ) : (
            <div className={styles.noImage}>Нет изображений</div>
          )}
          <div className={styles.galleryHint}>
            Галерея — будет реализована отдельным компонентом (Swiper +
            Lightbox)
          </div>
        </div>
      </div>

      {/* ---------- Two-column content ---------- */}
      <div className={styles.content}>
        <div className={styles.left}>
          {/* CompanyInfo — можно вынести позже в отдельный компонент */}
          <section className={styles.infoCard}>
            <h2>О компании</h2>
            {company.description && (
              <p className={styles.description}>{company.description}</p>
            )}
            {company.info && <p className={styles.info}>{company.info}</p>}

            <div className={styles.contactBlock}>
              {company.phone && company.phone.length > 0 && (
                <div className={styles.contactRow}>
                  <div className={styles.contactLabel}>Телефон</div>
                  <div className={styles.contactValue}>
                    {company.phone.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p}`}
                        className={styles.contactLink}
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {company.email && (
                <div className={styles.contactRow}>
                  <div className={styles.contactLabel}>E-mail</div>
                  <div className={styles.contactValue}>
                    <a
                      href={`mailto:${company.email}`}
                      className={styles.contactLink}
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
              )}

              {company.website && (
                <div className={styles.contactRow}>
                  <div className={styles.contactLabel}>Сайт</div>
                  <div className={styles.contactValue}>
                    <a
                      href={company.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.contactLink}
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
              )}

              {company.workHours && company.workHours.length > 0 && (
                <div className={styles.contactRow}>
                  <div className={styles.contactLabel}>Часы работы</div>
                  <div className={styles.contactValue}>
                    <ul className={styles.workHoursList}>
                      {company.workHours.map((w) => (
                        <li key={`${w.day}-${w.from}`}>
                          <strong>{w.day}:</strong> {w.from} — {w.to}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {company.socials && company.socials.length > 0 && (
                <div className={styles.contactRow}>
                  <div className={styles.contactLabel}>Соцсети</div>
                  <div className={styles.contactValue}>
                    <div className={styles.socials}>
                      {company.socials.map((s) => (
                        <a
                          key={s.url}
                          href={s.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={styles.socialLink}
                        >
                          {s.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className={styles.right}>
          {/* CompanyMap placeholder — позже заменим на полноценный CompanyMap (react-leaflet) */}
          <section className={styles.mapCard}>
            <h2>Где мы</h2>
            {company.coords ? (
              <div className={styles.mapPlaceholder}>
                {/* Вставляем ссылку на внешнюю карту по координатам в качестве временного решения */}
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
          </section>
        </div>
      </div>
    </div>
  )
}

export default CompanyContactsPage
