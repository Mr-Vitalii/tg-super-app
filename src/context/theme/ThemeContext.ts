import { ThemeContextProps } from '@/common/types/theme'
import { createContext } from 'react'

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
)
