import styles from './CardsList.module.scss'

interface CardsListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  columns?: number // количество колонок, например 2, 3, 4
  className?: string
}

export function CardsList<T>({
  items,
  renderItem,
  columns = 3,
  className = '',
}: CardsListProps<T>) {
  // ограничим диапазон колонок, чтобы не ломать сетку
  const safeColumns = Math.min(Math.max(columns, 1), 6)

  return (
    <ul
      className={`${styles.cards__list} ${styles[`col-${safeColumns}`]} ${className}`}
    >
      {items.map((item, index) => (
        <li key={index} className={styles.card__item}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
