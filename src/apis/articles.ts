import { API_URL_FOR_SSR, API_URL_FOR_CSR } from '@/constants/common'
import type { CategoryInterface } from '@/apis/categories'

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

export interface DetailArticleCategoryNameInterface
  extends Omit<ArticleDetailInterface, 'category'> {
  category: Pick<CategoryInterface, '_id' | 'categoryName'> | null
}

export interface DetailArticleCategoryIdInterface
  extends Omit<ArticleDetailInterface, 'category'> {
  category: string | null
}

export interface GetSimpleArticleInterface extends ArticleSimpleInterface {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface GetDetailArticleInterface
  extends DetailArticleCategoryNameInterface {
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

export const createArticle = async (
  article: DetailArticleCategoryIdInterface,
) => {
  const res = await fetch(API_ARTICLE_URL_FOR_CSR, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })

  return res
}

export const getArticleById = async (id: string) => {
  const res = await fetch(`${API_ARTICLE_URL_FOR_SSR}/${id}`, {
    cache: 'no-store',
  })

  return res
}

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

export const putArticleById = async (
  id: string,
  revisedArticle: DetailArticleCategoryIdInterface,
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

export const deleteArticleById = async (id: string) => {
  const res = await fetch(`${API_ARTICLE_URL_FOR_CSR}?id=${id}`, {
    method: 'DELETE',
  })

  return res
}
