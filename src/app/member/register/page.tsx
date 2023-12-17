'use client'

import { useState } from 'react'

import AuthenticationForm from '@/components/AuthenticationForm'

const RegisterPage = () => {
  const [name, useName] = useState<string>('')
  const [email, useEmail] = useState<string>('')
  const [password, usePassword] = useState<string>('')
  const [errorMessage, useErrorMessage] = useState<string>('')

  return (
    <AuthenticationForm
      authenticationType="회원가입"
      errorMessage={errorMessage}
      authenticationSwitchMessage="이미 회원이시라면?"
      authenticationSwitchLink="/member/login"
      submitButtonMessage="가입하기"
    />
  )
}

export default RegisterPage
