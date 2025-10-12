import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  setHasNewItems as setHasNewItemsAction,
} from '@/features/cart/cartSlice'
import type { Service } from '@/common/types/services'

export const useCart = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.cart.items)
  const hasNewItems = useAppSelector((s) => s.cart.hasNewItems)

  const addToCart = useCallback(
    (service: Service) => dispatch(addToCartAction(service)),
    [dispatch]
  )

  const removeFromCart = useCallback(
    (service: Service) => dispatch(removeFromCartAction(service)),
    [dispatch]
  )

  const clearCart = useCallback(() => dispatch(clearCartAction()), [dispatch])

  const setHasNewItems = useCallback(
    (v: boolean) => dispatch(setHasNewItemsAction(v)),
    [dispatch]
  )

  return {
    cart: items,
    addToCart,
    removeFromCart,
    clearCart,
    hasNewItems,
    setHasNewItems,
  }
}
