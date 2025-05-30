import { ModalContextType } from '@/common/types/modal'
import { createContext } from 'react'

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)
