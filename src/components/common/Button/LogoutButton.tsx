import { Button } from './Button'
import { useAuth } from '@/hooks/useAuth'

export const LogoutButton = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Button onClick={handleLogout} variant='primary'>
      Выйти
    </Button>
  )
}
