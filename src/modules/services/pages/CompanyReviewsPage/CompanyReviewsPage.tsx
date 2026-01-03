import { useParams } from 'react-router-dom'

const CompanyReviewsPage = () => {
  const { companyId } = useParams<{ companyId?: string }>()
  return <div>Здесь будет отзывы по компании {companyId}</div>
}

export default CompanyReviewsPage
