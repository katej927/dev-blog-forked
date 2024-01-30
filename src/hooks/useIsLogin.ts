import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

interface ResultInterface {
  isLoading: boolean
  isLoggedin: boolean
  session: Session | null
}

function useIsLogin(): ResultInterface {
  const { data: session, status } = useSession()

  return {
    isLoading: status === 'loading',
    isLoggedin: status === 'authenticated',
    session,
  }
}

export default useIsLogin
