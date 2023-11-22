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

export interface GetArticlesResponseInterface {
  articles: GetArticleInterface[]
}

export const createArticleById = async (article: ArticleInterface) => {
  const res = await fetch(`${API_URL}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })

  return res
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

export const getArticles = async () => {
  const res = await fetch(`${API_URL}/api/articles`, {
    cache: 'no-store',
  })

  return res
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

export const deleteArticleById = async (id: string) => {
  const res = await fetch(`${API_URL}/api/articles?id=${id}`, {
    method: 'DELETE',
  })

  return res
}
