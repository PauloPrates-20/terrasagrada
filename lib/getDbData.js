import { firebaseDb } from './firestoreConfig'
import { collection, query, where, orderBy, getDocs} from 'firebase/firestore/lite'

export async function getData(coll, raridade) {
  const allDocs = []

  const q = query(
    collection(firebaseDb, coll),
    where('raridade', '==', raridade),
    orderBy('id')
  )

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((obj) => {
    allDocs.push(obj.data())
  })

  return (allDocs)
}

export async function getAllData(coll) {
  const allDocs = []

  const q = query(
    collection(firebaseDb, coll),
    orderBy('id')
  )

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((obj) => {
    allDocs.push(obj.data())
  })

  return (allDocs)
}