import { User } from '@/common/types/user'
import { useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { AuthContext } from './AuthContext'

import { apiFetch } from '@/utils/apiFetch'
import { useTelegram } from '@/hooks/useTelegram'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  /*  const [user, setUser] =
    useState<any>(null) */ /* для локальной пробной загрузки */
  const [loading, setLoading] = useState(true)

  const { initData } = useTelegram()

  // ✅ 1. Проверяем пользователя при загрузке
  /*   useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiFetch('https://tg5-evst.amvera.io/api/me')
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        } else {
          setUser(null)
          console.log('Not authorized:' + res)
        }
      } catch (e) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, []) */

  // ✅ 1. Проверяем пользователя при загрузке
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 2️⃣ Готовим заголовки
        const headers: Record<string, string> = {}
        if (initData) {
          headers['X-Telegram-InitData'] = initData
        }

        // 3️⃣ Делаем запрос к API
        const res = await apiFetch('https://tg5-evst.amvera.io/api/me', {
          method: 'GET',
          headers,
        })

        // 4️⃣ Проверяем результат
        if (!res.ok) {
          console.warn('🚫 /api/me вернул ошибку:', res.status)
          setUser(null)
          return
        }

        // 5️⃣ Парсим тело ответа
        const data = await res.json()
        console.log('✅ /api/me response:', data)

        // 6️⃣ Если сервер прислал новый sid — сохраняем
        if (data.sid && typeof window !== 'undefined') {
          localStorage.setItem('sid', data.sid)
          console.log('💾 Новый sid сохранён в localStorage:', data.sid)
        }

        // 7️⃣ Сохраняем пользователя
        setUser(data.user || data)
      } catch (err) {
        console.error('💥 Ошибка при выполнении /api/me:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Авторизация через Telegram initData
  const authorize = useCallback(async (initData: string, name: string) => {
    const res = await apiFetch('https://tg5-evst.amvera.io/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Telegram-InitData': initData,
      },
      body: JSON.stringify({ name }),
    })
    if (!res.ok) throw new Error('Auth failed')

    const data = await res.json()
    console.log('localStorage доступен:', typeof window !== 'undefined')
    if (data.sid) localStorage.setItem('sid', data.sid)
    console.log('Сохранён sid:', localStorage.getItem('sid'))
    setUser(data.user)
  }, [])

  // Логаут
  const logout = useCallback(async () => {
    try {
      await apiFetch('https://tg5-evst.amvera.io/api/logout', {
        method: 'POST',
      })
    } catch (e) {
      console.warn('Logout request failed:', e)
    }

    localStorage.removeItem('sid')
    setUser(null)
  }, [])

  const authValue = useMemo(
    () => ({
      user,
      loading,
      authorize,
      logout,
    }),
    [user, loading, authorize, logout]
  )

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}
