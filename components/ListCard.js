import { useState } from 'react'

import styles from '@/styles/ListCard.module.css'

export default function ListCard({ icon, text, clickHandler }) {
  return (
    <div onClick={() => clickHandler(text)} className={styles.card}>
      {icon}
      <p>{text}</p>
    </div>
  )
}