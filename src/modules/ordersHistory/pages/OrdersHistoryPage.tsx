import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  OrdersHistoryParams,
  useLazyGetOrdersHistoryQuery,
  OrdersHistoryResponse,
} from '@/services/ordersHistoryApi'
import OrdersHistoryList from '@/modules/ordersHistory/components/OrdersHistoryList/OrdersHistoryList'
import styles from './OrdersHistoryPage.module.scss'
import { OrderHistoryEntry } from '@/common/types/order'

const LIMIT = 5

const OrdersHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderHistoryEntry[]>([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoaded, setInitialLoaded] = useState(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  const [fetchOrders, { isFetching, isError }] = useLazyGetOrdersHistoryQuery()

  // === ЗАГРУЗИТЬ ПОРЦИЮ ДАННЫХ ===
  const loadMore = useCallback(async () => {
    if (isFetching || !hasMore || isError) return

    const params: OrdersHistoryParams = {
      limit: LIMIT,
      offset,
    }

    try {
      const res: OrdersHistoryResponse = await fetchOrders(params).unwrap()

      const { items, total } = res

      if (!initialLoaded) {
        setInitialLoaded(true)
      }

      // Если получили 0 — конец данных
      if (items.length === 0) {
        setHasMore(false)
        return
      }

      // Добавляем новые элементы (с защитой от дублей)
      setOrders((prev) => {
        const ids = new Set(prev.map((p) => p.id))
        const filtered = items.filter((it) => !ids.has(it.id))
        const merged = [...prev, ...filtered]
        merged.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        return merged
      })

      // Проверяем конец
      if (offset + items.length >= total) {
        setHasMore(false)
      }

      // ВАЖНО: ONLY AFTER SUCCESS
      setOffset((prev) => prev + LIMIT)
    } catch (err) {
      console.error('loadMore error', err)
    }
  }, [isFetching, hasMore, isError, offset, fetchOrders, initialLoaded])

  // === Первичная загрузка ===
  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // === Intersection Observer ===
  useEffect(() => {
    if (!initialLoaded) return
    if (!loaderRef.current) return
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    )

    observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [initialLoaded, loadMore, hasMore])

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

      {!hasMore && orders.length > 0 && (
        <p className={styles.end}>Все записи загружены</p>
      )}

      <div ref={loaderRef} className={styles.infiniteLoader} />
    </div>
  )
}

export default OrdersHistoryPage
