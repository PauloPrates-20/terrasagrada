import { GiPotionBall, GiSaddle, GiRuneStone, GiTwoHandedSword, GiMagicAxe  } from 'react-icons/gi'

import styles from '@/styles/ListData.module.css'

const typeIcon = {
  magic: <GiRuneStone />,
  potion: <GiPotionBall />,
  horse: <GiSaddle />,
  mundane: <GiTwoHandedSword />,
  artifice: <GiMagicAxe />
}

export default function TableData({ content, tier, type, clickHandler }) {
  return (
    <>
      <li onClick={() => clickHandler(content)} className={`${styles[tier]} ${styles.list_item}`}>
        <p className={styles.text}>
          <span className={styles.icon}>{typeIcon[type]}</span>
          {content.item}
        </p>
        <p className={styles.gold}>
          {content.value}
        </p>
      </li>
    </>
  )
}