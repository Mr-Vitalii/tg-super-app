import styles from './ServiceCartPage.module.scss'
import { LinkButton } from '@/components/common/LinkButton/LinkButton'
import { Button } from '@/components/common/Button/Button'

import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'

const ServiceCartPage = () => {
  const { cart, removeFromCart, setHasNewItems } = useCart()

  console.log('cart', cart)

  useEffect(() => {
    setHasNewItems(false)
  }, [setHasNewItems])

  const totalPrice = cart.reduce((sum, service) => sum + service.price, 0)
  const currency = cart[0]?.currency ?? ''

  return (
    <div className={styles.cart}>
      <h1>Заказаные услуги</h1>

      {cart.length === 0 ? (
        <p>Вы пока не добавили ни одной услуги.</p>
      ) : (
        <>
          <div className={styles.cart__list}>
            {cart.map((service) => {
              const key = `${service.id}-${service.date ?? 'no-date'}-${service.time ?? 'no-time'}`
              return (
                <div key={key} className={styles.cart__item}>
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
                    <div className={styles.cart__details}>
                      <span className={styles.cart__date}>
                        Дата: {service.date}
                      </span>
                      <span className={styles.cart__date}>
                        Время: {service.time}
                      </span>
                      <span className={styles.cart__date}>
                        Мастер: {service.masterName}
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
                        onClick={() => removeFromCart(service)}
                      >
                        Удалить
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.cart__summary}>
            <p>
              <strong>Количество заказанных услуг:</strong> {cart.length}
            </p>
            <p>
              <strong>Полная стоимость услуг:</strong> {totalPrice} {currency}
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

export default ServiceCartPage
