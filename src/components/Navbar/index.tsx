import Link from 'next/link'

import Search from './Search'

const Navbar = () => {
  return (
    <nav style={{ display: 'flex' }}>
      <Link href={'/'}>Home</Link>
      <Search />
      <Link href={'/article/write'}>Write</Link>
    </nav>
  )
}
export default Navbar
