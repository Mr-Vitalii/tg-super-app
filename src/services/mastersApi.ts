import { createApi } from '@reduxjs/toolkit/query/react'
import type { Master } from '@/common/types/masters'
import { masters } from '@/modules/services/data/masters'
import { normalizeAndSortTimes, normalizeTime } from '@/utils/helpers'

// ============================================================================
// ✅ ЛОКАЛЬНЫЙ (mock) ВАРИАНТ — АКТИВЕН
// ============================================================================

export const mastersApi = createApi({
  reducerPath: 'mastersApi',

  // локальная база — не ходим на сервер
  baseQuery: async () => ({ data: null }),

  endpoints: (builder) => ({
    /**
     * 🔹 getAvailableMasters:
     * Используется в режиме "Выбор мастера по дате".
     * Возвращает мастеров, у которых есть слоты на указанную дату (и время, если задано).
     *
     * params: { serviceId, date, time? }
     */
    getAvailableMasters: builder.query<
      Master[],
      { serviceId: string; date: string; time?: string }
    >({
      queryFn: async ({ serviceId, date, time }) => {
        try {
          const normReqTime = time ? normalizeTime(time) : undefined

          const filtered = masters
            .filter((m) => m.services.includes(serviceId))
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
          return {
            error: {
              status: 'CUSTOM_ERROR',
              data: e,
            } as any,
          }
        }
      },
    }),

    /**
     * 🔹 getMastersByService:
     * Используется в режиме "Выбор по мастеру".
     * Возвращает всех мастеров, предоставляющих данную услугу (serviceId),
     * вместе со всеми их доступными датами и временем.
     *
     * params: { serviceId }
     */
    getMastersByService: builder.query<Master[], { serviceId: string }>({
      queryFn: async ({ serviceId }) => {
        try {
          const filtered = masters
            .filter((m) => m.services.includes(serviceId))
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
          return {
            error: {
              status: 'CUSTOM_ERROR',
              data: e,
            } as any,
          }
        }
      },
    }),
  }),
})

// 🔹 Экспорт хуков (общий для локальной и серверной версии)
export const {
  useGetAvailableMastersQuery,
  useLazyGetAvailableMastersQuery,
  useGetMastersByServiceQuery,
  useLazyGetMastersByServiceQuery,
} = mastersApi

export default mastersApi

// ============================================================================
// 💤 СЕРВЕРНЫЙ ВАРИАНТ (ПРИМЕР) — ОТКЛЮЧЁН
// ============================================================================
//
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Master } from '@/common/types/masters'
//
// export const mastersApi = createApi({
//   reducerPath: 'mastersApi',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
//   endpoints: (builder) => ({
//     /**
//      * Серверный endpoint для режима "по дате".
//      * GET /api/masters/available?serviceId=...&date=...&time=...
//      */
//     getAvailableMasters: builder.query<
//       Master[],
//       { serviceId: string; date: string; time?: string }
//     >({
//       query: ({ serviceId, date, time }) => {
//         const params = new URLSearchParams({ serviceId, date })
//         if (time) params.append('time', time)
//         return {
//           url: `/masters/available?${params.toString()}`,
//           method: 'GET',
//         }
//       },
//     }),
//
//     /**
//      * Серверный endpoint для режима "по мастеру".
//      * GET /api/masters/by-service?serviceId=...
//      */
//     getMastersByService: builder.query<Master[], { serviceId: string }>({
//       query: ({ serviceId }) => ({
//         url: `/masters/by-service?serviceId=${serviceId}`,
//         method: 'GET',
//       }),
//     }),
//   }),
// })
//
// export const {
//   useGetAvailableMastersQuery,
//   useLazyGetAvailableMastersQuery,
//   useGetMastersByServiceQuery,
//   useLazyGetMastersByServiceQuery,
// } = mastersApi
//
// export default mastersApi
//
// ============================================================================
// 💡 Переключение режима:
//    • Для работы с сервером: закомментируйте локальный блок выше и
//      раскомментируйте серверный блок.
//    • Хуки и интерфейсы полностью совместимы, правки в компонентах не требуются.
// ============================================================================
