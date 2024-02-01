'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import Editor from './Editor'
import ArticleContent from '../ArticleContent'
import { ArticleFormProps, NewContentType, NewTitleType } from './_shared'
// import { createCategory } from '@/apis/categories'

const ArticleForm = ({ title, content, onSubmit }: ArticleFormProps) => {
  const [newTitle, setNewTitle] = useState<NewTitleType>(title)
  const [newContent, setNewContent] = useState<NewContentType>(content)

  // const [tmpCategory, setTmpCategory] = useState('')

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

  // TODO: 추후 삭제
  // const handleChangeTmpCategory = ({
  //   target: { value },
  // }: ChangeEvent<HTMLInputElement>) => setTmpCategory(value)

  // const handleClickCategory = async () => {
  //   await createCategory({ categoryName: tmpCategory })
  // }

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <input type="text" onChange={handleChangeTmpCategory} />
        <button type="button" onClick={handleClickCategory}>
          카테고리 생성
        </button>
      </div> */}
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
