import { Service } from '@/common/types/services'
import { ServicesList } from '@/components/ServicesList/ServicesList'
import { useEffect, useState } from 'react'

export const Services = () => {
  const [services, setServices] = useState<Service[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = sessionStorage.getItem('services')

    if (cached) {
      const parsed = JSON.parse(cached)
      setServices(parsed)
      console.log('Загружено из localStorage')
      return
    }

    const fetchServices = async () => {
      try {
        const response = await fetch('https://tg5-evst.amvera.io/api/products')
        if (!response.ok) throw new Error('Ошибка при получении списка услуг')

        const json = await response.json()

        setServices(json)
        sessionStorage.setItem('services', JSON.stringify(json))
      } catch (err) {
        console.error(err)
        setError('Ошибка при получении списка услуг.')
      }
    }

    fetchServices()
  }, [])

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ServicesList services={services} />
    </div>
  )
}
