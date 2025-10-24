import styles from './CategoriesPage.module.scss'
import { useGetCategoriesQuery } from '@/services/categoriesApi'
/* import { CategoryCard } from '../../components/CategoryCard/CategoryCard' */
import { Link } from 'react-router-dom'
import { Card } from '@/components/common/Card/Card'
import { CardsList } from '@/components/common/CardList/CardList'

const CategoriesPage = () => {
  /*   const {
    data: categories,
    isLoading,
    isError,
    error, 
  } = useGetCategoriesQuery() */
  const {
    data: categories,
    isLoading,
    isError,
    /* error, */
  } = useGetCategoriesQuery()

  if (isLoading) return <div>Загрузка категорий...</div>
  if (isError) return <div>Ошибка при загрузке категорий</div>

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Выберите категорию услуг</h1>
      {categories && categories.length > 0 ? (
        <CardsList
          items={categories}
          columns={3}
          renderItem={(category) => (
            <Link to={`/services/${category.id}`} className={styles.card}>
              <Card
                title={category.title}
                image={category.image}
                imageAlt={'category image'}
              >
                <div>{category.info}</div>
              </Card>
            </Link>
          )}
        />
      ) : (
        <p>Категорий нет</p>
      )}
    </div>
  )
}

export default CategoriesPage
