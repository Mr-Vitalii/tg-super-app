import { useParams } from 'react-router-dom'

const CompanyContactsPage2 = () => {
  const { companyId } = useParams<{ companyId?: string }>()
  return (
    <div>
      Здесь будет информация о компании, контакты, фото и карта с местом
      расположения {companyId}
    </div>
  )
}

export default CompanyContactsPage2
