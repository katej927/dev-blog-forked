'use client'

import { useRouter } from 'next/navigation'

import {
  ArticleDetailInterface,
  GetDetailArticleInterface,
  putArticleById,
} from '@/apis/articles'

import ArticleForm from '@/components/ArticleForm'

interface Props {
  article: GetDetailArticleInterface
}

// TODO: 카테고리 수정
const ArticleEdit = ({
  article: { title, content, _id: id, category },
}: Props) => {
  const router = useRouter()

  const handleSubmit = async (editedArticle: ArticleDetailInterface) => {
    const { title, content, category } = editedArticle

    if (!title || !content) {
      alert('Title and description are required')
      return
    }

    try {
      const res = await putArticleById(id, {
        title,
        content,
        category,
      })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      router.push(`/article/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ArticleForm
      title={title}
      content={content}
      category={category}
      onSubmit={handleSubmit}
    />
  )
}
export default ArticleEdit
