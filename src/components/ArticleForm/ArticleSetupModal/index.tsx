import { useState } from 'react'
import styles from './index.module.css'

function ArticleSetupModal() {
  const [showCategoryList, setShowCategoryList] = useState<boolean>(false)

  return (
    <div className={styles.container}>
      <h3>카테고리 설정</h3>

      {showCategoryList ? (
        <section>
          <input type="text" placeholder="새로운 카테고리 이름을 입력하세요." />
          <div>카테고리 리스트</div>
          <button type="button" onClick={() => setShowCategoryList(false)}>
            취소
          </button>
          <button type="button">선택하기</button>
        </section>
      ) : (
        <button type="button" onClick={() => setShowCategoryList(true)}>
          카테고리에 추가하기
        </button>
      )}
    </div>
  )
}

export default ArticleSetupModal
