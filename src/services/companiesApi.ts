/* import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { Company } from '@/common/types/services'
import { companies as mockCompanies } from '@/modules/services/data/companies'

const localBaseQuery: BaseQueryFn<
  { url?: string; params?: Record<string, unknown> } | string,
  unknown,
  { status?: number; error?: string }
> = async (args) => {
  await new Promise((res) => setTimeout(res, 120))

  try {
    const url = typeof args === 'string' ? args : args?.url
    const params = typeof args === 'string' ? undefined : args?.params

    if (url === '/api/companies') {
      if (
        params &&
        typeof params.categoryId === 'string' &&
        params.categoryId.trim() !== ''
      ) {
        return {
          data: mockCompanies.filter(
            (c) => c.categoryId === params.categoryId
          ) as Company[],
        }
      }

      return { data: mockCompanies as Company[] }
    }

    return { error: { status: 404, error: 'Not found (local mock)' } }
  } catch (err: any) {
    return { error: { status: 500, error: err?.message ?? 'Local error' } }
  }
}

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: localBaseQuery,
  endpoints: (build) => ({
    getCompanies: build.query<Company[], string | undefined>({
      query: (categoryId) =>
        categoryId?.trim()
          ? { url: '/api/companies', params: { categoryId } }
          : { url: '/api/companies' }, 
    }),
  }),
})

export const { useGetCompaniesQuery } = companiesApi */

///////////////////////////////////////////////////////////////////////////////////////////////////

// src/services/companiesApi.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import type { Company } from '@/common/types/services'
import { baseQuery } from '@/services/baseQuery' // ✅ универсальный baseQuery

// 💤 Локальные mock-данные (оставляем для офлайна или тестов)
/* import { companies as mockCompanies } from '@/modules/services/data/companies' */

// ============================================================================
// 💤 1️⃣ ЛОКАЛЬНЫЙ ВАРИАНТ (mock) — отключён, но можно включить при офлайне
// ============================================================================
/*
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

const localBaseQuery: BaseQueryFn<
  { url?: string; params?: Record<string, unknown> } | string,
  unknown,
  { status?: number; error?: string }
> = async (args) => {
  await new Promise((res) => setTimeout(res, 120))

  try {
    const url = typeof args === 'string' ? args : args?.url
    const params = typeof args === 'string' ? undefined : args?.params

    if (url === '/api/companies') {
      if (
        params &&
        typeof params.categoryId === 'string' &&
        params.categoryId.trim() !== ''
      ) {
        return {
          data: mockCompanies.filter(
            (c) => c.categoryId === params.categoryId
          ) as Company[],
        }
      }

      return { data: mockCompanies as Company[] }
    }

    return { error: { status: 404, error: 'Not found (local mock)' } }
  } catch (err: any) {
    return { error: { status: 500, error: err?.message ?? 'Local error' } }
  }
}
*/

// ============================================================================
// ✅ 2️⃣ РЕАЛЬНЫЙ ВАРИАНТ (использует общий baseQuery)
// ============================================================================
export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery, // ✅ используем общий базовый запрос с авторизацией
  endpoints: (build) => ({
    /**
     * GET /api/companies
     * Можно передать categoryId (необязательно)
     */
    getCompanies: build.query<Company[], string | undefined>({
      query: (categoryId) => {
        if (categoryId?.trim()) {
          return {
            url: '/api/companies',
            method: 'GET',
            params: { categoryId },
          }
        }
        return { url: '/api/companies', method: 'GET' }
      },
    }),
  }),
})

export const { useGetCompaniesQuery } = companiesApi
export default companiesApi
