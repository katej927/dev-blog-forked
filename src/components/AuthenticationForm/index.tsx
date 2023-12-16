import Link from 'next/link'

interface Props {
  authenticationType: '로그인' | '회원가입'
  errorMessage: string
  authenticationSwitchMessage: string
  submitButtonMessage: string
}

const AuthenticationForm = ({
  authenticationType,
  errorMessage,
  authenticationSwitchMessage,
  submitButtonMessage,
}: Props) => {
  return (
    <div>
      <div>
        <h1>{authenticationType}</h1>

        <form>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>{submitButtonMessage}</button>

          <div style={{ color: 'red' }}>{errorMessage}</div>
          <Link href={'/member/register'}>
            {authenticationSwitchMessage} <span>{authenticationType}</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default AuthenticationForm
