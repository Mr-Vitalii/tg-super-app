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
  distance?: number | null
  nearby?: NearbyCompany[]
  // опционально: openingNotes, deliveryInfo и т.п.
}

export interface NearbyCompany {
  id: string
  name: string
  address?: string
  phone?: string[]
  distance?: number
  coords?: {
    lat: number
    lng: number
  }
}
