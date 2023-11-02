'use client'

import { useRouter } from 'next/navigation'
import { useState, FormEvent, ChangeEvent } from 'react'

export default function AddAritcle() {
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
      const res = await fetch('http://localhost:3000/api/articles', {
        method: 'POST',
        headers: {
          Content: 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        router.push('/')
      } else {
        throw new Error('Failed to create an article')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setTitle(value)}
        value={title}
        type="text"
        placeholder="Text title..."
      />
      <input
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setContent(value)}
        value={content}
        type="text"
        placeholder="Text content..."
      />
      <button type="submit">Publish</button>
    </form>
  )
}
