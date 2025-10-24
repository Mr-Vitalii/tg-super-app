// src/services/categoriesApi.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { Category } from '@/modules/services/data/categories'
import { categories as mockCategories } from '@/modules/services/data/categories'

/**
 * Локальный baseQuery, имитирующий поведение сетевого запроса.
 * - args: объект или строка, указывает endpoint и опции (мы не используем сейчас)
 * - Возвращает { data } или { error }
 *
 * Когда будете готовы переходить на реальный сервер —
 * замените baseQuery на fetchBaseQuery({ baseUrl }) и оставьте endpoints без изменений.
 */
const localBaseQuery: BaseQueryFn<
  { url?: string; method?: string; params?: any } | string,
  unknown,
  { status?: number; error?: string }
> = async (args) => {
  // небольшая искусственная задержка, чтобы видеть загрузку в UI
  await new Promise((res) => setTimeout(res, 120))

  try {
    // В этой простой реализации мы смотрим на args.url или возвращаем категории по умолчанию
    // Можно расширить: если args.url === '/api/categories' return mockCategories
    // Для гибкости используем проверку на совпадение строки или поле url
    const url = typeof args === 'string' ? args : args?.url

    if (!url || url === '/api/categories' || url === 'getCategories') {
      return { data: mockCategories as Category[] }
    }

    // Если запрос не опознан — возвращаем ошибку
    return { error: { status: 404, error: 'Not found (local mock)' } }
  } catch (err: any) {
    return {
      error: {
        status: 500,
        error: err?.message ?? 'Local baseQuery error',
      },
    }
  }
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: localBaseQuery,
  endpoints: (build) => ({
    // GET /api/categories
    getCategories: build.query<Category[], void>({
      // Здесь query может быть пустым — baseQuery игнорирует args и возвращает mock
      query: () => ({ url: '/api/categories', method: 'GET' }),
      // Если нужно — добавьте transformResponse, providesTags и т.д.
      // transformResponse: (response: Category[]) => response,
    }),
  }),
})

export const { useGetCategoriesQuery } = categoriesApi
export default categoriesApi
