'use client'

import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import AuthenticationForm from '@/components/AuthenticationForm'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const router = useRouter()

  const handleChangeEmail = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setEmail(value)
  }

  const handleChangePassword = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setPassword(value)
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setErrorMessage('Invalid Credentials')
      }

      router.replace('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <AuthenticationForm
        authenticationType="로그인"
        authenticationSwitchMessage="아직 회원이 아니라면?"
        submitButtonMessage="로그인"
        authenticationSwitchLink="/authentication/register"
        onChangeEmail={handleChangeEmail}
        onChangePassword={handleChangePassword}
        onSubmit={handleSubmit}
        email={email}
        password={password}
        errorMessage={errorMessage}
      />
    </div>
  )
}

export default Login
