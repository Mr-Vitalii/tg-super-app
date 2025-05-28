import { AuthContextType } from '@/common/types/auth'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
