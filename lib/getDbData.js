import { firebaseDb } from './firestoreConfig'
import { collection, query, where, orderBy, getDocs} from 'firebase/firestore/lite'

export async function getData(coll, tier) {
  const allDocs = []

  const q = query(
    collection(firebaseDb, coll),
    where('tier', '==', tier),
    orderBy('item')
  )

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((obj) => {
    allDocs.push(obj.data())
  })

  return (allDocs)
}