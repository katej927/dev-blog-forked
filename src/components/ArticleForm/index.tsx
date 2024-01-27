'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import { ArticleInterface } from '@/apis/articles'

import Editor from './Editor'
import ArticleContent from '../ArticleContent'

interface Props extends ArticleInterface {
  onSubmit: (article: ArticleInterface) => Promise<void>
}

type NewTitleType = ArticleInterface['title']
type NewContentType = ArticleInterface['content']

export type HandleChangeNewContentType = Pick<NewContentType, 'html' | 'text'>

const ArticleForm = ({ title, content, onSubmit }: Props) => {
  const [newTitle, setNewTitle] = useState<NewTitleType>(title)
  const [newContent, setNewContent] = useState<NewContentType>(content)

  const handleChangeNewTitle = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => setNewTitle(value)

  const handleChangeNewContent = (
    content: Pick<NewContentType, 'html' | 'text'>,
  ) => {
    setNewContent((prev) => ({ ...prev, ...content }))
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
