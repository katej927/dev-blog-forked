'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import { ArticleInterface } from '@/apis/articles'

interface Props extends ArticleInterface {
  onSubmit: (article: ArticleInterface) => Promise<void>
}

const ArticleForm = ({ title, content, onSubmit }: Props) => {
  const [newTitle, setNewTitle] = useState(title)
  const [newContent, setNewContent] = useState(content)

  const handleChangeNewTitle = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setNewTitle(value)

  const handleChangeNewContent = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setNewContent(value)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit({ title: newTitle, content: newContent })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChangeNewTitle}
        value={newTitle}
        type="text"
        placeholder="Text title..."
      />
      <input
        onChange={handleChangeNewContent}
        value={newContent}
        type="text"
        placeholder="Text content..."
      />
      <button type="submit">Publish</button>
    </form>
  )
}
export default ArticleForm
