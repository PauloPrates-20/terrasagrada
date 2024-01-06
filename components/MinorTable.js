import { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'

import styles from '@/styles/MinorTable.module.css'

const tierList = {
  comum: 'Comum',
  incomum: 'Incomum',
  raro: 'Raro',
  muRaro: 'Muito Raro',
  lendario: 'Lendário'
}

export default function MinorTable({ content, tier, type }) {
  const [coll, setColl] = useState('expanded')

  const handleClick = () => {
    coll == 'expanded' ? setColl('collapsed') : setColl('expanded')
  }

  return (
    <div className={styles.main_container}>
      <button onClick={handleClick} className={`${styles[tier]}`}>
        {type == 'horse' ? 'Animais Terrestres' : tierList[tier]}
        {coll == 'expanded' ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <div className={`${styles[coll]}`}>
        <table className={`${styles.itemTable} ${styles[tier]}`}>
          <thead className={styles.tableHead}>
            <tr>
              <th>Item</th>
              {type == 'magic' && (
                <th>Item (Inglês)</th>
              )}
              <th>Valor</th>
              {type == 'magic' && (
                <th>Sintonização</th>
              )}
              {type == 'magic' && (
                <th>Reforja</th>
              )}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {content.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <a target='_blank' href={doc.url}>
                    {doc.item}
                  </a>
                </td>
                {type == 'magic' && (
                  <td>{doc.english}</td>
                )}
                <td className={styles.gold}>
                  {doc.value}
                </td>
                {type == 'magic' && (
                  <td>{doc.sint}</td>
                )}
                {type == 'magic' && (
                  <td>{doc.reforge}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}