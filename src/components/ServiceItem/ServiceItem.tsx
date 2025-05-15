import { Service } from '@/common/types/services'
import styles from './ServiceItem.module.scss'

import { LinkButton } from '../common/LinkButton/LinkButton'
import { Button } from '../common/Button/Button'
import { useCart } from '@/context/CartContext'

interface ServiceItemProps {
  service: Service
  onAdd: (product: Service) => void
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ service, onAdd }) => {
  /*  const onAddHandler = () => {
    onAdd(service)
  } */

  const { addToCart } = useCart()

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
          <Button onClick={() => addToCart(service)} variant='primary'>
            Заказать услугу
          </Button>
        </div>
      </div>
    </div>
  )
}
