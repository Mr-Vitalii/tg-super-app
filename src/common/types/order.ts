import { Service } from './services'

export type Order = {
  company: string
  orderDate: string
  orderTime: string
  items: Service[]
  quantity: number
  totalPrice: number
}

export type Orders = Order[]
