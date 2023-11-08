'use client'

import { FormEvent, use } from 'react'
import { useRouter } from 'next/navigation'

import ArticleForm from '@/src/components/articleForm'
import { API_URL } from '@/src/constants/common'
import { ArticleInterface } from '@/src/interface/article'
import { getArticleById } from '@/src/services/articles'

import NotFound from '../../not-found'

const EditArticle = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter()
  const data = use(getArticleById(id))

  if (!data) return <NotFound />
  const {
    article: { title: originalTitle, content: originalContent },
  } = data

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
