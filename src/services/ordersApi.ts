import { createApi } from '@reduxjs/toolkit/query/react'
import type { Order } from '@/common/types/order'
import { baseQuery } from '@/services/baseQuery' // ✅ используем общий baseQuery

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery, // ✅ подставляем универсальный baseQuery
  endpoints: (build) => ({
    // --- Создание заказа ---
    createOrder: build.mutation<{ success: boolean; orderId?: string }, Order>({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: order,
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = ordersApi
