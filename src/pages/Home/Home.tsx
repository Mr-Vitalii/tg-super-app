import styles from './Home.module.scss'

import home from '/assets/home.png'

import { useTelegram } from '@/hooks/useTelegram'
import { LinkButton } from '@/components/common/LinkButton/LinkButton'

const Home = () => {
  const { user } = useTelegram()

  return (
    <div>
      <div className='home'>
        <div className={styles.home_greetings}>
          <p>
            Приветсвуем Вас,{' '}
            <span className={styles.home_user_name}>{user?.username}</span> . Мы
            рады что вы выбрали "Логово Рексара".
          </p>
          <h1>"Логово Рексара" - все услуги в одном месте</h1>
          <h2>
            Найдите мастера, выберите время и запишитесь онлайн за пару кликов.
          </h2>
        </div>

        <div className={styles.home_img_container}>
          <img src={home} alt='man in glasses' />
        </div>

        <div className={styles.home__actions}>
          <LinkButton to='/services' variant='reg-link'>
            Начать поиск
          </LinkButton>
        </div>
        {/*      <div className={styles.home__actions}>
          <LinkButton to='/admin' variant='reg-link'>
            Админка
          </LinkButton>
        </div> */}
      </div>
    </div>
  )
}

export default Home
