import { Service } from './services'

export type CartContextProps = {
  cart: Service[]
  addToCart: (service: Service) => void
  removeFromCart: (service: Service) => void
  clearCart: () => void
  hasNewItems: boolean
  setHasNewItems: (hasNewItems: boolean) => void
}
