import React, { useMemo } from 'react'
import { groupByMonth } from '@/utils/groupByMonth'
import OrderCard from '@/modules/ordersHistory/components/OrderCard/OrderCard/OrderCard'
import styles from './OrdersHistoryList.module.scss'
import type { OrderHistoryEntry } from '@/common/types/order'

interface OrdersHistoryListProps {
  orders: OrderHistoryEntry[]
  isLoading?: boolean
  error?: string | null
}

const OrdersHistoryList: React.FC<OrdersHistoryListProps> = ({
  orders,
  isLoading = false,
  error = null,
}) => {
  const grouped = useMemo(() => groupByMonth(orders), [orders])

  if (isLoading) return <p>Загрузка истории заказов...</p>
  if (error) return <p className={styles.error}>Ошибка: {error}</p>
  if (!orders.length) return <p>Нет заказанных услуг.</p>

  return (
    <div className={styles.wrapper}>
      {Object.entries(grouped).map(([month, items]) => (
        <section key={month} className={styles.monthSection}>
          <h2 className={styles.monthTitle}>{month}</h2>
          <div className={styles.cardsGrid}>
            {items.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default OrdersHistoryList
