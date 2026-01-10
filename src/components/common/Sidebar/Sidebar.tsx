import { Link } from 'react-router-dom'

import styles from './Sidebar.module.scss'

import { FiX } from 'react-icons/fi'
import { SidebarProps } from '@/common/types/sidebar'
import logo from '/assets/logo.svg'

import { LinkButton } from '../LinkButton/LinkButton'
import { LogoutButton } from '../Button/LogoutButton'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
/* import { ThemeToggle } from '../ThemeToggle/ThemeToggle' */

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const handleClose = () => setIsOpen(false)
  const { hasNewItems } = useCart()

  const { user } = useAuth()
  console.log('user:', user)

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles['sidebar--open'] : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button className={styles.close_btn} onClick={handleClose}>
        <FiX size={24} />
      </button>

      <div className={styles.sidebar__logo}>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
        {/* <div className={styles.sidebar__theme}>
          <ThemeToggle />
        </div> */}
      </div>

      {!user && (
        <div className={styles.sidebar__actions}>
          <LinkButton to='/register' variant='reg-link' onClick={handleClose}>
            Регистрация
          </LinkButton>
        </div>
      )}

      {user && (
        <div className={styles.sidebar__actions}>
          <div className={styles.sidebar__link_wrapper}>
            <LinkButton to='/services-cart' variant='reg-link'>
              Мои заказы
            </LinkButton>
            {hasNewItems && <span className={styles.dot} />}
          </div>
          <LogoutButton />
        </div>
      )}

      <nav className={styles.sidebar__nav}>
        <ul>
          <li className={styles.sidebar__item}>
            <LinkButton to='/' onClick={handleClose}>
              Главная
            </LinkButton>
          </li>
          <li className={styles.sidebar__item}>
            <LinkButton to='/services' onClick={handleClose}>
              Сервисы
            </LinkButton>
          </li>
          <li className={styles.sidebar__item}>
            <LinkButton to='/orders-history' onClick={handleClose}>
              История заказов
            </LinkButton>
          </li>
          <li className={styles.sidebar__item}>
            <LinkButton to='/about' onClick={handleClose}>
              О нас
            </LinkButton>
          </li>
          <li className={styles.sidebar__item}>
            <LinkButton to='/contacts' onClick={handleClose}>
              Контакты
            </LinkButton>
          </li>
        </ul>
      </nav>
    </div>
  )
}
