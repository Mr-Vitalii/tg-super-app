import logo from '/assets/logo.svg'

import styles from './Header.module.scss'

import { HeaderProps } from '@/common/types/header'

import { FaHamburger } from 'react-icons/fa'

import { LinkButton } from '../LinkButton/LinkButton'

import { useAppContext } from '@/context/AppContext'
import { LogoutButton } from '../Button/LogoutButton'

export const Header = ({ setIsSidebarOpen }: HeaderProps) => {
  const { isAuthorized } = useAppContext()
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <button
          className={styles.burger}
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaHamburger size={24} color='#fff' />
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
            <LinkButton to='/services'>Услуги</LinkButton>
          </div>
          <div className={styles.header__link}>
            <LinkButton to='/about'>О компании</LinkButton>
          </div>
          <div className={styles.header__link}>
            <LinkButton to='/contacts'>Контакты</LinkButton>
          </div>
        </div>

        {!isAuthorized && (
          <div className={styles.header__regBtn}>
            <LinkButton to='/register' variant='reg-link'>
              Регистрация
            </LinkButton>
          </div>
        )}

        <div>
          {isAuthorized && (
            <div className={styles.header__actions}>
              <LinkButton to='/services-cart' variant='reg-link'>
                Мои услуги
              </LinkButton>
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
