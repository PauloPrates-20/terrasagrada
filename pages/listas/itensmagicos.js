import { getData } from "@/lib/getDbData"
import MinorTable from "@/components/MinorTable"

import styles from '@/styles/ListPage.module.css'

// test data

const data = [{id: 0, item: 'teste', reforge: 'teste', sint: 'teste', tier: 'teste', url: 'www.google.com', value: 'teste', english: 'teste'}]
const commonData = data
const uncommonData = data
const rareData = data
const veryRareData = data
const legendaryData = data

// export async function getStaticProps() {
//   const tiers = ['comum', 'incomum', 'raro', 'muRaro', 'lendario']
//   const commonData = await getData('ItensMagicos', tiers[0])
//   const uncommonData = await getData('ItensMagicos', tiers[1])
//   const rareData = await getData('ItensMagicos', tiers[2])
//   const veryRareData = await getData('ItensMagicos', tiers[3])
//   const legendaryData = await getData('ItensMagicos', tiers[4])

//   return {
//     props: {
//       commonData,
//       uncommonData,
//       rareData,
//       veryRareData,
//       legendaryData
//     }
//   }
// }

export default function MagicItems() {
  return (
    <main className={styles.main_container}>
      <h1>Lista de Itens Mágicos</h1>
      <div className={styles.table_container}>
        <MinorTable content={commonData} tier='comum' type='magic' />
        <MinorTable content={uncommonData} tier='incomum' type='magic' />
        <MinorTable content={rareData} tier='raro' type='magic' />
        <MinorTable content={veryRareData} tier='muRaro' type='magic' />
        <MinorTable content={legendaryData} tier='lendario' type='magic' />
      </div>
    </main>
  )
}