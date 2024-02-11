import { API_URL_FOR_CSR } from '@/constants/common'
import type { GetSimpleArticleInterface } from '@/apis/articles'

const API_CATEGORY_URL = `${API_URL_FOR_CSR}/api/categories`

export interface CategoryInterface {
  _id: string
  categoryName: string
  articles: GetSimpleArticleInterface | string[]
}

export const createCategory = async (
  categoryName: Pick<CategoryInterface, 'categoryName'>,
) => {
  const res = await fetch(API_CATEGORY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryName),
  })

  return res
}

export const getCategoryById = async (id: string) => {
  const res = await fetch(`${API_CATEGORY_URL}/${id}`, {
    cache: 'no-cache',
  })

  return res
}

export const getCategories = async () => {
  const res = await fetch(`${API_CATEGORY_URL}`, {
    cache: 'no-cache',
  })

  return res
}

export const putCategoryById = async ({
  _id,
  categoryName,
}: Pick<CategoryInterface, 'categoryName' | '_id'>) => {
  const res = await fetch(`${API_CATEGORY_URL}/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ categoryName }),
  })

  return res
}

export const deleteCategoryById = async (id: string) => {
  const res = await fetch(`${API_CATEGORY_URL}/${id}`, {
    method: 'DELETE',
  })

  return res
}
