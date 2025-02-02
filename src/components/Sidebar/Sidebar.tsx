import { Link } from "react-router-dom";

import styles from "./Sidebar.module.scss";

import { FiMenu, FiX } from "react-icons/fi";
import { SidebarProps } from "@/common/types/sidebar";
import logo from '/assets/logo.svg';
import { LinkButton } from "../LinkButton/LinkButton";


export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {


  return (
   <div className={`${styles.sidebar} ${isOpen ? styles["sidebar--open"] : ""}`} onClick={(e) => e.stopPropagation()}>
    
      <button className={styles.close_btn} onClick={() => setIsOpen(false)}>
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

      <nav  className={styles.sidebar__nav}>
        <ul>
            <li className={styles.sidebar__item}>
                <a className={styles.sidebar__link} href="#">Главная</a>
            </li>
           <li className={styles.sidebar__item}>
                <a className={styles.sidebar__link} href="#">О нас</a>
            </li>
            <li className={styles.sidebar__item}>
                <a className={styles.sidebar__link} href="#">Контакты</a>
            </li>
        </ul>
      </nav>
    </div>
  );
};
