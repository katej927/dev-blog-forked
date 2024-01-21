import Link from 'next/link'
import { ChangeEvent, SyntheticEvent } from 'react'

interface Props {
  authType: '로그인' | '회원가입'
  authSwitchMessage: string
  authSwitchLink: string
  submitButtonMessage: string
  name?: string
  email: string
  password: string
  errorMessage: string
  onChangeFullName?: ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => void
  onChangeEmail: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void
  onChangePassword: ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (
    e: SyntheticEvent<HTMLFormElement> & { target: HTMLFormElement },
  ) => void
}

const authForm = ({
  authType,
  authSwitchMessage,
  authSwitchLink,
  submitButtonMessage,
  name,
  email,
  password,
  errorMessage,
  onChangeFullName,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}: Props) => {
  return (
    <div>
      <div>
        <h1>{authType}</h1>

        <form onSubmit={onSubmit}>
          {authType === '회원가입' && (
            <input
              type="text"
              placeholder="Full Name"
              onChange={onChangeFullName}
              value={name}
            />
          )}
          <input
            type="text"
            placeholder="Email"
            onChange={onChangeEmail}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
            value={password}
          />

          <button>{submitButtonMessage}</button>

          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

          <span>
            {authSwitchMessage}
            <Link href={authSwitchLink}>
              {authType === '로그인' ? '회원가입' : '로그인'}
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default authForm
