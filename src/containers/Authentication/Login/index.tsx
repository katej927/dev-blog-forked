// TODO: 여기 처리해야 함.
import AuthenticationForm from '@/components/AuthenticationForm'

const Login = () => {
  return (
    <div>
      <AuthenticationForm
        authenticationType="로그인"
        authenticationSwitchMessage="아직 회원이 아니라면?"
        submitButtonMessage="로그인"
        authenticationSwitchLink="/authentication/register"
      />
    </div>
  )
}

export default Login
