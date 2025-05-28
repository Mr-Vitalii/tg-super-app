import { useState, ReactNode, useEffect, useMemo, useCallback } from 'react'
import { Service } from '@/common/types/services'
import { loadFromStorage, saveToStorage } from '@/utils/storage'
import { CartContext } from './CartContext'

const CART_KEY = 'cart'

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Service[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasNewItems, setHasNewItems] = useState(false)

  // ✅ 1. Загружаем из localStorage при инициализации
  useEffect(() => {
    const storedCart = loadFromStorage<Service[]>(CART_KEY)
    if (storedCart) setCart(storedCart)
    setIsInitialized(true)
  }, [])

  // ✅ 2. Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    if (isInitialized) {
      saveToStorage(CART_KEY, cart)
    }
  }, [cart, isInitialized])

  const addToCart = useCallback((service: Service) => {
    setCart((prev) => {
      // Проверяем уникальность по id + дате + время
      const exists = prev.some(
        (item) =>
          item.id === service.id &&
          item.date === service.date &&
          item.time === service.time
      )
      if (!exists) setHasNewItems(true)
      return exists ? prev : [...prev, service]
    })
  }, [])

  const removeFromCart = useCallback((service: Service) => {
    console.log(service)

    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === service.id &&
            item.date === service.date &&
            item.time === service.time
          )
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      hasNewItems,
      setHasNewItems,
    }),
    [cart, hasNewItems, addToCart, removeFromCart, clearCart, setHasNewItems]
  )

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  )
}
