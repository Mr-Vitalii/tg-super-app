import { Service } from '@/common/types/services'
import styles from './ServiceItem.module.scss'

import { LinkButton } from '../common/LinkButton/LinkButton'
import React from 'react'

interface ServiceItemProps {
  service: Service
}

const ServiceCardComponent: React.FC<ServiceItemProps> = ({ service }) => {
  return (
    <div className={styles.service}>
      <div className={styles.service__img}>
        <img src={service.img} alt='service' />
      </div>
      <div className={styles.service__info}>
        <div className={styles.service__title}>{service.title}</div>
        <div className={styles.service__description}>{service.description}</div>
        <div className={styles.service__price}>
          Стоимость:{' '}
          <span>
            {service.price} {service.currency}
          </span>
        </div>
        <div className={styles.service__actions}>
          <LinkButton to={`/services/${service.id}`} variant='more-info'>
            Подробнее
          </LinkButton>
        </div>
      </div>
    </div>
  )
}

export const ServiceItem = React.memo(ServiceCardComponent)
