import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <Link href={'/'}>Home</Link>
      <Link href={'/article/write'}>Write</Link>
    </nav>
  )
}
export default Navbar
