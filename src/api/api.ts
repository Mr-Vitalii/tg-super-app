import { Service } from '@/common/types/services'

export async function fetchServices(
  page: number = 1,
  limit: number = 9
): Promise<Service[]> {
  const url = `https://tg5-evst.amvera.io/api/products?page=${page}&limit=${limit}`

  const response = await fetch(url)

  if (!response.ok) {
    // читаем тело ответа (если есть) для более информативной ошибки
    const text = await response.text().catch(() => null)
    throw new Error(
      `Ошибка запроса: ${response.status}${text ? ` — ${text}` : ''}`
    )
  }

  const data = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('Некорректный ответ от API: ожидался массив')
  }

  return data as Service[]
}
