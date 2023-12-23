import AuthenticationForm from '@/components/AuthenticationForm'

const LoginPage = () => {
  return (
    <div>
      <AuthenticationForm
        authenticationType="로그인"
        // errorMessage="Error Message"
        authenticationSwitchMessage="아직 회원이 아니라면?"
        submitButtonMessage="로그인"
        authenticationSwitchLink="/member/register"
      />
    </div>
  )
}

export default LoginPage
