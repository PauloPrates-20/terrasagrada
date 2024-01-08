import { getData } from "@/lib/getDbData"

import ListPage from "@/components/ListPage"

// test data

// const data = [{id: 0, item: 'teste', reforge: 'teste', sint: 'teste', tier: 'teste', url: 'https://www.google.com', value: 'teste', english: 'teste'},
// ]
// const commonData = data
// const uncommonData = data
// const rareData = data
// const veryRareData = data
// const legendaryData = [
//   {id: 0, item: 'teste', reforge: 'teste', sint: 'teste', tier: 'teste', url: 'www.google.com', value: 'teste', english: 'teste'},
//   {id: 1, item: 'teste', reforge: 'teste', sint: 'teste', tier: 'lendario', url: 'www.google.com', value: '50000 PO', english: 'teste'}
// ]

// const dataSet = [
//   {id: 0, docData: commonData, tier: 'comum'},
//   {id: 1, docData: uncommonData, tier: 'incomum'},
//   {id: 2, docData: rareData, tier: 'raro'},
//   {id: 3, docData: veryRareData, tier: 'muRaro'},
//   {id: 4, docData: legendaryData, tier: 'lendario'}
// ]

// real data

export async function getStaticProps() {
  const tiers = ['comum', 'incomum', 'raro', 'muRaro', 'lendario']
  const commonData = await getData('ItensMagicos', tiers[0])
  const uncommonData = await getData('ItensMagicos', tiers[1])
  const rareData = await getData('ItensMagicos', tiers[2])
  const veryRareData = await getData('ItensMagicos', tiers[3])
  const legendaryData = await getData('ItensMagicos', tiers[4])

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

export default function MagicItems({ dataSet }) {
  return (
    <>
      <ListPage data={dataSet} title='Itens Mágicos' type='magic' />
    </>
  )
}