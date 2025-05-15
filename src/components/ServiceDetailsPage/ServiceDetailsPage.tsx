import { useParams } from 'react-router-dom'
import { services } from '@/data/services' // массив с данными всех услуг
import styles from './ServiceDetailsPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from '../common/Button/Button'
import { useCart } from '@/context/CartContext'

export const ServiceDetailsPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const service = services.find((s) => s.id === id)

  const { addToCart } = useCart()

  if (!service) {
    return <div>Услуга не найдена</div>
  }

  return (
    <div className={styles.service_details}>
      <div className={styles.service_left}>
        <img src={service.img} alt={service.title} className={styles.image} />
      </div>
      <div className={styles.service_right}>
        <div className={styles.service_content}>
          <h1>{service.title}</h1>
          <p className={styles.description}>{service.description}</p>
          <p className={styles.price}>
            Стоимость:{' '}
            <span>
              {service.price} {service.currency}
            </span>
          </p>
        </div>
        <div className={styles.btns_container}>
          <button onClick={() => navigate(-1)} className={styles.button}>
            Назад
          </button>
          <Button onClick={() => addToCart(service)} variant='primary'>
            Заказать услугу
          </Button>
        </div>
      </div>
    </div>
  )
}
