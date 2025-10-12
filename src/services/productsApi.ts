import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Service } from '@/common/types/services'

const BASE_URL = 'https://tg5-evst.amvera.io'

export const productsApi = createApi({
  reducerPath: 'productsApi',
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
    getProducts: build.query<Service[], { page: number; limit?: number }>({
      query: ({ page, limit = 9 }) =>
        `/api/products?page=${page}&limit=${limit}`,
    }),
    getProduct: build.query<Service, string>({
      query: (id) => `/api/products/${id}`,
    }),
  }),
})

export const { useLazyGetProductsQuery, useGetProductQuery } = productsApi
