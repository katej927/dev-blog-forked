'use client'

import AuthenticationForm from '@/components/AuthenticationForm'

const RegisterPage = () => {
  return (
    <AuthenticationForm
      authenticationType="회원가입"
      authenticationSwitchMessage="이미 회원이시라면?"
      authenticationSwitchLink="/member/login"
      submitButtonMessage="가입하기"
    />
  )
}

export default RegisterPage
