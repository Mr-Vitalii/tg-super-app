import logo from '/assets/logo.svg'
import { useParams } from 'react-router-dom'
/* import { services } from '@/data/services' */
import styles from './ServiceDetailsPage.module.scss'
import { Button } from '../common/Button/Button'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { Service } from '@/common/types/services'

import { isTimeAvailable } from '@/utils/dateHelpers'
import { busySchedule } from '@/data/busySchedule'
import { useCart } from '@/context/cart/useCart'
import { useModal } from '@/context/modal/useModal'
import { loadCachedServices } from '@/utils/storage'
import { fetchServiceById } from '@/api/api'

export const ServiceDetailsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { id } = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  /*  const service = services.find((s) => s.id === id) */

  const { openModal } = useModal()
  const { addToCart } = useCart()

  useEffect(() => {
    if (!id) return

    const cached = loadCachedServices()
    const cachedService = cached.find((s: Service) => s.id === id)

    if (cachedService) {
      setService(cachedService)
      setLoading(false)
      return
    }

    // если нет в кэше — загружаем с сервера
    ;(async () => {
      try {
        const data = await fetchServiceById(id)
        setService(data)
      } catch (err: any) {
        setError(err.message || 'Ошибка при загрузке услуги')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  /*   if (!service) {
    return <div>Услуга не найдена</div>
  } */

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>{error}</div>
  if (!service) return <div>Услуга не найдена</div>

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
          <Button onClick={() => handleOrder(service)} variant='primary'>
            Заказать услугу
          </Button>
        </div>
      </div>
    </div>
  )
}
