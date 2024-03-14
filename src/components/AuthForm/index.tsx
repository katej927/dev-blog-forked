import Link from 'next/link'
import { ChangeEvent, SyntheticEvent } from 'react'
import classNames from 'classnames/bind'

import styles from './index.module.css'

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

const cx = classNames.bind(styles)

const AuthForm = ({
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
    <section className={cx('wrapper')}>
      <h1>{authType}</h1>

      <form onSubmit={onSubmit} className={cx('form')}>
        <div className={cx('inputWrapper')}>
          {authType === '회원가입' && (
            <input
              type="text"
              placeholder="Full Name"
              onChange={onChangeFullName}
              value={name}
              className={cx('input')}
            />
          )}
          <input
            type="text"
            placeholder="Email"
            onChange={onChangeEmail}
            value={email}
            className={cx('input')}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
            value={password}
            className={cx('input')}
          />
        </div>

        <button className={cx('submitButton')}>{submitButtonMessage}</button>

        {errorMessage && (
          <div className={cx('errorMessage')}>{errorMessage}</div>
        )}

        <span>
          {authSwitchMessage}
          <Link href={authSwitchLink}>
            {authType === '로그인' ? '회원가입' : '로그인'}
          </Link>
        </span>
      </form>
    </section>
  )
}

export default AuthForm
