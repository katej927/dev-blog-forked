'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// TODO: 카테고리 수정
import { ArticleDetailInterface, createArticle } from '@/apis/articles'

const DynamicArticleForm = dynamic(
  () => {
    return import('@/components/ArticleForm')
  },
  { ssr: false },
)

const ArticleWrite = () => {
  const router = useRouter()

  const handleSubmit = async (article: ArticleDetailInterface) => {
    const { title, content } = article

    if (!title || !content) {
      alert('Title and content are required')
      return
    }

    try {
      // TODO: 카테고리 수정
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
