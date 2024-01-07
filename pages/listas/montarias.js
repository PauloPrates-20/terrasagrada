import { getData } from '@/lib/getDbData'

import MinorTable from '@/components/MinorTable'

import styles from '@/styles/ListPage.module.css'

// test data
const data = [{id: 0, item: 'teste', tier: 'teste', url: 'www.google.com', value: 'teste'}]

// export async function getStaticProps() {
//   const data = await getData('Montarias', 'comum')

//   return {
//     props: { data }
//   }
// }

export default function Mounts() {
  return (
    <main className={styles.main_container}>
      <h1>Lista de Montarias</h1>
      <MinorTable content={data} tier='comum' type='horse' />
    </main>
  )
}