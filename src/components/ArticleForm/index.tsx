'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import Editor from './Editor'
import ArticleContent from '../ArticleContent'
import { ArticleFormProps, NewContentType, NewTitleType } from './_shared'

const ArticleForm = ({ title, content, onSubmit }: ArticleFormProps) => {
  const [newTitle, setNewTitle] = useState<NewTitleType>(title)
  const [newContent, setNewContent] = useState<NewContentType>(content)

  const [tmpCategory, setTmpCategory] = useState('65bb9ebe7139d9556e3124bb')

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

    onSubmit({ title: newTitle, content: newContent, category: tmpCategory })
  }

  // TODO: 추후 삭제
  // const handleChangeTmpCategory = ({
  //   target: { value },
  // }: ChangeEvent<HTMLInputElement>) => setTmpCategory(value)

  // const handleClickCategory = async () => {
  //   const res = await getCategoryById('65bb9ebe7139d9556e3124bb')
  //   const categories = await res.json()
  //   console.log('categories', categories)
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
