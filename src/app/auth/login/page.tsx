//
// import { getServerSession } from 'next-auth'
// import { redirect } from 'next/navigation'

import Login from '@/containers/Auth/Login'
// import { authOptions } from '@/libs/auth'

const LoginPage = async () => {
  // const session = await getServerSession(authOptions)

  // if (session) redirect('/')

  return <Login />
}

export default LoginPage
