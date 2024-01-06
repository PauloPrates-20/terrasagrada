import { getData } from '@/lib/getDbData'

import MinorTable from '@/components/MinorTable'

import styles from '@/styles/ListPage.module.css'

export async function getStaticProps() {
  const data = await getData('Montarias', 'comum')

  return {
    props: { data }
  }
}

export default function Mounts({ data }) {
  return (
    <main className={styles.main_container}>
      <h1>Lista de Montarias</h1>
      <div className={`${styles.comum} ${styles.table_container}`}>
        <MinorTable content={data} tier='comum' />
      </div>
    </main>
  )
}