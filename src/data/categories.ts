export type Category = {
  id: string
  slug: string
  title: string
  description?: string
}

export const categories: Category[] = [
  { id: 'cat-hair', slug: 'hair', title: 'Стрижки (мужская)' },
  { id: 'cat-beauty', slug: 'beauty', title: 'Салон красоты' },
]
