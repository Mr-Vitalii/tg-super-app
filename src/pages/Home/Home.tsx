import { Form } from '@/components/Form/Form'
import styles from './Home.module.scss'

import home from '/assets/home.png'

import { useTelegram } from '@/hooks/useTelegram'

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

        <Form />

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
