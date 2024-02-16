import {
  GetCategoriesArticlesCountInterface,
  getCategories,
} from '@/apis/categories'
import CategoryList from '@/containers/Category/List'

const CategoryListPage = async () => {
  const loadCategories = async () => {
    try {
      const res = await getCategories('count')

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      return res.json()
    } catch (error) {
      console.log(error)
    }
  }
  const categories: GetCategoriesArticlesCountInterface[] =
    await loadCategories()

  return <CategoryList categories={categories} />
}

export default CategoryListPage
