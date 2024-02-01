import { firebaseDb } from "@/lib/firestoreConfig"
import { doc, setDoc } from 'firebase/firestore/lite'
import { useRouter } from "next/navigation"
import { getAllData, getData } from '@/lib/getDbData'

// import databaseData from

// retrieve data from database

async function queryFirestore() {
  const queryResult = getAllData('ItensMagicos')

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
  const router = useRouter()

  router.push('/')
  // send data to database

  // const sendData = () => {
  //   let data = {}
  //   let path = ''
  //   databaseData.forEach((obj) => {
  //     data = {
  //       id: obj.id,
  //       item: obj.item,
  //       tier: obj.tier,
  //       url: obj.url,
  //       value: obj.value
  //     }
  //     path = doc(firebaseDb,`ItensMagicos/${'item' + obj.id}`)
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
    </div>
  )
}