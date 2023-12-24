'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import { ArticleInterface } from '@/apis/articles/route'

import Editor from './Editor'
import ArticleContent from '../ArticleContent'

interface Props extends ArticleInterface {
  onSubmit: (article: ArticleInterface) => Promise<void>
}

const ArticleForm = ({ title, content, onSubmit }: Props) => {
  const [newTitle, setNewTitle] = useState<ArticleInterface['title']>(title)
  const [newContent, setNewContent] =
    useState<ArticleInterface['content']>(content)

  const handleChangeNewTitle = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setNewTitle(value)

  const handleChangeNewContent = (value: ArticleInterface['content']) => {
    setNewContent(value)
  }

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
      <div style={{ display: 'flex' }}>
        <Editor
          contentHtml={newContent.html}
          onChangeContent={handleChangeNewContent}
        />
        <ArticleContent contentHtml={newContent.html} />
      </div>
    </form>
  )
}
export default ArticleForm
