export type Company = {
  id: string
  title: string
  categoryId: string
  address?: string
  rating?: number
  img?: string
}

export const companies: Company[] = [
  {
    id: 'comp-1',
    title: 'Barbershop One',
    categoryId: 'cat-hair',
    address: 'ул. Ленина, 1',
    rating: 4.6,
  },
  {
    id: 'comp-2',
    title: 'Gentlemen Cuts',
    categoryId: 'cat-hair',
    address: 'ул. Свободы, 2',
    rating: 4.4,
  },
  {
    id: 'comp-3',
    title: 'Urban Barber',
    categoryId: 'cat-hair',
    address: 'пр. Победы, 13',
    rating: 4.2,
  },
  {
    id: 'comp-4',
    title: 'Premium Salon',
    categoryId: 'cat-beauty',
    address: 'ул. Цветочная, 5',
    rating: 4.8,
  },
]
