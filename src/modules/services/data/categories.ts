export type Category = {
  id: string
  title: string
  info: string
  image?: string
  slug?: string
  description?: string
}

export const categories: Category[] = [
  {
    id: 'cat-hair',
    slug: 'hair',
    title: 'Barbershop',
    info: 'Собраны все копании по стрижке',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/barbershop-category_girf08.webp',
  },
  {
    id: 'cat-beauty',
    slug: 'beauty',
    title: 'Салон красоты',
    info: 'Собраны все солоны красоты',
    image:
      'https://res.cloudinary.com/di8xukyyj/image/upload/v1760717231/beauty-category_qax0xg.webp',
  },
]
