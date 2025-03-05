import styles from './Home.module.scss'
import { useState } from 'react'

import home from '/assets/home.png'

import { useTelegram } from '@/hooks/useTelegram'
import { Button } from '@/components/Button/Button'

const data = {
  name: 'Vito333',
  username: 'Vito444',
  first_name: 'Vitalii',
  last_name: '',
}

export const Home = () => {
  const { user } = useTelegram()

  //* Для пробной отправки запроса
  const [name, setName] = useState(null)
  const [username, setUserName] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)

  const [error, setError] = useState<string | null>(null)

  const onSend = async () => {
    try {
      const res = await fetch(
        'https://52e8-206-189-20-158.ngrok-free.app/api/data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (!res.ok) {
        console.log('Error')
        // throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const responseData = await res.json()

      const name = responseData?.name
      const username = responseData?.username
      const firstName = responseData?.first_name
      const lastName = responseData?.last_name

      setName(name)
      setUserName(username)
      setFirstName(firstName)
      setLastName(lastName)

      console.log('Name:', name)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

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

        <div className={styles.home_btn}>
          <Button onClick={onSend} variant='primary' size='large'>
            Отправить данные
          </Button>
        </div>

        <br />
        <br />
        <br />
        <p>Ответ:</p>
        {name && <p>Name: {name}</p>}
        {username && <p>Username: {username}</p>}
        {firstName && <p>First Name: {firstName}</p>}
        {lastName && <p>Last Name: {lastName}</p>}

        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

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
