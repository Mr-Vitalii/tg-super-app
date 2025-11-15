/* ============================================================
 * 🔹 Вариант 1: ЛОКАЛЬНЫЙ режим (mock, офлайн)
 * ============================================================ */

/* import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import type { Category } from '@/modules/services/data/categories'
import { categories as mockCategories } from '@/modules/services/data/categories'

const localBaseQuery: BaseQueryFn = async () => {
  await new Promise((res) => setTimeout(res, 150))
  return { data: mockCategories }
}

const activeBaseQuery = localBaseQuery */

/* ============================================================
 * 🔹 Вариант 2: РЕАЛЬНЫЙ запрос на сервер (онлайн)
 * ============================================================ */
import { baseQuery } from './baseQuery' // ✅ основной запрос с X-Session-Id
const activeBaseQuery = baseQuery

/* ============================================================
 * 🔹 API
 * ============================================================ */

import { createApi } from '@reduxjs/toolkit/query/react'
import type { Category } from '@/modules/services/data/categories'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: activeBaseQuery,
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => ({
        url: '/api/categories',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
export default categoriesApi
