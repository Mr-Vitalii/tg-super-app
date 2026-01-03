import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Универсальный baseQuery, который добавляет sid и Telegram InitData
export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://tg6-evst.amvera.io', // ← основной URL API
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const sid = localStorage.getItem('sid')
      if (sid) headers.set('X-Session-Id', sid)
    }

    try {
      const tg = (window as any).Telegram?.WebApp
      if (tg?.initData) {
        headers.set('X-Telegram-InitData', tg.initData)
      }
    } catch {
      // intentionally ignore
    }

    return headers
  },
})
