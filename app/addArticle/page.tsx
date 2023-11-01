'use client'

import { useState, FormEvent, ChangeEvent } from 'react'

export default function AddAritcle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
