'use client'

import { ChangeEvent, SyntheticEvent, useState } from 'react'

import AuthenticationForm from '@/components/AuthenticationForm'

const RegisterPage = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleChangeFullName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setName(value)

  const handleChangeEmail = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setEmail(value)

  const handleChangePassword = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setPassword(value)

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setErrorMessage('All fields are necessary.')
    }

    try {
      await fetch('api/athenticaton/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
    } catch (error) {}
  }

  return (
    <AuthenticationForm
      authenticationType="회원가입"
      authenticationSwitchMessage="이미 회원이시라면?"
      authenticationSwitchLink="/member/login"
      submitButtonMessage="가입하기"
      name={name}
      email={email}
      password={password}
      errorMessage={errorMessage}
      onChangeFullName={handleChangeFullName}
      onChangeEmail={handleChangeEmail}
      onChangePassword={handleChangePassword}
      onSubmit={handleSubmit}
    />
  )
}

export default RegisterPage
