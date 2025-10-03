import { User } from '@/common/types/user'
import { useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { AuthContext } from './AuthContext'

import { apiFetch } from '@/utils/apiFetch'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  /*  const [user, setUser] =
    useState<any>(null) */ /* для локальной пробной загрузки */
  const [loading, setLoading] = useState(true)

  // ✅ 1. Проверяем пользователя при загрузке
  useEffect(() => {
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
  /*   const logout = useCallback(async () => {
    localStorage.removeItem('sid')
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (e) {
      console.warn('Logout request failed:', e)
    }
    setUser(null)
  }, []) */

  const logout = useCallback(async () => {
    try {
      // 1. Вызываем logout через apiFetch (без credentials)
      await apiFetch('https://tg5-evst.amvera.io/api/logout', {
        method: 'POST',
      })
    } catch (e) {
      console.warn('Logout request failed:', e)
    }
    // 2. Удаляем sid заранее, чтобы он НЕ ушёл в X-Session-Id
    // 3. Сбрасываем состояние пользователя
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
