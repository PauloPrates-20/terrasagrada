import { GiPotionBall, GiSaddle, GiRuneStone, GiTwoHandedSword, GiMagicAxe  } from 'react-icons/gi'

import styles from '@/styles/ListData.module.css'

const typeIcon = {
  itensMagicos: <GiRuneStone />,
  consumiveis: <GiPotionBall />,
  itensMundanos: <GiTwoHandedSword />,
  infusoes: <GiMagicAxe />
}

export default function TableData({ content, raridade, type, clickHandler }) {
  let nome = content.nome;
  if (type !== 'consumiveis' && type !== 'itensMundanos') {
    nome = content.nome.portugues
  }

  return (
    <>
      <li onClick={() => clickHandler(content)} className={`${styles[raridade]} ${styles.list_item}`}>
        <p className={styles.text}>
          <span className={styles.icon}>{typeIcon[type]}</span>
          {nome}
        </p>
        <p className={styles.gold}>
          {content.valor} PO
        </p>
      </li>
    </>
  )
}