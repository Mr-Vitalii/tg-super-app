import { useCart } from '@/context/CartContext'
import styles from './CheckoutPage.module.scss'
import { useModal } from '@/context/ModalContext'
import { useNavigate } from 'react-router-dom'

export const CheckoutPage = () => {
  const { cart, clearCart } = useCart()
  const totalPrice = cart.reduce((sum, service) => sum + service.price, 0)

  const navigate = useNavigate()

  const { openModal } = useModal()
  const handleModal = () => {
    openModal(
      <div>
        <h2>Вы успешно оформили заказ!</h2>
        <p>С нетерпением ждем Вас в нашем салоне!</p>
      </div>
    )
  }

  const handleSubmitOrder = async () => {
    clearCart()
    navigate('/')
    handleModal()
    /*  try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ services: cart, total: totalPrice }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при оформлении заказа')
      }

      handleModal()
    } catch (error) {
      console.error('Ошибка:', error)
    } */
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
                <li key={service.id}>
                  <span>{service.title}</span>
                  <b>{service.price} ₴</b>
                </li>
              ))}
            </ul>

            <div className={styles.total}>
              <span>Итого:</span>
              <b>{totalPrice} ₴</b>
            </div>

            <button onClick={handleSubmitOrder} className={styles.confirm_btn}>
              Подтвердить заказ
            </button>
          </div>
        </>
      )}
    </div>
  )
}
