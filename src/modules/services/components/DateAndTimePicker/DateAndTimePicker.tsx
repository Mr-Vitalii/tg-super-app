import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import DateSelector from '@/components/common/DatePicker/DateSelector'
import TimeSlotsCard from '../TimeSlotsCard/TimeSlotsCard'

interface DateAndTimePickerProps {
  companyId: string | number
  serviceId: string
  masterId: string
  selectedDate: Date | null
  selectedTime: string | null
  loadAvailability: any // из useLazyGetMasterAvailabilityQuery
  onSelect: (date: Date, time: string) => void
  view?: 'calendar' | 'cards'
}

const DateAndTimePicker: React.FC<DateAndTimePickerProps> = ({
  companyId,
  serviceId,
  masterId,
  selectedDate,
  selectedTime,
  loadAvailability,
  onSelect,
  view = 'calendar',
}) => {
  const [availability, setAvailability] = useState<
    { date: string; times: string[] }[]
  >([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // --- загрузка расписания мастера ---
  useEffect(() => {
    if (!companyId || !serviceId || !masterId) return
    setLoading(true)
    setError(null)

    loadAvailability({ companyId, serviceId, masterId })
      .unwrap()
      .then((res: any) => {
        setAvailability(res.availableDates ?? [])
      })
      .catch(() => {
        setError('Ошибка при загрузке расписания.')
      })
      .finally(() => setLoading(false))
  }, [companyId, serviceId, masterId, loadAvailability])

  // --- View: calendar ---
  if (view === 'calendar') {
    const selectedISO = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null
    const selectedDay = availability.find((d) => d.date === selectedISO)

    return (
      <>
        <DateSelector
          selectedDate={selectedDate}
          onChange={(date) => {
            // очищаем выбранное время при смене даты
            if (date && selectedDate?.getTime() !== date.getTime()) {
              onSelect(date, '')
            }
          }}
          label='Выберите дату:'
          id='calendar-picker'
        />

        {loading && <p>Загрузка доступных времён...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {selectedDate && !loading && !selectedDay && (
          <p>Нет доступных времён для выбранной даты.</p>
        )}

        {selectedDay && (
          <TimeSlotsCard
            title={selectedDay.date}
            times={selectedDay.times}
            selectedTime={selectedTime}
            onSelect={(time) => onSelect(selectedDate!, time)}
          />
        )}
      </>
    )
  }

  // --- View: cards ---
  if (view === 'cards') {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {loading && <p>Загрузка расписания...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && availability.length === 0 && (
          <p>Нет доступных дат у выбранного мастера.</p>
        )}

        {availability.map((day) => (
          <TimeSlotsCard
            key={day.date}
            title={day.date}
            times={day.times}
            selectedTime={
              selectedDate && format(selectedDate, 'yyyy-MM-dd') === day.date
                ? selectedTime
                : null
            }
            onSelect={(time) => onSelect(new Date(day.date), time)}
          />
        ))}
      </div>
    )
  }

  return null
}

export default DateAndTimePicker
