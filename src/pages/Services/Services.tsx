import { Service } from '@/common/types/services'
import { ServicesList } from '@/components/ServicesList/ServicesList'
import { useCallback, useEffect, useRef, useState } from 'react'

import { fetchServices } from '@/api/api'

export const Services = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetched, setIsFetched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const pageRef = useRef(1)

  // ✅ Загрузка из sessionStorage при монтировании
  useEffect(() => {
    const cached = sessionStorage.getItem('services')
    if (cached) {
      const parsed = JSON.parse(cached)
      setServices(parsed.services || [])
      pageRef.current = parsed.page || 1 // ✅ восстанавливаем страницу в ref
      setIsFetched(true) // чтобы показать "Услуги отсутствуют", если массив пустой
    } else {
      // если кэша нет — грузим первую страницу
      loadMore()
    }
  }, [])

  // ✅ Сохраняем в sessionStorage при изменении services/page
  useEffect(() => {
    if (services.length > 0) {
      sessionStorage.setItem(
        'services',
        JSON.stringify({
          services,
          page: pageRef.current, // ✅ сохраняем страницу из ref
        })
      )
    }
  }, [services])

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const newItems = await fetchServices(pageRef.current, 9)

      setError(null)

      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setServices((prev) => [...prev, ...newItems])
        pageRef.current += 1 // ⬅️ инкрементируем ref
      }

      setIsFetched(true)
    } catch (err: any) {
      console.error(err)
      setError(
        err instanceof Error ? err.message : 'Ошибка при загрузке данных'
      )
    } finally {
      setLoading(false)
    }
  }, [loading])

  useEffect(() => {
    loadMore()
  }, [])

  useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]

      if (target.isIntersecting && !loading && hasMore && !error) {
        loadMore()
      }
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [loadMore, loading, hasMore])

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Наши услуги</h1>
      {error && (
        <>
          <p style={{ color: 'red' }}>{error}</p>
          <p style={{ fontSize: '20px' }}>
            😵 Временные проблемы на сервере. Попробуйте позже.
          </p>
        </>
      )}
      <ServicesList
        isFetched={isFetched}
        services={services}
        loading={loading}
        loaderRef={loaderRef}
      />
    </div>
  )
}
