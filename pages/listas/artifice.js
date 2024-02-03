import { getData } from '@/lib/getDbData'

import ListPage from '@/components/ListPage'

export async function getStaticProps() {
  const tiers = ['comum', 'incomum', 'raro', 'muRaro', 'lendario']
  const uncommonData = await getData('Artifice', tiers[1])
  const rareData = await getData('Artifice', tiers[2])
  const veryRareData = await getData('Artifice', tiers[3])
  const legendaryData = await getData('Artifice', tiers[4])

  const dataSet = [
    { id: 0, docData: uncommonData, tier: 'incomum' },
    { id: 1, docData: rareData, tier: 'raro' },
    { id: 2, docData: veryRareData, tier: 'muRaro' },
    { id: 3, docData: legendaryData, tier: 'lendario' }
  ]

  return {
    props: {
      dataSet
    }
  }
}

export default function Artifice({ dataSet }) {
  return (
    <>
      <ListPage data={dataSet} title='Infusões de Artífice' type='artifice' />
    </>
  )
}