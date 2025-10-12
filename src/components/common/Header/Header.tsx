import logo from '/assets/logo.svg'

import styles from './Header.module.scss'

import { HeaderProps } from '@/common/types/header'

import { FaHamburger } from 'react-icons/fa'
import { BsCart3 } from 'react-icons/bs'
import { BsCartCheck } from 'react-icons/bs'

import { LinkButton } from '../LinkButton/LinkButton'

import { LogoutButton } from '../Button/LogoutButton'
import { useCart } from '@/hooks/useCart'
import { Link } from 'react-router-dom'
import BackButton from '../BackButton/BackButton'
/* import { ThemeToggle } from '../ThemeToggle/ThemeToggle' */
import { useAuth } from '@/hooks/useAuth'

export const Header = ({ setIsSidebarOpen }: HeaderProps) => {
  const { user } = useAuth()
  const { cart, hasNewItems } = useCart()
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__back_btn}>
          <BackButton />
        </div>

        <div className={styles.header__burger_container}>
          <Link to='/services-cart' className={styles.cart}>
            {cart.length > 0 ? (
              <BsCartCheck size={40} color='#fff' />
            ) : (
              <BsCart3 size={40} color='#fff' />
            )}
            {hasNewItems && <span className={styles.dot} />}
          </Link>
          <button
            className={styles.burger}
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaHamburger size={24} color='#fff' />
          </button>
        </div>

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

        {!user && (
          <div className={styles.header__regBtn}>
            <LinkButton to='/register' variant='reg-link'>
              Регистрация
            </LinkButton>
          </div>
        )}

        <div>
          {user && (
            <div className={styles.header__actions}>
              <div className={styles.header__link_wrapper}>
                <LinkButton to='/services-cart' variant='reg-link'>
                  Мои услуги
                </LinkButton>
                {hasNewItems && <span className={styles.dot} />}
              </div>
              <LogoutButton />
            </div>
          )}
        </div>

        {/* <div className={styles.header__theme_toggle}>
          <ThemeToggle />
        </div> */}
      </div>
    </header>
  )
}
