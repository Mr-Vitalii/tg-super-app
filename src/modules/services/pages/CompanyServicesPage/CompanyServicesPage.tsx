import { Service } from '@/common/types/services'
import { ServicesList } from '@/modules/services/components/ServicesList/ServicesList'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useLazyGetCompanyServicesQuery,
  /* useLazyGetProductsQuery, */
} from '@/services/productsApi'

const CompanyServicesPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetched, setIsFetched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const pageRef = useRef(1)

  const { categoryId, companyId } = useParams<{
    companyId: string
    categoryId: string
  }>()

  /* const [triggerGetProducts] = useLazyGetProductsQuery() */

  /* для теста локальной разработки */
  const [triggerGetCompanyServices] = useLazyGetCompanyServicesQuery()

  // ✅ Загрузка из sessionStorage при монтировании
  useEffect(() => {
    const key = `services-${companyId}`
    const cached = sessionStorage.getItem(key)
    if (cached) {
      const parsed = JSON.parse(cached)
      setServices(parsed.services || [])
      pageRef.current = parsed.page || 1 // ✅ восстанавливаем страницу в ref
      setIsFetched(true) // чтобы показать "Услуги отсутствуют", если массив пустой
    } else {
      // если кэша нет — грузим первую страницу
      loadMore()
    }
  }, [companyId])

  // ✅ Сохраняем в sessionStorage при изменении services/page
  useEffect(() => {
    if (services.length > 0) {
      /*  const key = `services-${companyId}` */
      sessionStorage.setItem(
        'services',
        JSON.stringify({
          services,
          page: pageRef.current, // ✅ сохраняем страницу из ref
        })
      )
    }
  }, [services, companyId])

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      //           const result = await triggerGetProducts({
      //      page: pageRef.current,
      //      limit: 9,
      //     }).unwrap()

      const result = await triggerGetCompanyServices({
        companyId: companyId!, // ✅ подставляем в запрос
        page: pageRef.current,
        limit: 9,
      }).unwrap()

      const newItems = result ?? []

      setError(null)

      if (newItems.length === 0) {
        setHasMore(false)
      } else {
        setServices((prev) => [...prev, ...newItems])
        pageRef.current += 1
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
  }, [loading, /* triggerGetProducts */ triggerGetCompanyServices, hasMore])

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
  }, [loadMore, loading, hasMore, error])

  return (
    <div>
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
        categoryId={categoryId} // <- NEW: передаём slug (categoryId)
        companyId={companyId} // <- опционально полезно
      />
    </div>
  )
}

export default CompanyServicesPage
