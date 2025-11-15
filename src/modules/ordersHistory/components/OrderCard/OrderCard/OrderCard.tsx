/* import React from 'react'
import styles from './OrderCard.module.scss'
import { IoCheckmarkDoneSharp, IoCloseSharp } from 'react-icons/io5'
import type { OrderHistoryEntry } from '@/common/types/order'
import { formatDate } from '@/utils/formatDate'
import { LinkButton } from '@/components/common/LinkButton/LinkButton'

interface OrderCardProps {
  order: OrderHistoryEntry
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const isConfirmed = order.status === 'confirmed'

  console.log('order', order)

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
        <LinkButton to={`/services`} variant='more-info' size='small'>
          Перейти к услуге
        </LinkButton>
      </div>
    </div>
  )
}

export default OrderCard */

import React from 'react'
import styles from './OrderCard.module.scss'
import {
  IoCheckmarkDoneSharp,
  IoCloseSharp,
  IoTimeOutline,
  IoCheckmarkCircleSharp,
} from 'react-icons/io5'
import type { OrderHistoryEntry } from '@/common/types/order'
import { formatDate } from '@/utils/formatDate'
import { LinkButton } from '@/components/common/LinkButton/LinkButton'

interface OrderCardProps {
  order: OrderHistoryEntry
}

const statusMap = {
  pending: {
    label: 'Ожидает подтверждения',
    className: styles.statusPending,
    icon: <IoTimeOutline size={28} className={styles.pendingIcon} />,
  },
  confirmed: {
    label: 'Подтверждена',
    className: styles.statusConfirmed,
    icon: <IoCheckmarkCircleSharp size={28} className={styles.confirmedIcon} />,
  },
  completed: {
    label: 'Выполнено',
    className: styles.statusCompleted,
    icon: <IoCheckmarkDoneSharp size={28} className={styles.doneIcon} />,
  },
  cancelled: {
    label: 'Отменено',
    className: styles.statusCancelled,
    icon: <IoCloseSharp size={28} className={styles.cancelledIcon} />,
  },
} as const

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const status = statusMap[order.status]

  console.log('order', order)

  return (
    <div className={`${styles.card} ${status.className}`}>
      <div className={styles.header}>
        <div className={styles.icon}>{status.icon}</div>
        <div className={styles.title}>{order.title}</div>
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <span className={styles.label}>Статус:</span>
          <span className={status.className}>{status.label}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Мастер:</span>
          <span>{order.masterName}</span>
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
