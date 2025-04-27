import { useState } from 'react'

import styles from './Form.module.scss'

type Data = {
  name: string
  username: string
  first_name: string
  last_name: string
}

/* import { useTelegram } from '@/hooks/useTelegram' */
import { Button } from '../Button/Button'
import { useAppContext } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useModal } from '@/context/ModalContext'

export const Form = () => {
  //* Для пробной отправки запроса
  const [responseData, setResponseData] = useState(null)

  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { setIsAuthorized } = useAppContext()

  const { openModal } = useModal()

  const handleClick = () => {
    openModal(
      <div>
        <h2>Вы успешно авторизировались!</h2>
        <p>Наслаждайтесь нашим сервисом 😍</p>
      </div>
    )
  }

  const [formData, setFormData] = useState<Data>({
    name: '',
    username: '',
    first_name: '',
    last_name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)

    try {
      const res = await fetch('https://tg-3-evst.amvera.io', {
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

      setResponseData(responseData)

      setIsAuthorized(true)
      localStorage.setItem('token', '123456')
      navigate('/product')
      handleClick()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  /*  const { tg, user } = useTelegram()
  const [userData, setUserData] = useState('') */

  /*   useEffect(() => {
    tg.ready();
    tg.MainButton.setText("Войти").show();
    

    const handleMainButtonClick = async () => {
      if (!user) return;

      const userData = {
        name: user?.username,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        hash: tg.initDataUnsafe.hash,
      };

       try {
        const response = await fetch("https://e076-188-163-81-109.ngrok-free.app/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
         setUserData(data.message || "Успех");
         tg.MainButton.setText("Войти").hide();
         setIsModalOpen(true)
      } catch (error:any) {
        setUserData("Ошибка при авторизации");
      }
    };


   tg.onEvent("mainButtonClicked", handleMainButtonClick);

    return () => {
      tg.offEvent("mainButtonClicked");
    };
  }, [tg, user]); */

  return (
    <>
      {/* <div className={styles.auth_container}>
      <h3>Авторизация через Telegram !!!</h3>
      <p>Нажмите кнопку "Войти" в Telegram</p>
      <p>Это ответ от бекенда: {userData}</p>
      </div> */}

      <h1 className={styles.form_title}>Регистрация</h1>

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
            Зарегистрироваться
          </Button>
        </div>
      </form>

      <br />
      <br />
      <br />
      <p>Ответ:</p>
      <pre>{responseData && JSON.stringify(responseData, null, 2)}</pre>

      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
    </>
  )
}
