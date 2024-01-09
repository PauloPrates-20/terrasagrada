import { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'
import styles from '@/styles/ContentList.module.css'
import ListData from './ListData'

const tierList = {
  comum: 'Comum',
  incomum: 'Incomum',
  raro: 'Raro',
  muRaro: 'Muito Raro',
  lendario: 'Lendário'
}

export default function ContentList({ content, tier, type, clickHandler }) {
  const [coll, setColl] = useState('collapsed')

  const handleClick = () => {
    coll == 'expanded' ? setColl('collapsed') : setColl('expanded')
  }

  return (
    <div className={styles.main_container}>
      <button onClick={handleClick} className={`${styles[tier]}`}>
        {type == 'horse' ? 'Animais Terrestres' : tierList[tier]}
        {coll == 'expanded' ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <div className={`${styles.list_container} ${styles[coll]}`}>
        <ul>
          {content.map((doc) => (
            <ListData key={doc.id} content={doc} tier={tier} type={type} clickHandler={clickHandler} />
          ))}
        </ul>
      </div>
    </div>
  )
}