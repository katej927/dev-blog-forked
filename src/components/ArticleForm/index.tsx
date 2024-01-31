'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import Editor from './Editor'
import ArticleContent from '../ArticleContent'
import { ArticleFormProps, NewContentType, NewTitleType } from './_shared'
import { createPortal } from 'react-dom'
import ArticleSetupModal from './ArticleSetupModal'

const ArticleForm = ({ title, content, onSubmit }: ArticleFormProps) => {
  const [newTitle, setNewTitle] = useState<NewTitleType>(title)
  const [newContent, setNewContent] = useState<NewContentType>(content)

  const [showModal, setShowModal] = useState<boolean>(false)

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

    onSubmit({ title: newTitle, content: newContent })
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={() => setShowModal(true)}>
        Publish
      </button>
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
      {showModal && createPortal(<ArticleSetupModal />, document.body)}
    </form>
  )
}
export default ArticleForm
