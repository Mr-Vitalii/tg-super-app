import { createContext, useContext, useState, ReactNode } from 'react'
import { Service } from '@/common/types/services'

interface CartContextProps {
  cart: Service[]
  addToCart: (service: Service) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Service[]>([])

  const addToCart = (service: Service) => {
    setCart((prev) =>
      prev.find((s) => s.id === service.id) ? prev : [...prev, service]
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((s) => s.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
