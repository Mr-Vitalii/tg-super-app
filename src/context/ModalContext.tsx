import { Modal } from '@/components/Modal/Modal'
import { createContext, useContext, useState, ReactNode } from 'react'

type ModalContextType = {
  openModal: (content: ReactNode) => void
  closeModal: () => void
  modalContent: ReactNode | null
  isOpen: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (content: ReactNode) => {
    setModalContent(content)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)
  }

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalContent, isOpen }}
    >
      {children}
      {/* Рендерим твой Modal здесь */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
