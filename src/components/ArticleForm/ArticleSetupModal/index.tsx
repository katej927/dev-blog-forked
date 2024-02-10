import styles from './index.module.css'
import CategorySetup from './CategorySetup'
import { useState } from 'react'
import { SelectedCategoryType } from './_shared'
import { ArticleInterface } from '@/apis/articles'

interface Props extends ArticleInterface {
  onSubmit: (article: ArticleInterface) => Promise<void>
}

// TODO: 카테고리 수정
function ArticleSetupModal({ title, content, category, onSubmit }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryType>(null)

  const updateSelectedCategory = (selectedCategory: SelectedCategoryType) =>
    setSelectedCategory(selectedCategory)

  const handleClickPublishButton = () => {
    onSubmit({
      title,
      content,
      category: selectedCategory?._id ?? null,
    })
  }

  return (
    <section className={styles.container}>
      <CategorySetup
        updateSelectedCategory={updateSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <button type="submit" onClick={handleClickPublishButton}>
        출간하기
      </button>
    </section>
  )
}

export default ArticleSetupModal
