import Link from 'next/link'

const Navbar = () => {
  return (
    <nav style={{ display: 'flex' }}>
      <Link href={'/'}>Home</Link>
      <Link href={'/article/write'}>Write</Link>
      <Link href={'/member/login'}>Login</Link>
    </nav>
  )
}
export default Navbar
