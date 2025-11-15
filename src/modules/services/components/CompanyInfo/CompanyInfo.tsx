// src/entities/company/ui/CompanyInfo/CompanyInfo.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Company } from '@/common/types/services' // адаптируй путь под проект
import styles from './CompanyInfo.module.scss'
import Socials from '@/components/common/Socials/Socials'
import { MdPhoneAndroid } from 'react-icons/md'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { ImSearch } from 'react-icons/im'

interface CompanyInfoProps {
  company: Company
  /** Колбек, вызываемый при клике "Забронировать". Если не передан — выполняется навигация на услуги компании. */
  onBook?: () => void
}

function sanitizeTel(tel: string) {
  // Убираем пробелы, скобки, дефисы — оставим только + и цифры
  return tel.replace(/[^\d+]/g, '')
}

const ContactItem: React.FC<{
  label: string
  children: React.ReactNode
  className?: string
}> = ({ label, children, className = '' }) => (
  <div className={`${styles.contactRow} ${className}`}>
    <div className={styles.contactLabel}>{label}</div>
    <div className={styles.contactValue}>{children}</div>
  </div>
)

const CompanyInfo: React.FC<CompanyInfoProps> = ({ company, onBook }) => {
  const navigate = useNavigate()

  const handleCall = (_ev: React.MouseEvent, tel?: string) => {
    if (!tel) return
    // Для аналитики/metrics можно добавить здесь событие
    // ev.preventDefault() не нужно — ссылка tel сама откроется
  }

  const openExternalMaps = () => {
    if (!company.coords) return
    const { lat, lng } = company.coords
    // Попробуем открыть Google Maps, иначе OpenStreetMap
    // Google Maps URL:
    const google = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    // OSM:
    const osm = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`
    // Открываем Google (пользователь сам решит), т.к. чаще установлен:
    const win = window.open(google, '_blank', 'noopener,noreferrer')

    if (!win) {
      window.open(osm, '_blank', 'noopener,noreferrer')
    }
  }

  const handleBook = () => {
    if (onBook) {
      onBook()
      return
    }
    // По умолчанию навигируем на страницу услуг компании
    // ожидаем, что company.categoryId и company.id существуют
    if (company.categoryId && company.id) {
      navigate(`/services/${company.categoryId}/${company.id}`)
    }
  }

  return (
    <aside
      className={styles.root}
      aria-label={`Контакты компании ${company.title}`}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{company.title}</h2>
        {company.address && (
          <div className={styles.address}>{company.address}</div>
        )}
      </div>

      {company.description && (
        <div className={styles.descriptionBlock}>
          <p className={styles.descriptionText}>{company.description}</p>
        </div>
      )}

      <div className={styles.contacts}>
        {company.phone && company.phone.length > 0 && (
          <ContactItem label='Телефон'>
            <div className={styles.phones}>
              {company.phone.map((p) => {
                const telHref = `tel:${sanitizeTel(p)}`
                return (
                  <a
                    key={p}
                    href={telHref}
                    className={styles.contactLink}
                    onClick={(e) => handleCall(e, p)}
                  >
                    {p}
                  </a>
                )
              })}
            </div>
          </ContactItem>
        )}

        {company.email && (
          <ContactItem label='E-mail'>
            <a href={`mailto:${company.email}`} className={styles.contactLink}>
              {company.email}
            </a>
          </ContactItem>
        )}

        {company.website && (
          <ContactItem label='Сайт'>
            <a
              href={company.website}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.contactLink}
            >
              {company.website}
            </a>
          </ContactItem>
        )}

        {company.workHours && company.workHours.length > 0 && (
          <ContactItem label='Часы работы'>
            <ul className={styles.workHoursList}>
              {company.workHours.map((w) => (
                <li key={`${w.day}-${w.from}`} className={styles.workHoursItem}>
                  <span className={styles.workDay}>{w.day}:</span>{' '}
                  <span className={styles.workTime}>
                    {w.from} — {w.to}
                  </span>
                </li>
              ))}
            </ul>
          </ContactItem>
        )}

        {company.socials && company.socials.length > 0 && (
          <ContactItem label='Соцсети:'>
            <Socials items={company.socials} iconSize={35} />
          </ContactItem>
        )}
      </div>

      <div className={styles.actions}>
        <div className={styles.actionRow}>
          {company.phone && company.phone.length > 0 && (
            <a
              className={styles.btn}
              href={`tel:${sanitizeTel(company.phone[0])}`}
              onClick={(e) => handleCall(e, company.phone![0])}
              aria-label={`Позвонить ${company.phone[0]}`}
            >
              <MdPhoneAndroid size={16} />
              Позвонить
            </a>
          )}

          <button
            type='button'
            className={styles.btnOutline}
            onClick={openExternalMaps}
            disabled={!company.coords}
            aria-disabled={!company.coords}
          >
            <FaMapMarkerAlt size={16} className={styles.btnIcon} />
            Проложить маршрут
          </button>

          <button
            type='button'
            className={styles.btnPrimary}
            onClick={handleBook}
          >
            <ImSearch size={16} />
            Подобрать услугу
          </button>
        </div>
      </div>
    </aside>
  )
}

export default CompanyInfo
