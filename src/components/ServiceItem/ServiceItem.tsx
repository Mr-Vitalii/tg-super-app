import { Service } from '@/common/types/services'
import { Button } from '../Button/Button'
import styles from './ServiceItem.module.scss'

interface ServiceItemProps {
  service: Service
  onAdd: (product: Service) => void
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ service, onAdd }) => {
  const onAddHandler = () => {
    onAdd(service)
  }

  return (
    <div className={styles.product}>
      <div className={styles.img_container}>
        <img src={service.img} alt='service' />
      </div>
      <div className={styles.product__info}>
        <div className={styles.title}>{service.title}</div>
        <div className={styles.product__description}>{service.description}</div>
        <div className={styles.price}>
          <span>
            Стоимость: <b>{service.price}</b>
          </span>
        </div>
        <div className={styles.add_btn}>
          <Button variant='primary' size='small' onClick={onAddHandler}>
            Заказать услугу
          </Button>
        </div>
      </div>
    </div>
  )
}
