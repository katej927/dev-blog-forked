'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import {
  DetailArticleCategoryIdInterface,
  createArticle,
} from '@/apis/articles'

const DynamicArticleForm = dynamic(
  () => {
    return import('@/components/ArticleForm')
  },
  { ssr: false },
)

const ArticleWrite = () => {
  const router = useRouter()

  const handleSubmit = async (article: DetailArticleCategoryIdInterface) => {
    try {
      const res = await createArticle(article)

      if (!res.ok) {
        throw new Error('Failed to create an article')
      }

      const { message: articleId } = await res.json()
      router.push(`${articleId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DynamicArticleForm
      title={''}
      content={{ text: '', html: '' }}
      category={null}
      onSubmit={handleSubmit}
    />
  )
}

export default ArticleWrite
