import { API_URL } from '../constants/common'
import GetArticleResponseInterface from '../interface/response/GetArticleResponseInterface'

export const getArticleById = async (
  id: string,
): Promise<GetArticleResponseInterface | undefined> => {
  try {
    const res = await fetch(`${API_URL}/api/articles/${id}`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch an article.')
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}
