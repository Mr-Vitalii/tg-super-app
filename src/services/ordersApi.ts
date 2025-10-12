import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Order } from '@/common/types/order'

const BASE_URL = 'https://tg5-evst.amvera.io'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const sid = localStorage.getItem('sid')
        if (sid) headers.set('X-Session-Id', sid)
      }
      try {
        const tg = (window as any).Telegram?.WebApp
        if (tg?.initData) headers.set('X-Telegram-InitData', tg.initData)
      } catch {
        // noop
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    createOrder: build.mutation<{ success: boolean; orderId?: string }, Order>({
      query: (order) => ({
        url: '/api/orders',
        method: 'POST',
        body: order,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
})

export const { useCreateOrderMutation } = ordersApi
