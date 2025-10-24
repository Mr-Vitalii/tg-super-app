import { useParams } from 'react-router-dom'

const CompanyMastersPage = () => {
  const { companyId } = useParams()

  return <div>Тут будут мастера компании {companyId}</div>
}

export default CompanyMastersPage
