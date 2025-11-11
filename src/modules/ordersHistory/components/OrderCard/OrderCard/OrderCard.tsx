import React from 'react'
import styles from './OrderCard.module.scss'
import { IoCheckmarkDoneSharp, IoCloseSharp } from 'react-icons/io5'
import type { OrderHistoryEntry } from '@/common/types/order'
import { formatDate } from '@/utils/formatDate'
/* import { useNavigate } from 'react-router-dom' */
import { LinkButton } from '@/components/common/LinkButton/LinkButton'

interface OrderCardProps {
  order: OrderHistoryEntry
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const isConfirmed = order.status === 'confirmed'

  /*   const navigate = useNavigate() */

  /*   const handleGoToService = () => {
    navigate(
      `/services/${order.categoryId}/${order.companyId}/${order.serviceId}`
    )
  } */

  return (
    <div
      className={`${styles.card} ${
        isConfirmed ? styles.confirmed : styles.cancelled
      }`}
    >
      <div className={styles.header}>
        <div className={styles.icon}>
          {isConfirmed ? (
            <IoCheckmarkDoneSharp size={28} className={styles.checkIcon} />
          ) : (
            <IoCloseSharp className={styles.crossIcon} size={28} />
          )}
        </div>

        <div className={styles.title}>{order.title}</div>
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Статус:</span>
          <span
            className={
              isConfirmed ? styles.statusConfirmed : styles.statusCancelled
            }
          >
            {isConfirmed ? 'Выполнена' : 'Отменена'}
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Дата:</span>
          <span>{formatDate(order.date, 'dd MMMM yyyy г.')}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Время:</span>
          <span>{formatDate(order.date, 'HH:mm')}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Стоимость:</span>
          <span>{order.price} ₽</span>
        </div>

        <LinkButton
          to={`/services/${order.categoryId}/${order.companyId}/${order.serviceId}`}
          variant='more-info'
          size='small'
        >
          Перейти к услуге
        </LinkButton>
      </div>
    </div>
  )
}

export default OrderCard
