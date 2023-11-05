'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent, ChangeEvent } from 'react'

import { API_URL } from '@/src/constants/common'

const AddAritcle = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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

  const handleChangeTitle = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setTitle(value)

  const handleChangeContent = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setContent(value)

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChangeTitle}
        value={title}
        type="text"
        placeholder="Text title..."
      />
      <input
        onChange={handleChangeContent}
        value={content}
        type="text"
        placeholder="Text content..."
      />
      <button type="submit">Publish</button>
    </form>
  )
}

export default AddAritcle
