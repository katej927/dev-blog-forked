'use client'

import { useRouter } from 'next/navigation'

import { deleteCategoryById } from '@/apis/categories'
import { useState } from 'react'

interface Props {
  categoryName: string
  categoryId: string
}

const EachCategoryHeader = ({ categoryName, categoryId }: Props) => {
  const router = useRouter()

  const [isCategoryNameEditable, setIsCategoryNameEditable] =
    useState<boolean>(false)

  const handleClickEditButton = () => {}

  const handleClickDeleteCategoryButton = async () => {
    const confirmed = window.confirm(
      '정말 삭제하시겠습니까? 아티클들은 삭제되지 않습니다.',
    )

    if (!confirmed) return

    try {
      const res = await deleteCategoryById(categoryId)

      if (!res.ok) {
        router.push('/')
        throw new Error('카테고리를 삭제하는데 실패했습니다.')
      }

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 contentEditable={isCategoryNameEditable}>{categoryName}</h1>
      <button onClick={handleClickEditButton}>수정</button>
      <button onClick={handleClickDeleteCategoryButton}>삭제</button>
    </div>
  )
}

export default EachCategoryHeader
