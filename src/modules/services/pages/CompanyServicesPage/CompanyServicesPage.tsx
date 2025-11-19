import { Service } from '@/common/types/services'
import { ServicesList } from '@/modules/services/components/ServicesList/ServicesList'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLazyGetCompanyServicesQuery } from '@/services/productsApi'
import { Loader } from '@/components/common/Loader/Loader'

const LIMIT = 9
const CompanyServicesPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isFetched, setIsFetched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loaderRef = useRef<HTMLDivElement | null>(null)
  const pageRef = useRef(1)

  const isLoadingRef = useRef(false)

  const { categoryId, companyId } = useParams<{
    companyId: string
    categoryId: string
  }>()

  const [triggerGetCompanyServices] = useLazyGetCompanyServicesQuery()

  // для локальной загрузки данных
  //  const [triggerGetCompanyServices] = useLazyGetCompanyServicesQuery()

  // ✅ Загрузка из sessionStorage при монтировании
  /*   useEffect(() => {
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
  }, [companyId]) */

  useEffect(() => {
    pageRef.current = 1
    setServices([])
    setHasMore(true)
    setError(null)
    setIsFetched(false)

    const key = `services-${companyId}`
    const cached = sessionStorage.getItem(key)
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (parsed && Array.isArray(parsed.services)) {
          setServices(parsed.services)
          pageRef.current = parsed.page || 2 // если в кэше хранится page=1 значит следующая страница = 2
          setIsFetched(true)
          // если кэш заполнен, но меньше чем лимит, значит возможно нет больше данных
          if ((parsed.services?.length ?? 0) < LIMIT) {
            setHasMore(false)
          }
          return
        }
      } catch (e) {
        console.warn('Invalid cache for services', e)
        // fallthrough -> загрузим с сервера
      }
    }

    // Если кэша нет или он некорректный — грузим первую страницу
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])

  // ✅ Сохраняем в sessionStorage при изменении services/page
  useEffect(() => {
    const key = `services-${companyId}`
    try {
      sessionStorage.setItem(
        key,
        JSON.stringify({
          services,
          page: pageRef.current,
        })
      )
    } catch (e) {
      // ignore quota errors
    }
  }, [services, companyId])

  /*   const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    if (!companyId) return null

    try {
      const result = await triggerGetCompanyServices({
        companyId: companyId!,
        page: pageRef.current,
        limit: 9,
      }).unwrap()

      // для локальной загрузки данных
      //       const result = await triggerGetCompanyServices({
      //    companyId: companyId!,
      //     page: pageRef.current,
      //     limit: 9,
      //   }).unwrap()

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
  }, [
    loading,
    triggerGetCompanyServices, // triggerGetCompanyServices,
    hasMore,
    companyId,
  ]) */

  /*   useEffect(() => {
    loadMore()
  }, []) */

  // loadMore с синхронной защитой через isLoadingRef
  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return
    if (!companyId) return

    // синхронно блокируем повторные вызовы
    isLoadingRef.current = true
    setLoading(true)

    try {
      const page = pageRef.current
      const res = await triggerGetCompanyServices({
        companyId,
        page,
        limit: LIMIT,
      }).unwrap()

      const newItems: Service[] = Array.isArray(res) ? res : []

      setError(null)

      if (!newItems || newItems.length === 0) {
        setHasMore(false)
      } else {
        // merge with dedupe by id
        setServices((prev) => {
          const ids = new Set(prev.map((p) => p.id))
          const filtered = newItems.filter((it) => !ids.has(it.id))
          if (filtered.length === 0) return prev
          const merged = [...prev, ...filtered]
          return merged
        })

        // ПЕРЕПОДКЛЮЧАЕМ OBSERVER — чтобы он работал корректно!
        const el = loaderRef.current
        if (el) {
          requestAnimationFrame(() => {
            try {
              const obs = new IntersectionObserver(
                (entries) => {
                  const entry = entries[0]
                  if (entry?.isIntersecting) {
                    try {
                      obs.unobserve(entry.target)
                    } catch {}
                    loadMore()
                  }
                },
                {
                  rootMargin: '200px',
                  threshold: 0.1,
                }
              )

              obs.observe(el)
            } catch {}
          })
        }

        // только после успеш merge увеличиваем page
        pageRef.current = page + 1
      }

      setIsFetched(true)
    } catch (err: any) {
      console.error('loadMore error', err)
      setError(err?.message ?? 'Ошибка при загрузке данных')
    } finally {
      // снимаем блокировку
      isLoadingRef.current = false
      setLoading(false)
    }
  }, [companyId, hasMore, triggerGetCompanyServices])

  /*   useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]

      if (target.isIntersecting && !loading && hasMore && !error) {
        loadMore()
      }
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [loadMore, loading, hasMore, error]) */

  // IntersectionObserver — unobserve -> loadMore (loadMore сам синхронно блокирует повторные вызовы)
  useEffect(() => {
    const el = loaderRef.current
    if (!el) return
    if (!hasMore) return

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.isIntersecting) {
          // немедленно unobserve текущий элемент, чтобы избежать повторных триггеров
          try {
            obs.unobserve(entry.target)
          } catch (e) {
            /* noop */
          }

          // loadMore содержит синхронную защиту (isLoadingRef)
          loadMore()
          // после завершения loadMore observer будет "пере-подключён" автоматически,
          // потому что loadMore разблокирует isLoadingRef и следующее пересечение снова вызовет observer
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    )

    obs.observe(el)

    return () => {
      try {
        obs.unobserve(el)
      } catch (e) {
        /* noop */
      }
      obs.disconnect()
    }
  }, [loadMore, hasMore])

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

      {/* fallback loader (если нужно рядом) */}
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        {loading && <Loader />}
      </div>
    </div>
  )
}

export default CompanyServicesPage
