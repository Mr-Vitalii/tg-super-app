import React from 'react'
import styles from './TimeSlotsCard.module.scss'

interface TimeSlotsCardProps {
  title: string // может быть дата или имя мастера
  times: string[]
  selectedTime?: string | null
  onSelect: (time: string) => void
}

const TimeSlotsCard: React.FC<TimeSlotsCardProps> = ({
  title,
  times,
  selectedTime,
  onSelect,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__title}>{title}</div>
      <div className={styles.card__slots}>
        {times.map((t) => (
          <button
            key={t}
            className={`${styles.card__slot} ${
              selectedTime === t ? styles.card__slot_selected : ''
            }`}
            onClick={() => onSelect(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimeSlotsCard
