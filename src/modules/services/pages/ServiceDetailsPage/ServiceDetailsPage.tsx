// src/modules/services/pages/ServiceDetailsPage/ServiceDetailsPage.tsx
import logo from '/assets/logo.svg'
import { useParams } from 'react-router-dom'
import styles from './ServiceDetailsPage.module.scss'
import { Button } from '@/components/common/Button/Button'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
/* import { setHours, setMinutes } from 'date-fns' */
import { useEffect, /* useMemo, */ useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import { Service } from '@/common/types/services'

/* import { isTimeAvailable } from '@/utils/dateHelpers' */
/* busySchedule оставляем в проекте для возможной визуализации, но логика доступности основывается на мастерах */
/* import { busySchedule } from '@/data/busySchedule' */
import { useCart } from '@/hooks/useCart'
import { useModal } from '@/context/modal/useModal'
import { loadCachedServices } from '@/utils/storage'

import { useGetProductQuery } from '@/services/productsApi'
import { useLazyGetAvailableMastersQuery } from '@/services/mastersApi'

// ✅ Импорт локального массива мастеров для вычисления доступных временных слотов на выбранную дату.
//    Это локальная оптимизация: мы используем masters для расчёта доступных times,
//    а реальный список мастеров на конкретный слот получаем через RTK Query (loadMasters).
/* import { masters as localMasters } from '@/modules/services/data/masters' */

// -----------------------------------------------------------------------------
// Вспомогательные типы (локальные, чтобы файл был самодостаточен)
type MasterItem = {
  id: string
  firstName: string
  lastName: string
  services: string[]
  availableDates: { date: string; times: string[] }[]
}
// -----------------------------------------------------------------------------

// Генерация всех временных слотов (строк) для дня с заданным интервалом (в минутах)
/* const generateTimeSlots = (
  startHour = 9,
  endHour = 18,
  intervalMinutes = 30
): string[] => {
  const slots: string[] = []
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      // Не включаем слот позже endHour:00 (например, если endHour=18, последний слот 18:00 is allowed)
      if (h === endHour && m > 0) continue
      const hh = String(h).padStart(2, '0')
      const mm = String(m).padStart(2, '0')
      slots.push(`${hh}:${mm}`)
    }
  }
  return slots
} */
// Генерация всех временных слотов (строк) для дня: 09:00 - 20:00, шаг 60 минут
const generateTimeSlots = (
  startHour = 9,
  endHour = 20
  /* intervalMinutes = 60 */
): string[] => {
  const slots: string[] = []
  for (let h = startHour; h <= endHour; h++) {
    // если endHour = 20, последний слот 20:00 включён
    const hh = String(h).padStart(2, '0')
    const mm = '00'
    slots.push(`${hh}:${mm}`)
  }
  return slots
}

const ServiceDetailsPage: React.FC = () => {
  // -------------------- ROUTE / DATA --------------------
  const { serviceId } = useParams<{ serviceId?: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // -------------------- UX STATE --------------------
  const [selectedDate, setSelectedDate] = useState<Date | null>(null) // дата (без времени)
  const [selectedTime, setSelectedTime] = useState<string | null>(null) // выбранный слот "HH:mm"
  const [availableTimes, setAvailableTimes] = useState<string[]>([]) // слоты, разрешённые по мастерам
  const [masters, setMasters] = useState<MasterItem[]>([]) // список мастеров, пришедших с сервера
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null)

  // -------------------- RTK QUERY для мастеров --------------------
  // loadMasters вызывается лениво после выбора времени
  const [loadMasters, { isLoading: isLoadingMasters }] =
    useLazyGetAvailableMastersQuery()

  const { openModal } = useModal()
  const { addToCart } = useCart()

  // -------------------- Получаем данные об услуге (кэш -> API) --------------------
  useEffect(() => {
    if (!serviceId) return

    // Попытка найти в локальном кэше sessionStorage (как раньше)
    const cached = loadCachedServices()
    const cachedService = cached.find((s: Service) => s.id === serviceId)

    if (cachedService) {
      setService(cachedService)
      setLoading(false)
      return
    }
    // Если нет в кэше — дальше RTK Query загрузит (см. useGetProductQuery)
  }, [serviceId])

  const {
    data: productData,
    isFetching,
    isError,
    error: productError,
  } = useGetProductQuery(serviceId ?? '', {
    skip: !serviceId || !!service,
  })

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

  // -------------------- ЛОГИКА ВЫБОРА ВРЕМЕНИ / МАСТЕРА --------------------

  const serviceIdForEffect = service?.id ?? null

  useEffect(() => {
    // Сброс зависимых стейтов при смене даты
    setSelectedTime(null)
    setMasters([])
    setSelectedMaster(null)

    if (!selectedDate) {
      setAvailableTimes([])
      return
    }

    // На продакшне мы показываем ВСЕ слоты (09:00..20:00 шаг 60),
    // а доступность мастеров проверяем после выбора времени через loadMasters.
    const slots = generateTimeSlots(9, 20)
    setAvailableTimes(slots)
  }, [selectedDate])

  // 2) При выборе времени — запрашиваем мастеров через RTK Query (лениво),
  //    сохраняем результат в masters (модель MasterItem).
  useEffect(() => {
    let active = true
    setMasters([])
    setSelectedMaster(null)

    if (!selectedDate || !selectedTime || !serviceIdForEffect) return

    const dateISO = format(selectedDate, 'yyyy-MM-dd')
    const time = selectedTime

    // ✅ Вот сюда можно вставить лог:
    console.log('Запрос loadMasters с параметрами:', {
      serviceId: String(serviceId),
      date: dateISO,
      time,
    })
    ;(async () => {
      // Выполняем ленивый запрос: loadMasters({ serviceId, date, time })(async () => {
      try {
        const result = await loadMasters({
          serviceId: String(serviceIdForEffect),
          date: dateISO,
          time,
        }).unwrap()
        console.log('Ответ от loadMasters:', result)

        if (!active) return

        // Предполагаем, что result — массив мастеров в формате MasterItem
        setMasters((result as MasterItem[]) || [])
      } catch (e) {
        // В случае ошибки — оставляем masters пустым (пользователю покажем сообщение)
        setMasters([])
      }
    })()

    return () => {
      active = false
    }
  }, [selectedDate, selectedTime, serviceIdForEffect, loadMasters, serviceId])

  // -------------------- UI: можно заказать только если есть дата+время+мастер --------------------
  const canOrder = Boolean(selectedDate && selectedTime && selectedMaster)

  // -------------------- ОБРАБОТЧИК ЗАКАЗА --------------------
  const handleOrder = (svc: Service) => {
    if (!selectedDate) {
      alert('Пожалуйста, выберите дату.')
      return
    }
    if (!selectedTime) {
      alert('Пожалуйста, выберите время.')
      return
    }
    if (!selectedMaster) {
      alert('Пожалуйста, выберите мастера.')
      return
    }

    // Добавляем masterId в объект заказа — удобно для сервера/корзины
    addToCart({
      ...svc,
      date: format(selectedDate, 'dd.MM.yyyy'),
      time: selectedTime,
      masterId: selectedMaster as unknown as string, // добавляем поле masterId
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

  // Если сервис ещё не загружен — показываем загрузку
  if (loading) return <div>Загрузка...</div>
  if (error) return <div>{error}</div>
  if (!service) return <div>Услуга не найдена</div>

  // -------------------- RENDER --------------------
  return (
    <div className={styles.service_details}>
      <div className={styles.service_left}>
        <img src={service.img} alt={service.title} className={styles.image} />
      </div>

      <div className={styles.service_right}>
        <div className={styles.service_content}>
          <h1 className={styles.service_title}>{service.title}</h1>

          <p className={styles.description}>{service.description}</p>

          <p className={styles.price}>
            Стоимость:{' '}
            <span>
              {service.price} {service.currency}
            </span>
          </p>

          {/* ---------- 1) Выбор даты (DatePicker) ---------- */}
          <div className={styles.date__picker}>
            <label className={styles.label}>
              Выберите дату услуги:
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                // Разрешаем выбирать только будние дни (как было)
                filterDate={(date) => {
                  const day = date.getDay()
                  return day !== 0 && day !== 6
                }}
                locale={ru}
                placeholderText='Кликните для выбора даты'
                dateFormat='dd.MM.yyyy'
                showTimeSelect={false} // только дата
                minDate={new Date()}
                className={styles.date_input}
              />
            </label>
          </div>

          {/* ---------- 2) Выбор времени (select) — показывается, только если есть availableTimes ---------- */}
          {selectedDate && (
            <div className={styles.date__picker}>
              {availableTimes.length === 0 ? (
                <p className={styles.no_times}>
                  Нет доступных временных интервалов — выберите другую дату.
                </p>
              ) : (
                <>
                  <label className={styles.label}>
                    Выберите время
                    <select
                      className={styles.timeSelect}
                      value={selectedTime ?? ''}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option value='' disabled>
                        Выберите время
                      </option>
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}
            </div>
          )}

          {/* ---------- 3) Выбор мастера — показываем только если selectedTime избран и мы получили masters ---------- */}
          {selectedTime && (
            <div className={styles.date__picker}>
              <label className={styles.label}>Выберите мастера</label>

              {isLoadingMasters || isLoadingMasters === undefined ? null : null}

              {isLoadingMasters && (
                <p className={styles.loadingText}>Загрузка мастеров...</p>
              )}

              {!isLoadingMasters && masters.length === 0 ? (
                <p className={styles.no_masters}>
                  Нет мастеров, доступных на это время
                </p>
              ) : (
                !isLoadingMasters && (
                  <select
                    className={styles.masterSelect}
                    value={selectedMaster ?? ''}
                    onChange={(e) => setSelectedMaster(e.target.value)}
                  >
                    <option value='' disabled>
                      Выберите мастера
                    </option>
                    {masters.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.firstName} {m.lastName}
                      </option>
                    ))}
                  </select>
                )
              )}
            </div>
          )}
        </div>

        {/* ---------- Кнопка "Заказать" (активна только если выбраны дата+время+мастер) ---------- */}
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
