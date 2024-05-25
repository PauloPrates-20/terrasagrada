import { getData } from "@/lib/getDbData"

import ListPage from "@/components/ListPage"

export async function getStaticProps() {
  const simplesMelee = await getData('itensMundanos', ['simples', 'corpo-a-corpo'])
  const simplesDistancia = await getData('itensMundanos', ['simples', 'distância'])
  const marciaisMelee = await getData('itensMundanos', ['marcial', 'corpo-a-corpo'])
  const marciaisDistancia = await getData('itensMundanos', ['marcial', 'distância'])
  const armadurasLeves = await getData('itensMundanos', 'leve')
  const armadurasMedias = await getData('itensMundanos', 'média')
  const armadurasPesadas = await getData('itensMundanos', 'pesada')
  const armadurasEscudos = await getData('itensMundanos', 'escudo')
  
  const dataSet = [
    {id: 0, docData: simplesMelee, tipo: 'Armas Simples Corpo-a-corpo', raridade: 'Comum'},
    {id: 1, docData: simplesDistancia, tipo: 'Armas Simples à Distância', raridade: 'Comum'},
    {id: 2, docData: marciaisMelee, tipo: 'Armas Marciais Corpo-a-corpo', raridade: 'Comum'},
    {id: 3, docData: marciaisDistancia, tipo: 'Armas Marciais à Distância', raridade: 'Comum'},
    {id: 4, docData: armadurasLeves, tipo: 'Armaduras Leves', raridade: 'Comum'},
    {id: 5, docData: armadurasMedias, tipo: 'Armaduras Médias', raridade: 'Comum'},
    {id: 6, docData: armadurasPesadas, tipo: 'Armaduras Pesadas', raridade: 'Comum'},
    {id: 7, docData: armadurasEscudos, tipo: 'Escudos', raridade: 'Comum'}
  ]

  return {
    props: { dataSet }
  }
}

export default function ItensMundanos({ dataSet }) {
  return (
    <>
      <ListPage data={dataSet} title='Itens Mundanos' type='itensMundanos' />
    </>
  )
}