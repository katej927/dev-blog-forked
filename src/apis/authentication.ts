import { API_AUTHENTICATION_URL } from '@/constants/common'

interface AccountInfoInterface {
  name: string
  email: string
  password: string
}

export const registerAccount = async (accountInfo: AccountInfoInterface) => {
  const res = await fetch(`${API_AUTHENTICATION_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accountInfo),
  })

  return res
}

export const confirmUserExists = async ({ email }: { email: string }) => {
  const res = await fetch(`${API_AUTHENTICATION_URL}/userExists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  return res
}
