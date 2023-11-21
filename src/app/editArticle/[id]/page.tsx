'use client'

import { notFound, useRouter } from 'next/navigation'

import {
  ArticleInterface,
  getArticleById,
  putArticleById,
} from '@/apis/articles'

import ArticleForm from '@/components/ArticleForm'

const EditArticle = async ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter()
  const getArticle = async () => {
    try {
      const res = await getArticleById(id)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const data = await getArticle()
  if (!data) return notFound()
  const {
    article: { title: originalTitle, content: originalContent },
  } = data

  const handleSubmit = async (article: ArticleInterface) => {
    const { title: newTitle, content: newContent } = article

    if (!newTitle || !newContent) {
      alert('Title and description are required')
      return
    }

    try {
      const res = await putArticleById(id, { newTitle, newContent })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
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
