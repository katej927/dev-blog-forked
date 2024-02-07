import { useState } from 'react'
import CategoryList from './CategoryList'
import { SelectedCategoryType } from '../_shared'

interface Props {
  updateSelectedCategory: (selectedCategory: SelectedCategoryType) => void
  selectedCategory: SelectedCategoryType
}

function CategorySetup({ updateSelectedCategory, selectedCategory }: Props) {
  const [isShowCategoryList, setIsShowCategoryList] = useState<boolean>(false)

  const toggleCategoryList = () => setIsShowCategoryList(!isShowCategoryList)

  return (
    <div>
      <h3>카테고리 설정</h3>

      {isShowCategoryList ? (
        <CategoryList
          updateSelectedCategory={updateSelectedCategory}
          toggleCategoryList={toggleCategoryList}
        />
      ) : selectedCategory ? (
        <div>
          <div>{selectedCategory?.categoryName}</div>
          <button type="button">시리즈에서 제거</button>
        </div>
      ) : (
        <button type="button" onClick={() => setIsShowCategoryList(true)}>
          카테고리에 추가하기
        </button>
      )}
    </div>
  )
}

export default CategorySetup
