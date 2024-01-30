'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

import useIsLogin from '@/hooks/useIsLogin'

const Navbar = () => {
  const { isLoading, isLoggedin, session } = useIsLogin()

  return (
    <nav style={{ display: 'flex' }}>
      <Link href={'/'}>Home</Link>
      {!isLoading && (
        <>
          {isLoggedin ? (
            <div>
              <Link href={'/article/write'}>Write</Link>
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
