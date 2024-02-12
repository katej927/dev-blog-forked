'use client'

import { ChangeEvent, useState } from 'react'
import { createPortal } from 'react-dom'

import Editor from './Editor'
import ArticleContent from '../ArticleContent'
import { Props, NewContentType, NewTitleType } from './_shared'
import ArticleSetupModal from './ArticleSetupModal'

const ArticleForm = ({ title, content, category, onSubmit }: Props) => {
  const [newTitle, setNewTitle] = useState<NewTitleType>(title)
  const [newContent, setNewContent] = useState<NewContentType>(content)

  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  const handleChangeNewTitle = ({
    target: { value: changedNewTitle },
  }: ChangeEvent<HTMLInputElement>) => setNewTitle(changedNewTitle)

  const handleChangeNewContent = (
    changedNewContent: Pick<NewContentType, 'html' | 'text'>,
  ) => {
    setNewContent((prev) => ({ ...prev, ...changedNewContent }))
  }

  const handleSubmitTitleContent = () => {
    if (!newTitle || !newContent) {
      alert('Title and content are required')
      return
    }

    setIsShowModal(true)
  }

  return (
    <main>
      <button type="button" onClick={handleSubmitTitleContent}>
        출간하기
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
      {isShowModal &&
        createPortal(
          <ArticleSetupModal
            title={newTitle}
            content={newContent}
            category={category}
            onSubmit={onSubmit}
          />,
          document.body,
        )}
    </main>
  )
}
export default ArticleForm
