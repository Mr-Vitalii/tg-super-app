import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterFormData } from '@/schemas/registerSchema'

import styles from './RegisterForm.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/auth/useAuth'

export const RegisterForm = () => {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data)
      navigate('/') // или другой маршрут
    } catch (err) {
      console.error('Ошибка регистрации:', err)
      // возможно, отображение ошибки пользователю
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor='name'>
          Имя
        </label>
        <input
          className={styles.input}
          type='text'
          id='name'
          {...register('name')}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
        <input
          className={styles.input}
          type='email'
          id='email'
          {...register('email')}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor='password'>
          Пароль
        </label>
        <input
          className={styles.input}
          type='password'
          id='password'
          {...register('password')}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className={styles.submitBtn}
      >
        Зарегистрироваться
      </button>
    </form>
  )
}
