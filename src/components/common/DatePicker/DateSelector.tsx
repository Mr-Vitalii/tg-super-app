import React from 'react'
import DatePicker from 'react-datepicker'
import { ru } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './DateSelector.module.scss'

export interface DateSelectorProps {
  /** Текущее выбранное значение даты */
  selectedDate: Date | null
  /** Обработчик изменения даты */
  onChange: (date: Date | null) => void
  /** Идентификатор для label и input */
  id?: string
  /** Текст для label */
  label?: string
  /** Минимально допустимая дата (по умолчанию — сегодня) */
  minDate?: Date
  /** Флаг: разрешить ли выбор выходных */
  allowWeekends?: boolean
  /** Дополнительный CSS-класс контейнера */
  className?: string
}

/**
 * Компонент выбора даты с ограничением по выходным и локалью ru
 */
export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onChange,
  id = 'date-selector',
  label = 'Выберите дату:',
  minDate = new Date(),
  allowWeekends = false,
  className = '',
}) => {
  return (
    <div className={`${styles.date__picker} ${className}`}>
      <label className={styles.date__label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.date__label}>
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          filterDate={(date) => {
            if (allowWeekends) return true
            const day = date.getDay()
            return day !== 0 && day !== 6
          }}
          locale={ru}
          placeholderText='Кликните для выбора даты'
          dateFormat='dd.MM.yyyy'
          minDate={minDate}
          shouldCloseOnSelect
          className={styles.date__input}
          id={id}
        />
      </div>
    </div>
  )
}

export default DateSelector
