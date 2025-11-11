import React from 'react'
import { Master } from '@/common/types/masters'

import styles from './MasterSlotsByDate.module.scss'
import TimeSlotsCard from '../TimeSlotsCard/TimeSlotsCard'

interface MasterSlotsByDateProps {
  masters: Master[]
  selectedMaster: { id: string; name: string } | null
  selectedTime: string | null
  onSelect: (
    masterId: string,
    firstName: string,
    lastName: string,
    time: string
  ) => void
  isLoading?: boolean
}

const MasterSlotsByDate: React.FC<MasterSlotsByDateProps> = ({
  masters,
  selectedMaster,
  selectedTime,
  onSelect,
  isLoading = false,
}) => {
  if (isLoading) return <p>Загрузка мастеров...</p>
  console.log('masters111', masters)
  console.log('selectedMaster111', selectedMaster)
  console.log('selectedTime111', selectedTime)
  if (masters.length === 0) return <p>Нет мастеров на эту дату.</p>

  return (
    <div className={styles.schedule__grid}>
      {masters.map((m) => {
        const times = m.availableDates[0]?.times ?? []

        return (
          <TimeSlotsCard
            key={m.id}
            title={`${m.firstName} ${m.lastName}`}
            times={times}
            selectedTime={selectedMaster?.id === m.id ? selectedTime : null}
            onSelect={(time) => onSelect(m.id, m.firstName, m.lastName, time)}
          />
        )
      })}
    </div>
  )
}

export default MasterSlotsByDate
