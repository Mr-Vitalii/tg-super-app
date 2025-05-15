import { Header } from '@/components/common/Header/Header'
import { LayoutProps } from '../common/types/layout'
import { Footer } from '../components/common/Footer/Footer'

import styles from './Layout.module.scss'
import { useState } from 'react'
import { Sidebar } from '@/components/common/Sidebar/Sidebar'

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className={`${styles.layout}`}>
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayActive : ''}`}
        onClick={() => setIsSidebarOpen(false)} // Закрывает Sidebar при клике вне
      />
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  )
}
