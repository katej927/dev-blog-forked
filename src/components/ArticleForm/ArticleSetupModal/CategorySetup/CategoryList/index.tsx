import { useState, ChangeEvent, useEffect } from 'react'
import { CategoryInterface, createCategory } from '@/apis/categories'
import { loadCategories } from './_shared'

interface Props {
  updateSelectedCategory: (id: string | null) => void
  updateShowCategoriesToUnshown: () => void
}

function CategoryList({
  updateSelectedCategory,
  updateShowCategoriesToUnshown,
}: Props) {
  const [categories, setCategories] = useState<CategoryInterface[]>([])

  const [newCategoryName, setNewCategoryName] = useState<string>()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getCategories = async () => {
    const res = await loadCategories()
    setCategories(res ?? [])
  }

  useEffect(() => {
    getCategories()
  }, [])

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
    updateSelectedCategory(selectedCategory)
    updateShowCategoriesToUnshown()
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
            <li key={_id} onClick={() => setSelectedCategory(_id)}>
              {categoryName}
            </li>
          ))
        ) : (
          <div>카테고리가 없습니다.</div>
        )}
      </ul>
      <button type="button" onClick={() => updateShowCategoriesToUnshown()}>
        취소
      </button>
      <button type="button" onClick={handleClickSelectCategoryButton}>
        선택하기
      </button>
    </section>
  )
}

export default CategoryList
