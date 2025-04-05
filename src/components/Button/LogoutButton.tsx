import { useAppContext } from '@/context/AppContext'
import { Button } from './Button'

export const LogoutButton = () => {
  const { setIsAuthorized } = useAppContext()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthorized(false)
  }

  return (
    <Button onClick={handleLogout} variant='primary'>
      Выйти
    </Button>
  )
}
