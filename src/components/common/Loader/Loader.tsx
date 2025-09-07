import React from 'react'
import styles from './Loader.module.scss'

export const Loader = React.memo(() => (
  <div className={styles.loader__container}>
    <div className={styles.loader}></div>
  </div>
))
