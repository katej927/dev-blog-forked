'use client'

import { useRouter } from 'next/navigation'

import { API_URL } from '@/src/constants/common'

const DeleteBtn = ({ id }: { id: string }) => {
  const router = useRouter()

  const handleClickDeleteBtn = async () => {
    const confirmed = window.confirm('Are you sure to delete?')

    if (confirmed) {
      const res = await fetch(`${API_URL}/api/articles?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.push('/')
      }
    }
  }

  return <button onClick={handleClickDeleteBtn}>DeleteBtn</button>
}
export default DeleteBtn
