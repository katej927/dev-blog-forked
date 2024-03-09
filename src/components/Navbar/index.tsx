'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { TfiWrite } from 'react-icons/tfi'
import classNames from 'classnames/bind'
import styles from './index.module.css'

const cx = classNames.bind(styles)

import useIsLogin from '@/hooks/useIsLogin'

const Navbar = () => {
  const { isLoading, isLoggedin, session } = useIsLogin()

  return (
    <nav className={cx('wrapper')}>
      <Link href={'/'}>Home</Link>
      <Link href={'/category'}>Category</Link>
      {!isLoading && (
        <>
          {isLoggedin ? (
            <div className={cx('userContentsWrapper')}>
              <Link href={'/article/write'}>
                <div className={cx('writeWrapper')}>
                  <TfiWrite />
                  <div className={cx('writeText')}>Write</div>
                </div>
              </Link>
              <div>{session?.user?.name}</div>
              <button onClick={() => signOut()}>Log Out</button>
            </div>
          ) : (
            <Link href={'/auth/login'}>Login</Link>
          )}
        </>
      )}
    </nav>
  )
}
export default Navbar
