// ============================================================================
// ✅ ЛОКАЛЬНЫЙ (mock) ВАРИАНТ — АКТИВЕН
// ============================================================================

/* import { createApi } from '@reduxjs/toolkit/query/react'
import type { Master } from '@/common/types/masters'
import { masters } from '@/modules/services/data/masters'
import { normalizeAndSortTimes, normalizeTime } from '@/utils/helpers'

export const mastersApi = createApi({
  reducerPath: 'mastersApi',

  // локальная база — не ходим на сервер
  baseQuery: async () => ({ data: null }),

  endpoints: (builder) => ({
    // ------------------------------------------------------------------------
    // 🔹 1️⃣ "ВЫБОР МАСТЕРА ПО ДАТЕ"
    // ------------------------------------------------------------------------
    getAvailableMasters: builder.query<
      Master[],
      { companyId: string; serviceId: string; date: string; time?: string }
    >({
      queryFn: async ({ serviceId, date, time }) => {
        try {
          const normReqTime = time ? normalizeTime(time) : undefined

          const filtered = masters
            .filter((m) => m.services.some((s) => s.id === serviceId))
            .map((m) => {
              const matchedDates = m.availableDates
                .filter((d) => d.date === date)
                .map((d) => ({
                  date: d.date,
                  times: normalizeAndSortTimes(d.times),
                }))

              return {
                ...m,
                availableDates: matchedDates,
              }
            })
            .filter((m) =>
              normReqTime
                ? m.availableDates.some((d) => d.times.includes(normReqTime))
                : m.availableDates.length > 0
            )

          await new Promise((r) => setTimeout(r, 120)) // имитация latency
          return { data: filtered }
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', data: e } as any }
        }
      },
    }),

    // ------------------------------------------------------------------------
    // 🔹 2️⃣ "ВЫБОР ПО МАСТЕРУ"
    // ------------------------------------------------------------------------
    getMastersByService: builder.query<
      Master[],
      { companyId: string; serviceId: string }
    >({
      queryFn: async ({ companyId, serviceId }) => {
        try {
          console.log('companyId', companyId, 'serviceId', serviceId)

          // companyId в мастерах — number, в роутинге — string (comp-1/comp-2/...).
          // Предположим, companyId приходит в формате 'comp-1' — нужно привести к числу.
          // Если у вас другой формат, замените логику преобразования на нужную.
          // Здесь поддерживаем два варианта: '1'|'2'|'3'|'4' или 'comp-1'...
          const extractNumeric = (cid: string) => {
            const match = cid.match(/\d+$/)
            return match ? Number(match[0]) : Number(cid)
          }

          const numericCompanyId = extractNumeric(companyId)

          const filtered = masters
            .filter(
              (m) =>
                m.companyId === numericCompanyId &&
                m.services.some((s) => s.id === serviceId)
            )
            .map((m) => ({
              ...m,
              availableDates: m.availableDates.map((d) => ({
                date: d.date,
                times: normalizeAndSortTimes(d.times),
              })),
            }))

          await new Promise((r) => setTimeout(r, 100))
          return { data: filtered }
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', data: e } as any }
        }
      },
    }),

    // ------------------------------------------------------------------------
    // 🔹 3️⃣ "РАСПИСАНИЕ КОНКРЕТНОГО МАСТЕРА"
    // ------------------------------------------------------------------------
    getMasterAvailability: builder.query<
      Master | null,
      { companyId: string; serviceId: string; masterId: string }
    >({
      queryFn: async ({ serviceId, masterId }) => {
        try {
          const master = masters.find(
            (m) =>
              m.id === masterId && m.services.some((s) => s.id === serviceId)
          )
          if (!master) return { data: null }

          const normalized = {
            ...master,
            availableDates: master.availableDates.map((d) => ({
              date: d.date,
              times: normalizeAndSortTimes(d.times),
            })),
          }

          await new Promise((r) => setTimeout(r, 100))
          return { data: normalized }
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', data: e } as any }
        }
      },
    }),

    // ------------------------------------------------------------------------
    // 4. НОВЫЙ: ПОЛУЧИТЬ ВСЕХ МАСТЕРОВ КОМПАНИИ
    // ------------------------------------------------------------------------
    getMastersByCompany: builder.query<Master[], { companyId: string }>({
      queryFn: async ({ companyId }) => {
        try {
          // companyId в мастерах — number, в роутинге — string (comp-1/comp-2/...).
          // Предположим, companyId приходит в формате 'comp-1' — нужно привести к числу.
          // Если у вас другой формат, замените логику преобразования на нужную.
          // Здесь поддерживаем два варианта: '1'|'2'|'3'|'4' или 'comp-1'...
          const extractNumeric = (cid: string) => {
            const match = cid.match(/\d+$/)
            return match ? Number(match[0]) : Number(cid)
          }

          const numericCompanyId = extractNumeric(companyId)

          const filtered = masters
            .filter((m) => Number(m.companyId) === numericCompanyId)
            .map((m) => ({
              ...m,
              availableDates: m.availableDates.map((d) => ({
                date: d.date,
                times: normalizeAndSortTimes(d.times),
              })),
            }))

          await new Promise((r) => setTimeout(r, 100))
          return { data: filtered }
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', data: e } as any }
        }
      },
    }),
  }),
})

// -----------------------------------------------------------------------------
// 🔹 Экспорт хуков (единый для локального и серверного режима)
// -----------------------------------------------------------------------------
export const {
  useGetAvailableMastersQuery,
  useLazyGetAvailableMastersQuery,
  useGetMastersByServiceQuery,
  useLazyGetMastersByServiceQuery,
  useGetMasterAvailabilityQuery,
  useLazyGetMasterAvailabilityQuery,
  useGetMastersByCompanyQuery,
  useLazyGetMastersByCompanyQuery,
} = mastersApi

export default mastersApi */

