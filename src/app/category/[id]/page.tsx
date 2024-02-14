import { getCategoryById } from '@/apis/categories'
import React from 'react'

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

  return <div>CategoryPage</div>
}

export default EachCategoryPage
