'use client'

import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import { ArticleInterface } from '@/apis/articles'
import { API_URL } from '@/constants/common'

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
      const res = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        const { message: articleId } = await res.json()
        router.push(`/${articleId}`)
      } else {
        throw new Error('Failed to create an article')
      }
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
