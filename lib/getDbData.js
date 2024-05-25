import { firebaseDb } from './firestoreConfig'
import { collection, query, where, orderBy, getDocs} from 'firebase/firestore/lite'

export async function getData(coll, whereValue) {
  const allDocs = []

  let q = query(
    collection(firebaseDb, coll),
    where('raridade', '==', whereValue),
    orderBy('id')
  );

  if (coll === 'infusoesArtifice') {
    q = query(
      collection(firebaseDb, coll),
      where('nivel', '==', whereValue),
      orderBy('id')
    );
  } else if (coll === 'itensMundanos') {
    if (Array.isArray(whereValue)) {
      const filtroDocumento = {}; 

      for (const valor of whereValue) {
        q = query(
          collection(firebaseDb, coll),
          where('tipo', 'array-contains', valor),
          orderBy('id')
        )

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          const docId = doc.id;
          const data = doc.data();

          if (!filtroDocumento[docId]) {
            filtroDocumento[docId] = {count: 1, data: data};
          } else {
            filtroDocumento[docId].count += 1;
          }
        });
      }

      for (const [docId, documento] of Object.entries(filtroDocumento)) {
        if (documento.count === whereValue.length) {
          allDocs.push(documento.data);
        }
      }

      return allDocs;
    }

    q = query(
      collection(firebaseDb, coll),
      where('tipo', 'array-contains', whereValue),
      orderBy('id')
    );
  }

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((obj) => {
      allDocs.push(obj.data());
  });

  return allDocs;
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