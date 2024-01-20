import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'

import { API_AUTHENTICATION_URL } from '@/constants/common'

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const user = { id: 1 }
        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `${API_AUTHENTICATION_URL}/register`,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
