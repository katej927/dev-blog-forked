import styles from './index.module.css'
import CategorySetup from './CategorySetup'
import { useState } from 'react'

function ArticleSetupModal() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const updateSelectedCategory = (id: string | null) => setSelectedCategory(id)

  return (
    <div className={styles.container}>
      <CategorySetup updateSelectedCategory={updateSelectedCategory} />
    </div>
  )
}

export default ArticleSetupModal
