import { getCategories } from '@/apis/categories'
import React from 'react'

const CategoryPage = async () => {
  const loadCategories = async () => {
    try {
      const res = await getCategories()

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      return res.json()
    } catch (error) {
      console.log(error)
    }
  }
  const data = await loadCategories()
  console.log('data', data)

  return <div>CategoryPage</div>
}

export default CategoryPage
