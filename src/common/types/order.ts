import { Service } from './services'

export type Order = {
  /* userName: string */
  company: string
  orderDate: string
  orderTime: string
  items: Service[]
  quantity: number
  totalPrice: number
}

export type Orders = Order[]
