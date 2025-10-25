// src/hooks/useAuth.ts
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} from '@/services/authApi'
import { clearUser } from '@/features/auth/authSlice'

/**
 * 🔧 Режим работы авторизации:
 * true  — использовать локальные мок-данные (тест без сервера)
 * false — использовать реальный backend (через authApi)
 */

/* const USE_LOCAL_AUTH = false */

export const useAuth = () => {
  const user = useAppSelector((s) => s.auth.user)
  const dispatch = useAppDispatch()

  // ========================================================================
  // 1️⃣ ЛОКАЛЬНЫЙ ВАРИАНТ (mock, без сервера)
  // ========================================================================
  /*   if (USE_LOCAL_AUTH) {
    const mockUser = { sid: 'abc123', user: { id: '343567', name: 'РЕКС' } }

    const authorize = async (initData: string, name: string) => {
      console.log('[LOCAL AUTH] Авторизация без сервера:', { initData, name })
      if (typeof window !== 'undefined') {
        localStorage.setItem('sid', mockUser.sid)
      }
      return mockUser
    }

    const logout = async () => {
      console.log('[LOCAL AUTH] Логаут без сервера')
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sid')
      }
      dispatch(clearUser())
    }

    return {
      user: mockUser.user,
      loading: false,
      authorize,
      logout,
      _internal: { mode: 'local' as const },
    }
  } */

  // ========================================================================
  // 2️⃣ СЕРВЕРНЫЙ ВАРИАНТ (production)
  // ========================================================================

  // GET /api/me
  const meQuery = useGetMeQuery(undefined, {
    skip: false, // выполняем при монтировании (можно сделать true и вызывать вручную)
  })

  // POST /api/auth
  const [login, loginResult] = useLoginMutation()

  // POST /api/logout
  const [logoutMutation, logoutResult] = useLogoutMutation()

  /**
   * Авторизация (POST /api/auth)
   * backend возвращает объект { sid, user }, sid сохраняется внутри authApi
   */
  const authorize = useCallback(
    async (initData: string, name: string) => {
      const res = await login({ name, initData }).unwrap()
      return res
    },
    [login]
  )

  /**
   * Логаут (POST /api/logout)
   * удаляет sid и очищает store
   */
  const doLogout = useCallback(async () => {
    try {
      await logoutMutation().unwrap()
    } catch {
      // если сеть недоступна — всё равно чистим локальные данные
      if (typeof window !== 'undefined') localStorage.removeItem('sid')
      dispatch(clearUser())
    }
  }, [logoutMutation, dispatch])

  /**
   * Текущий пользователь из кэша /api/me
   */
  /* const user = (meQuery.data as any)?.user || null */

  console.log('useAuth', { user, loading: meQuery.isFetching })

  return {
    user,
    loading: meQuery.isFetching,
    authorize,
    logout: doLogout,
    _internal: {
      mode: 'server' as const,
      meQuery,
      loginResult,
      logoutResult,
    },
  }
}
