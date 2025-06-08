import { IoSunnyOutline } from 'react-icons/io5'
import { IoMoonOutline } from 'react-icons/io5'
import styles from './ThemeToggle.module.scss'
import { useTheme } from '@/context/theme/useTheme'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label='Toggle theme'
    >
      {theme === 'light' ? (
        <IoMoonOutline width={20} />
      ) : (
        <IoSunnyOutline width={20} />
      )}
    </button>
  )
}
