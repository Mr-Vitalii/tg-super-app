import { useState } from 'react'

import styles from './Form.module.scss'

type Data = {
  phone: string
  name: string
}

/* import { useTelegram } from '@/hooks/useTelegram' */
import { Button } from '../common/Button/Button'
import { useAppContext } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useModal } from '@/context/modal/useModal'
import { useTelegram } from '@/hooks/useTelegram'

/* import { RegisterForm } from '../Auth/RegisterForm'
import LoginForm from '../Auth/LoginForm' */

export const Form = () => {
  //* Для пробной отправки запроса
  const [responseData, setResponseData] = useState<{
    status: string
    message: string
  } | null>(null)

  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { setIsAuthorized } = useAppContext()

  const { user } = useTelegram()

  const { openModal } = useModal()

  const handleModalSuccess = () => {
    openModal(
      <div>
        <h2>Вы успешно авторизировались!</h2>
        <p>Наслаждайтесь нашим сервисом 😍</p>
      </div>
    )
  }
  const handleModalError = (error: string) => {
    openModal(
      <div>
        <p>{'Ошибка авторизации: ' + error || ''}</p>
      </div>
    )
  }

  const [formData, setFormData] = useState<Data>({
    phone: '',
    name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)

    const payload = {
      ...formData,
      username: user?.username || '',
    }
    console.log(payload)

    /* setIsAuthorized(true)
    localStorage.setItem('token', '123456') */

    try {
      const res = await fetch('https://tg5-evst.amvera.io/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const responseData = await res.json()

      if (!res.ok) {
        console.log('Error')
        console.log(responseData)
        setError(responseData.message || 'An error occurred')
        handleModalError(responseData.message)
        return
      }

      setResponseData(responseData)

      setIsAuthorized(true)
      localStorage.setItem('token', '123456')
      navigate('/services')
      handleModalSuccess()
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
          <label htmlFor='name'>Номер</label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='+XX (XXX) XXX-XX-XX'
            pattern='[\d\s\+\-\(\)]*'
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='name'>Имя</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Введите ваше имя'
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formButton}>
          <Button type='submit' variant='primary' size='large'>
            Зарегистрироваться
          </Button>
        </div>
      </form>

      {/*  <RegisterForm /> */}

      {/*  <LoginForm /> */}

      <br />
      <br />
      <br />
      <p>Ответ:</p>
      {/* <pre>{responseData && JSON.stringify(responseData, null, 2)}</pre> */}
      <pre>{responseData && responseData?.message}</pre>

      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
    </>
  )
}
