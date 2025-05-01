import { useCallback, useEffect, useState } from 'react'
import styles from './ServicesList.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { useTelegram } from '@/hooks/useTelegram'
import { Service } from '@/common/types/services'
import { ServiceItem } from '../ServiceItem/ServiceItem'

const services: Service[] = [
  {
    id: '1',
    title: 'Мужская стрижка',
    price: 900,
    description: 'Профессиональная классическая стрижка',
    img: '/assets/services/haircut-men.png',
  },
  {
    id: '2',
    title: 'Стрижка бороды и усов',
    price: 600,
    description: 'Форма и уход за бородой и усами',
    img: '/assets/services/beard-trim.png',
  },
  {
    id: '3',
    title: 'Комбо (стрижка + борода)',
    price: 1400,
    description: 'Полный уход: стрижка головы и бороды',
    img: '/assets/services/combo.png',
  },
  {
    id: '4',
    title: 'Стрижка под насадку + борода',
    price: 1100,
    description: 'Минимальная длина волос + уход за бородой',
    img: '/assets/services/clippers-beard.png',
  },
  {
    id: '5',
    title: 'Удлинённые волосы',
    price: 1100,
    description: 'Стрижка длинных волос с укладкой',
    img: '/assets/services/long-hair.png',
  },
  {
    id: '6',
    title: 'Стрижка под насадку',
    price: 600,
    description: 'Быстрая машинная стрижка',
    img: '/assets/services/clippers.png',
  },
  {
    id: '7',
    title: 'Премиум-уход за лицом от Depot',
    price: 1100,
    description: 'Косметический уход за кожей лица',
    img: '/assets/services/facial-care.png',
  },
  {
    id: '8',
    title: 'Камуфлирование седины',
    price: 900,
    description: 'Мягкое окрашивание седины',
    img: '/assets/services/grey-camouflage.png',
  },
  {
    id: '9',
    title: 'Укладка волос',
    price: 300,
    description: 'Фиксация и стильная укладка',
    img: '/assets/services/styling.png',
  },
]

const getTotalPrice = (items: Service[] = []): number => {
  return items.reduce((acc, item) => acc + item.price, 0)
}

export const ServicesList: React.FC = () => {
  const [addedItems, setAddedItems] = useState<Service[]>([])
  const [productTotalPrice, setProductTotalPrice] = useState(0)
  const { tg, queryId } = useTelegram()

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
  }, [addedItems, queryId])

  useEffect(() => {
    setProductTotalPrice(getTotalPrice(addedItems))
  }, [addedItems])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [tg, onSendData])

  const onAdd = (product: Service) => {
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
  }

  return (
    <div>
      <p className={styles.price}>Общая сумма заказа: {productTotalPrice} $</p>
      <ul className={styles.list}>
        {services.map((item) => (
          <li className={styles.item} key={uuidv4()}>
            <ServiceItem service={item} onAdd={onAdd} />
          </li>
        ))}
      </ul>
    </div>
  )
}
