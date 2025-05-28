/* export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}; */

import { User } from './user'

export type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  register: (formData: RegisterFormData) => Promise<void>
}

export type LoginFormData = {
  email: string
  password: string
}

export type RegisterFormData = {
  name: string
  email: string
  password: string
  // confirmPassword?: string — если используется для валидации на клиенте
}

/* export type RegisterFormData = {
  firstName: string;

};

export type SignInFormData = {
  email: string;
  password: string;
};

export type ErrorResponse = {
  message: string;
} */
