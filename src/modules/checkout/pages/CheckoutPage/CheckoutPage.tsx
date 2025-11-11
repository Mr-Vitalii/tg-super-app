import styles from './CheckoutPage.module.scss'
import { useNavigate } from 'react-router-dom'

import { format } from 'date-fns'
import { Order } from '@/common/types/order'
import { useModal } from '@/context/modal/useModal'
import { useCart } from '@/hooks/useCart'
import { useCreateOrderMutation } from '@/services/ordersApi'

const CheckoutPage = () => {
  const { cart, clearCart } = useCart()
  const totalPrice = cart.reduce((sum, service) => sum + service.price, 0)

  const navigate = useNavigate()
  const { openModal } = useModal()

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation()

  const handleModal = () => {
    openModal(
      <div>
        <h2>Вы успешно оформили заказ!</h2>
        <p>С нетерпением ждем Вас в нашем салоне!</p>
      </div>
    )
  }

  const handleSubmitOrder = async () => {
    const now = new Date()

    const order: Order = {
      orderDate: format(now, 'dd.MM.yyyy'),
      orderTime: format(now, 'HH:mm'),
      items: cart,
      quantity: cart.length,
      totalPrice,
    }

    try {
      // Используем RTK Query mutation
      await createOrder(order).unwrap()
      // при успехе очищаем корзину и показываем модал
      clearCart()
      navigate('/')
      handleModal()
    } catch (error) {
      console.error(error)
      alert('Ошибка при оформлении заказа. Попробуйте позже.')
    }
  }

  return (
    <div className={styles.checkout}>
      <h1>Оформление заказа</h1>

      {cart.length === 0 ? (
        <p>У вас нет услуг для оформления заказа.</p>
      ) : (
        <>
          <div className={styles.summary}>
            <ul className={styles.service_list}>
              {cart.map((service) => (
                <li key={`${service.id}-${service.date}-${service.time}`}>
                  <span>{service.title}</span>
                  <b>
                    {service.price} {service.currency}
                  </b>
                </li>
              ))}
            </ul>

            <div className={styles.total}>
              <span>Итого:</span>
              <b>
                {totalPrice} {cart[0].currency}
              </b>
            </div>

            <button
              onClick={handleSubmitOrder}
              className={styles.confirm_btn}
              disabled={isCreating}
            >
              {isCreating ? 'Отправка...' : 'Подтвердить заказ'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CheckoutPage
