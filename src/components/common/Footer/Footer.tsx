import styles from './Footer.module.scss'
import { FaVk } from 'react-icons/fa6'
import { RiTwitterXFill } from 'react-icons/ri'
import { FaLinkedin } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul className={styles.social}>
        <li className={styles.social__link}>
          <a href='https://vk.com/' target='_blank' rel='noreferrer'>
            <FaVk size={35} className={styles.icon} />
          </a>
        </li>
        <li className={styles.social__link}>
          <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
            <RiTwitterXFill size={35} className={styles.icon} />
          </a>
        </li>
        <li className={styles.social__link}>
          <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
            <FaInstagram size={35} className={styles.icon} />
          </a>
        </li>
        <li className={styles.social__link}>
          <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer'>
            <FaLinkedin size={35} className={styles.icon} />
          </a>
        </li>
        <li className={styles.social__link}>
          <a href='https://t.me/' target='_blank' rel='noreferrer'>
            <FaTelegram size={35} className={styles.icon} />
          </a>
        </li>
      </ul>
      © 2025 Supper App - All rights reserved.
    </div>
  )
}
