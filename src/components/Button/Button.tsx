import styles from './Button.module.scss'
import clsx from 'clsx'
import { ButtonProps } from '@/common/types/button'

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size])}
      {...props}
    >
      {children}
    </button>
  )
}
