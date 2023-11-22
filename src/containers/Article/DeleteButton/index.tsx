'use client'

import { useRouter } from 'next/navigation'

import { deleteArticleById } from '@/apis/articles'

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter()

  const handleClickDeleteButton = async () => {
    const confirmed = window.confirm('Are you sure to delete?')

    if (!confirmed) return

    try {
      const res = await deleteArticleById(id)

      if (!res.ok) {
        throw new Error('Failed to delete an article.')
      }

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return <button onClick={handleClickDeleteButton}>DeleteButton</button>
}
export default DeleteButton
