/* import { Service } from '@/common/types/services.ts'
import { services } from '../data/services.ts' */

/* export function fetchItems(
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
 */

/* import type { Service } from '@/common/types/services'
import { products } from './mock/products' */

/**
 * Локальная реализация fetchServices / fetchServiceById
 * для разработки без бэкенда.
 *
 * Поведение:
 * - fetchServices(page, limit) — возвращает порцию products (пагинация)
 * - fetchServiceById(id) — возвращает найденный продукт или выбрасывает ошибку
 */

/* export async function fetchServices(
  page: number = 1,
  limit: number = 9
): Promise<Service[]> {
  
  await new Promise((res) => setTimeout(res, 200))

  // простая пагинация
  const start = (page - 1) * limit
  const end = start + limit
  const slice = products.slice(start, end)

 
  return slice.map((p) => ({ ...p }))
}

export async function fetchServiceById(id: string): Promise<Service> {
  // имитируем задержку
  await new Promise((res) => setTimeout(res, 150))

  const found = products.find((p) => p.id === id)
  if (!found) throw new Error('Услуга не найдена (локальный mock)')
  return { ...found }
}
 */
