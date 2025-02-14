import { Link } from "react-router-dom";

import styles from "./Sidebar.module.scss";

import { FiX } from "react-icons/fi";
import { SidebarProps } from "@/common/types/sidebar";
import logo from '/assets/logo.svg';
import { LinkButton } from "../LinkButton/LinkButton";


export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {

  const handleClose = () => setIsOpen(false);

  return (
   <div className={`${styles.sidebar} ${isOpen ? styles["sidebar--open"] : ""}`} onClick={(e) => e.stopPropagation()}>
    
      <button className={styles.close_btn} onClick={handleClose}>
        <FiX size={24} />
      </button>

      <div className={styles.sidebar__logo}>
        <Link  to="/">
            <img src={logo} alt="logo" />
        </Link>
      </div>

        <div className={styles.sidebar__actions}>
            <LinkButton
                    to="/register"
          variant="reg-link"
                    >
              Регистрация
            </LinkButton>
      </div>
        <div className={styles.sidebar__actions}>
            <LinkButton
                    to="/form"
                    variant="reg-link"
                    >
              Форма
            </LinkButton>
      </div>

      <nav  className={styles.sidebar__nav}>
        <ul>
            <li className={styles.sidebar__item}>
                <LinkButton
              to="/"
              onClick={handleClose}
                    >
              Главная
            </LinkButton>
            </li>
            <li className={styles.sidebar__item}>
            <LinkButton
              to="/product"
              onClick={handleClose}
                    >
              Продукция
            </LinkButton>
            </li>
            <li className={styles.sidebar__item}>
              <LinkButton
              to="/about"
              onClick={handleClose}
                    >
              О нас
            </LinkButton>
            </li>
            <li className={styles.sidebar__item}>
              <LinkButton
              to="/contacts"
              onClick={handleClose}
                    >
              Контакт
            </LinkButton>
            </li>
        </ul>
      </nav>
    </div>
  );
};
