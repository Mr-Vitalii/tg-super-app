export type Company = {
  id: string
  categoryId: string
  title: string
  image?: string
  address?: string
  description?: string
  slug?: string
  info?: string
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
}
