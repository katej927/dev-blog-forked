'use client'

import { notFound, useRouter } from 'next/navigation'

import { API_URL } from '@/constants/common'
import { ArticleInterface, fetchArticleById } from '@/apis/articles'

import ArticleForm from '@/components/ArticleForm'

const EditArticle = async ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter()
  const getArticleById = async () => {
    try {
      const res = await fetchArticleById(id)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const data = await getArticleById()

  if (!data) return notFound()
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
