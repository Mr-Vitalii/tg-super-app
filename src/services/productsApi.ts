// src/services/productsApi.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import type { Service } from '@/common/types/services'
// import { baseQuery } from '@/services/baseQuery' // для работы с сервером

// ============================================================================
// ✅ 1️⃣ ЛОКАЛЬНЫЙ ВАРИАНТ (mock) — АКТИВЕН
// ============================================================================

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: async () => ({ data: {} }), // фиктивный baseQuery (не используется)
  endpoints: (build) => ({
    // 🔹 Получение всех услуг (странично, из mock-данных)
    getProducts: build.query<Service[], { page: number; limit?: number }>({
      async queryFn({ page, limit = 9 }) {
        try {
          const { services } = await import('@/modules/services/data/services')
          const start = (page - 1) * limit
          const paginated = services.slice(start, start + limit)
          await new Promise((r) => setTimeout(r, 300)) // имитация задержки
          return { data: paginated }
        } catch (err) {
          return {
            error: { status: 500, data: 'Ошибка загрузки услуг (mock)' },
          }
        }
      },
    }),

    // 🔹 Получение конкретной услуги (локально)
    getProduct: build.query<Service, string>({
      async queryFn(id) {
        try {
          const { services } = await import('@/modules/services/data/services')
          const found = services.find((s) => s.id === id)
          if (!found)
            return { error: { status: 404, data: 'Услуга не найдена (mock)' } }
          await new Promise((r) => setTimeout(r, 200))
          return { data: found }
        } catch (err) {
          return {
            error: { status: 500, data: 'Ошибка загрузки услуги (mock)' },
          }
        }
      },
    }),

    // 🔹 Услуги конкретной компании (локально)
    getCompanyServices: build.query<
      Service[],
      { companyId: string; page: number; limit?: number }
    >({
      async queryFn({ companyId, page, limit = 9 }) {
        try {
          const { services } = await import('@/modules/services/data/services')

          const filtered = services.filter((s) => s.companyId === companyId)
          const start = (page - 1) * limit
          const paginated = filtered.slice(start, start + limit)

          await new Promise((r) => setTimeout(r, 400)) // имитация задержки

          return { data: paginated }
        } catch (err) {
          return {
            error: { status: 500, data: 'Ошибка загрузки услуг (mock)' },
          }
        }
      },
    }),
  }),
})

/*
// ============================================================================
// 💤 2️⃣ РЕАЛЬНЫЙ ВАРИАНТ (через сервер) — ОТКЛЮЧЁН
// ============================================================================
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery, // ✅ используется общий baseQuery с X-Session-Id и X-Telegram-InitData
  endpoints: (build) => ({
    // 🔹 Получение всех услуг (странично)
    getProducts: build.query<Service[], { page: number; limit?: number }>({
      query: ({ page, limit = 9 }) =>
        `/api/products?page=${page}&limit=${limit}`,
    }),

    // 🔹 Получение конкретной услуги
    getProduct: build.query<Service, string>({
      query: (id) => `/api/services/${id}`,
    }),

    // 🔹 Услуги конкретной компании
    getCompanyServices: build.query<
      Service[],
      { companyId: string; page: number; limit?: number }
    >({
      query: ({ companyId, page, limit = 9 }) =>
        `/api/companies/${companyId}/services?page=${page}&limit=${limit}`,
    }),
  }),
})
*/

// ============================================================================
// 🔸 ЕДИНЫЙ ЭКСПОРТ ХУКОВ (общий для обоих режимов)
// ============================================================================
export const {
  useLazyGetProductsQuery,
  useGetProductQuery,
  useLazyGetCompanyServicesQuery,
} = productsApi

export default productsApi
