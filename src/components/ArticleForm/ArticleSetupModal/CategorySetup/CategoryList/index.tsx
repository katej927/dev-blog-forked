'use client'

import { useState, ChangeEvent, useEffect } from 'react'

import { CategoryInterface, createCategory } from '@/apis/categories'

import { loadCategories } from './_shared'
import { SelectedCategoryType } from '../../_shared'

import classNames from 'classnames/bind'
import styles from './index.module.css'

const cx = classNames.bind(styles)

interface Props {
  updateSelectedCategory: (selectedCategory: SelectedCategoryType) => void
  toggleCategoryList: () => void
  renderIf: boolean
}

function CategoryList({
  updateSelectedCategory,
  toggleCategoryList,
  renderIf,
}: Props) {
  const [categories, setCategories] = useState<CategoryInterface[]>([])
  const [newCategoryName, setNewCategoryName] = useState<string>()
  const [clickedCategory, setClickedCategory] =
    useState<SelectedCategoryType>(null)

  const getAndUpdateCategories = async () => {
    const res = await loadCategories()
    setCategories(res ?? [])
  }

  useEffect(() => {
    getAndUpdateCategories()
  }, [])

  if (!renderIf) return

  const handleChangeNewCategoryName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setNewCategoryName(value)

  const handleClickCreatingNewCategoryButton = async () => {
    if (!newCategoryName) return alert('카테고리 이름을 입력하세요.')

    try {
      const res = await createCategory({
        categoryName: newCategoryName,
      })

      if (!res.ok) {
        throw new Error('Failed to create a category.')
      }

      const categories = await loadCategories()
      setCategories(categories ?? [])

      setNewCategoryName('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickSelectCategoryButton = () => {
    updateSelectedCategory(clickedCategory)
    toggleCategoryList()
  }

  return (
    <section>
      <input
        value={newCategoryName}
        type="text"
        placeholder="새로운 카테고리 이름을 입력하세요."
        onChange={handleChangeNewCategoryName}
      />
      <div>
        <button type="button" onClick={() => setNewCategoryName('')}>
          취소
        </button>
        <button type="button" onClick={handleClickCreatingNewCategoryButton}>
          카테고리 추가
        </button>
      </div>

      <ul>
        {categories.length ? (
          categories.map(({ _id, categoryName }) => (
            <li
              key={_id}
              onClick={() => setClickedCategory({ categoryName, _id })}
              className={cx('category', {
                active: clickedCategory?._id === _id,
              })}
            >
              {categoryName}
            </li>
          ))
        ) : (
          <div>카테고리가 없습니다.</div>
        )}
      </ul>
      <button type="button" onClick={() => toggleCategoryList()}>
        취소
      </button>
      <button
        type="button"
        onClick={handleClickSelectCategoryButton}
        disabled={!clickedCategory}
      >
        선택하기
      </button>
    </section>
  )
}

export default CategoryList
