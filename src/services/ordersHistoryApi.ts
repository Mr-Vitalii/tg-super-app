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


export const ordersHistoryApi = createApi({
  reducerPath: 'ordersHistoryApi',
  // локально не используем baseQuery
  baseQuery: async () => ({ data: null }),
  endpoints: (build) => ({
    // Получить историю заказов — без аргументов (сервер идентифицирует пользователя)
    getOrdersHistory: build.query<OrderHistoryEntry[], void>({
      queryFn: async () => {
        try {
          // имитация latency
          await new Promise((r) => setTimeout(r, 120))
          // Возвращаем mock-данные
          return { data: mockOrders }
        } catch (e) {
          return { error: { status: 'CUSTOM_ERROR', data: e } as any }
        }
      },
    }),
  }),
})

// Экспорт хуков (одинаково для mock и server)
export const { useGetOrdersHistoryQuery, useLazyGetOrdersHistoryQuery } =
  ordersHistoryApi

export default ordersHistoryApi */

/* ===========================================================================
 * СЕРВЕРНЫЙ ВАРИАНТ (раскомментируйте для подключения к реальному API)
 * =========================================================================== */

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/services/baseQuery'
import type { OrderHistoryEntry } from '@/common/types/order'

export const ordersHistoryApi = createApi({
  reducerPath: 'ordersHistoryApi',
  baseQuery, // общий baseQuery: добавляет X-Session-Id и X-Telegram-InitData
  endpoints: (build) => ({
    getOrdersHistory: build.query<OrderHistoryEntry[], void>({
      query: () => ({
        url: '/api/orders/history',
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        // При необходимости можно нормализовать/фильтровать ответ
        return Array.isArray(response) ? response : []
      },
    }),
  }),
})

export const { useGetOrdersHistoryQuery, useLazyGetOrdersHistoryQuery } =
  ordersHistoryApi

export default ordersHistoryApi
