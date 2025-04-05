import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

type AppContextType = {
  isAuthorized: boolean
  setIsAuthorized: (value: boolean) => void
  /* user: null | { id: string; name: string } */
  loading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false)

  /* const [user, setUser] = useState<null | { id: string; name: string }>(null) */
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token')
        if (token === '123456') {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }

        // Пример запроса к API
        /*  const res = await fetch('/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error('Not authorized')

        const data = await res.json()
        setUser(data)
        setIsAuthorized(true) */
      } catch (error: any) {
        setIsAuthorized(false)
        /* setUser(null) */
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <AppContext.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
