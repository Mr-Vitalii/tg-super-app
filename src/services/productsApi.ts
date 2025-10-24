import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Service } from '@/common/types/services'

/* import { services as localServices } from '@/modules/services/data/services' */

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

    /*     // ✅ Новый endpoint — услуги конкретной компании (пока из локального файла)
    getCompanyServices: build.query<
      Service[],
      { companyId: string; page: number; limit?: number }
    >({
      // ❗ Используем "queryFn", чтобы не дергать настоящий сервер
      async queryFn({ companyId, page, limit = 9 }) {
        try {
          const filtered = localServices.filter(
            (s) => s.companyId === companyId
          )
          const start = (page - 1) * limit
          const paginated = filtered.slice(start, start + limit)

          return { data: paginated }
        } catch (e) {
          return { error: { status: 500, data: 'Ошибка при загрузке услуг' } }
        }
      },
    }), */

    /*     // ✅ Новый endpoint — услуги конкретной компании (тоже для локального файла - другая логика)
    getCompanyServices: build.query<
      Service[],
      { companyId: string; page: number; limit?: number }
    >({
      // Временный локальный источник данных
      queryFn: async ({ companyId, page, limit = 9 }) => {
        try {
          const { services } = await import('@/modules/services/data/services')
          const filtered = services.filter((s) => s.companyId === companyId)
          const start = (page - 1) * limit
          const paginated = filtered.slice(start, start + limit)
          return { data: paginated }
        } catch (err) {
          return { error: { status: 500, data: 'Ошибка загрузки услуг' } }
        }
      },
    }), */
    getCompanyServices: build.query<
      Service[],
      { companyId: string; page: number; limit?: number }
    >({
      async queryFn({ companyId, page, limit = 9 }) {
        try {
          const { services } = await import('@/modules/services/data/services')

          // ✅ Фильтрация по companyId + пагинация
          const filtered = services.filter((s) => s.companyId === companyId)
          const start = (page - 1) * limit
          const paginated = filtered.slice(start, start + limit)

          // ✅ Имитация задержки 400ms — как будто сервер обрабатывает
          await new Promise((r) => setTimeout(r, 400))

          return { data: paginated }
        } catch (err) {
          return { error: { status: 500, data: 'Ошибка загрузки услуг' } }
        }
      },
    }),
  }),
})

/* export const { useLazyGetProductsQuery, useGetProductQuery } = productsApi */

export const {
  useLazyGetProductsQuery,
  useGetProductQuery,
  /* useGetCompanyServicesQuery, */
  useLazyGetCompanyServicesQuery,
} = productsApi
