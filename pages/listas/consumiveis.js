import ListPage from "@/components/ListPage"
import { getData } from "@/lib/getDbData"

// test data

// const data = [{ id: 0, item: 'teste', tier: 'teste', url: 'www.google.com', value: 'teste' }]

// const commonData = data
// const uncommonData = data
// const rareData = data
// const veryRareData = data
// const legendaryData = data

// const dataSet = [
//   { id: 0, docData: commonData, tier: 'comum' },
//   { id: 1, docData: uncommonData, tier: 'incomum' },
//   { id: 2, docData: rareData, tier: 'raro' },
//   { id: 3, docData: veryRareData, tier: 'muRaro' },
//   { id: 4, docData: legendaryData, tier: 'lendario' }
// ]

export async function getStaticProps() {
  const tiers = ['comum', 'incomum', 'raro', 'muRaro', 'lendario']
  const commonData = await getData('Consumiveis', tiers[0])
  const uncommonData = await getData('Consumiveis', tiers[1])
  const rareData = await getData('Consumiveis', tiers[2])
  const veryRareData = await getData('Consumiveis', tiers[3])
  const legendaryData = await getData('Consumiveis', tiers[4])

  const dataSet = [
    { id: 0, docData: commonData, tier: 'comum' },
    { id: 1, docData: uncommonData, tier: 'incomum' },
    { id: 2, docData: rareData, tier: 'raro' },
    { id: 3, docData: veryRareData, tier: 'muRaro' },
    { id: 4, docData: legendaryData, tier: 'lendario' }
  ]

  return {
    props: {
      dataSet
    }
  }
}

export default function Consumables({ dataSet }) {
  return (
    <>
      <ListPage data={dataSet} type='potion' title='Consumíveis' />
    </>
  )
}