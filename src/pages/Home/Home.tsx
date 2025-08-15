import { useAppContext } from '@/context/AppContext'
import styles from './Home.module.scss'

import home from '/assets/home.png'

import { useTelegram } from '@/hooks/useTelegram'
import { LinkButton } from '@/components/common/LinkButton/LinkButton'
/* import { useEffect } from 'react' */

export const Home = () => {
  const { user } = useTelegram()

  const { isAuthorized } = useAppContext()

  /*  const { initData } = useTelegram() */

  /*   console.log(initData) */

  /*   useEffect(() => {
    if (initData) {
      fetch('https://tg5-evst.amvera.io/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('User verified:', data)
        })
        .catch((err) => {
          console.error('Verification failed:', err)
        })
    }
  }, [initData]) */

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
