/* import { Navigate } from 'react-router-dom' */
import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

type Props = {
  children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const { user /* loading  */ } = useAuth()

  console.log('user from PrivateRoute', user)

  /*   if (loading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    return <Navigate to='/register' replace />
  } */

  return <>{children}</>
}

export default PrivateRoute
