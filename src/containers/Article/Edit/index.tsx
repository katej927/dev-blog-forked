'use client'

import { useRouter } from 'next/navigation'

import { GetArticleInterface, putArticleById } from '@/apis/articles'

import ArticleForm from '@/components/ArticleForm'
import { ArticleTitleContentType } from '@/components/ArticleForm/_shared/types'

interface Props {
  article: GetArticleInterface
}

const ArticleEdit = ({ article: { title, content, _id: id } }: Props) => {
  const router = useRouter()

  const handleSubmit = async (editedArticle: ArticleTitleContentType) => {
    const { title: newTitle, content: newContent } = editedArticle

    if (!newTitle || !newContent) {
      alert('Title and description are required')
      return
    }

    try {
      const res = await putArticleById(id, { newTitle, newContent })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      router.push(`/article/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return <ArticleForm title={title} content={content} onSubmit={handleSubmit} />
}
export default ArticleEdit
