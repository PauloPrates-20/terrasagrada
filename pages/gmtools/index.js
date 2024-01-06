import { firebaseDb } from '@/lib/firestoreConfig'
import { doc, setDoc } from 'firebase/firestore/lite'

import magicContent from '@/public/JSONs/itemTable.json'
import potionContent from '@/public/JSONs/potionTable.json'
import horseContent from '@/public/JSONs/horseTable.json'

const contents = [potionContent, horseContent, magicContent]
const collections = ['Consumiveis', 'Montarias', 'ItensMagicos']

async function writeData(path, data) {
  try {
    await setDoc(path, data)
    console.log('Objeto gravado com sucesso')
  } catch (error) {
    console.log(`Erro ao gravar objeto ${error}`)
  }
}

const sendData = (collection, content) => {
  content.map((obj) => {
    let docPath = doc(firebaseDb, `${collection}/${'item' + obj.id}`)
    let docData = {
      id: obj.id,
      tier: obj.tier,
      url: obj.ref,
      item: obj.item,
      value: obj.value,
      english: obj.eng,
      reforge: obj.reforge,
      sint: obj.sint
    }

    writeData(docPath, docData)
  })
}

export default function GmTools() {
  return (
    <main>
      <h1>Ferramentas de Mestre</h1>
      <button onClick={() => sendData(collections[2], contents[2])}>Gravar Dados</button>
    </main>
  )
}