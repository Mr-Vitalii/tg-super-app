import { Service } from './services'

export type Order = {
  orderDate: string
  orderTime: string
  items: Service[]
  quantity: number
  totalPrice: number
}

export type Orders = Order[]

export type OrderStatus = 'confirmed' | 'cancelled' | 'pending' | 'completed'

export interface OrderHistoryEntry {
  id: string
  title: string
  status: OrderStatus
  date: string // ISO
  price: number
  currency: string
  // optional fields
  canceledReason?: string
  createdAt?: string
  categoryId: string
  companyId: string
  serviceId: string
  masterId: string
  masterName: string
}
