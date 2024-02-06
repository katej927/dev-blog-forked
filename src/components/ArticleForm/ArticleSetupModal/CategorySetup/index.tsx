import { useState, ChangeEvent } from 'react'
import { CategoryInterface, createCategory } from '@/apis/categories'
import { loadCategories } from './_shared'

function ArticleSetupModal() {
  const [showCategories, setShowCategories] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryInterface[]>([])

  const [newCategoryName, setNewCategoryName] = useState<string>()

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

      // TODO: [리팩토링] 리액트 쿼리로
      const categories = await loadCategories()
      setCategories(categories ?? [])

      setNewCategoryName('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickAddingCategoryButton = async () => {
    const categories = await loadCategories()
    setCategories(categories ?? [])

    setShowCategories(true)
  }

  return (
    <div>
      <h3>카테고리 설정</h3>

      {showCategories ? (
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
            <button
              type="button"
              onClick={handleClickCreatingNewCategoryButton}
            >
              카테고리 추가
            </button>
          </div>

          <ul>
            {categories.length ? (
              categories.map(({ _id, categoryName }) => (
                <li key={_id}>{categoryName}</li>
              ))
            ) : (
              <div>카테고리가 없습니다.</div>
            )}
          </ul>
          <button type="button" onClick={() => setShowCategories(false)}>
            취소
          </button>
          <button type="button">선택하기</button>
        </section>
      ) : (
        <button type="button" onClick={handleClickAddingCategoryButton}>
          카테고리에 추가하기
        </button>
      )}
    </div>
  )
}

export default ArticleSetupModal
