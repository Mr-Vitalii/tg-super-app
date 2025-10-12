import styles from './Home.module.scss'

import home from '/assets/home.png'

import { useTelegram } from '@/hooks/useTelegram'
import { LinkButton } from '@/components/common/LinkButton/LinkButton'

export const Home = () => {
  const { user } = useTelegram()

  return (
    <div>
      <div className='home'>
        <p className={styles.home_greetings}>
          Приветсвуем Вас,{' '}
          <span className={styles.home_user_name}>{user?.username}</span> . Мы
          рады что вы выбрали наш сервис.
        </p>

        <div className={styles.home_img_container}>
          <img src={home} alt='man in glasses' />
        </div>

        <div className={styles.home__actions}>
          <LinkButton to='/admin' variant='reg-link'>
            Админка
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
