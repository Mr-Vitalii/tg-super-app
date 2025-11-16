import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLazyGetOrdersHistoryQuery } from '@/services/ordersHistoryApi'
import OrdersHistoryList from '@/modules/ordersHistory/components/OrdersHistoryList/OrdersHistoryList'
import styles from './OrdersHistoryPage.module.scss'
import { OrderHistoryEntry } from '@/common/types/order'

const LIMIT = 5

const OrdersHistoryPage: React.FC = () => {
  // Все загруженные заказы
  const [orders, setOrders] = useState<OrderHistoryEntry[]>([])
  const [initialLoaded, setInitialLoaded] = useState(false)
  // Пагинация
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const isFetchingRef = useRef(false)

  // useLazyGetOrdersHistoryQuery всегда отдаёт tuple
  const [
    fetchOrders,
    // типизация результата
    { data, isFetching, isError },
  ] = useLazyGetOrdersHistoryQuery()

  // Синхронизируем ref с RTK Query флагом
  useEffect(() => {
    isFetchingRef.current = isFetching
  }, [isFetching])

  // Первичный запрос
  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Обработка загрузки новой порции
  useEffect(() => {
    if (!data) return

    if (!initialLoaded) {
      setInitialLoaded(true)
    }

    if (data.length < LIMIT) {
      setHasMore(false)
    }

    setOrders((prev) => [...prev, ...data])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  // === Загружает следующую страницу ===
  const loadMore = useCallback(() => {
    // -------------------------------------
    // 🔥 Главная защита — используем ref
    // -------------------------------------
    if (isFetchingRef.current) return
    if (!hasMore || isError) return

    isFetchingRef.current = true // фиксируем, что началась загрузка

    fetchOrders({ limit: LIMIT, offset })
    setOffset((prev) => prev + LIMIT)
  }, [hasMore, offset, isError, fetchOrders])

  // === Infinite Scroll Logic ===
  useEffect(() => {
    if (!initialLoaded) return
    if (!loaderRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting) {
          loadMore()
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    )

    observer.observe(loaderRef.current)

    return () => {
      observer.disconnect()
    }
  }, [initialLoaded, loadMore])

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

      {/*  {!hasMore && <p className={styles.end}>Все записи загружены</p>} */}

      {/* триггер для infinite scroll */}
      <div ref={loaderRef} className={styles.infiniteLoader} />
    </div>
  )
}

export default OrdersHistoryPage
