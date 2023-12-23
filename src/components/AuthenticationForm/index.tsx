import Link from 'next/link'
import { ChangeEvent, useState, SyntheticEvent } from 'react'

interface Props {
  authenticationType: '로그인' | '회원가입'
  authenticationSwitchMessage: string
  authenticationSwitchLink: string
  submitButtonMessage: string
  initialName?: string
  initialEmail?: string
  initialPassword?: string
}

const AuthenticationForm = ({
  authenticationType,
  authenticationSwitchMessage,
  authenticationSwitchLink,
  submitButtonMessage,
  initialName,
  initialEmail,
  initialPassword,
}: Props) => {
  const [name, setName] = useState<string>(initialName ?? '')
  const [email, setEmail] = useState<string>(initialEmail ?? '')
  const [password, setPassword] = useState<string>(initialPassword ?? '')
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

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <div>
        <h1>{authenticationType}</h1>

        <form onSubmit={handleSubmit}>
          {authenticationType === '회원가입' && (
            <input
              type="text"
              placeholder="Full Name"
              onChange={handleChangeFullName}
              value={name}
            />
          )}
          <input
            type="text"
            placeholder="Email"
            onChange={handleChangeEmail}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
            value={password}
          />

          <button>{submitButtonMessage}</button>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

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
