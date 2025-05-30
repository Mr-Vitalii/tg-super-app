import { ReactNode, useRef, useState } from 'react'
import { ModalContext } from './ModalContext'
import { Modal } from '@/components/common/Modal/Modal'

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openModal = (content: ReactNode, duration?: number) => {
    // Очистить предыдущий timeout, если есть
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setModalContent(content)
    setIsOpen(true)

    if (duration) {
      timeoutRef.current = setTimeout(() => {
        closeModal()
      }, duration)
    }
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)

    // Очищаем timeout при ручном закрытии
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalContent, isOpen }}
    >
      {children}
      {/* Рендерим Modal здесь */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  )
}
