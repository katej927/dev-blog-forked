import { API_URL_FOR_SSR, API_URL_FOR_CSR } from '@/constants/common'
import { CategoryInterface } from '@/apis/categories'

const API_ARTICLE_URL_FOR_SSR = `${API_URL_FOR_SSR}/api/articles`
const API_ARTICLE_URL_FOR_CSR = `${API_URL_FOR_CSR}/api/articles`

export interface ArticleContentInterface {
  _id?: string
  text: string
  html: string
}

export interface ArticleSimpleInterface {
  title: string
  content: Pick<ArticleContentInterface, '_id'>
  category: string | null
}

export interface ArticleDetailInterface {
  title: string
  content: ArticleContentInterface
  category: CategoryInterface | null
}

// export interface ArticleInterface {
//   title: string
//   content: ArticleContentInterface
//   category: string | null
// }

// export interface RevisedArticleInterface {
//   newTitle: string
//   newContent: ArticleContentInterface
//   newCategory: string | null
// }

// export interface GetArticleInterface extends ArticleInterface {
//   _id: string
//   createdAt: string
//   updatedAt: string
// }

export interface GetSimpleArticleInterface extends ArticleSimpleInterface {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface GetDetailArticleInterface extends ArticleDetailInterface {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface GetArticleResponseInterface {
  article: GetDetailArticleInterface
}

export interface GetArticlesResponseInterface {
  articles: GetSimpleArticleInterface[]
}

// content : 디테일 / category : string
export const createArticle = async (article: ArticleDetailInterface) => {
  const res = await fetch(API_ARTICLE_URL_FOR_CSR, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })

  return res
}

// content : 디테일 / category : 디테일
export const getArticleById = async (id: string) => {
  const res = await fetch(`${API_ARTICLE_URL_FOR_SSR}/${id}`, {
    cache: 'no-store',
  })

  return res
}

// content : 심플 / category : 심플
export const getArticles = async (searchTerm?: string) => {
  const res = await fetch(
    `${API_ARTICLE_URL_FOR_SSR}${
      searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm)}` : ''
    }`,
    {
      cache: 'no-store',
    },
  )

  return res
}

// content : 디테일 / category : string
export const putArticleById = async (
  id: string,
  revisedArticle: ArticleDetailInterface,
) => {
  const res = await fetch(`${API_ARTICLE_URL_FOR_CSR}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(revisedArticle),
  })

  return res
}

// content : 심플 / category : 심플
export const deleteArticleById = async (id: string) => {
  const res = await fetch(`${API_ARTICLE_URL_FOR_CSR}?id=${id}`, {
    method: 'DELETE',
  })

  return res
}
