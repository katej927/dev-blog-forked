'use client'

import { FormEvent, use } from 'react'
import { useRouter } from 'next/navigation'

import ArticleForm from '@/src/components/articleForm'
import { API_URL } from '@/src/constants/common'
import { ArticleInterface } from '@/src/interface/article'
import { getArticleById } from '@/src/services/articles'

const EditArticle = ({ params: { id } }: { params: { id: string } }) => {
  const {
    article: { title: originalTitle, content: originalContent },
  } = use(getArticleById(id))

  const router = useRouter()

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    article: ArticleInterface,
  ) => {
    e.preventDefault()

    const { title, content } = article

    try {
      const res = await fetch(`${API_URL}/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          Content: 'application/json',
        },
        body: JSON.stringify({ newTitle: title, newContent: content }),
      })

      if (!res.ok) {
        throw new Error('Failed to update article')
      }

      console.log('res', res.json())
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
