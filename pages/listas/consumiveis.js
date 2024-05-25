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
  const raridades = ['Comum', 'Incomum', 'Raro', 'Muito Raro', 'Lendário']

  const commonData = await getData('consumiveis', raridades[0])
  const uncommonData = await getData('consumiveis', raridades[1])
  const rareData = await getData('consumiveis', raridades[2])
  const veryRareData = await getData('consumiveis', raridades[3])
  const legendaryData = await getData('consumiveis', raridades[4])
  const dataSet = [
    { id: 0, docData: commonData, raridade: 'Comum' },
    { id: 1, docData: uncommonData, raridade: 'Incomum' },
    { id: 2, docData: rareData, raridade: 'Raro' },
    { id: 3, docData: veryRareData, raridade: 'Muito Raro' },
    { id: 4, docData: legendaryData, raridade: 'Lendário' }
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
      <ListPage data={dataSet} type='consumiveis' title='Consumíveis' />
    </>
  )
}