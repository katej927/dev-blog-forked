import { useState } from 'react'

import CategorySetup from './CategorySetup'
import { SelectedCategoryType } from './_shared'
import { Props } from '../_shared'
import styles from './index.module.css'

function ArticleSetupModal({ title, content, category, onSubmit }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryType>(category)

  const updateSelectedCategory = (newCategory: SelectedCategoryType) =>
    setSelectedCategory(newCategory)

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
