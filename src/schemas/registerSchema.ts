import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .max(32, 'Пароль должен быть не длиннее 32 символов'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
