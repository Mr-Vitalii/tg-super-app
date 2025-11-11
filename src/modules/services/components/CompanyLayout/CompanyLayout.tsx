import { Outlet, useParams, NavLink } from 'react-router-dom'
import styles from './CompanyLayout.module.scss'

const CompanyLayout = () => {
  const { categoryId, companyId } = useParams()

  return (
    <div>
      <div className={styles.company__header}>
        <NavLink
          to={`/services/${categoryId}/${companyId}`}
          end // важно!
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Услуги
        </NavLink>

        <NavLink
          to={`/services/${categoryId}/${companyId}/masters`}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Наши специалисты
        </NavLink>
        <NavLink
          to={`/services/${categoryId}/${companyId}/contacts`}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Контакты
        </NavLink>
      </div>

      {/* Здесь будет подставляться нужная страница */}
      <Outlet />
    </div>
  )
}

export default CompanyLayout
