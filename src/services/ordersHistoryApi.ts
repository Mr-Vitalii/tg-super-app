// src/modules/ordersHistory/api/ordersHistoryApi.ts

/* ===========================================================================
 * ЛОКАЛЬНЫЙ (mock) ВАРИАНТ — АКТИВЕН
 * ===========================================================================
 *
 * Для разработки офлайн/локально: queryFn работает с mockOrders.
 * Экспортируем те же хуки, что и в серверном варианте, чтобы компоненты
 * не зависели от режима.
 */

/* import { createApi } from '@reduxjs/toolkit/query/react'
import { mockOrders } from '@/modules/ordersHistory/data/mockOrders'
import type { OrderHistoryEntry } from '@/common/types/order'

// Параметры запроса для пагинации
export interface OrdersHistoryParams {
  limit: number
  offset: number
}

export const ordersHistoryApi = createApi({
  reducerPath: 'ordersHistoryApi',
  baseQuery: async () => ({ data: null }),
  endpoints: (build) => ({
    getOrdersHistory: build.query<OrderHistoryEntry[], OrdersHistoryParams>({
      queryFn: async ({ limit, offset }) => {
        try {
          // имитация задержки
          await new Promise((r) => setTimeout(r, 120))

          const slice = mockOrders.slice(offset, offset + limit)

          return { data: slice }
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', data: e } as any }
        }
      },
    }),
  }),
})

export const { useGetOrdersHistoryQuery, useLazyGetOrdersHistoryQuery } =
  ordersHistoryApi

export default ordersHistoryApi */

/* ===========================================================================
 * СЕРВЕРНЫЙ ВАРИАНТ (раскомментируйте для подключения к реальному API)
 * =========================================================================== */

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/services/baseQuery'
import type { OrderHistoryEntry } from '@/common/types/order'

export interface OrdersHistoryParams {
  limit: number
  offset: number
}

export const ordersHistoryApi = createApi({
  reducerPath: 'ordersHistoryApi',
  baseQuery,
  endpoints: (build) => ({
    getOrdersHistory: build.query<OrderHistoryEntry[], OrdersHistoryParams>({
      query: ({ limit, offset }) => ({
        url: `/api/orders/history?limit=${limit}&offset=${offset}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        return Array.isArray(response) ? response : []
      },
    }),
  }),
})

export const { useGetOrdersHistoryQuery, useLazyGetOrdersHistoryQuery } =
  ordersHistoryApi

export default ordersHistoryApi
