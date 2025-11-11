import { NavLink } from 'react-router-dom'
import styles from './LinkButton.module.scss' // Используем те же стили
import clsx from 'clsx'
import { LinkButtonProps } from '@/common/types/button'

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  to,
  variant = 'initial',
  size = 'medium',
  ...props
}) => {
  return (
    <div className={clsx(styles.link, styles[variant], styles[size])}>
      <NavLink to={to} {...props}>
        {children}
      </NavLink>
    </div>
  )
}
