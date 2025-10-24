import styles from './Card.module.scss'
import React from 'react'

interface CardProps {
  image?: string | React.ReactNode
  imageAlt?: string
  title?: React.ReactNode // Заголовок (необязательно)
  titleTag?: keyof JSX.IntrinsicElements
  children?: React.ReactNode // Основной контент
  actions?: React.ReactNode // Нижняя часть (например, кнопки)
  className?: string
  style?: React.CSSProperties
}

const CardComponent: React.FC<CardProps> = ({
  image,
  imageAlt,
  title,
  titleTag: TitleTag = 'div',
  children,
  actions,
  className,
  style,
}) => {
  return (
    <div className={`${styles.card} ${className || ''}`} style={style}>
      {image ? (
        /* ✅ Если image — строка */
        typeof image === 'string' ? (
          <div className={styles.card__image}>
            <img src={image} alt={imageAlt} />
          </div>
        ) : (
          /* ✅ Если image — JSX */
          image
        )
      ) : (
        <div className={styles.card__imgPlaceholder} />
      )}

      {title && <TitleTag className={styles.card__title}>{title}</TitleTag>}
      <div className={styles.card__info}>{children}</div>
      {actions && <div className={styles.card__actions}>{actions}</div>}
    </div>
  )
}

export const Card = React.memo(CardComponent)
