import { ReactNode } from 'react'

export type ModalContextType = {
  openModal: (content: ReactNode, duration?: number) => void
  closeModal: () => void
  modalContent: ReactNode | null
  isOpen: boolean
}

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}
