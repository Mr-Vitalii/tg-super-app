import React from 'react'
import { useGetOrdersHistoryQuery } from '@/services/ordersHistoryApi'
import OrdersHistoryList from '@/modules/ordersHistory/components/OrdersHistoryList/OrdersHistoryList'
import styles from './OrdersHistoryPage.module.scss'

const OrdersHistoryPage: React.FC = () => {
  const { data: orders = [], isLoading, error } = useGetOrdersHistoryQuery()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>История заказанных услуг</h1>
      <OrdersHistoryList
        orders={orders}
        isLoading={isLoading}
        error={error ? 'Ошибка загрузки данных' : null}
      />
    </div>
  )
}

export default OrdersHistoryPage
