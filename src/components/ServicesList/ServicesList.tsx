/* import { useCallback, useEffect, useState } from 'react' */
import styles from './ServicesList.module.scss'
import { v4 as uuidv4 } from 'uuid'
/* import { useTelegram } from '@/hooks/useTelegram' */
/* import { Service } from '@/common/types/services' */
import { ServiceItem } from '../ServiceItem/ServiceItem'
import { Service } from '@/common/types/services'

/* import { services } from '@/data/services' */

/* const getTotalPrice = (items: Service[] = []): number => {
  return items.reduce((acc, item) => acc + item.price, 0)
} */

type ServicesListProps = {
  services: Service[]
}

export const ServicesList = ({ services }: ServicesListProps) => {
  /*  const [addedItems, setAddedItems] = useState<Service[]>([]) */

  /* const [productTotalPrice, setProductTotalPrice] = useState(0) */
  /* const { tg, queryId } = useTelegram()

  const onSendData = useCallback(() => {
    const totalPrice1 = getTotalPrice(addedItems)

     setProductTotalPrice(totalPrice1)

    const data = {
      products: addedItems,
      totalPrice: totalPrice1,
      queryId,
    }
    fetch('https://zaebatiy-url-ot-evgeniy-backend/slonik', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }, [addedItems, queryId]) */

  /* useEffect(() => {
    setProductTotalPrice(getTotalPrice(addedItems))
  }, [addedItems]) */

  /* useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [tg, onSendData]) */

  /*   const onAdd = (product: Service) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id)
    let newItems: Service[] = []

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if (newItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить на сумму ${getTotalPrice(newItems)} $`,
      })
    }
  } */

  console.log(services)

  return (
    <div className={styles.service}>
      <h1>Наши услуги</h1>

      {services.length > 0 ? (
        <ul className={styles.service__list}>
          {services.map((item) => (
            <li className={styles.service__item} key={uuidv4()}>
              <ServiceItem service={item} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Услуги отсутствуют</p>
      )}
    </div>
  )
}
