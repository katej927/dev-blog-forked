'use client'

import { notFound, useRouter } from 'next/navigation'

import {
  ArticleInterface,
  getArticleById,
  GetArticleResponseInterface,
  putArticleById,
} from '@/apis/articles'

import ArticleForm from '@/components/ArticleForm'

const EditArticle = async ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter()
  const loadedArticle = async (): Promise<
    GetArticleResponseInterface | undefined
  > => {
    try {
      const res = await getArticleById(id)

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      return res.json()
    } catch (error) {
      console.log(error)
    }
  }

  const data = await loadedArticle()
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
