import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import bcrypt from 'bcryptjs'

import { connectMongoDB } from '@/libs/mongodb'
import { API_AUTHENTICATION_URL } from '@/constants/common'
import User from '@/models/user'
import { AccountInfoInterface } from '@/types'

type CredentialsType = Pick<AccountInfoInterface, 'email' | 'password'>

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials: CredentialsType) {
        const { email, password } = credentials

        try {
          await connectMongoDB()
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            return null
          }

          return user
        } catch (error) {
          console.log('Error: ', error)
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `/auth/login`,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
