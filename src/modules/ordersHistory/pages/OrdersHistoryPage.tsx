import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLazyGetOrdersHistoryQuery } from '@/services/ordersHistoryApi'
import OrdersHistoryList from '@/modules/ordersHistory/components/OrdersHistoryList/OrdersHistoryList'
import styles from './OrdersHistoryPage.module.scss'
import { OrderHistoryEntry } from '@/common/types/order'

const LIMIT = 5

const OrdersHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderHistoryEntry[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isFetchingRef = useRef(false) // 🔹 Используем ref чтобы избежать лишних триггеров

  // RTK Query lazy hook
  const [fetchOrders, { isFetching, isError }] = useLazyGetOrdersHistoryQuery()

  // 🔹 Синхронизируем ref с состоянием isFetching
  useEffect(() => {
    isFetchingRef.current = isFetching
  }, [isFetching])

  // === Загрузка данных ===
  const loadMore = useCallback(() => {
    if (isFetchingRef.current) return
    if (!hasMore || isError) return

    isFetchingRef.current = true

    fetchOrders({ limit: LIMIT, offset })
      .unwrap() // 🔹 unwrap() возвращает промис, можно безопасно ждать результат
      .then((newData) => {
        if (!newData || newData.length === 0) {
          setHasMore(false)
          return
        }

        setOrders((prev) => [...prev, ...newData])
        setOffset((prev) => prev + newData.length) // 🔹 offset увеличиваем после успешной загрузки
        if (newData.length < LIMIT) setHasMore(false)
      })
      .finally(() => {
        isFetchingRef.current = false
      })
  }, [fetchOrders, offset, hasMore, isError])

  // === Infinite scroll observer ===
  useEffect(() => {
    const el = loaderRef.current
    if (!el) return

    // Создаём observer один раз
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            loadMore()
          }
        },
        {
          rootMargin: '200px',
          threshold: 0.1,
        }
      )
    }

    observerRef.current.observe(el)

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [loadMore])

  // === Первичная загрузка ===
  useEffect(() => {
    loadMore()
  }, [loadMore])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>История заказанных услуг</h1>

      <OrdersHistoryList
        orders={orders}
        isLoading={isFetching && orders.length === 0}
        error={isError ? 'Ошибка загрузки данных' : null}
      />

      {isFetching && orders.length > 0 && (
        <p className={styles.loadingMore}>Загрузка...</p>
      )}

      {!hasMore && <p className={styles.end}>Все записи загружены</p>}

      {/* Триггер для infinite scroll */}
      <div ref={loaderRef} className={styles.infiniteLoader} />
    </div>
  )
}

export default OrdersHistoryPage
