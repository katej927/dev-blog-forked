import { getCategoryById } from '@/apis/categories'
import EachCategory from '@/containers/Category/Each'

const EachCategoryPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const loadCategory = async () => {
    try {
      const res = await getCategoryById(id)

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      return res.json()
    } catch (error) {
      console.log(error)
    }
  }

  const { category } = await loadCategory()

  return <EachCategory category={category} />
}

export default EachCategoryPage
