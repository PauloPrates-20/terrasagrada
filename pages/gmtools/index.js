import { firebaseDb } from "@/lib/firestoreConfig"
import { doc, setDoc } from 'firebase/firestore/lite'
import { getData } from '@/lib/getDbData'

// retrieve data from database

async function queryFirestore() {
  const tiers = ['comum', 'incomum', 'raro', 'muRaro', 'lendario']
  const commonData = await getData('ItensMagicos', tiers[0])
  const uncommonData = await getData('ItensMagicos', tiers[1])
  const rareData = await getData('ItensMagicos', tiers[2])
  const veryRareData = await getData('ItensMagicos', tiers[3])
  const legendaryData = await getData('ItensMagicos', tiers[4])

  const queryResult = [
    {id: 0, content: commonData, tier: tiers[0]},
    {id: 1, content: uncommonData, tier: tiers[1]},
    {id: 2, content: rareData, tier: tiers[2]},
    {id: 3, content: veryRareData, tier: tiers[3]},
    {id: 4, content: legendaryData, tier: tiers[4]}
  ]

  return queryResult
}

// convert data do json

function dataJSON(data) {
  const dataObject = JSON.stringify(data)
  // console.log(dataObject)

  const dataString = "data:text/json;charset=utf-8," + encodeURIComponent(dataObject) 

  const downloadLink = document.createElement('a')
  downloadLink.setAttribute('href', dataString)
  downloadLink.setAttribute('download', 'itensmagicos.json')
  downloadLink.click()
  downloadLink.remove()
}

export default function GmTools() {
  // send data to database

  // const sendData = () => {
  //   let data = {}
  //   let path = ''
  //   mundanos.forEach((obj) => {
  //     data = {
  //       id: obj.id,
  //       item: obj.item,
  //       tier: obj.tier,
  //       url: obj.url,
  //       value: obj.value
  //     }
  //     path = doc(firebaseDb,`Mundane/${'item' + obj.id}`)
  //     setDoc(path, data)
  //       .then(() => {
  //         console.log('Objeto gravado com sucesso!')
  //       })
  //       .catch((error) => {
  //         console.log(`Erro ao gravar: ${error}`)
  //       })
  //   })
  // }

  // retrive data from database

  // const retrieveData = (data) => {
  //   data = queryFirestore()
  //   .then((response) => {
  //     dataJSON(response)
  //   })
  // }

  return (
    <div>
      <button onClick={retrieveData}>Retrieve data</button>
    </div>
  )
}