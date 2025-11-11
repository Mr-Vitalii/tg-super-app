export type WorkHour = { day: string; from: string; to: string } // пример

export interface Company {
  id: string // 'comp-1'
  categoryId: string
  title: string
  image?: string
  gallery?: string[]
  description?: string
  slug?: string
  info?: string
  address?: string
  phone?: string[] // массив номеров
  email?: string
  website?: string
  socials?: { name: string; url: string }[]
  coords?: { lat: number; lng: number } | null
  workHours?: WorkHour[]
  // опционально: openingNotes, deliveryInfo и т.п.
}

export type Service = {
  id: string
  title: string
  price: number
  description: string
  img: string
  currency: string
  quantity?: number
  date?: string
  time?: string
  company?: string
  companyId?: string
  companyName?: string
  masterId?: string
  masterName?: string
}
