'use client'

import { useRouter } from 'next/navigation'

import { API_URL } from '@/src/constants/common'

const DeleteBtn = ({ id }: { id: string }) => {
  const router = useRouter()

  const handleClickDeleteBtn = async () => {
    const confirmed = window.confirm('Are you sure to delete?')

    if (!confirmed) return

    try {
      const res = await fetch(`${API_URL}/api/articles?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete an article.')
      }

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return <button onClick={handleClickDeleteBtn}>DeleteBtn</button>
}
export default DeleteBtn
