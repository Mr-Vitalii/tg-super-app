import React from 'react'
import styles from './SlotSelector.module.scss'

export interface SlotSelectorProps {
  slots: string[]
  selectedSlot: string | null
  onSelect: (slot: string) => void
  isLoading?: boolean
}

const SlotSelector: React.FC<SlotSelectorProps> = ({
  slots,
  selectedSlot,
  onSelect,
  isLoading = false,
}) => {
  if (isLoading) {
    return <div className={styles.loader}>Загрузка свободных часов...</div>
  }

  if (!slots || slots.length === 0) {
    return (
      <div className={styles.empty}>
        Нет доступного времени на выбранную дату
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {slots.map((slot) => (
        <button
          key={slot}
          className={`${styles.slot} ${selectedSlot === slot ? styles.active : ''}`}
          onClick={() => onSelect(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  )
}

export default SlotSelector
