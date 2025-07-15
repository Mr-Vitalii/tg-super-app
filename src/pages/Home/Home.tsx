import { useAppContext } from '@/context/AppContext'
import styles from './Home.module.scss'

import home from '/assets/home.png'

import { useTelegram } from '@/hooks/useTelegram'
import { LinkButton } from '@/components/common/LinkButton/LinkButton'

export const Home = () => {
  const { user } = useTelegram()

  const { isAuthorized } = useAppContext()

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

        {isAuthorized && (
          <div className={styles.home__actions}>
            <LinkButton to='/admin' variant='reg-link'>
              Админка
            </LinkButton>
          </div>
        )}

        {/*     <div className={styles.home_btn}>
          <Button onClick={onSend} variant='primary' size='large'>
            Отправить данные
          </Button>
        </div> */}

        {/*          <button
          style={{
          display: "block",
          background: "#007bff",
          color: "white",
          padding: "10px 20px",
          maxWidth: "250px",
          margin: "0 auto",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Открыть модалку
      </button> */}
      </div>
    </div>
  )
}
