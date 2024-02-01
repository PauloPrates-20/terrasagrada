import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import { firebaseDb } from "@/lib/firestoreConfig"
// import { doc, setDoc } from 'firebase/firestore/lite'

const useUser = () => ({ user: null, loading: false })

export default function GmTools() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/gmtools/login')
    }
  }, [user, loading])

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

  return (
    <div>
    </div>
  )
}