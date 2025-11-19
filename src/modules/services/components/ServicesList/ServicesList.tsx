import styles from './ServicesList.module.scss'
import { Service } from '@/common/types/services'
import { Loader } from '@/components/common/Loader/Loader'
import { Card } from '@/components/common/Card/Card'
import { LinkButton } from '@/components/common/LinkButton/LinkButton'

type ServicesListProps = {
  services: Service[]
  loading: boolean
  isFetched: boolean
  loaderRef: React.RefObject<HTMLDivElement>
  categoryId?: string
  companyId?: string
}

export const ServicesList = ({
  services,
  loading,
  isFetched,
  loaderRef,
  categoryId,
  companyId,
}: ServicesListProps) => {
  return (
    <div className={styles.service}>
      {services.length > 0 ? (
        <ul className={styles.service__list}>
          {services.map((service) => (
            <li
              //key={`${service.id}-${service.title}`}
              key={service.id}
              className={styles.service__item}
            >
              <Card
                title={service.title}
                titleTag='h2'
                image={service.img}
                imageAlt={'сompany image'}
                actions={
                  <LinkButton
                    to={`/services/${categoryId}/${companyId}/${service.id}`}
                    variant='more-info'
                  >
                    Подробнее
                  </LinkButton>
                }
              >
                {service.description && (
                  <p className={styles.description}>{service.description}</p>
                )}
                {service.price && (
                  <div style={{ marginTop: '15px' }}>
                    Стоимость:{' '}
                    <span style={{ fontWeight: '600' }}>
                      {service.price} {service.currency}
                    </span>
                  </div>
                )}
              </Card>
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
