'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'

import { API_URL } from '@/constants/common'
import { ArticleInterface, getArticleById } from '@/apis/articles'

import ArticleForm from '@/components/articleForm'
import NotFound from '../../not-found'

const EditArticle = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter()
  const data = use(getArticleById(id))

  if (!data) return <NotFound />
  const {
    article: { title: originalTitle, content: originalContent },
  } = data

  const handleSubmit = async (article: ArticleInterface) => {
    const { title, content } = article

    if (!title || !content) {
      alert('Title and description are required')
      return
    }

    try {
      const res = await fetch(`${API_URL}/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle: title, newContent: content }),
      })

      if (!res.ok) {
        throw new Error('Failed to update article')
      }

      router.push(`/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ArticleForm
      title={originalTitle}
      content={originalContent}
      onSubmit={handleSubmit}
    />
  )
}
export default EditArticle
