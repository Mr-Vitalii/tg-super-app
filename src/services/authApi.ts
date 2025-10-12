import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@/common/types/user'
import { setUser, clearUser } from '@/features/auth/authSlice'

const BASE_URL = 'https://tg5-evst.amvera.io'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const sid = localStorage.getItem('sid')
        if (sid) {
          headers.set('X-Session-Id', sid)
        }
      }

      try {
        const tg = (window as any).Telegram?.WebApp
        if (tg?.initData) {
          headers.set('X-Telegram-InitData', tg.initData)
        }
      } catch {
        // ignore
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<User | null, void>({
      query: () => ({ url: '/api/me', method: 'GET' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const anyData = data as any
          if (anyData?.sid && typeof window !== 'undefined') {
            localStorage.setItem('sid', anyData.sid)
          }

          const user = (anyData?.user ?? data) as User | null
          dispatch(setUser(user || null))
        } catch {
          dispatch(clearUser())
        }
      },
    }),

    login: builder.mutation<any, { name: string; initData?: string }>({
      query: ({ name, initData }) => {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }
        if (initData) headers['X-Telegram-InitData'] = initData

        return {
          url: '/api/auth',
          method: 'POST',
          body: JSON.stringify({ name }),
          headers,
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const anyData = data as any
          if (anyData?.sid && typeof window !== 'undefined') {
            localStorage.setItem('sid', anyData.sid)
          }
          const user = (anyData?.user ?? data) as User | null
          dispatch(setUser(user || null))
        } catch {
          // ignore
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: '/api/logout', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch {
          // ignore
        } finally {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('sid')
          }
          dispatch(clearUser())
        }
      },
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
