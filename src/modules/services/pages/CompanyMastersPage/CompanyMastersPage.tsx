import { useParams } from 'react-router-dom'
import { useGetMastersByCompanyQuery } from '@/services/mastersApi'

import { CardsList } from '@/components/common/CardList/CardList'
import MasterCard from '@/modules/services/components/MasterCard/MasterCard'

export default function CompanyMastersPage() {
  const { companyId } = useParams<{ companyId: string }>()
  const {
    data: masters = [],
    isLoading,
    isError,
  } = useGetMastersByCompanyQuery({
    companyId: companyId ?? '',
  })

  if (isLoading)
    return <div className='p-6 text-center'>Загрузка мастеров...</div>
  if (isError)
    return (
      <div className='p-6 text-center text-red-600'>
        Ошибка загрузки мастеров
      </div>
    )
  if (!masters.length)
    return <div className='p-6 text-center'>Мастера не найдены</div>

  return (
    <div className='max-w-5xl mx-auto px-4 py-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      <CardsList
        items={masters}
        columns={3}
        renderItem={(master) => (
          <MasterCard
            key={master.id}
            master={master}
            companyId={companyId ?? ''}
          />
        )}
      />
    </div>
  )
}
