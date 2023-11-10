'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { API_URL } from '@/constants/common'
import { ArticleInterface } from '@/apis/articles'

<<<<<<< HEAD:src/app/addArticle/page.tsx
import ArticleForm from '@/components/articleForm'
=======
const WritePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
>>>>>>> main:src/app/write/page.tsx

const WritePage = () => {
  const router = useRouter()

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    article: ArticleInterface,
  ) => {
    e.preventDefault()

    const { title, content } = article

    if (!title || !content) {
      alert('Title and content are required')
      return
    }

    try {
      const res = await fetch(`${API_URL}/api/articles`, {
        method: 'POST',
        headers: {
          Content: 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        throw new Error('Failed to create an article')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <ArticleForm title={''} content={''} onSubmit={handleSubmit} />
}

export default WritePage
