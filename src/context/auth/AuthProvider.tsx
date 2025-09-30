import { User } from '@/common/types/user'
import { useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  /*  const [user, setUser] =
    useState<any>(null) */ /* для локальной пробной загрузки */
  const [loading, setLoading] = useState(true)

  // ✅ 1. Проверяем пользователя при загрузке
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Сначала пробуем с cookie
        let res = await fetch('https://tg5-evst.amvera.io/api/me', {
          method: 'GET',
          credentials: 'include',
        })

        // Если cookie не сработала → пробуем X-Session-Id
        if (res.status === 401) {
          const sid = localStorage.getItem('sid')
          if (sid) {
            res = await fetch('https://tg5-evst.amvera.io/api/me', {
              method: 'GET',
              headers: {
                'X-Session-Id': sid,
              },
            })
          }
        }

        if (res.ok) {
          const data = await res.json()
          setUser(data)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Авторизация через Telegram initData
  const authorize = useCallback(async (initData: string, name: string) => {
    const res = await fetch('https://tg5-evst.amvera.io/api/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Telegram-InitData': initData,
      },
      body: JSON.stringify({ name }),
    })

    if (!res.ok) {
      throw new Error('Auth failed')
    }

    const data = await res.json()

    console.log(data)

    if (data.sid) {
      localStorage.setItem('sid', data.sid)
    }

    // Для локальной загрузки
    /*         const data = {
      user: {
        id: 123,
        name: 'Иван',
        telegram_user_id: 456789,
      },
    } */

    setUser(data.user)
  }, [])

  // Логаут
  const logout = useCallback(async () => {
    localStorage.removeItem('sid')
    /* try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (e) {
      console.warn('Logout request failed:', e)
    } */
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
