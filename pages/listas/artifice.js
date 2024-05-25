import { getData } from '@/lib/getDbData'

import ListPage from '@/components/ListPage'

export async function getStaticProps() {
  const raridades = ['Comum', 'Incomum', 'Raro', 'Muito Raro', 'Lendário'];
  const niveis = [2, 6, 10, 14];

  const uncommonData = await getData('infusoesArtifice', niveis[0])
  const rareData = await getData('infusoesArtifice', niveis[1])
  const veryRareData = await getData('infusoesArtifice', niveis[2])
  const legendaryData = await getData('infusoesArtifice', niveis[3])

  const dataSet = [
    { id: 0, docData: uncommonData, raridade: 'Incomum' },
    { id: 1, docData: rareData, raridade: 'Raro' },
    { id: 2, docData: veryRareData, raridade: 'Muito Raro' },
    { id: 3, docData: legendaryData, raridade: 'Lendário' }
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
      <ListPage data={dataSet} title='Infusões de Artífice' type='infusoes' />
    </>
  )
}