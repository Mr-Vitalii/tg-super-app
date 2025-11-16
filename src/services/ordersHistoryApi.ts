// src/modules/ordersHistory/api/ordersHistoryApi.ts

/* ===========================================================================
 * ЛОКАЛЬНЫЙ (mock) ВАРИАНТ — АКТИВЕН
 * ===========================================================================
 *
 * Для разработки офлайн/локально: queryFn работает с mockOrders.
 * Экспортируем те же хуки, что и в серверном варианте, чтобы компоненты
 * не зависели от режима.
 */

/* 

import { createApi } from '@reduxjs/toolkit/query/react'
import { mockOrders } from '@/modules/ordersHistory/data/mockOrders'
import type { OrderHistoryEntry } from '@/common/types/order'

// Параметры запроса для пагинации
export interface OrdersHistoryParams {
  limit: number
  offset: number
}

// Общий тип ответа, одинаковый для сервера и моков
export interface OrdersHistoryResponse {
  items: OrderHistoryEntry[]
  total: number
}

export const ordersHistoryApi = createApi({
  reducerPath: 'ordersHistoryApi',

  // корректный baseQuery для ручного (mock) режима
  baseQuery: async () => ({ data: {} }),

  endpoints: (build) => ({
    getOrdersHistory: build.query<OrdersHistoryResponse, OrdersHistoryParams>({
      async queryFn({ limit, offset }) {
        try {
          await new Promise((r) => setTimeout(r, 120))

          const total = mockOrders.length
          const items = mockOrders.slice(offset, offset + limit)

          console.log('getOrdersHistory', { total, items })

          return {
            data: {
              items,
              total,
            },
          }
        } catch (error: any) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              data: error.message || 'Unknown error',
            },
          }
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

export interface OrdersHistoryParams {
  limit: number
  offset: number
}

// Общий тип ответа, одинаковый для сервера и моков
export interface OrdersHistoryResponse {
  items: OrderHistoryEntry[]
  total: number
}

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/services/baseQuery'
import type { OrderHistoryEntry } from '@/common/types/order'

export const ordersHistoryApi = createApi({
  reducerPath: 'ordersHistoryApi',
  baseQuery,

  endpoints: (build) => ({
    getOrdersHistory: build.query<OrdersHistoryResponse, OrdersHistoryParams>({
      query: ({ limit, offset }) => ({
        url: `/api/orders/history?limit=${limit}&offset=${offset}`,
        method: 'GET',
      }),

      // backend должен вернуть: { items: [], total: number }
      transformResponse: (response: any) => {
        if (!response || typeof response !== 'object') {
          return { items: [], total: 0 }
        }

        return {
          items: Array.isArray(response.items) ? response.items : [],
          total: Number(response.total) || 0,
        }
      },
    }),
  }),
})

export const { useGetOrdersHistoryQuery, useLazyGetOrdersHistoryQuery } =
  ordersHistoryApi

export default ordersHistoryApi
