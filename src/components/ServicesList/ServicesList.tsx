import styles from './ServicesList.module.scss'
import { ServiceItem } from '../ServiceItem/ServiceItem'
import { Service } from '@/common/types/services'
import { Loader } from '../common/Loader/Loader'

type ServicesListProps = {
  services: Service[]
  loading: boolean
  isFetched: boolean
  loaderRef: React.RefObject<HTMLDivElement>
}

export const ServicesList = ({
  services,
  loading,
  isFetched,
  loaderRef,
}: ServicesListProps) => {
  console.log(services)
  console.log(isFetched)

  return (
    <div className={styles.service}>
      {services.length > 0 ? (
        <ul className={styles.service__list}>
          {services.map((item) => (
            <li key={item.id} className={styles.service__item}>
              <ServiceItem service={item} />
            </li>
          ))}
        </ul>
      ) : isFetched ? (
        <p>Услуги отсутствуют</p>
      ) : null}

      <div
        ref={loaderRef}
        style={{
          height: 40,
          backgroundColor: 'transparent',
          textAlign: 'center',
        }}
      >
        {loading && <Loader />}
      </div>
    </div>
  )
}
