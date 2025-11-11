// src/services/companiesApi.ts
/* import { createApi } from '@reduxjs/toolkit/query/react'
import type { Company } from '@/common/types/services' */

// 💤 Локальные mock-данные (оставляем для офлайна или тестов)
/* import { companies as mockCompanies } from '@/modules/services/data/companies' */

// ============================================================================
// 💤 1️⃣ ЛОКАЛЬНЫЙ ВАРИАНТ (mock) — отключён, но можно включить при офлайне
// ============================================================================

/* import type { BaseQueryFn } from '@reduxjs/toolkit/query'

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
} */

// ============================================================================
// ✅ 2️⃣ РЕАЛЬНЫЙ ВАРИАНТ (использует общий baseQuery)
// ============================================================================
/* 
import { baseQuery } from '@/services/baseQuery' // ✅ универсальный baseQuery

export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery, // ✅ используем общий базовый запрос с авторизацией
  endpoints: (build) => ({
    //  GET /api/companies
    //  Можно передать categoryId (необязательно)

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
}) */

// ============================================================================
// ✅ 3️⃣ АКТИВНЫЙ mock API
// ============================================================================
/* export const companiesApi = createApi({
  reducerPath: 'companiesApi',
  baseQuery: localBaseQuery, // ✅ используем локальный mock
  endpoints: (build) => ({
    getCompanies: build.query<Company[], string | undefined>({
      query: (categoryId) => {
        if (categoryId?.trim()) {
          return { url: '/api/companies', params: { categoryId } }
        }
        return { url: '/api/companies' }
      },
    }),
  }),
})

export const { useGetCompaniesQuery } = companiesApi
export default companiesApi */

import { createApi } from '@reduxjs/toolkit/query/react'
import type { Company } from '@/common/types/services'

/* ============================================================
   1) МОК ДЛЯ ЛОКАЛЬНОЙ РАЗРАБОТКИ
   (СОХРАНЯЕМ: чтобы переключать режимы одной строкой)
   ============================================================ */

/* 
import { companies as mockCompanies } from '@/modules/services/data/companies'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

// локальный baseQuery → имитирует сетевой запрос
const localBaseQuery: BaseQueryFn<
  { url?: string; params?: Record<string, unknown> } | string,
  unknown,
  { status?: number; error?: string }
> = async (args) => {
  await new Promise((res) => setTimeout(res, 120)) // имитация задержки

  try {
    const url = typeof args === 'string' ? args : args?.url
    const params = typeof args === 'string' ? undefined : args?.params

    // GET /api/companies
    if (url === '/api/companies') {
      if (params?.categoryId) {
        return {
          data: mockCompanies.filter(
            (c) => c.categoryId === params.categoryId
          ) as Company[],
        }
      }
      return { data: mockCompanies as Company[] }
    }

    // GET /api/companies/:id
    if (url?.startsWith('/api/company/')) {
      const companyId = url.replace('/api/company/', '').trim()
      const company = mockCompanies.find((c) => c.id === companyId)
      if (company) return { data: company }
      return { error: { status: 404, error: 'Company not found' } }
    }

    return { error: { status: 404, error: 'Not found (mock)' } }
  } catch (err: any) {
    return { error: { status: 500, error: err?.message ?? 'Mock error' } }
  }
} */

/* ============================================================
   2) РЕАЛЬНЫЙ API ЗАПРОС (готов к использованию)
   — просто раскомментировать baseQuery и закомментировать mock
   ============================================================ */

import { baseQuery } from '@/services/baseQuery'

/* ============================================================
   3) Объявление API (общие хуки для обоих режимов)
   ============================================================ */

export const companiesApi = createApi({
  reducerPath: 'companiesApi',

  // ❗ переключаем только ЭТУ строку
  //Локальный вариант
  /*  baseQuery: localBaseQuery, */
  //Серверный вариант
  baseQuery: baseQuery,

  endpoints: (build) => ({
    // ✅ GET /api/companies
    getCompanies: build.query<Company[], string | undefined>({
      query: (categoryId) =>
        categoryId?.trim()
          ? { url: '/api/companies', params: { categoryId } }
          : { url: '/api/companies' },
    }),

    // ✅ GET /api/company/:id
    getCompany: build.query<Company, string>({
      query: (companyId) => ({
        url: `/api/company/${companyId}`,
      }),
    }),
  }),
})

export const { useGetCompaniesQuery, useGetCompanyQuery } = companiesApi
export default companiesApi
