import Link from 'next/link'

interface Props {
  authenticationType: '로그인' | '회원가입'
  errorMessage: string
  authenticationSwitchMessage: string
  authenticationSwitchLink: string
  submitButtonMessage: string
}

const AuthenticationForm = ({
  authenticationType,
  errorMessage,
  authenticationSwitchMessage,
  authenticationSwitchLink,
  submitButtonMessage,
}: Props) => {
  return (
    <div>
      <div>
        <h1>{authenticationType}</h1>

        <form>
          {authenticationType === '회원가입' && (
            <input type="text" placeholder="Full Name" />
          )}
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>{submitButtonMessage}</button>

          <div style={{ color: 'red' }}>{errorMessage}</div>
          <span>
            {authenticationSwitchMessage}
            <Link href={authenticationSwitchLink}>
              {authenticationType === '로그인' ? '회원가입' : '로그인'}
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default AuthenticationForm
