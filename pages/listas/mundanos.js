import { getData } from "@/lib/getDbData"

import ListPage from "@/components/ListPage"

export async function getStaticProps() {
  const data = await getData('Mundane', 'comum')
  const dataSet = [
    {id: 0, docData: data, tier: 'comum'}
  ]

  return {
    props: { dataSet }
  }
}

export default function ItensMundanos({ dataSet }) {
  return (
    <>
      <ListPage data={dataSet} title='Itens Mundanos' type='mundane' />
    </>
  )
}