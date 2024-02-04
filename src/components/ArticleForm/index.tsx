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

  // TODO: 차후 수정 필요
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: 카테고리 수정
    onSubmit({
      title: newTitle,
      content: newContent,
      category: '',
    })
  }

  const handleSubmitTitleContent = () => {
    if (!newTitle || !newContent) {
      alert('Title and content are required')
      return
    }

    setShowModal(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={handleSubmitTitleContent}>
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
