import React from 'react'
import styles from './ServiceSelector.module.scss'

interface ServiceSelectorProps {
  services: { id: string; title: string }[]
  selectedServiceId: string | null
  onChange: (serviceId: string) => void
  label?: string
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedServiceId,
  onChange,
  label = 'Выберите услугу:',
}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor='serviceSelect' className={styles.label}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select
          id='serviceSelect'
          value={selectedServiceId ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={styles.select}
        >
          <option value='' disabled>
            -- не выбрано --
          </option>
          {services.map((s) => (
            <option className={styles.option} key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ServiceSelector
