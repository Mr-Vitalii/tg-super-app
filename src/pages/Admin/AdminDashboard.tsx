import styles from './AdminDashboard.module.scss'

export const AdminDashboard = () => {
  return (
    <div className={styles.admin}>
      <h1>Админ-панель</h1>
      {/* Здесь можно вставить таблицу заказов, редактор услуг и т.д. */}
      <p>Супер админка с наворочеными фичами </p>
    </div>
  )
}
