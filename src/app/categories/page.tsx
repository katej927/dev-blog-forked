import {
  GetCategoriesArticlesCountInterface,
  getCategories,
} from '@/apis/categories'
import Categories from '@/containers/Categories'

const CategoriesPage = async () => {
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

  return <Categories categories={categories} />
}

export default CategoriesPage
