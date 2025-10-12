import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
} from '@/services/authApi'
import { clearUser } from '@/features/auth/authSlice'

export const useAuth = () => {
  const user = useAppSelector((s) => s.auth.user)
  const dispatch = useAppDispatch()

  // GET /api/me — выполняется автоматически при монтировании компонента, если нужно
  // (вернёт { data, isLoading, isError } ), но мы не привязываем данные напрямую к UI.
  const meQuery = useGetMeQuery(undefined, {
    // Не переконфигурируем: вызов где надо будет запускать вручную
    // но оставим авто-вызов здесь удобным: если хук используется в корневом компоненте,
    // он загрузит профиль автоматически
    skip: false,
  })

  // Мутации
  const [login, loginResult] = useLoginMutation()
  const [logout, logoutResult] = useLogoutMutation()

  // authorize wrapper: сохраняет совместимый интерфейс
  const authorize = useCallback(
    async (initData: string, name: string) => {
      // вызываем login мутацию — login сам положит sid в localStorage и setUser через onQueryStarted
      const res = await login({ name, initData }).unwrap()
      return res
    },
    [login]
  )

  const doLogout = useCallback(async () => {
    try {
      await logout().unwrap()
    } catch {
      // onQueryStarted в logout очищает localStorage и user, поэтому игнорируем ошибку
      dispatch(clearUser())
      if (typeof window !== 'undefined') localStorage.removeItem('sid')
    }
  }, [logout, dispatch])

  return {
    user,
    loading: meQuery.isFetching, // приблизительно: если выполняется getMe
    authorize,
    logout: doLogout,
    // если нужно - expose меньше/больше метаданных
    _internal: {
      meQuery,
      loginResult,
      logoutResult,
    },
  }
}
