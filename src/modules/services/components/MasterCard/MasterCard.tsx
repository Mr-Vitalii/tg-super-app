import styles from './MasterCard.module.scss'
import { format } from 'date-fns'

import { Master } from '@/common/types/masters'
import { useLazyGetMasterAvailabilityQuery } from '@/services/mastersApi'
import { useState } from 'react'
import { Card } from '@/components/common/Card/Card'
import ServiceSelector from '@/modules/services/components/ServiceSelector/ServiceSelector'
import { useModal } from '@/context/modal/useModal'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/common/Button/Button'
import logo from '/assets/logo.svg'
import DateAndTimePicker from '@/modules/services/components/DateAndTimePicker/DateAndTimePicker'

type MasterCardProps = {
  master: Master
  companyId: string
}

const MasterCard: React.FC<MasterCardProps> = ({ master, companyId }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loadAvailability] = useLazyGetMasterAvailabilityQuery()
  const { addToCart } = useCart()
  const { openModal } = useModal()

  const canOrder = Boolean(selectedServiceId && selectedDate && selectedTime)

  const handleSelect = (date: Date, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
  }

  const handleOrder = () => {
    if (!selectedServiceId || !selectedDate || !selectedTime) return

    // 1) Найти сервис в master.services
    const svcFromMaster = master.services.find(
      (s) => s.id === selectedServiceId
    )

    // 2) Если в объекте есть поля price/title — считаем что snapshot готов
    if (svcFromMaster && svcFromMaster.price && svcFromMaster.title) {
      const cartItem = {
        id: svcFromMaster.id,
        title: svcFromMaster.title,
        description: svcFromMaster.description ?? '',
        price: svcFromMaster.price,
        currency: svcFromMaster.currency ?? '₽',
        img: svcFromMaster.img ?? master.avatar_url ?? '',
        companyId: svcFromMaster.companyId ?? `comp-${master.companyId}`,
        companyName: svcFromMaster.companyName ?? '',
        masterId: master.id,
        masterName: `${master.firstName} ${master.lastName ?? ''}`,
        date: format(selectedDate, 'dd.MM.yyyy'),
        time: selectedTime,
      }
      addToCart(cartItem)
      openModal(
        <div>
          <h2>Услуга успешно добавлена!</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              style={{ width: '100px', height: '100px' }}
              src={logo}
              alt='logo'
            />
          </div>
        </div>,
        1200
      )
      return
    }

    /*     addToCart({
      ...selectedService,
      masterId: master.id,
      date: format(selectedDate, 'dd.MM.yyyy'),
      time: selectedTime,
      companyId,
    } as any) */
  }

  return (
    <Card
      title={`${master.firstName} ${master.lastName ?? ''}`}
      titleTag='h2'
      image={master.avatar_url}
      classes={{
        image: styles.master_card,
        info: styles.master_info,
      }}
      imageAlt={`${master.firstName}`}
    >
      {master.info && <p /* className={styles.description} */>{master.info}</p>}
      {/* ---------- Услуги мастера ---------- */}
      {master.services?.length > 0 && (
        <ServiceSelector
          services={master.services} // сюда нужно передать массив услуг, доступных мастеру
          selectedServiceId={selectedServiceId}
          onChange={(id) => {
            setSelectedServiceId(id)
            setSelectedDate(null)
            setSelectedTime(null)
          }}
        />
      )}

      {/* ---------- Дата и время ---------- */}
      {selectedServiceId && (
        <div style={{ marginTop: '16px' }}>
          <DateAndTimePicker
            companyId={companyId}
            serviceId={selectedServiceId}
            masterId={master.id}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            loadAvailability={loadAvailability}
            onSelect={handleSelect}
          />
        </div>
      )}

      {/* ---------- кнопка заказа ---------- */}
      <div style={{ marginTop: '16px' }}>
        <Button onClick={handleOrder} variant='primary' disabled={!canOrder}>
          Заказать услугу
        </Button>
      </div>
    </Card>
  )
}

export default MasterCard
