import logo from '/assets/logo.svg'
import { useParams } from 'react-router-dom'
import styles from './ServiceDetailsPage.module.scss'
import { Button } from '@/components/common/Button/Button'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Service } from '@/common/types/services'

import { useCart } from '@/hooks/useCart'
import { useModal } from '@/context/modal/useModal'
import { loadCachedServices } from '@/utils/storage'

import { useGetProductQuery } from '@/services/productsApi'
import {
  useLazyGetAvailableMastersQuery,
  useGetMastersByServiceQuery,
  useLazyGetMasterAvailabilityQuery,
} from '@/services/mastersApi'
import DateSelector from '@/components/common/DatePicker/DateSelector'
import DateAndTimePicker from '@/modules/services/components/DateAndTimePicker/DateAndTimePicker'
import MasterSlotsByDate from '../../components/MasterSlotsByDate/MasterSlotsByDate'
import { Master } from '@/common/types/masters'

const ServiceDetailsPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId?: string }>()
  const { companyId } = useParams<{ companyId?: string }>()

  console.log('serviceId:', serviceId)
  console.log('companyId:', companyId)

  const [service, setService] = useState<Service | null>(null)
  console.log('service:', service)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // выборы пользователя
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedMaster, setSelectedMaster] = useState<{
    id: string
    name: string
  } | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectionMode, setSelectionMode] = useState<'date' | 'master'>('date')

  const [masters, setMasters] = useState<Master[]>([])
  // Для режима "по мастеру" — хранит расписание выбранного мастера
  /*   const [masterAvailability, setMasterAvailability] = useState<Master | null>(
    null
  ) */

  const [loadMasters, { isLoading: isLoadingMasters }] =
    useLazyGetAvailableMastersQuery()

  const { data: mastersByService = [], isLoading: isLoadingMastersByService } =
    useGetMastersByServiceQuery(
      { companyId: companyId ?? '', serviceId: service?.id ?? '' },
      { skip: !service?.id || !companyId }
    )

  // ленивый запрос для получения расписания конкретного мастера (companyId, serviceId, masterId)
  const [loadMasterAvailability] = useLazyGetMasterAvailabilityQuery()

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
          companyId: companyId ?? '',
          date: dateISO,
        }).unwrap()
        setMasters(result as Master[])
      } catch {
        setMasters([])
      }
    })()
  }, [selectedDate, service, loadMasters, companyId, selectionMode])

  useEffect(() => {
    setSelectedMaster(null)
    setSelectedTime(null)
    setSelectedDate(null)
    setMasters([])
  }, [selectionMode])

  /*   // При выборе конкретного мастера (в режиме "по мастеру") — подгружаем его расписание
  useEffect(() => {
    if (
      selectionMode !== 'master' ||
      !selectedMaster ||
      !service?.id ||
      !companyId
    ) {
      setMasterAvailability(null)
      return
    }

    ;(async () => {
      try {
        const result = await loadMasterAvailability({
          companyId: companyId ?? '',
          serviceId: service.id,
          masterId: selectedMaster,
        }).unwrap()
        // result — мастер с normalized availableDates (см. mastersApi.transformResponse)
        setMasterAvailability(result as Master)
      } catch {
        setMasterAvailability(null)
      }
    })()
  }, [
    selectionMode,
    selectedMaster,
    service,
    companyId,
    loadMasterAvailability,
  ]) */

  // ---------------------------------------------------------------------------
  // обработчик выбора слота
  const handleSelectSlot = (
    masterId: string,
    masterFirstName: string,
    masterLastName: string,
    time: string
  ) => {
    setSelectedMaster({
      id: masterId,
      name: `${masterFirstName} ${masterLastName}`,
    })
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
    console.log('svc', svc)
    addToCart({
      ...svc,
      date: format(selectedDate, 'dd.MM.yyyy'),
      time: selectedTime,
      masterId: selectedMaster.id,
      masterName: selectedMaster.name,
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
              <div style={{ maxWidth: 500 }}>
                <DateSelector
                  selectedDate={selectedDate}
                  onChange={setSelectedDate}
                  label='Выберите дату услуги:'
                  id='master-date'
                />
              </div>

              {selectedDate && (
                <div className={styles.schedule_section}>
                  <h3 className={styles.schedule__title}>Доступные мастера:</h3>
                  <MasterSlotsByDate
                    masters={masters}
                    selectedMaster={selectedMaster}
                    selectedTime={selectedTime}
                    onSelect={handleSelectSlot}
                    isLoading={isLoadingMasters}
                  />
                </div>
              )}

              {/* ---------- мастера ---------- */}
              {/*               {selectedDate && (
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
              )} */}

              {/*         {selectedDate && (
                <DateAndTimePicker
                  companyId={companyId ?? ''}
                  serviceId={service?.id ?? ''}
                  masterId={selectedMaster ?? ''} // можно добавить выбор мастера отдельно
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  loadAvailability={loadMasterAvailability}
                  onSelect={(date, time) => {
                    setSelectedDate(date)
                    setSelectedTime(time)
                  }}
                  view='cards'
                />
              )} */}
            </>
          )}
          {/* ---------- Режим по мастеру ---------- */}
          {selectionMode === 'master' && (
            <>
              {/* ---------- выбор мастера ---------- */}
              <div className={styles.master_section}>
                <label className={styles.master__label_master}>
                  Выберите мастера:
                </label>

                {isLoadingMastersByService && <p>Загрузка мастеров...</p>}
                {!isLoadingMastersByService &&
                  mastersByService.length === 0 && (
                    <p>Нет мастеров, выполняющих эту услугу.</p>
                  )}

                <div className={styles.master__grid}>
                  {mastersByService.map((m) => {
                    const isSelected = selectedMaster?.id === m.id
                    return (
                      <div
                        key={m.id}
                        className={`${styles.master_card} ${
                          isSelected ? styles.master_card__selected : ''
                        }`}
                        onClick={() =>
                          setSelectedMaster({
                            id: m.id,
                            name: `${m.firstName} ${m.lastName}`,
                          })
                        }
                      >
                        <div className={styles.master_card__title}>
                          {m.firstName} {m.lastName}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ---------- выбор даты и времени для выбранного мастера ---------- */}
              {/*               {selectedMaster && (
                <div className={styles.schedule_section}>
                  <h3 className={styles.schedule__title}>
                    Выберите дату и время:
                  </h3>

                  <div className={styles.schedule__grid}>
                    {isLoadingMasterAvailability && (
                      <p>Загрузка расписания мастера...</p>
                    )}
                    {!isLoadingMasterAvailability &&
                      (!masterAvailability ||
                        masterAvailability.availableDates.length === 0) && (
                        <p>У выбранного мастера нет доступных слотов.</p>
                      )}
                    {masterAvailability?.availableDates.map((d) => (
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
              )} */}
              {selectedMaster && (
                <div className={styles.schedule_section}>
                  <h3 className={styles.schedule__title}>
                    Выберите дату и время:
                  </h3>

                  <DateAndTimePicker
                    companyId={companyId ?? ''}
                    serviceId={service?.id ?? ''}
                    masterId={selectedMaster.id}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    loadAvailability={loadMasterAvailability}
                    onSelect={(date, time) => {
                      setSelectedDate(date)
                      setSelectedTime(time)
                    }}
                    view='cards'
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* ---------- кнопка заказа ---------- */}

        {selectedDate && selectedTime && (
          <div className={styles.btns_container}>
            <Button
              onClick={() => handleOrder(service)}
              variant='primary'
              disabled={!canOrder}
            >
              Заказать услугу
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceDetailsPage
