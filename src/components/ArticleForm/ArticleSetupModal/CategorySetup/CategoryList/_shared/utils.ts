import { CategoryInterface, getCategories } from '@/apis/categories'

export const loadCategories = async () => {
  try {
    const res = await getCategories('omit')

    if (!res.ok) {
      throw new Error('Failed to get categories.')
    }

    const categories: CategoryInterface[] = await res.json()
    return categories
  } catch (error) {
    console.log(error)
  }
}
