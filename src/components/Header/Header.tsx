import logo from '/assets/logo.svg'

import styles from './Header.module.scss'

import { HeaderProps } from '@/common/types/header'

import { FaHamburger } from 'react-icons/fa'

import { LinkButton } from '../LinkButton/LinkButton'

import { LogoutButton } from '../Button/LogoutButton'
import { useAppContext } from '@/context/AppContext'

export const Header = ({ setIsSidebarOpen }: HeaderProps) => {
  const { isAuthorized } = useAppContext()
  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={() => setIsSidebarOpen(true)}>
        <FaHamburger size={24} color='#710793' />
      </button>
      <div className={styles.header__logo}>
        <LinkButton to='/'>
          <img src={logo} alt='logo' />
        </LinkButton>
      </div>

      <div className={styles.header__nav_menu}>
        <div className={styles.header__link}>
          <LinkButton to='/'>Главная</LinkButton>
        </div>
        <div className={styles.header__link}>
          <LinkButton to='/product'>Продукция</LinkButton>
        </div>
        <div className={styles.header__link}>
          <LinkButton to='/about'>О компании</LinkButton>
        </div>
        <div className={styles.header__link}>
          <LinkButton to='/contacts'>Контакты</LinkButton>
        </div>
      </div>

      {!isAuthorized && (
        <div className={styles.header__actions}>
          <LinkButton to='/register' variant='reg-link'>
            Регистрация
          </LinkButton>
        </div>
      )}

      {isAuthorized && (
        <div className={styles.header__actions}>
          <LogoutButton />
        </div>
      )}
    </header>
  )
}
