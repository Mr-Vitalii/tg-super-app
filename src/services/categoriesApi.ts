import { createApi } from '@reduxjs/toolkit/query/react'
import type { Category } from '@/modules/services/data/categories'
/* import { categories as mockCategories } from '@/modules/services/data/categories' */
import { baseQuery } from './baseQuery' // ✅ используем общий baseQuery

/* ============================================================
 * 🔹 Вариант 1: ЛОКАЛЬНЫЙ режим (mock, когда сервер недоступен)
 * ============================================================ */
// const localBaseQuery: BaseQueryFn = async () => {
//   await new Promise((res) => setTimeout(res, 150))
//   return { data: mockCategories }
// }

/* ============================================================
 * 🔹 Вариант 2: РЕАЛЬНЫЙ запрос на сервер (с авторизацией)
 * ============================================================ */

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery, // ✅ базовый запрос с поддержкой X-Session-Id
  // baseQuery: localBaseQuery, // 🧩 ← включи для офлайн-режима
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => ({
        url: '/api/categories',
        method: 'GET',
      }),
      // transformResponse: (response: { data: Category[] }) => response.data,
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
export default categoriesApi
