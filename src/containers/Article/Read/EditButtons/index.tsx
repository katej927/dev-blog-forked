'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { deleteArticleById } from '@/apis/articles'
import useIsLogin from '@/hooks/useIsLogin'

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
    <>
      <Link href={`edit/${id}`}>수정</Link>
      <button onClick={handleClickDeleteButton}>삭제</button>
    </>
  )
}
export default EditButtons
