import { Navigate } from 'react-router-dom'
/* import { useAuth } from '@/context/auth/useAuth' */

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  /* const { user } = useAuth() */

  const user = {
    role: 'admin',
  }

  if (!user) return <Navigate to='/login' />
  if (user.role !== 'admin') return <Navigate to='/' />

  return <>{children}</>
}
