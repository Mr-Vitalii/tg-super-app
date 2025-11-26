import React from 'react'
import styles from './NearbyList.module.scss'
import { NearbyCompany } from '@/common/types/сompany'

interface NearbyListProps {
  items: NearbyCompany[]
  selectedId?: string | null
  onSelect: (company: NearbyCompany) => void
  /* onShowOnMap?: (company: NearbyCompany) => void */
}
const NearbyList: React.FC<NearbyListProps> = ({
  items,
  selectedId,
  onSelect,
}) => {
  if (!items || items.length === 0) {
    return <div className={styles.empty}>Нет организаций поблизости</div>
  }

  return (
    <ul className={styles.list}>
      {items.map((c) => {
        const isActive = c.id === selectedId

        return (
          <li
            key={c.id}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
          >
            <div className={styles.info} onClick={() => onSelect(c)}>
              <div className={styles.title}>{c.name}</div>

              {c.address && (
                <div className={styles.address}>Адрес:{c.address}</div>
              )}
              {c.distance !== undefined && (
                <div className={styles.distance}>
                  Растояние до объекта: {c.distance.toFixed(0)} м
                </div>
              )}
              {/*      {c.phone && (
                <div className={styles.phone}>
                  {c.phone.map((p) => {
                    return (
                      <ul>
                        <li>{p}</li>
                      </ul>
                    )
                  })}
                </div>
              )} */}
            </div>

            <button
              type='button'
              className={styles.mapBtn}
              onClick={() => onSelect(c)}
            >
              Показать
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default NearbyList
