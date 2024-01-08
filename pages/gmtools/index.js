import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useUser = () => ({ user: null, loading: false })

export default function GmTools() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/gmtools/login')
    }
  }, [user, loading])

  return (
    <div>
      {!user ? (
        <h1>Redirecionando...</h1>
      ) : (
        <h1>Ferramentas de Mestre</h1>
      )}
    </div>
  )
}