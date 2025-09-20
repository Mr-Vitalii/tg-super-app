import { useState } from 'react'

import styles from './Form.module.scss'

type Data = {
  /*   phone: string */
  name: string
}

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

  const { initData } = useTelegram()

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
    /*  phone: '', */
    name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('formData:', formData)
    console.log('initData: ', initData)

    /*     const payload = {
      ...formData,
      username: user?.username || '',
      initData,
    }
    console.log(payload) */

    /*     setIsAuthorized(true)
    localStorage.setItem('token', '123456') */

    try {
      const res = await fetch('https://tg5-evst.amvera.io/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-InitData': initData || '',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const responseData = await res.json()

      if (!res.ok) {
        console.error('Error:', responseData)
        setError(responseData.message || 'An error occurred')
        handleModalError(responseData.message || 'Error')
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

  return (
    <>
      <h1 className={styles.form_title}>Регистрация</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
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
