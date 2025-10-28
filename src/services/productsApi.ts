import { createApi } from '@reduxjs/toolkit/query/react'
import type { Service } from '@/common/types/services'
import { baseQuery } from '@/services/baseQuery' // ✅ используем общий baseQuery

/* import { services as localServices } from '@/modules/services/data/services' */

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery, // ✅ подключаем общий baseQuery с X-Session-Id и X-Telegram-InitData
  endpoints: (build) => ({
    // ===============================
    // 🔹 Получение всех услуг (странично)
    // ===============================
    getProducts: build.query<Service[], { page: number; limit?: number }>({
      query: ({ page, limit = 9 }) =>
        `/api/products?page=${page}&limit=${limit}`,
    }),

    // ===============================
    // 🔹 Получение конкретной услуги
    // ===============================
    getProduct: build.query<Service, string>({
      query: (id) => `/api/services/${id}`,
    }),

    // ===============================
    // 🔹 Услуги конкретной компании (запрос на сервер)
    // ===============================
    getCompanyServices: build.query<
      Service[],
      { companyId: string; page: number; limit?: number }
    >({
      query: ({ companyId, page, limit = 9 }) =>
        `/api/companies/${companyId}/services?page=${page}&limit=${limit}`,
    }),

    // ===============================
    // 🔸 Старый локальный вариант (на случай оффлайна)
    // ===============================
    /*
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
          return { error: { status: 500, data: 'Ошибка загрузки услуг' } }
        }
      },
    }),
    */
  }),
})

// ===============================
// Экспорт хуков
// ===============================
export const {
  useLazyGetProductsQuery,
  useGetProductQuery,
  useLazyGetCompanyServicesQuery,
} = productsApi
