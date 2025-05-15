import { useCart } from '@/context/CartContext'
import styles from './ServiceCartPage.module.scss'
import { LinkButton } from '../common/LinkButton/LinkButton'
import { Button } from '../common/Button/Button'

export const ServiceCartPage = () => {
  const { cart, removeFromCart } = useCart()

  const totalPrice = cart.reduce((sum, service) => sum + service.price, 0)

  return (
    <div className={styles.cart}>
      <h1>Заказаные услуги</h1>

      {cart.length === 0 ? (
        <p>Вы пока не добавили ни одной услуги.</p>
      ) : (
        <>
          <div className={styles.cart__list}>
            {cart.map((service) => (
              <div key={service.id} className={styles.cart__item}>
                <div className={styles.cart__left}>
                  <img
                    src={service.img}
                    alt={service.title}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cart__center}>
                  <div className={styles.cart__title}>{service.title}</div>
                  <div className={styles.cart__description}>
                    {service.description}
                  </div>
                  <div className={styles.cart__price}>
                    Стоимость:{' '}
                    <span>
                      {service.price} {service.currency}
                    </span>
                  </div>
                </div>
                <div className={styles.cart__right}>
                  <div className={styles.cart__actions}>
                    <LinkButton
                      to={`/services/${service.id}`}
                      variant='more-info'
                    >
                      Подробнее
                    </LinkButton>

                    <Button
                      variant='remove'
                      onClick={() => removeFromCart(service.id)}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cart__summary}>
            <p>
              <strong>Количество заказанных услуг:</strong> {cart.length}
            </p>
            <p>
              <strong>Полная стоимость услуг:</strong> {totalPrice}{' '}
              {cart[0].currency}
            </p>
            <div className={styles.cart__summary_btn}>
              <LinkButton to={`/checkout`} variant='reg-link'>
                Оформить заказ
              </LinkButton>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
