import { getData } from '@/lib/getDbData'

import ListPage from '@/components/ListPage'

// test data

// const data = [{id: 0, item: 'teste', tier: 'teste', url: 'www.google.com', value: 'teste'}]

// const dataSet = [
//   {id: 0, docData: data, tier: 'comum'},
// ]

export async function getStaticProps() {
  const data = await getData('Montarias', 'comum')
  const dataSet = [
    {id: 0, docData: data, tier: 'comum'}
  ]

  return {
    props: { dataSet }
  }
}

export default function Mounts({ dataSet }) {
  return (
    <>
      <ListPage data={dataSet} title='Montarias' type='horse' />
    </>
  )
}