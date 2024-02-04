'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import Editor from './Editor'
import ArticleContent from '../ArticleContent'
import { ArticleFormProps, NewContentType, NewTitleType } from './_shared'

const ArticleForm = ({ title, content, onSubmit }: ArticleFormProps) => {
  const [newTitle, setNewTitle] = useState<NewTitleType>(title)
  const [newContent, setNewContent] = useState<NewContentType>(content)

  const handleChangeNewTitle = ({
    target: { value: changedNewTitle },
  }: ChangeEvent<HTMLInputElement>) => setNewTitle(changedNewTitle)

  const handleChangeNewContent = (
    changedNewContent: Pick<NewContentType, 'html' | 'text'>,
  ) => {
    setNewContent((prev) => ({ ...prev, ...changedNewContent }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: 카테고리 수정
    onSubmit({
      title: newTitle,
      content: newContent,
      category: '',
    })
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
