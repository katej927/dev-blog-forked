import { useState } from 'react'
import classNames from 'classnames/bind'

import CategoryList from './CategoryList'
import { SelectedCategoryType } from '../_shared'
import styles from './index.module.css'

const cx = classNames.bind(styles)

interface Props {
  updateSelectedCategory: (selectedCategory: SelectedCategoryType) => void
  selectedCategory: SelectedCategoryType
}

function CategorySetup({ updateSelectedCategory, selectedCategory }: Props) {
  const [isShowCategoryList, setIsShowCategoryList] = useState<boolean>(false)

  const toggleCategoryList = () => setIsShowCategoryList(!isShowCategoryList)

  const handleClickRemoveCategory = () => updateSelectedCategory(null)

  return (
    <section className={cx('wrapper')}>
      <h3 className={cx('title')}>카테고리 설정</h3>
      <CategoryList
        renderIf={isShowCategoryList}
        updateSelectedCategory={updateSelectedCategory}
        toggleCategoryList={toggleCategoryList}
      />
      <div
        className={cx('selectedCategoryWrapper', {
          renderIf: !isShowCategoryList && selectedCategory,
        })}
      >
        <div className={cx('name')}>{selectedCategory?.categoryName}</div>
        <button
          className={cx('removalButton')}
          type="button"
          onClick={handleClickRemoveCategory}
        >
          카테고리에서 제거
        </button>
      </div>
      <button
        type="button"
        onClick={() => setIsShowCategoryList(true)}
        className={cx('addCategoryButton', {
          renderIf: !isShowCategoryList && !selectedCategory,
        })}
      >
        카테고리에 추가하기
      </button>
    </section>
  )
}

export default CategorySetup
