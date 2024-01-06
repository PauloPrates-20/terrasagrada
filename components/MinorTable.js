import styles from '@/styles/MinorTable.module.css'

export default function MinorTable({ content, tier }) {
  return (
    <>
      <table className={`${styles.itemTable} ${styles[tier]}`}>
        <thead className={styles.tableHead}>
          <tr>
            <th>Item</th>
            <th>Valor</th>
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
              <td>
                {doc.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}