// ============================================================================
// ✅ СЕРВЕРНЫЙ ВАРИАНТ — АКТИВЕН
// ============================================================================
//
// Поддерживаются два режима работы:
//
// 1️⃣ Режим "Выбор мастера по дате"
//     → метод: getAvailableMasters()
//     → параметры: { companyId, serviceId, date, time? }
//
//     Возвращает список мастеров компании, предоставляющих услугу serviceId,
//     у которых есть слоты в указанную дату (и время, если указано).
//
// 2️⃣ Режим "Выбор по мастеру"
//     → метод: getMastersByService()   — получить всех мастеров компании по услуге
//     → метод: getMasterAvailability() — получить доступные даты/время конкретного мастера
//
//     2.1 getMastersByService() принимает параметры: { companyId, serviceId }
//         Возвращает список мастеров компании, выполняющих указанную услугу.
//
//     2.2 getMasterAvailability() принимает параметры: { companyId, serviceId, masterId }
//         Возвращает доступные даты и время конкретного мастера.
//

import { createApi } from '@reduxjs/toolkit/query/react'
import type { Master } from '@/common/types/masters'
import { baseQuery } from '@/services/baseQuery'
import { normalizeAndSortTimes } from '@/utils/helpers'

export const mastersApi = createApi({
  reducerPath: 'mastersApi',
  baseQuery, // общий baseQuery: добавляет X-Session-Id и X-Telegram-InitData
  endpoints: (builder) => ({
    // ------------------------------------------------------------------------
    // 🔹 1️⃣ ВАРИАНТ: "ВЫБОР МАСТЕРА ПО ДАТЕ"
    // ------------------------------------------------------------------------
    getAvailableMasters: builder.query<
      Master[],
      { companyId: string; serviceId: string; date: string; time?: string }
    >({
      // companyId  — идентификатор компании
      // serviceId  — идентификатор услуги
      // date       — дата, на которую ищем мастеров (формат YYYY-MM-DD)
      // time?      — необязательный параметр: конкретное время (если пользователь выбрал)

      query: ({ companyId, serviceId, date, time }) => {
        const params = new URLSearchParams({ companyId, serviceId, date })
        if (time) params.append('time', time)
        return {
          url: `/api/masters/available?${params.toString()}`,
          method: 'GET',
        }
      },

      // Приводим временные слоты к единому формату ("HH:mm") и сортируем.
      // Это важно, если сервер возвращает неотсортированные или разнородные строки времени.

      transformResponse: (response: any) => {
        if (!Array.isArray(response)) return []
        return response.map((m: any) => ({
          ...m,
          availableDates: Array.isArray(m.availableDates)
            ? m.availableDates.map((d: any) => ({
                date: d.date,
                times: normalizeAndSortTimes(d.times || []),
              }))
            : [],
        })) as Master[]
      },
    }),

    // ------------------------------------------------------------------------
    // 🔹 2️⃣ ВАРИАНТ: "ВЫБОР ПО МАСТЕРУ"
    // ------------------------------------------------------------------------

    // 2.1 Получить всех мастеров компании, выполняющих услугу
    getMastersByService: builder.query<
      Master[],
      { companyId: string; serviceId: string }
    >({
      // companyId — идентификатор компании
      // serviceId — идентификатор услуги

      query: ({ companyId, serviceId }) => {
        const params = new URLSearchParams({ companyId, serviceId })
        return {
          url: `/api/masters/by-service?${params.toString()}`,
          method: 'GET',
        }
      },
      transformResponse: (response: any) => {
        if (!Array.isArray(response)) return []
        return response.map((m: any) => ({
          ...m,
          availableDates: Array.isArray(m.availableDates)
            ? m.availableDates.map((d: any) => ({
                date: d.date,
                times: normalizeAndSortTimes(d.times || []),
              }))
            : [],
        })) as Master[]
      },
    }),

    // 2.2 Получить доступное расписание (даты/время) конкретного мастера
    getMasterAvailability: builder.query<
      Master,
      { companyId: string; serviceId: string; masterId: string }
    >({
      // companyId — идентификатор компании
      // serviceId — идентификатор услуги
      // masterId  — идентификатор выбранного мастера

      query: ({ companyId, serviceId, masterId }) => {
        const params = new URLSearchParams({ companyId, serviceId, masterId })
        return {
          url: `/api/masters/availability?${params.toString()}`,
          method: 'GET',
        }
      },
      transformResponse: (response: any) => {
        if (!response) return null as any
        const m = response as any
        return {
          ...m,
          availableDates: Array.isArray(m.availableDates)
            ? m.availableDates.map((d: any) => ({
                date: d.date,
                times: normalizeAndSortTimes(d.times || []),
              }))
            : [],
        } as Master
      },
    }),

    // ------------------------------
    // NEW: getMastersByCompany (server)
    // ------------------------------
    getMastersByCompany: builder.query<Master[], { companyId: string }>({
      query: ({ companyId }) => {
        const params = new URLSearchParams({ companyId })
        return {
          url: `/api/masters/by-company?${params.toString()}`,
          method: 'GET',
        }
      },
      transformResponse: (response: any) => {
        if (!Array.isArray(response)) return []
        return response.map((m: any) => ({
          ...m,
          availableDates: Array.isArray(m.availableDates)
            ? m.availableDates.map((d: any) => ({
                date: d.date,
                times: normalizeAndSortTimes(d.times || []),
              }))
            : [],
        })) as Master[]
      },
    }),
  }),
})

// -----------------------------------------------------------------------------
// 🔹 Экспорт хуков
// -----------------------------------------------------------------------------
export const {
  useGetAvailableMastersQuery,
  useLazyGetAvailableMastersQuery,
  useGetMastersByServiceQuery,
  useLazyGetMastersByServiceQuery,
  useGetMasterAvailabilityQuery,
  useLazyGetMasterAvailabilityQuery,
  useGetMastersByCompanyQuery,
  useLazyGetMastersByCompanyQuery,
} = mastersApi

export default mastersApi

// ============================================================================
// 💡 Примечания:
// - Все запросы — GET, параметры передаются через URLSearchParams (надёжно и безопасно).
// - transformResponse нормализует массивы времени с помощью normalizeAndSortTimes()
//   → гарантирует единый формат ("HH:mm") и сортировку даже при непоследовательном ответе сервера.
// - Используется централизованный baseQuery (автоматически добавляет заголовки X-Session-Id и X-Telegram-InitData).
// - Все хуки (включая ленивые useLazy...) доступны и для server, и для mock режима.
// ============================================================================
