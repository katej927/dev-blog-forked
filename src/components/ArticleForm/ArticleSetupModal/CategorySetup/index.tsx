import { useState } from 'react'
import CategoryList from './CategoryList'

interface Props {
  updateSelectedCategory: (id: string | null) => void
}

function CategorySetup({ updateSelectedCategory }: Props) {
  const [showCategories, setShowCategories] = useState<boolean>(false)

  const updateShowCategoriesToUnshown = () => setShowCategories(false)

  return (
    <div>
      <h3>카테고리 설정</h3>

      {showCategories ? (
        <CategoryList
          updateSelectedCategory={updateSelectedCategory}
          updateShowCategoriesToUnshown={updateShowCategoriesToUnshown}
        />
      ) : (
        <button type="button" onClick={() => setShowCategories(true)}>
          카테고리에 추가하기
        </button>
      )}
    </div>
  )
}

export default CategorySetup
