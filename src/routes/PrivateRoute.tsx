import { useAppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  const { isAuthorized } = useAppContext()

  return isAuthorized ? children : <Navigate to='/register' replace />
}

export default PrivateRoute
