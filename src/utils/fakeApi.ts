import { Service } from '@/common/types/services.ts'
import { services } from '../data/services.ts'

export function fetchItems(
  page: number = 1,
  limit: number = 20
): Promise<Service[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit
      const end = start + limit
      const data = services.slice(start, end)
      resolve(data)
    }, 1000)
  })
}
