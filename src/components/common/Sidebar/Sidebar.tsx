import { Link } from 'react-router-dom'

import styles from './Sidebar.module.scss'

import { FiX } from 'react-icons/fi'
import { SidebarProps } from '@/common/types/sidebar'
import logo from '/assets/logo.svg'

import { useAppContext } from '@/context/AppContext'
import { LinkButton } from '../LinkButton/LinkButton'
import { LogoutButton } from '../Button/LogoutButton'
import { useCart } from '@/context/cart/useCart'

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const handleClose = () => setIsOpen(false)
  const { hasNewItems } = useCart()

  const { isAuthorized } = useAppContext()

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
      </div>

      {!isAuthorized && (
        <div className={styles.sidebar__actions}>
          <LinkButton to='/register' variant='reg-link' onClick={handleClose}>
            Регистрация
          </LinkButton>
        </div>
      )}

      {isAuthorized && (
        <div className={styles.sidebar__actions}>
          <div className={styles.sidebar__link_wrapper}>
            <LinkButton to='/services-cart' variant='reg-link'>
              Мои услуги
            </LinkButton>
            {hasNewItems && <span className={styles.dot} />}
          </div>
          <LogoutButton />
        </div>
      )}

      {/*   <div className={styles.sidebar__actions}>
            <LinkButton
                    to="/form"
          variant="reg-link"
          onClick={handleClose}
                    >
              Форма
            </LinkButton>
      </div> */}

      <nav className={styles.sidebar__nav}>
        <ul>
          <li className={styles.sidebar__item}>
            <LinkButton to='/' onClick={handleClose}>
              Главная
            </LinkButton>
          </li>
          <li className={styles.sidebar__item}>
            <LinkButton to='/services' onClick={handleClose}>
              Услуги
            </LinkButton>
          </li>
          <li className={styles.sidebar__item}>
            <LinkButton to='/about' onClick={handleClose}>
              О компании
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
