import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Service } from '@/common/types/services'
import { loadFromStorage, saveToStorage } from '@/utils/storage'

const CART_KEY = 'cart'

type CartState = {
  items: Service[]
  hasNewItems: boolean
}

const initialState: CartState = {
  items: loadFromStorage<Service[]>(CART_KEY) ?? [],
  hasNewItems: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Service>) {
      const service = action.payload
      const exists = state.items.some(
        (i) =>
          i.id === service.id &&
          i.date === service.date &&
          i.time === service.time
      )
      if (!exists) {
        state.items.push(service)
        state.hasNewItems = true
        saveToStorage(CART_KEY, state.items)
      }
    },
    removeFromCart(state, action: PayloadAction<Service>) {
      const service = action.payload
      state.items = state.items.filter(
        (i) =>
          !(
            i.id === service.id &&
            i.date === service.date &&
            i.time === service.time
          )
      )
      saveToStorage(CART_KEY, state.items)
    },
    clearCart(state) {
      state.items = []
      state.hasNewItems = false
      saveToStorage(CART_KEY, state.items)
    },
    setHasNewItems(state, action: PayloadAction<boolean>) {
      state.hasNewItems = action.payload
    },
    // optional: replaceCart (useful for server-sync)
    replaceCart(state, action: PayloadAction<Service[]>) {
      state.items = action.payload
      saveToStorage(CART_KEY, state.items)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setHasNewItems,
  replaceCart,
} = cartSlice.actions

export default cartSlice.reducer
