import logo from '/assets/logo.svg'
import { useParams } from 'react-router-dom'
import styles from './ServiceDetailsPage.module.scss'
import { Button } from '@/components/common/Button/Button'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { Service } from '@/common/types/services'

import { useCart } from '@/hooks/useCart'
import { useModal } from '@/context/modal/useModal'
import { loadCachedServices } from '@/utils/storage'

import { useGetProductQuery } from '@/services/productsApi'
import {
  useLazyGetAvailableMastersQuery,
  useGetMastersByServiceQuery,
} from '@/services/mastersApi'

// -----------------------------------------------------------------------------
// Тип для мастера
type MasterItem = {
  id: string
  firstName: string
  lastName: string
  services: string[]
  availableDates: { date: string; times: string[] }[]
}
// -----------------------------------------------------------------------------

const ServiceDetailsPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId?: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // выборы пользователя
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectionMode, setSelectionMode] = useState<'date' | 'master'>('date')

  const [masters, setMasters] = useState<MasterItem[]>([])
  const [loadMasters, { isLoading: isLoadingMasters }] =
    useLazyGetAvailableMastersQuery()

  const { data: mastersByService = [], isLoading: isLoadingMastersByService } =
    useGetMastersByServiceQuery(
      { serviceId: service?.id ?? '' },
      { skip: !service?.id }
    )

  const { addToCart } = useCart()
  const { openModal } = useModal()

  // ---------------------------------------------------------------------------
  // Загрузка услуги (кэш → API)
  useEffect(() => {
    if (!serviceId) return
    const cached = loadCachedServices()
    const cachedService = cached.find((s: Service) => s.id === serviceId)
    if (cachedService) {
      setService(cachedService)
      setLoading(false)
      return
    }
  }, [serviceId])

  const {
    data: productData,
    isFetching,
    isError,
    error: productError,
  } = useGetProductQuery(serviceId ?? '', { skip: !serviceId || !!service })

  useEffect(() => {
    if (productData) {
      setService(productData)
      setLoading(false)
    } else if (isError) {
      const msg =
        (productError as any)?.data?.message ||
        (productError as any)?.message ||
        'Ошибка при загрузке услуги'
      setError(msg)
      setLoading(false)
    } else if (!productData && !isFetching && !service) {
      setLoading(false)
    }
  }, [productData, isFetching, isError, productError, service])

  // ---------------------------------------------------------------------------
  // При выборе даты — подгружаем мастеров
  useEffect(() => {
    if (selectionMode !== 'date' || !selectedDate || !service?.id) return
    setSelectedMaster(null)
    setSelectedTime(null)
    setMasters([])

    const dateISO = format(selectedDate, 'yyyy-MM-dd')
    ;(async () => {
      try {
        const result = await loadMasters({
          serviceId: service.id,
          date: dateISO,
        }).unwrap()
        setMasters(result as MasterItem[])
      } catch {
        setMasters([])
      }
    })()
  }, [selectedDate, service, loadMasters])

  useEffect(() => {
    setSelectedMaster(null)
    setSelectedTime(null)
    setSelectedDate(null)
    setMasters([])
  }, [selectionMode])

  // ---------------------------------------------------------------------------
  // обработчик выбора слота
  const handleSelectSlot = (masterId: string, time: string) => {
    setSelectedMaster(masterId)
    setSelectedTime(time)
  }

  const canOrder =
    selectionMode === 'date'
      ? Boolean(selectedDate && selectedTime && selectedMaster)
      : Boolean(selectedMaster && selectedDate && selectedTime)

  // ---------------------------------------------------------------------------
  // оформление заказа
  const handleOrder = (svc: Service) => {
    if (!selectedDate || !selectedTime || !selectedMaster) {
      alert('Пожалуйста, выберите дату, мастера и время.')
      return
    }

    addToCart({
      ...svc,
      date: format(selectedDate, 'dd.MM.yyyy'),
      time: selectedTime,
      masterId: selectedMaster,
    } as any)

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

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>{error}</div>
  if (!service) return <div>Услуга не найдена</div>

  // ---------------------------------------------------------------------------
  return (
    <div className={styles.service_details}>
      <div className={styles.service__left}>
        <img
          src={service.img}
          alt={service.title}
          className={styles.service__image}
        />
      </div>

      <div className={styles.service__right}>
        <div className={styles.service__content}>
          <h1 className={styles.service__title}>{service.title}</h1>
          <p className={styles.service__description}>{service.description}</p>
          <p className={styles.service__price}>
            Стоимость:{' '}
            <span>
              {service.price} {service.currency}
            </span>
          </p>
          {/* ---------- выбор режима ---------- */}
          <div className={styles.selection_mode}>
            <p className={styles.selection_mode__label}>Режим выбора:</p>
            <div className={styles.selection_mode__buttons}>
              <button
                className={`${styles.selection_mode__btn} ${
                  selectionMode === 'date' ? styles.active_mode : ''
                }`}
                onClick={() => setSelectionMode('date')}
              >
                По дате
              </button>
              <button
                className={`${styles.selection_mode__btn} ${
                  selectionMode === 'master' ? styles.active_mode : ''
                }`}
                onClick={() => setSelectionMode('master')}
              >
                По мастеру
              </button>
            </div>
          </div>
          {/* ---------- Режим по дате ---------- */}
          {selectionMode === 'date' && (
            <>
              {/* ---------- выбор даты ---------- */}
              <div className={styles.date__picker}>
                <label htmlFor='mastername'>Выберите дату услуги:</label>
                <div className={styles.date__label}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    filterDate={(date) => {
                      const day = date.getDay()
                      return day !== 0 && day !== 6
                    }}
                    locale={ru}
                    placeholderText='Кликните для выбора даты'
                    dateFormat='dd.MM.yyyy'
                    minDate={new Date()}
                    shouldCloseOnSelect={true}
                    className={styles.date__input}
                    id='mastername'
                  />
                </div>
              </div>

              {/* ---------- мастера ---------- */}
              {selectedDate && (
                <div className={styles.schedule_section}>
                  <h3 className={styles.schedule__title}>Доступные мастера:</h3>

                  {isLoadingMasters && <p>Загрузка мастеров...</p>}

                  {!isLoadingMasters && masters.length === 0 && (
                    <p>Нет мастеров, доступных на выбранную дату.</p>
                  )}

                  <div className={styles.schedule__grid}>
                    {masters.map((m) => {
                      const times = m.availableDates[0]?.times ?? []
                      return (
                        <div key={m.id} className={styles.schedule_card}>
                          <div className={styles.schedule_card__title}>
                            {m.firstName} {m.lastName}
                          </div>
                          <div className={styles.schedule_card__time_slots}>
                            {times.map((t) => {
                              const isSelected =
                                selectedMaster === m.id && selectedTime === t
                              return (
                                <button
                                  key={t}
                                  className={`${styles.schedule_card__time_slot} ${
                                    isSelected
                                      ? styles.schedule_card__selected_slot
                                      : ''
                                  }`}
                                  onClick={() => handleSelectSlot(m.id, t)}
                                >
                                  {t}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
          {/* ---------- Режим по мастеру ---------- */}
          {selectionMode === 'master' && (
            <>
              {/* ---------- выбор мастера ---------- */}
              <div className={styles.schedule_section}>
                <label className={styles.schedule__label_master}>
                  Выберите мастера:
                </label>

                {isLoadingMastersByService && <p>Загрузка мастеров...</p>}
                {!isLoadingMastersByService &&
                  mastersByService.length === 0 && (
                    <p>Нет мастеров, выполняющих эту услугу.</p>
                  )}

                <div className={styles.schedule__grid}>
                  {mastersByService.map((m) => {
                    const isSelected = selectedMaster === m.id
                    return (
                      <div
                        key={m.id}
                        className={`${styles.schedule_card} ${
                          isSelected ? styles.schedule_card__selected : ''
                        }`}
                        onClick={() => setSelectedMaster(m.id)}
                      >
                        <div className={styles.schedule_card__title}>
                          {m.firstName} {m.lastName}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ---------- выбор даты и времени для выбранного мастера ---------- */}
              {selectedMaster && (
                <div className={styles.schedule_section}>
                  <h3 className={styles.schedule__title}>
                    Выберите дату и время:
                  </h3>

                  <div className={styles.schedule__grid}>
                    {mastersByService
                      .find((m) => m.id === selectedMaster)
                      ?.availableDates.map((d) => (
                        <div key={d.date} className={styles.schedule_card}>
                          <div className={styles.schedule_card__title}>
                            {d.date}
                          </div>
                          <div className={styles.schedule_card__time_slots}>
                            {d.times.map((t) => {
                              const isSelected =
                                selectedDate &&
                                format(selectedDate, 'yyyy-MM-dd') === d.date &&
                                selectedTime === t
                              return (
                                <button
                                  key={t}
                                  className={`${styles.schedule_card__time_slot} ${
                                    isSelected
                                      ? styles.schedule_card__selected_slot
                                      : ''
                                  }`}
                                  onClick={() => {
                                    setSelectedDate(new Date(d.date))
                                    setSelectedTime(t)
                                  }}
                                >
                                  {t}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ---------- кнопка заказа ---------- */}
        <div className={styles.btns_container}>
          <Button
            onClick={() => handleOrder(service)}
            variant='primary'
            disabled={!canOrder}
          >
            Заказать услугу
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailsPage
