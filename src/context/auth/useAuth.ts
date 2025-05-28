import { AuthContextType } from '@/common/types/auth'
import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a CartProvider')
  return context
}
