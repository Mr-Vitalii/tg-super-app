import { RegisterFormData } from '@/common/types/auth'
import { User } from '@/common/types/user'
import { useState, useEffect, ReactNode, useMemo, useCallback } from 'react'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Подгружаем данные из localStorage при инициализации
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = useCallback((newToken: string, userData: User) => {
    setToken(newToken)
    setUser(userData)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }, [])

  const register = useCallback(
    async (formData: RegisterFormData) => {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!res.ok) throw new Error('Registration failed')

        //* Бекенд возвращает данные о узере вместе с токеном
        const data = await res.json()

        login(data.token, data.user)
      } catch (error) {
        console.error('Registration error:', error)
        throw error
      }
    },
    [login]
  )

  const authValue = useMemo(
    () => ({
      user,
      token,
      register,
      login,
      logout,
    }),
    [user, token, register, login, logout]
  )

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}
