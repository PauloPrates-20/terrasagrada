import { getData } from "@/lib/getDbData"
import MinorTable from "@/components/MinorTable"

import styles from '@/styles/ListPage.module.css'

export async function getStaticProps() {
  const tiers = ['comum', 'incomum', 'raro', 'muRaro', 'lendario']
  const commonData = await getData('Consumiveis', tiers[0])
  const uncommonData = await getData('Consumiveis', tiers[1])
  const rareData = await getData('Consumiveis', tiers[2])
  const veryRareData = await getData('Consumiveis', tiers[3])
  const legendaryData = await getData('Consumiveis', tiers[4])

  return {
    props: {
      commonData,
      uncommonData,
      rareData,
      veryRareData,
      legendaryData
    }
  }
}

export default function Consumables({ commonData, uncommonData, rareData, veryRareData, legendaryData }) {
  return (
    <main className={styles.main_container}>
      <h1>Lista de Consumíveis</h1>
      <div className={styles.table_container}>
        <MinorTable content={commonData} tier='comum' type='potion' />
        <MinorTable content={uncommonData} tier='incomum' type='potion' />
        <MinorTable content={rareData} tier='raro' type='potion' />
        <MinorTable content={veryRareData} tier='muRaro' type='potion' />
        <MinorTable content={legendaryData} tier='lendario' type='potion' />
      </div>
    </main>
  )
}