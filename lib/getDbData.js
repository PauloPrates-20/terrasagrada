import { firebaseDb } from './firestoreConfig'
import { collection, query, where, orderBy, getDocs} from 'firebase/firestore/lite'

export async function getData(coll, tier) {
  const allDocs = []

  const q = query(
    collection(firebaseDb, coll),
    where('tier', '==', tier),
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

export async function getDataByReforge(coll, reforge) {
  const allDocs = []

  const q = query(
    collection(firebaseDb, coll),
    where('reforge', '==', reforge),
    orderBy('id')
  )

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((obj) => {
    allDocs.push(obj.data())
  })

  return (allDocs)
}