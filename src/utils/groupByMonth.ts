// src/modules/ordersHistory/utils/groupByMonth.ts
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { OrderHistoryEntry } from '@/common/types/order'

/**
 * Группирует заказы по месяцам и годам.
 *
 * Пример результата:
 * {
 *   "Октябрь 2025": [ {...}, {...} ],
 *   "Сентябрь 2025": [ {...} ]
 * }
 */
export function groupByMonth(orders: OrderHistoryEntry[]) {
  const grouped: Record<string, OrderHistoryEntry[]> = {}

  orders.forEach((order) => {
    const date = new Date(order.date)
    const monthKey = format(date, 'LLLL yyyy', { locale: ru }) // например "Октябрь 2025"

    if (!grouped[monthKey]) grouped[monthKey] = []
    grouped[monthKey].push(order)
  })

  // Сортируем группы от более новых к старым
  const sortedGroups = Object.entries(grouped)
    .sort((a, b) => {
      const dateA = new Date(a[1][0].date)
      const dateB = new Date(b[1][0].date)
      return dateB.getTime() - dateA.getTime()
    })
    .reduce(
      (acc, [key, value]) => {
        // внутри каждой группы сортируем заказы по дате (новые сверху)
        acc[key] = value.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        return acc
      },
      {} as Record<string, OrderHistoryEntry[]>
    )

  return sortedGroups
}
