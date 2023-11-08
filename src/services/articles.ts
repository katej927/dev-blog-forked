import { API_URL } from '../constants/common'

export const getArticleById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch error')
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}
