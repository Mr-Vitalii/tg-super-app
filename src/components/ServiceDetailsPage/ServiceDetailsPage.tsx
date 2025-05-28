import logo from '/assets/logo.svg'
import { useParams } from 'react-router-dom'
import { services } from '@/data/services'
import styles from './ServiceDetailsPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from '../common/Button/Button'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { Service } from '@/common/types/services'
import { useModal } from '@/context/ModalContext'
import { isTimeAvailable } from '@/utils/dateHelpers'
import { busySchedule } from '@/data/busySchedule'
import { useCart } from '@/context/cart/useCart'

export const ServiceDetailsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const navigate = useNavigate()
  const { id } = useParams()
  const service = services.find((s) => s.id === id)

  const { openModal } = useModal()
  const { addToCart } = useCart()

  if (!service) {
    return <div>Услуга не найдена</div>
  }

  const handleOrder = (service: Service) => {
    if (!selectedDate) {
      alert('Пожалуйста, выберите дату и время услуги.')
      return
    }

    // Можно передать selectedDate в корзину или в заказ
    addToCart({
      ...service,
      date: selectedDate ? format(selectedDate, 'dd.MM.yyyy') : undefined,
      time: selectedDate ? format(selectedDate, 'HH:mm') : undefined,
    })

    openModal(
      <div>
        <h2>Услуга успешно добавлена!</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            style={{ width: '100px', height: '100px' }}
            src={logo}
            alt='logo'
          />
        </div>
      </div>,
      1200
    )
  }

  return (
    <div className={styles.service_details}>
      <div className={styles.service_left}>
        <img src={service.img} alt={service.title} className={styles.image} />
      </div>
      <div className={styles.service_right}>
        <div className={styles.service_content}>
          <h1>{service.title}</h1>
          <p className={styles.description}>{service.description}</p>
          <p className={styles.price}>
            Стоимость:{' '}
            <span>
              {service.price} {service.currency}
            </span>
          </p>

          <div className={styles.date_picker}>
            <label>Выберите дату услуги:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              // Дни, которые мы не хотим разрешать:
              //  — занятые
              //  — суббота (6) и воскресенье (0)
              filterDate={(date) => {
                const day = date.getDay()
                return day !== 0 && day !== 6 // Убираем выходные
              }}
              filterTime={(date) => isTimeAvailable(date, busySchedule)} // ← проверка занятых времен
              locale={ru}
              placeholderText='Кликните для выбора даты и времени'
              dateFormat='dd.MM.yyyy HH:mm'
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={30}
              timeCaption='Время'
              minDate={new Date()}
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 0), 18)}
              className={styles.date_input}
            />
          </div>
        </div>

        <div className={styles.btns_container}>
          <button onClick={() => navigate(-1)} className={styles.button}>
            Назад
          </button>
          <Button onClick={() => handleOrder(service)} variant='primary'>
            Заказать услугу
          </Button>
        </div>
      </div>
    </div>
  )
}
