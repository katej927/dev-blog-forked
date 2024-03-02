import { MetadataRoute } from 'next'
import { GetArticlesResponseInterface, getArticles } from '@/apis/articles'
import {
  GetCategoriesArticlesCountInterface,
  getCategories,
} from '@/apis/categories'
import { DOMAIN } from '@/constants/common'

const loadArticles = async () => {
  try {
    const res = await getArticles()

    if (!res.ok) {
      throw new Error('Failed to fetch articles.')
    }

    const { articles }: GetArticlesResponseInterface = await res.json()

    if (!articles.length) return undefined

    return articles
  } catch (error) {
    console.log('Error loading articles: ', error)
  }
}

const loadCategories = async () => {
  try {
    const res = await getCategories('count')

    if (!res.ok) {
      throw new Error('Failed to fetch categories.')
    }

    const categories: GetCategoriesArticlesCountInterface[] = await res.json()
    return categories
  } catch (error) {
    console.log('Error loading categories: ', error)
  }
}

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const articles = await loadArticles()
  const categories = await loadCategories()

  const basicSitemap: MetadataRoute.Sitemap = [
    { url: `${DOMAIN}`, lastModified: articles?.[0]['updatedAt'] },
    { url: `${DOMAIN}/category`, lastModified: articles?.[0]['updatedAt'] },
  ]

  const articlesSitemap: MetadataRoute.Sitemap =
    articles?.map(({ _id, updatedAt }) => ({
      url: `${DOMAIN}/article/${_id}`,
      lastModified: updatedAt,
    })) ?? []

  const categoriesSitemap: MetadataRoute.Sitemap =
    categories?.map(({ _id, latestArticleTimestamp }) => ({
      url: `${DOMAIN}/category/${_id}`,
      lastModified: latestArticleTimestamp,
    })) ?? []

  return [...basicSitemap, ...articlesSitemap, ...categoriesSitemap]
}

export default Sitemap
