import { useState } from 'react'
import styles from './index.module.css'
import { getCategories, CategoryInterface } from '@/apis/categories'

function ArticleSetupModal() {
  const [showCategoryList, setShowCategoryList] = useState<boolean>(false)
  const [categoryList, setCategoryList] = useState<CategoryInterface[]>([])

  const handleClickAddingCategoryButton = async () => {
    const res = await getCategories()
    const categories = await res.json()
    setCategoryList(categories)

    setShowCategoryList(true)
  }

  return (
    <div className={styles.container}>
      <h3>카테고리 설정</h3>

      {showCategoryList ? (
        <section>
          <input type="text" placeholder="새로운 카테고리 이름을 입력하세요." />
          <ul>
            {categoryList.length ? (
              categoryList.map(({ _id, categoryName }) => (
                <li key={_id}>{categoryName}</li>
              ))
            ) : (
              <div>카테고리가 없습니다.</div>
            )}
          </ul>
          <button type="button" onClick={() => setShowCategoryList(false)}>
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
