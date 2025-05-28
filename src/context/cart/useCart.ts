import { useContext } from 'react'
import { CartContext } from './CartContext'
import { CartContextProps } from '@/common/types/cart'

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
