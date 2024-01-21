'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

const Navbar = () => {
  return (
    <nav style={{ display: 'flex' }}>
      <Link href={'/'}>Home</Link>
      <Link href={'/article/write'}>Write</Link>
      <Link href={'/auth/login'}>Login</Link>
      <button onClick={() => signOut()}>Log Out</button>
    </nav>
  )
}
export default Navbar
