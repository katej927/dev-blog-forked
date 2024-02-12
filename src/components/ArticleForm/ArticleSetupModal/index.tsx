import styles from './index.module.css'
import CategorySetup from './CategorySetup'
import { useState } from 'react'
import { SelectedCategoryType } from './_shared'
import { Props } from '../_shared'

function ArticleSetupModal({ title, content, category, onSubmit }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryType>(category)

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
