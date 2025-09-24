import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Form.module.scss'

import { Button } from '../common/Button/Button'
import { useModal } from '@/context/modal/useModal'
import { useTelegram } from '@/hooks/useTelegram'
import { useAuth } from '@/context/auth/useAuth'

type Data = {
  name: string
}

export const Form = () => {
  const [formData, setFormData] = useState<Data>({ name: '' })
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { openModal } = useModal()
  const { initData } = useTelegram()
  const { authorize } = useAuth()

  const handleModalSuccess = () => {
    openModal(
      <div>
        <h2>Вы успешно авторизировались!</h2>
        <p>Добро пожаловать 🚀</p>
      </div>
    )
  }

  const handleModalError = (error: string) => {
    openModal(
      <div>
        <p>{'Ошибка авторизации: ' + error}</p>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await authorize(initData || '', formData.name)

      navigate('/services')
      handleModalSuccess()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(message)
      handleModalError(message)
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

      <br />
      <br />
      <br />
      <p>Ответ:</p>

      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
    </>
  )
}
