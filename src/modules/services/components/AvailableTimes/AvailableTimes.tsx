import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useLazyGetMasterAvailabilityQuery } from '@/services/mastersApi'
import { Button } from '@/components/common/Button/Button'

interface AvailableTimesProps {
  companyId: string
  masterId: string
  serviceId: string | null
  selectedDate: Date | null
  selectedTime?: string | null
  onSelectTime: (time: string) => void
}

const AvailableTimes: React.FC<AvailableTimesProps> = ({
  companyId,
  masterId,
  serviceId,
  selectedDate,
  onSelectTime,
}) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [loadAvailability, { isFetching }] = useLazyGetMasterAvailabilityQuery()

  // === 🔹 useEffect: загрузка расписания при выборе даты и услуги ===
  useEffect(() => {
    if (!selectedDate || !serviceId) {
      setAvailableTimes([])
      return
    }

    const dateISO = format(selectedDate, 'yyyy-MM-dd')

    ;(async () => {
      try {
        const result = await loadAvailability({
          companyId,
          serviceId,
          masterId,
        }).unwrap()

        if (result && result.availableDates) {
          const matched = result.availableDates.find((d) => d.date === dateISO)
          setAvailableTimes(matched ? matched.times : [])
        } else {
          setAvailableTimes([])
        }
      } catch {
        setAvailableTimes([])
      }
    })()
  }, [selectedDate, serviceId, loadAvailability, masterId, companyId])

  // === 🔹 отображение ===
  if (!selectedDate || !serviceId) {
    return (
      <div className='text-gray-400 text-sm mt-2'>
        Выберите услугу и дату, чтобы увидеть доступное время
      </div>
    )
  }

  if (isFetching) {
    return <div className='text-gray-500 mt-2'>Загружается расписание...</div>
  }

  if (availableTimes.length === 0) {
    return <div className='text-gray-500 mt-2'>Нет свободных слотов</div>
  }

  return (
    <div className='flex flex-wrap gap-2 mt-3'>
      {availableTimes.map((time) => (
        <Button
          key={time}
          /*  variant={time === selectedTime ? 'primary' : 'outline'} */
          onClick={() => onSelectTime(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  )
}

export default AvailableTimes
