'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { deleteCategoryById } from '@/apis/categories'
import React, { useState } from 'react'

interface Props {
  initCategoryName: string
  categoryId: string
}

const EachCategoryHeader = ({ initCategoryName, categoryId }: Props) => {
  const router = useRouter()

  const [isCategoryNameEditable, setIsCategoryNameEditable] =
    useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string | null>(
    initCategoryName,
  )

  const handleInputCategoryName = ({
    currentTarget: { textContent },
  }: FormEvent<HTMLHeadingElement>) => {
    setCategoryName(textContent)
  }

  const handleClickEditButton = () => {
    setIsCategoryNameEditable(true)
  }

  const handleClickDeleteButton = async () => {
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

  const handleClickApplyButton = () => {}

  return (
    <div>
      <h1
        contentEditable={isCategoryNameEditable}
        onInput={handleInputCategoryName}
        suppressContentEditableWarning
        placeholder="카테고리 이름을 1자 이상 적어주세요."
      >
        {categoryName}
      </h1>
      {isCategoryNameEditable ? (
        <button onClick={handleClickApplyButton}>적용</button>
      ) : (
        <>
          <button onClick={handleClickEditButton}>수정</button>
          <button onClick={handleClickDeleteButton}>삭제</button>
        </>
      )}
    </div>
  )
}

export default EachCategoryHeader
