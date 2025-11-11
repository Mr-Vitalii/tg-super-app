import { Service } from './services'

export type Master = {
  id: string
  companyId: number
  firstName: string
  lastName: string
  avatar_url?: string
  info: string
  services: Service[]
  availableDates: { date: string; times: string[] }[]
}
