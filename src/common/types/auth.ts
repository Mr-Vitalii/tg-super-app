import { User } from './user'

export type AuthContextType = {
  user: User | null
  loading: boolean
  authorize: (initData: string, name: string) => Promise<void>
  logout: () => Promise<void>
}

export type LoginFormData = {
  email: string
  password: string
}

export type RegisterFormData = {
  name: string
  email: string
  password: string
}
