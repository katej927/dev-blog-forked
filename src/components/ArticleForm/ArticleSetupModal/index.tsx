import styles from './index.module.css'
import CategorySetup from './CategorySetup'
import { useState } from 'react'
import { SelectedCategoryType } from './_shared'

function ArticleSetupModal() {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryType>(null)

  const updateSelectedCategory = (selectedCategory: SelectedCategoryType) =>
    setSelectedCategory(selectedCategory)

  return (
    <div className={styles.container}>
      <CategorySetup
        updateSelectedCategory={updateSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  )
}

export default ArticleSetupModal
