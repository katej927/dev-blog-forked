'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import { ArticleInterface } from '@/apis/articles'

import Editor from './Editor'

interface Props extends ArticleInterface {
  onSubmit: (article: ArticleInterface) => Promise<void>
}

const ArticleForm = ({ title, content, onSubmit }: Props) => {
  const [newTitle, setNewTitle] = useState(title)
  const [newContent, setNewContent] = useState(content)

  const handleChangeNewTitle = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setNewTitle(value)

  const handleChangeNewContent = (value: string) => setNewContent(value)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit({ title: newTitle, content: newContent })
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Publish</button>
      <input
        onChange={handleChangeNewTitle}
        value={newTitle}
        type="text"
        placeholder="Text title..."
      />
      <Editor content={newContent} onChangeContent={handleChangeNewContent} />
    </form>
  )
}
export default ArticleForm
