import { API_URL } from '../constants/common'

export interface ArticleInterface {
  title: string
  content: string
}

interface GetArticleInterface extends ArticleInterface {
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface GetArticleResponseInterface {
  article: GetArticleInterface
}

interface GetArticlesResponseInterface {
  articles: GetArticleInterface[]
}

export const getArticleByIdAPI = async (
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

export const getArticlesAPI = async (): Promise<
  GetArticlesResponseInterface | undefined
> => {
  try {
    const res = await fetch(`${API_URL}/api/articles`, {
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch articles')
    }

    return res.json()
  } catch (error) {
    console.log('Error loading articles:', error)
  }
}
