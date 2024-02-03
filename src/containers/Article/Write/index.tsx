'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// TODO: 주석 수정
import { ArticleInterface, createArticle } from '@/apis/articles'

const DynamicArticleForm = dynamic(
  () => {
    return import('@/components/ArticleForm')
  },
  { ssr: false },
)

const ArticleWrite = () => {
  const router = useRouter()

  const handleSubmit = async (article: ArticleInterface) => {
    const { title, content } = article

    if (!title || !content) {
      alert('Title and content are required')
      return
    }

    try {
      // TODO: 주석 수정
      // const res = await createArticle(article)
      // if (!res.ok) {
      //   throw new Error('Failed to create an article')
      // }
      // const { message: articleId } = await res.json()
      // router.push(`${articleId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DynamicArticleForm
      title={''}
      content={{ text: '', html: '' }}
      category={''}
      onSubmit={handleSubmit}
    />
  )
}

export default ArticleWrite
