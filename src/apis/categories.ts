import { API_URL_FOR_CSR } from './../constants/common'
import { ArticleInterface } from './articles'

const API_CATEGORY_URL = `${API_URL_FOR_CSR}/api/categories`

interface CategoryInterface {
  categoryName: string
  articles: ArticleInterface[]
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

export const getCategories = async () => {
  const res = await fetch(`${API_CATEGORY_URL}`, {
    cache: 'no-cache',
  })

  return res
}
