'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav style={{ display: 'flex' }}>
      <Link href={'/'}>Home</Link>
      <Link href={'/auth/login'}>Login</Link>
      <div>
        <Link href={'/article/write'}>Write</Link>
        <div>{session?.user?.name}</div>
        <button onClick={() => signOut()}>Log Out</button>
      </div>
    </nav>
  )
}
export default Navbar
