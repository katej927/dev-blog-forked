'use client'

import { ChangeEvent, useState } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames/bind'

import Editor from './Editor'
import ArticleContent from '../ArticleContent'
import { Props, NewContentType, NewTitleType } from './_shared'
import ArticleSetupModal from './ArticleSetupModal'

import styles from './index.module.css'

const cx = classNames.bind(styles)

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
    <section className={cx('wrapper')}>
      <section className={cx('editorWrapper')}>
        <div className={cx('left')}>
          <input
            onChange={handleChangeNewTitle}
            value={newTitle}
            type="text"
            placeholder="제목을 입력하세요"
            className={cx('title')}
          />
          <Editor
            contentHtml={newContent.html}
            onChangeContent={handleChangeNewContent}
          />
          <div className={cx('publishButtonWrapper')}>
            <button
              className={cx('publishButton')}
              type="button"
              onClick={handleSubmitTitleContent}
            >
              출간하기
            </button>
          </div>
        </div>
        <div className={cx('right')}>
          <input
            readOnly
            value={newTitle}
            type="text"
            className={cx('title')}
          />
          <ArticleContent
            contentHtml={newContent.html}
            style={{
              height: '670px',
            }}
          />
        </div>
      </section>

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
    </section>
  )
}
export default ArticleForm
