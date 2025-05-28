import { createContext } from 'react'
import { CartContextProps } from '@/common/types/cart'

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
)
