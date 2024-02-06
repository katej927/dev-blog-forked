import styles from './index.module.css'
import CategorySetup from './CategorySetup'

function ArticleSetupModal() {
  return (
    <div className={styles.container}>
      <CategorySetup />
    </div>
  )
}

export default ArticleSetupModal
