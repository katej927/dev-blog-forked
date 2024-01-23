import { API_URL } from '@/constants/common'
import { AccountInfoInterface } from '@/types'

const API_AUTHENTICATION_URL = `${API_URL}/api/auth`

export const registerAccount = async (accountInfo: AccountInfoInterface) => {
  const res = await fetch(`${API_AUTHENTICATION_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accountInfo),
  })

  return res
}

export const confirmUserExists = async ({
  email,
}: Pick<AccountInfoInterface, 'email'>) => {
  const res = await fetch(`${API_AUTHENTICATION_URL}/userExists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  return res
}
