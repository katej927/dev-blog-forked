import { getCategories } from '@/apis/categories'
import Categories from '@/containers/Categories'

const CategoryPage = async () => {
  const loadCategories = async () => {
    try {
      const res = await getCategories('detail')

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      return res.json()
    } catch (error) {
      console.log(error)
    }
  }
  const data = await loadCategories()

  return <Categories />
}

export default CategoryPage
