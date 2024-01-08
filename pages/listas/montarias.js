import { getData } from '@/lib/getDbData'

import ListPage from '@/components/ListPage'

// test data
const data = [{id: 0, item: 'teste', tier: 'teste', url: 'www.google.com', value: 'teste'}]

const dataSet = [
  {id: 0, docData: data, tier: 'comum'},
]

// export async function getStaticProps() {
//   const data = await getData('Montarias', 'comum')

//   return {
//     props: { data }
//   }
// }

export default function Mounts() {
  return (
    <>
      <ListPage data={dataSet} title='Montarias' type='horse' />
    </>
  )
}