import { API_URL } from '../constants/common'

export interface ArticleContentInterface {
  text: string
  html: string
}

export interface ArticleInterface {
  title: string
  content: ArticleContentInterface
}

export interface RevisedArticleInterface {
  newTitle: string
  newContent: ArticleContentInterface
}

export interface GetArticleInterface extends ArticleInterface {
  _id: string
  createdAt: string
  updatedAt: string
}

interface GetArticleResponseInterface {
  article: GetArticleInterface
}

interface GetArticlesResponseInterface {
  articles: GetArticleInterface[]
}

export const getArticleById = async (
  id: string,
): Promise<GetArticleResponseInterface | undefined> => {
  const res = await fetch(`${API_URL}/api/articles/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`)
  }

  return res.json()
}

export const getArticles = async (): Promise<
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

export const putArticleById = async (
  id: string,
  revisedArticle: RevisedArticleInterface,
) => {
  const res = await fetch(`${API_URL}/api/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(revisedArticle),
  })

  return res
}
