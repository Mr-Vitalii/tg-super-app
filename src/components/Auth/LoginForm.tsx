import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '@/schemas/loginSchema'
import styles from './RegisterForm.module.scss'
import { useAuth } from '@/context/auth/useAuth'

const LoginForm = () => {
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Ошибка при входе')

      const { token, user } = await response.json()

      login(token, user) // ← сюда передаём токен и данные пользователя
    } catch (error) {
      console.error('Ошибка авторизации:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Вход</h2>

      <div className={styles.field}>
        <label htmlFor='email' className={styles.label}>
          Email
        </label>
        <input
          id='email'
          type='email'
          {...register('email')}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor='password' className={styles.label}>
          Пароль
        </label>
        <input
          id='password'
          type='password'
          {...register('password')}
          className={styles.input}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button type='submit' className={styles.submit} disabled={isSubmitting}>
        Войти
      </button>
    </form>
  )
}

export default LoginForm
