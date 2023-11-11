import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <Link href={'/'}>Home</Link>
      <Link href={'/write'}>Write</Link>
    </nav>
  )
}
export default Navbar
