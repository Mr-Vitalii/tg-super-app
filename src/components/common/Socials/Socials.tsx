import React from 'react'
import { FaTelegram, FaVk } from 'react-icons/fa'
import styles from './Socials.module.scss'

export interface SocialItem {
  name: string
  url: string
}

interface SocialsProps {
  items: SocialItem[]
  iconSize?: number
  className?: string
}

const icons: Record<string, JSX.Element> = {
  telegram: <FaTelegram />,
  vk: <FaVk />,
}

export default function Socials({
  items,
  iconSize = 32,
  className = '',
}: SocialsProps) {
  return (
    <ul className={`flex gap-4 ` + `${styles.socials} ${className}`}>
      {items.map((item) => {
        const Icon = icons[item.name.toLowerCase()]
        if (!Icon) return null
        return (
          <li key={item.name} className={styles.socials__item}>
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.socials__icon}
              aria-label={item.name}
            >
              {React.cloneElement(Icon, { size: iconSize })}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
