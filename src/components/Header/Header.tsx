import logo from '/assets/logo.svg';

import styles from "./Header.module.scss";

import { HeaderProps } from "@/common/types/header";

import { FaHamburger } from "react-icons/fa";

import { LinkButton } from "../LinkButton/LinkButton";



export const Header = ({ setIsSidebarOpen }: HeaderProps) => {

  return (
    <header className={styles.header}>
        <button className={styles.burger} onClick={() => setIsSidebarOpen(true)}>
            <FaHamburger size={24} />
        </button>
      <div className={styles.header__logo}>
        <LinkButton  to="/">
           <img src={logo} alt="logo" />
        </LinkButton>
      </div>


      
      <div className={styles.header__nav_menu}>
        <div className={styles.header__link}>
           <LinkButton
              to="/product"
            >
              Продукция
            </LinkButton>
        </div>
        <div className={styles.header__link}>
           <LinkButton
              to="/about"
            >
              О компании
            </LinkButton>
        </div>
      </div>


      <div className={styles.header__actions}>
            <LinkButton
            to="/register"
            variant="reg-link"
            >
              Регистрация
            </LinkButton>
      </div>

    </header>
  );
};
