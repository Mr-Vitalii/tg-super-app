import styles from './Home.module.scss'

import { useState } from 'react'

import home from '/assets/home.png'

import { useTelegram } from '@/hooks/useTelegram'
import { Button } from '@/components/Button/Button'

/* const data = {
  name: 'Vito333',
  username: 'Vito444',
  first_name: 'Vitalii',
  last_name: '',
} */

type Data = {
  name: string
  username: string
  first_name: string
  last_name: string
}

export const Home = () => {
  const { user } = useTelegram()

  //* Для пробной отправки запроса

  const [formData, setFormData] = useState<Data>({
    name: '',
    username: '',
    first_name: '',
    last_name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [responseData, setResponseData] = useState(null)
  const [name, setName] = useState(null)
  const [username, setUserName] = useState(null)
  const [first_name, setFirstName] = useState(null)
  const [last_name, setLastName] = useState(null)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)

    try {
      const res = await fetch('https://tg-back-evst.amvera.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        console.log('Error')
      }

      const responseData = await res.json()

      const name = responseData?.name
      const username = responseData?.username
      const firstName = responseData?.firstName
      const lastName = responseData?.lastName

      setResponseData(responseData)
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

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor='first_name'>First Name</label>
            <input
              type='text'
              id='first_name'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor='last_name'>Last Name</label>
            <input
              type='text'
              id='last_name'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formButton}>
            <Button type='submit' variant='primary' size='large'>
              Отправить данные
            </Button>
          </div>
        </form>

        {/*     <div className={styles.home_btn}>
          <Button onClick={onSend} variant='primary' size='large'>
            Отправить данные
          </Button>
        </div> */}

        <br />
        <br />
        <br />
        <p>Ответ:</p>
        <pre>{responseData && JSON.stringify(responseData, null, 2)}</pre>
        {name && <p>Name: {name}</p>}
        {username && <p>Username: {username}</p>}
        {first_name && <p>First Name: {first_name}</p>}
        {last_name && <p>Last Name: {last_name}</p>}

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
