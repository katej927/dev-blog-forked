import AuthenticationForm from '@/components/AuthenticationForm'

const LoginPage = () => {
  return (
    <div>
      <AuthenticationForm
        authenticationType="로그인"
        errorMessage="Error Message"
        authenticationSwitchMessage="아직 회원이 아니세요?"
        submitButtonMessage="로그인"
      />
    </div>
  )
}

export default LoginPage
