import { FC } from 'react'
import styles from './CompaniesPage.module.scss'
import { useGetCompaniesQuery } from '@/services/companiesApi'
import { useParams, Link } from 'react-router-dom'
/* import { CompanyCard } from '../../components/CompanyCard/CompanyCard' */
import { CardsList } from '@/components/common/CardList/CardList'
import { Card } from '@/components/common/Card/Card'

const CompaniesPage: FC = () => {
  const { categoryId } = useParams<{ categoryId?: string }>()
  console.log('categoryId:', categoryId)

  const {
    data: companies,
    isLoading,
    isError,
  } = useGetCompaniesQuery(categoryId)

  if (isLoading) {
    return <div className={styles.loading}>Загрузка компаний...</div>
  }

  if (isError) {
    return <div className={styles.error}>Ошибка загрузки компаний</div>
  }

  if (!companies?.length) {
    return (
      <div className={styles.empty}>Компаний в этой категории пока нет</div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Выберите компанию</h1>

      <CardsList
        items={companies}
        columns={3}
        renderItem={(company) => (
          <Link
            key={company.id}
            to={`/services/${company.categoryId}/${company.id}`}
            className={styles.link}
          >
            <Card
              title={company.title}
              titleTag='h2'
              image={company.image}
              imageAlt={'сompany image'}
            >
              {company.info && (
                <p className={styles.description}>{company.info}</p>
              )}
              {company.address && (
                <p style={{ fontSize: '16px' }} className={styles.address}>
                  {company.address}
                </p>
              )}
            </Card>
          </Link>
        )}
      />
    </div>
  )
}

export default CompaniesPage
