'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import { ArticleInterface, createArticleById } from '@/apis/articles'

const DynamicArticleForm = dynamic(
  () => {
    return import('@/components/ArticleForm')
  },
  { ssr: false },
)

const WritePage = () => {
  const router = useRouter()

  const handleSubmit = async (article: ArticleInterface) => {
    const { title, content } = article

    if (!title || !content) {
      alert('Title and content are required')
      return
    }

    try {
      const res = await createArticleById(article)

      if (!res.ok) {
        throw new Error('Failed to create an article')
      }

      const { message: articleId } = await res.json()
      router.push(`/${articleId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DynamicArticleForm
      title={''}
      content={{ text: '', html: '' }}
      onSubmit={handleSubmit}
    />
  )
}

export default WritePage
