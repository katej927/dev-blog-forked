'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import classNames from 'classnames/bind'

import { deleteArticleById } from '@/apis/articles'
import useIsLogin from '@/hooks/useIsLogin'

import styles from './index.module.css'

const cx = classNames.bind(styles)

const EditButtons = ({ id }: { id: string }) => {
  const { isLoggedin } = useIsLogin()
  const router = useRouter()

  const handleClickDeleteButton = async () => {
    const confirmed = window.confirm('Are you sure to delete?')

    if (!confirmed) return

    try {
      const res = await deleteArticleById(id)

      if (!res.ok) {
        router.push('/')
        throw new Error('Failed to delete an article.')
      }

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  if (!isLoggedin) return
  return (
    <div>
      <Link href={`edit/${id}`} className={cx('editButton')}>
        수정
      </Link>
      <button
        className={cx('editButton', 'deletion')}
        onClick={handleClickDeleteButton}
      >
        삭제
      </button>
    </div>
  )
}
export default EditButtons
