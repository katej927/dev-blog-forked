'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { IoIosLogOut } from 'react-icons/io'
import { PiNotePencilLight } from 'react-icons/pi'
import { BsStars } from 'react-icons/bs'
import classNames from 'classnames/bind'

import useIsLogin from '@/hooks/useIsLogin'

import styles from './index.module.css'

const cx = classNames.bind(styles)

const Navbar = () => {
  const { isLoading, isLoggedin, session } = useIsLogin()

  return (
    <nav className={cx('wrapper')}>
      <div className={cx('navMenuWrapper')}>
        <div className={cx('navGeneralMenuWrapper')}>
          <Link href={'/'} className={cx('generalMenu')}>
            <BsStars />
          </Link>
          <Link href={'/'} className={cx('generalMenu')}>
            Home
          </Link>
          <Link href={'/category'} className={cx('generalMenu')}>
            Category
          </Link>
        </div>
        {!isLoading && (
          <div>
            {isLoggedin ? (
              <div className={cx('userMenuWrapper')}>
                <Link href={'/article/write'} className={cx('userMenu')}>
                  <div className={cx('writeWrapper')}>
                    <PiNotePencilLight size={20} />
                    <div className={cx('writeText')}>Write</div>
                  </div>
                </Link>
                <div className={cx('divisionLine')} />
                <div className={cx('userMenu')}>{session?.user?.name}</div>
                <div className={cx('divisionLine')} />
                <IoIosLogOut
                  size={20}
                  className={cx('userMenu', 'signoutIcon')}
                  onClick={() => signOut()}
                />
              </div>
            ) : (
              <Link href={'/auth/login'}>Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
export default Navbar
