import { User } from '@/common/types/user'
import { useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  /*  const [user, setUser] =
    useState<any>(null) */ /* для локальной пробной загрузки */
  const [loading, setLoading] = useState(true)

  // Проверяем текущего пользователя при старте
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('https://tg5-evst.amvera.io/api/me', {
          method: 'GET',
          credentials: 'include', // отправляем sid-cookie
        })

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
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ initData, name }),
    })

    if (!res.ok) {
      throw new Error('Auth failed')
    }

    const data = await res.json()

    console.log(data)

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
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (e) {
      console.warn('Logout request failed:', e)
    }
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
